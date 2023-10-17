import axios from 'axios';

const stocksURL = 'http://127.0.0.1:8000/api/stocks';
const getStocks = async () => {
    try {
        const response = await axios.get(stocksURL);
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export default getStocks;