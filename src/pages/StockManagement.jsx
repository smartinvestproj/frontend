import Sidebar from '../components/sidebar/Sidebar.jsx';
import Heading from '../components/heading/Heading.jsx';
import StockManagementBody from '../components/stockManagement/StockManagementBody.jsx';

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