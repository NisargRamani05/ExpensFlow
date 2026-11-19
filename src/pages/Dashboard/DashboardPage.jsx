import { useEffect, useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Wallet, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppLayout, Navbar } from '@/components/layout/Layout';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';
import { StatCard, Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Badge';
import { IncomeExpenseChart } from '@/components/charts/Charts';
import { TransactionForm, TransactionList } from '@/components/transactions/TransactionComponents';
import { useTransactionStore } from '@/app/store/transactionStore';
import { useAuthStore } from '@/app/store/authStore';
import { formatCurrency, getMonthKey, getMonthLabel } from '@/utils/formatters';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const navigate = useNavigate();
  const currency = useAuthStore((s) => s.user?.currency) || 'INR';
  const { transactions, isLoading, fetchTransactions, addTransaction, getStats, getMonthlyTrend, getFiltered } =
    useTransactionStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const monthKey = getMonthKey();
  const stats = getStats(monthKey);
  const trend = getMonthlyTrend(6);
  const recent = getFiltered().slice(0, 5);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleAdd = (data) => {
    addTransaction(data);
    setShowAddModal(false);
    toast.success('Transaction logged.');
  };

  return (
    <AppLayout>
      <Navbar
        title="Portfolio Overview"
        subtitle={getMonthLabel(monthKey)}
        actions={
          <Button onClick={() => setShowAddModal(true)} size="sm">
            <Plus className="w-4 h-4" /> Log Transaction
          </Button>
        }
      />

      <PageTransition className="p-8 space-y-8 max-w-[1400px] mx-auto w-full">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerItem>
              <StatCard
                title="Total Assets"
                value={formatCurrency(stats.balance, currency)}
                subtitle="Current Cycle"
                icon={Wallet}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                title="Capital Inflow"
                value={formatCurrency(stats.income, currency)}
                icon={TrendingUp}
                trend={12.5}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                title="Capital Outflow"
                value={formatCurrency(stats.expense, currency)}
                icon={TrendingDown}
                trend={-8.2}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                title="Volume"
                value={stats.count.toString()}
                subtitle="Entries logged"
                icon={Wallet}
              />
            </StaggerItem>
          </StaggerContainer>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FadeIn className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-luxury text-text">Cash Flow Velocity</h2>
                  <p className="text-xs text-text-muted mt-1 uppercase tracking-[0.1em]">6-Month Trajectory</p>
                </div>
              </div>
              {isLoading ? <Skeleton className="h-[280px]" /> : <IncomeExpenseChart data={trend} />}
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-luxury text-text">Recent Ledger</h2>
                <button
                  onClick={() => navigate('/app/transactions')}
                  className="text-xs text-primary font-medium flex items-center gap-2 hover:opacity-80 transition-opacity uppercase tracking-wider"
                >
                  View Registry <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16" />)}
                </div>
              ) : (
                <TransactionList transactions={recent} />
              )}
            </Card>
          </FadeIn>
        </div>
      </PageTransition>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Log Transaction">
        <TransactionForm onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} />
      </Modal>
    </AppLayout>
  );
}
