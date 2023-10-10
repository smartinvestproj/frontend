import axios from 'axios';

const getTrade = async (id) => {
    console.log('id: ' + id)
    
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/trades/${id}`);
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export default getTrade;