function StockRow({stock, idx, calculateTotalPrice, handleRowClick}) {
  return (
    <>
      <tr className={`stock-row ${idx < stock.length - 1 && 'last-td-border'}`} onClick={() => handleRowClick(stock.id)}>
        <td className="name" >{stock.name}</td>
        <td className="symbol">{stock.symbol}</td>
        <td className="price">€{calculateTotalPrice(stock.id)}</td>
      </tr>
    </>
  )
}

export default StockRow;
