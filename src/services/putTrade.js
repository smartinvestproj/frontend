import axios from "axios";

async function updateTrade(tradeId, data) {
  try {
    await axios.put(`http://127.0.0.1:8000/api/trades/${tradeId}`, data);
  } catch (error) {
    console.error('Error updating trade:', error);
    alert('Error updating trade. Please try again.');
  }
}

export default updateTrade;