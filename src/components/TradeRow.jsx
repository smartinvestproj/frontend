function TradeRow({trades, stockId, openStockInfo}) {
  const filteredTrades = trades.filter((trade) => trade.stock.id === stockId)
  
  return (
    <>
      {filteredTrades.map((trade, idx) => (
        <tr key={idx} className='trade-row'>
          <td></td>
          <td className={`date ${idx < filteredTrades.length - 1 && 'td-border'}`}>
            <span onClick={() => openStockInfo(trade.id)}>
              {trade.date.split('-').reverse().join('/')}
            </span>
          </td>
          <td className={`single-price ${idx < filteredTrades.length - 1 && 'td-border'}`}>€{trade.total}</td>
        </tr>
      ))}
    </>
  )
}

export default TradeRow;