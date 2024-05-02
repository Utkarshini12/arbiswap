// const axios = require('axios');
import axios from 'axios'

const API_URL = 'https://uniswapv2.powerloom.io/api/data/9388/aggregate_24h_top_pairs_lite:9fb408548a732c85604dacb9c956ffc2538a3b895250741593da630d994b1f27:UNISWAPV2/';

async function fetchPairData() {
    try {
        const response = await axios.get(API_URL);
        return response.data.pairs;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return [];
    }
}
function parsePairs(pairs) {
    const graph = {};
    pairs.forEach(pair => {
        const [token1, token2] = pair.name.split('-');
        if (!graph[token1]) graph[token1] = {};
        if (!graph[token2]) graph[token2] = {};
        const factor = 1 + 1000000 / Math.max(pair.volume24h, 1); 
        const roundedFactor = Math.round(factor * 100) / 100; 
        graph[token1][token2] = roundedFactor;  
        graph[token2][token1] = 1 / roundedFactor;
        console.log(graph, 'graph');
    });
    return graph;
}
function findArbitrageOpportunities(graph) {
    const tokens = Object.keys(graph);
    console.log(tokens, 'extracted tokens');
    const opportunities = [];
    console.log(opportunities, 'opportunities');
    for (let i = 0; i < tokens.length; i++) {
        for (let j = 0; j < tokens.length; j++) {
            for (let k = 0; k < tokens.length; k++) {
                const tokenA = tokens[i];
                const tokenB = tokens[j];
                const tokenC = tokens[k];
                if (tokenA !== tokenB && tokenB !== tokenC && tokenC !== tokenA) {
                    const rateAB = graph[tokenA][tokenB] || 0;
                    const rateBC = graph[tokenB][tokenC] || 0;
                    const rateCA = graph[tokenC][tokenA] || 0;
                    
                    if (rateAB > 0 && rateBC > 0 && rateCA > 0) {
                        console.log(rateAB,rateBC, rateCA,  'rates' );
                        const startAmount = 1;
                        const afterFirstSwap = startAmount * rateAB;
                        console.log("afterFirstSwap", afterFirstSwap);
                        const afterSecondSwap = afterFirstSwap * rateBC;
                        console.log(afterSecondSwap);

                        const afterThirdSwap = afterSecondSwap * rateCA;
                        console.log(afterThirdSwap);

                        const profitRatio = afterThirdSwap / startAmount;
                        const resultType = profitRatio > 1 ? 'Profit' : 'Loss';
                        let percentageChange;
                        if (resultType === 'Profit') {
                            percentageChange = ((profitRatio - 1) * 100).toFixed(2);
                        } else {
                            percentageChange = (-(1 - profitRatio) * 100).toFixed(2);
                        }
                        opportunities.push({
                            path: `${tokenA} -> ${tokenB} -> ${tokenC} -> ${tokenA}`,
                            tokenA: tokenA,
                            tokenB: tokenB,
                            tokenC: tokenC,
                            resultType: resultType,
                            profitRatio: profitRatio.toFixed(3),
                            detailedSteps: `1 ${tokenA} -> ${afterFirstSwap.toFixed(2)} ${tokenB} -> ${afterSecondSwap.toFixed(2)} ${tokenC} -> ${afterThirdSwap.toFixed(2)} ${tokenA}`,
                            afterFirstSwap: afterFirstSwap.toFixed(2),
                            afterSecondSwap: afterSecondSwap.toFixed(2),
                            afterThirdSwap: afterThirdSwap.toFixed(2),
                            percentageChange: percentageChange




                        });
                    }
                }
            }
        }
    }
    return opportunities;
}

export async function checkArbitrage() {
    const pairs = await fetchPairData();
    if (pairs.length) {
        const graph = parsePairs(pairs);
        const opportunities = findArbitrageOpportunities(graph);
        console.log(opportunities);
        return opportunities
    } else {
        console.log('No pairs data available to check for arbitrage.');
    }
}


