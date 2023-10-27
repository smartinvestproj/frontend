export default function TradeRow({ trades, stockId, openStockInfo }) {

  const filteredTrades = trades.filter((trade) => trade.stock.id === stockId && trade.state === 1);

  filteredTrades.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  return (
    <>
      {filteredTrades.map((trade, index) => (
        <tr key={trade.id} className="trade-row">
          <td></td>
          <td className={`date ${index < filteredTrades.length - 1 && 'td-border'}`}>
            <span onClick={() => openStockInfo(trade.id)}>
              {trade.date.split('-').reverse().join('/')}
            </span>
          </td>
          <td className={`single-price ${index < filteredTrades.length - 1 && 'td-border'}`}>
            €{trade.total}
          </td>
        </tr>
      ))}
    </>
  );
}
