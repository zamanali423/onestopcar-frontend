"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", orders: 145 },
  { month: "Feb", orders: 162 },
  { month: "Mar", orders: 138 },
  { month: "Apr", orders: 189 },
  { month: "May", orders: 167 },
  { month: "Jun", orders: 201 },
  { month: "Jul", orders: 178 },
  { month: "Aug", orders: 215 },
  { month: "Sep", orders: 234 },
  { month: "Oct", orders: 256 },
  { month: "Nov", orders: 242 },
  { month: "Dec", orders: 287 },
];

export function OrdersChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="month" 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value: any) => [value, "Orders"]}
          />
          <Bar 
            dataKey="orders" 
            fill="#E9CC2F" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
