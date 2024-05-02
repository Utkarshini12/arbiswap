import { useState } from "react";

import { checkArbitrage } from "../../api";
import Card from "../Card";

const Init = () => {
  const [result, setResult] = useState([]);

  const onFindArbitrage = async () => {
    const allAritrage = await checkArbitrage();
    setResult(allAritrage);
  };
  return (
    <>
    <div className="mt-5 centered">
    
        <div
          className="glass_card centered"
          onClick={() => onFindArbitrage()}
        >
          <p className="fw-bold text-light">POWERLOOM <br /> X <br /> UNISWAP</p>
        </div>
       
   
    </div>
     <div className="row mt-5 centered vh-100">  
     <Card result={result} />
     </div>

     </>
  );
};

export default Init;
