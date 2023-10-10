import Sidebar from '../components/Sidebar';
import Heading from '../components/Heading';
import StockManagementBody from '../components/StockManagementBody.jsx';
// import StockManagementBody2 from '../components/StockManagementBody2.jsx';

function StockManagement() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Heading />
        <StockManagementBody />
        {/* <StockManagementBody2 /> */}

        {/* <provider/> mudar para um context provider */}
        {/* tenho que criar um component para ter a logica toda dos props */}
        {/* <UsersContext.Provider value={{ users, addUserToList, selectedUser, setSelectedUser }}>
            <StockManagementBody />
        </UsersContext.Provider> */}
      </div>
    </div>
  );
}

export default StockManagement;