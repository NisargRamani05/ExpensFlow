import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { CATEGORY_COLORS } from '@/utils/constants';
import { formatCurrency } from '@/utils/formatters';
import { useAuthStore } from '@/app/store/authStore';

const CustomTooltip = ({ active, payload, label }) => {
  const currency = useAuthStore.getState().user?.currency || 'INR';
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-4 py-3 shadow-xl border border-border">
      <p className="text-xs text-text-muted mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-medium numeric" style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value, currency)}
        </p>
      ))}
    </div>
  );
};

export function IncomeExpenseChart({ data }) {
  const currency = useAuthStore((s) => s.user?.currency) || 'INR';

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#9CA3AF"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${formatCurrency(v, currency).replace(/\.\d+$/, '')}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="income" stroke="#22C55E" fill="url(#incomeGrad)" strokeWidth={2} name="Income" />
        <Area type="monotone" dataKey="expense" stroke="#EF4444" fill="url(#expenseGrad)" strokeWidth={2} name="Expense" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CategoryPieChart({ data }) {
  if (!data?.length) {
    return (
      <div className="flex items-center justify-center h-[280px] text-text-muted text-sm">
        No expense data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
          animationBegin={0}
          animationDuration={800}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#6B7280'} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => <span className="text-text-muted text-xs">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function MonthlyTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="expense" stroke="#6D5BFF" strokeWidth={2.5} dot={{ fill: '#6D5BFF', r: 4 }} name="Expenses" />
        <Line type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: '#22C55E', r: 4 }} name="Income" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ComparisonBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="income" fill="#22C55E" radius={[6, 6, 0, 0]} name="Income" />
        <Bar dataKey="expense" fill="#EF4444" radius={[6, 6, 0, 0]} name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
}
