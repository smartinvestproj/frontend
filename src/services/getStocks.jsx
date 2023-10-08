import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function getStocks(){

    const stocksURL = 'http://127.0.0.1:8000/api/stocks';
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(stocksURL);
          const data = response.data;
          setStocks(data);
          console.log(data)
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
    

    return stocks;
};
