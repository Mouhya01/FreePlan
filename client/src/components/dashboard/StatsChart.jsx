import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const generateWeeklyData = (completionRate) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, i) => ({
    day,
    rate: Math.min(
      100,
      Math.floor((completionRate / 6) * i + Math.random() * 10)
    ),
  }));
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-surface-dark-secondary px-4 py-2">
      <p className="text-xs text-white/40">{label}</p>
      <p className="text-sm font-medium text-brand-400">
        {payload[0].value}% completion
      </p>
    </div>
  );
};

const StatsChart = ({ completionRate = 0 }) => {
  const data = generateWeeklyData(completionRate);

  return (
    <div className="rounded-2xl border border-white/5 bg-surface-dark-secondary p-5">
      <p className="mb-1 text-sm font-medium text-white">Weekly Progress</p>
      <p className="mb-6 text-xs text-white/40">Task completion rate</p>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6c63ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="day"
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#6c63ff"
            strokeWidth={2}
            fill="url(#colorRate)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;