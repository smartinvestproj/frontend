import React, { useRef, useEffect, useState } from 'react';
import './dashboardBody.css';
import MyStocks from '../myStocks/MyStocks.jsx';
import DashboardGraph from '../../dashboard/dashboardBody/DashboardGraph.jsx';
import getStocks from '../../../services/getStocks';
import Loading from '../../loading/Loading';

export default function DashboardBody() {
  const scrl = useRef(null);
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
  };
  
  getStocks();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockData = await getStocks(); 
        setStocks(stockData);
        console.log(stockData)
        setLoading(false); 
      } catch (error) {
        console.error(error);
        setLoading(true); 
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboardBody-container">
      <div className="dashboardBody-mystocks-container">
        <h3 className='my-stocks-label'>My Stocks</h3>
        <i onClick={() => slide(-150)} className='stocks-arrow-left fi fi-rr-angle-small-left'></i>
        <div ref={scrl} className="my-stocks-item">
          {loading ? (
            <Loading/>
          ) : (
            stocks.map((stock, index) => (
              <MyStocks key={index} props={stock} />
            ))
          )}
        </div>
      </div>
      <i onClick={() => slide(+150)} className='stocks-arrow fi fi-rr-angle-small-right'></i>
      <DashboardGraph />
    </div>
  );
}
