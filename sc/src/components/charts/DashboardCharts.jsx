import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const PIE_COLORS = ['#0ea5e9', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#6366f1']

const ChartCard = ({ title, children }) => (
  <article className="rounded-3xl border border-white/50 bg-white/40 p-5 shadow-sm backdrop-blur-md">
    <h4 className="mb-4 text-sm font-bold text-slate-800">{title}</h4>
    <div className="w-full min-w-0" style={{ width: '100%', minHeight: 300, height: 300 }}>
      {children}
    </div>
  </article>
)

export const CitizenComplaintStatusPie = ({ data }) => (
  <ChartCard title="Complaint Status Distribution">
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={95} label>
          {data.map((entry, index) => (
            <Cell key={`${entry.name}-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </ChartCard>
)

export const EmployeeTaskBar = ({ data }) => (
  <ChartCard title="Task Progress Overview">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>
)

export const AdminCategoryPie = ({ data }) => (
  <ChartCard title="Complaints by Category">
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={95} label>
          {data.map((entry, index) => (
            <Cell key={`${entry.name}-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </ChartCard>
)

export const AdminMonthlyTrendLine = ({ data }) => (
  <ChartCard title="Monthly Complaint Trend">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  </ChartCard>
)
