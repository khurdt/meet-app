import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


function EventCityPie({ events, locations }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const incomingData = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })

    setData(incomingData)
  }, [events])

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#aa33cc', '#cc66aa', '#fd6159', '#bdb6c2', '#8f6677', '#1689d2', '#0d8767', '#f40096', '#FF0000', '#f8f200', '#000000'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, number, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.75;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text style={{ fontSize: '12px' }} x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${number}`}
      </text>
    );
  };

  const renderOtherCustomizedLabel = ({ x, y, cx, cy, city, percent, index }) => {
    return (
      <text style={{ fontSize: '13px' }} x={x} y={y} fill={colors[index]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${city} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer height={250}>
      <PieChart width={400} height={400}>
        <Pie data={data} cx="50%" cy="50%" fill="#8884d8" dataKey="number" innerRadius={85} outerRadius={90}
          labelLine={false}
          label={renderOtherCustomizedLabel}
        >
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))
          }
        </Pie>
        <Pie data={data} dataKey="number" cx="50%" cy="50%" outerRadius={85} fill="#82ca9d" labelLine={false} label={renderCustomizedLabel} >
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

export default EventCityPie;
