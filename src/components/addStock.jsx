import React from 'react';

function AddStock() {

  return (

    <div>
      <div className="add-stock-header">
        <h2>Add Stock</h2><div className="add-stock-plus">+</div>
      </div>
      <hr />
      <div>
        <form action="">
          <table className='stock-table'>
            <thead>
              <th></th>
              <th></th>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td><input type='text'></input></td>
              </tr>
              <tr>
                <td>Symbol</td>
                <td><input type='text'></input></td>
              </tr>
              <tr>
                <td>Currency</td>
                <td><input type='text'></input></td>
              </tr>
              <tr>
                <td>Country</td>
                <td><input type='text'></input></td>
              </tr>
              <tr>
                <td>Broker</td>
                <td><input type='text'></input></td>
              </tr>
              <tr>
                <td>Date</td>
                <td><input type='text'></input></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      <div className="add-button-div">
        <button className='add-button'>Add stock</button>
      </div>
    </div >
  );
}

export default AddStock;