import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


function EventGenre({ events }) {

  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ];

  return (
    <ResponsiveContainer height={250}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;
