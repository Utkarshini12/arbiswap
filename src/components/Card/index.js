const Card = ({ result }) => {
  return (
    <>
      {result.map((item, i) => (
        <div
          className="card m-1 bg-dark col-lg-6 text-center"
          style={{ width: 20 + "rem" }}
          key={i}
        >
          <div className="card-header">
            <p className="text-light">
              {item.resultType === "Loss" ? (
                <span className="text-danger">
                  <i className="text-danger fw-bolder bi bi-arrow-down"></i>{" "}
                  {item.profitRatio} LOSS
                </span>
              ) : (
                <span className="text-success">
                  {" "}
                  <i className="text-success fw-bolder bi bi-arrow-up"></i>{" "}
                  {item.profitRatio} PROFIT
                </span>
              )}
            </p>
          </div>

          <p className="card-text text-light text-center text-light">
            <p className="text-secondary pt-2">Trade 1</p>
            <hr className="bg-black" />
            <div className="d-flex">
              <div className="col"> 1 {item.tokenA}</div>
              <div className="vr bg-black"></div>
              <div className="col">
                {item.afterFirstSwap} {item.tokenB}
              </div>
            </div>

            <hr className="bg-black" />
            <p className="text-secondary">Trade 2</p>
            <hr className="bg-black" />
            <div className="d-flex">
              <div className="col">
                {" "}
                {item.afterFirstSwap} {item.tokenB}
              </div>
              <div className="vr bg-black"></div>
              <div className="col">
                {item.afterSecondSwap} {item.tokenC}
              </div>
            </div>

            <hr className="bg-black" />
            <p className="text-secondary">Trade 3</p>
            <hr className="bg-black" />
            <div className="d-flex">
              <div className="col">
                {" "}
                {item.afterSecondSwap} {item.tokenC}
              </div>
              <div className="vr bg-black"></div>
              <div className="col">
                {item.afterThirdSwap} {item.tokenA}
              </div>
            </div>
          </p>

          <div className="card-footer">
            {item.percentageChange > 0 ? (
              <span className="text-success fw-bolder"> <i className="text-success fw-bolder bi bi-arrow-up"></i>{item.percentageChange} %</span>
            ) : (
                <span className="text-danger"> <i className="text-danger fw-bolder bi bi-arrow-down"></i>{item.percentageChange} %</span>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
