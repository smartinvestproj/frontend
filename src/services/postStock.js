import axios from "axios";

const postStock = async (data) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/stocks', data);

    return response.data;

  } catch (error) {
    console.error('Error creating stock:', error);
    alert('Error creating stock. Please try again.');
  }
};

export default postStock;