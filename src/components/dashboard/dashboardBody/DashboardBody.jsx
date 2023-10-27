import React, { useRef} from 'react';
import './dashboardBody.css';
import MyStocks from '../myStocks/MyStocks.jsx';
import DashboardGraph from './DashboardGraph.jsx';
import { useStockContext } from '../../../context/stockContext';

export default function DashboardBody() {
  const { stocks, tradeValuesByStockId, filterTradesByState } = useStockContext();

  const stocksWithNoState1Trades = stocks.filter(stock => {
    return filterTradesByState().some(trade => trade.stock.id === stock.id);
  });

  const scrl = useRef(null);
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
  };

  return (
    <>
      <div className="dashboardBody-container">
        <div className="dashboardBody-mystocks-container">
          <h3 className='my-stocks-label'>My Stocks</h3>
          <i onClick={() => slide(-150)} className='stocks-arrow-left fi fi-rr-angle-small-left'></i>
          <div ref={scrl} className="my-stocks-item">
            {stocksWithNoState1Trades.map((trade, index) => (
              <MyStocks
                key={index}
                symbol={trade.symbol}
                name={trade.name}
                total={tradeValuesByStockId(trade.id).totalTotal + "€"}
              />
            ))}
          </div>
        </div>
        <i onClick={() => slide(+150)} className='stocks-arrow fi fi-rr-angle-small-right'></i>
        <DashboardGraph />
      </div>
    </>
  );
}