
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: any[];
}

const Chart = ({ data }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1a1a1a', 
            borderColor: '#333',
            color: '#fff' 
          }} 
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="Apple" 
          stroke="#80ed99" 
          strokeWidth={2}
          dot={{ r: 3 }} 
          activeDot={{ r: 5, strokeWidth: 0 }} 
        />
        <Line 
          type="monotone" 
          dataKey="Microsoft" 
          stroke="#5baeff" 
          strokeWidth={2} 
          dot={{ r: 3 }} 
          activeDot={{ r: 5, strokeWidth: 0 }} 
        />
        <Line 
          type="monotone" 
          dataKey="Tesla" 
          stroke="#ff6b6b" 
          strokeWidth={2} 
          dot={{ r: 3 }} 
          activeDot={{ r: 5, strokeWidth: 0 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
