const CustomTooltip = ({ active, payload, selectedUnit }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p style={{ color: 'white' }}>Date: {data.date}</p>
          <p style={{ color: 'white' }}>Time: {data.name}</p>
          <p style={{ color: 'white' }}>
            {payload[0].dataKey}: {data[payload[0].dataKey]} {selectedUnit}
          </p>
        </div>
      );
    }
  
    return null;
  };
export default CustomTooltip;