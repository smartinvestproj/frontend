import axios from 'axios';

const getStock = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/stocks/${id}`);
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export default getStock;