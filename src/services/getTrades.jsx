import axios from 'axios';

const tradeURL = 'http://127.0.0.1:8000/api/trades';

const getTrades = async () => {
    try {
        const response = await axios.get(tradeURL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default getTrades;