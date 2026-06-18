import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

type ChartData = {
  label: string;
  value: number;
};

type ProfileChartProps = {
  data: ChartData[];
  color: string;
};

export function ProfileChart({
  data,
  color,
}: ProfileChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="label"
            angle={-30}
            textAnchor="end"
            height={70}
          />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              `SAR ${value}`,
              'Amount',
            ]}
          />

          <Bar
            dataKey="value"
            fill={color}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}