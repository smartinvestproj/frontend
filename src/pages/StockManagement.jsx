import Sidebar from '../components/Sidebar';
import Heading from '../components/Heading';
import StockManagementBody from '../components/StockManagementBody.jsx';

function StockManagement() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Heading />
        <StockManagementBody />
      </div>
    </div>
  );
}

export default StockManagement;