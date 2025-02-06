function Percentage({ coin }) {
    if (coin === undefined || coin === null) {
      return <td className="neutral">N/A</td>;
    }
  
    const isNegative = coin < 0;
    const arrow = isNegative ? "🔻" : "🔺";
  
    return (
      <td className={isNegative ? "falling" : "rising"}>
        {arrow} {Math.abs(coin).toFixed(2)}%
      </td>
    );
  }
  
  export default Percentage;
  