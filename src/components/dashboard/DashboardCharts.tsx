import {
    LineChart, Line,
    BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend,
    RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';
import { formatCurrency } from '../../lib/utils';
import {
    useOrderTrends, useTopItems, usePaymentBreakdown,
    useHourlyHeatmap, useTopCategories, useRevenue,
} from '../../hooks/useDashboard';
import { useDateFilter } from '../../context/DateFilterContext';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Spinner } from '../ui/Spinner';

const COLORS = ['#8b5e3c', '#bc6c25', '#dda15e', '#606c38', '#4b3832', '#967969'];
const GRID_COLOR = '#ede0d4';

function formatAxisDate(val: string): string {
    if (!val || typeof val !== 'string') return String(val ?? '');
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const tooltipStyle = {
    background: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    padding: '8px 12px',
};

interface DashboardChartsProps {
    hideHeader?: boolean;
}

export function DashboardCharts({ hideHeader = false }: DashboardChartsProps) {
    const { startDate, endDate } = useDateFilter();

    const { data: orderTrends, isLoading: loadingTrends } = useOrderTrends({ startDate, endDate });
    const { data: revenue, isLoading: loadingRevenue } = useRevenue({ startDate, endDate });
    const { data: topItems, isLoading: loadingItems } = useTopItems({ startDate, endDate });
    const { data: payments, isLoading: loadingPayments } = usePaymentBreakdown({ startDate, endDate });
    const { data: heatmap, isLoading: loadingHeatmap } = useHourlyHeatmap({ startDate, endDate });
    const { data: topCategories, isLoading: loadingCategories } = useTopCategories({ startDate, endDate });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Main Performance Chart */}
            <Card className="chart-card">
                {!hideHeader && (
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Revenue & Orders Performance</h3>
                    </div>
                )}
                <CardContent>
                    <div style={{ height: '350px' }}>
                        {loadingRevenue || loadingTrends ? <Spinner /> : (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenue} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={GRID_COLOR} />
                                    <XAxis
                                        dataKey="period"
                                        tickFormatter={formatAxisDate}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#8c7365', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={(v) => `$${v}`}
                                        tick={{ fill: '#8c7365', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        formatter={(v: number) => [formatCurrency(v), 'Revenue']}
                                        labelFormatter={formatAxisDate}
                                        contentStyle={tooltipStyle}
                                    />
                                    <Legend verticalAlign="top" height={36} iconType="circle" />
                                    <Line
                                        name="Daily Revenue"
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#d1733e"
                                        strokeWidth={4}
                                        dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                                        activeDot={{ r: 8 }}
                                    />
                                    <Line
                                        name="Order Volume"
                                        type="monotone"
                                        dataKey="order_count"
                                        stroke="#3d2b1f"
                                        strokeWidth={4}
                                        dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <Card className="chart-card">
                    <div className="ui-card-header">
                        <h3 className="ui-card-title">Top Selling Items</h3>
                    </div>
                    <CardContent>
                        <div style={{ height: '300px' }}>
                            {loadingItems ? <Spinner /> : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={topItems} layout="vertical" margin={{ top: 5, right: 10, left: 40, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={GRID_COLOR} />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#3d2b1f', fontSize: 12 }} width={100} />
                                        <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={tooltipStyle} />
                                        <Bar dataKey="qty_sold" fill="#f97316" radius={[0, 10, 10, 0]} barSize={20}>
                                            {topItems?.map((_: any, i: number) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="chart-card">
                    <div className="ui-card-header">
                        <h3 className="ui-card-title">Payment Methods</h3>
                    </div>
                    <CardContent>
                        <div style={{ height: '300px' }}>
                            {loadingPayments ? <Spinner /> : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={payments}
                                            cx="50%" cy="50%"
                                            innerRadius={70} outerRadius={100}
                                            paddingAngle={8}
                                            dataKey="count"
                                            nameKey="method"
                                        >
                                            {payments?.map((_: any, i: number) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} cornerRadius={8} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={tooltipStyle} />
                                        <Legend verticalAlign="bottom" iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
                <Card className="chart-card">
                    <div className="ui-card-header">
                        <h3 className="ui-card-title">Busy Hours (Orders)</h3>
                    </div>
                    <CardContent>
                        <div style={{ height: '280px' }}>
                            {loadingHeatmap ? <Spinner /> : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={heatmap} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                                        <XAxis dataKey="hour" tickFormatter={(v) => `${v}h`} axisLine={false} tickLine={false} tick={{ fill: '#8c7365', fontSize: 11 }} />
                                        <YAxis hide />
                                        <Tooltip
                                            cursor={{ fill: '#f9fafb' }}
                                            formatter={(v: number) => [v, 'Orders']}
                                            labelFormatter={(l) => `${l}:00 – ${l}:59`}
                                            contentStyle={tooltipStyle}
                                        />
                                        <Bar dataKey="order_count" radius={[10, 10, 0, 0]} barSize={24}>
                                            {heatmap?.map((entry: any, i: number) => {
                                                const max = Math.max(...(heatmap?.map((h: any) => h.order_count) || [1]));
                                                const isActive = entry.order_count / max > 0.7;
                                                return <Cell key={i} fill={isActive ? '#8b5e3c' : '#f3e9dc'} />;
                                            })}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="chart-card">
                    <div className="ui-card-header">
                        <h3 className="ui-card-title">Category Revenue</h3>
                    </div>
                    <CardContent>
                        <div style={{ height: '280px' }}>
                            {loadingCategories ? <Spinner /> : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={topCategories} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
                                        <PolarGrid stroke={GRID_COLOR} />
                                        <PolarAngleAxis dataKey="name" tick={{ fill: '#8c7365', fontSize: 11 }} />
                                        <Radar name="Revenue" dataKey="total_revenue" stroke="#8b5e3c" fill="#8b5e3c" fillOpacity={0.2} />
                                        <Tooltip formatter={(v: number) => [formatCurrency(v), 'Revenue']} contentStyle={tooltipStyle} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

