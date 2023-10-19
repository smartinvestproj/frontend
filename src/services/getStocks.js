import axios from 'axios';

const getStocks = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/stocks');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export default getStocks;