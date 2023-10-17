import axios from 'axios';
import { base_url } from './base';

const stocksURL = `${base_url}/stocks/`;
const getStocks = async () => {
    try {
        const response = await axios.get(stocksURL);
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export default getStocks;