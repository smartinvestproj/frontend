import axios from 'axios';
import { base_url } from './base';

const tradeURL = `${base_url}/trades/`;

const getTrades = async () => {
    try {
        const response = await axios.get(tradeURL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default getTrades;