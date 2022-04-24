import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


function EventGenrePie({ events }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => getData());
  }, [events])

  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

  const getData = () => {
    const data = genres.map((genre) => {
      const value = events.filter((event) => event.summary.split(' ').includes(genre)).length
      return { name: genre, value };
    }).filter((data) => data.value > 0);

    return data;
  }

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#aa33cc'];

  const renderGenreCustomizedLabel = ({ x, y, cx, cy, name, percent, index }) => {
    return (
      <text style={{ fontSize: '13px' }} x={x} y={y} fill={colors[index]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer height={250}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey='value'
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill='#8884d8'
          labelLine={false}
          label={renderGenreCustomizedLabel}>
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenrePie;
