import axios from "axios";

const postTrade = async (data) => {
  try {
    console.log("working on it");
    await axios.post('http://127.0.0.1:8000/api/trades', data);

    console.log("done!");

  } catch (error) {
    console.error('Error creating trade:', error);
    alert('Error creating trade. Please try again.');
  }
};

export default postTrade;