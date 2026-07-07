import { useEffect } from 'react';
import { TrendingUp, TrendingDown, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import { AppLayout, Navbar } from '@/components/layout/Layout';
import { PageTransition, FadeIn } from '@/components/animations/PageTransition';
import { Card, StatCard } from '@/components/ui/Card';
import { CategoryPieChart, MonthlyTrendChart, ComparisonBarChart } from '@/components/charts/Charts';
import { useTransactionStore } from '@/app/store/transactionStore';
import { useAuthStore } from '@/app/store/authStore';
import { formatCurrency, getMonthKey, getMonthLabel } from '@/utils/formatters';
import { CATEGORY_COLORS } from '@/utils/constants';

export default function AnalyticsPage() {
  const currency = useAuthStore((s) => s.user?.currency) || 'INR';
  const { fetchTransactions, getStats, getCategoryBreakdown, getMonthlyTrend, getFiltered } = useTransactionStore();

  const monthKey = getMonthKey();
  const stats = getStats(monthKey);
  const categoryData = getCategoryBreakdown(monthKey);
  const trendData = getMonthlyTrend(6);
  const topCategory = categoryData[0];

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const savingsRate = stats.income > 0
    ? Math.round(((stats.income - stats.expense) / stats.income) * 100)
    : 0;

  return (
    <AppLayout>
      <Navbar title="Analytics" subtitle={getMonthLabel(monthKey)} />

      <PageTransition className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Savings Rate"
            value={`${savingsRate}%`}
            subtitle="Of total income"
            icon={TrendingUp}
          />
          <StatCard
            title="Avg. Daily Spend"
            value={formatCurrency(Math.round(stats.expense / 30), currency)}
            subtitle="This month"
            icon={TrendingDown}
          />
          <StatCard
            title="Top Category"
            value={topCategory?.name || 'N/A'}
            subtitle={topCategory ? formatCurrency(topCategory.value, currency) : 'No data'}
            icon={PieIcon}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FadeIn>
            <Card>
              <div className="flex items-center gap-2 mb-6">
                <PieIcon className="w-5 h-5 text-primary" />
                <div>
                  <h2 className="text-lg font-semibold">Category Breakdown</h2>
                  <p className="text-sm text-text-muted">Expense distribution this month</p>
                </div>
              </div>
              <CategoryPieChart data={categoryData} />
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card>
              <div className="flex items-center gap-2 mb-6">
                <BarChart2 className="w-5 h-5 text-primary" />
                <div>
                  <h2 className="text-lg font-semibold">Monthly Trend</h2>
                  <p className="text-sm text-text-muted">Income & expense over time</p>
                </div>
              </div>
              <MonthlyTrendChart data={trendData} />
            </Card>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <Card>
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="w-5 h-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Income vs Expense</h2>
                <p className="text-sm text-text-muted">Monthly comparison</p>
              </div>
            </div>
            <ComparisonBarChart data={trendData} />
          </Card>
        </FadeIn>

        {categoryData.length > 0 && (
          <FadeIn delay={0.3}>
            <Card>
              <h2 className="text-lg font-semibold mb-4">Spending Insights</h2>
              <div className="space-y-3">
                {categoryData.slice(0, 5).map((cat, i) => {
                  const pct = stats.expense > 0 ? Math.round((cat.value / stats.expense) * 100) : 0;
                  return (
                    <div key={cat.name} className="flex items-center gap-4">
                      <span className="text-sm text-text-muted w-6">#{i + 1}</span>
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[cat.name] }}
                      />
                      <span className="flex-1 text-sm font-medium">{cat.name}</span>
                      <span className="text-sm numeric text-text-muted">{pct}%</span>
                      <span className="text-sm font-semibold numeric w-24 text-right">
                        {formatCurrency(cat.value, currency)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </FadeIn>
        )}
      </PageTransition>
    </AppLayout>
  );
}
