import axios from 'axios';

const stocksURL = 'http://127.0.0.1:8000/api/stocks';

const token = localStorage.token

const getStocks = async () => {
    try {
        console.log(token);
        const response = await axios.get(stocksURL, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export default getStocks;