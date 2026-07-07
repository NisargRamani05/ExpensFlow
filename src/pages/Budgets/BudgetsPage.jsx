import { useEffect, useState } from 'react';
import { AlertTriangle, Plus, Save } from 'lucide-react';
import { AppLayout, Navbar } from '@/components/layout/Layout';
import { PageTransition, FadeIn } from '@/components/animations/PageTransition';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar, Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useBudgetStore } from '@/app/store/budgetStore';
import { useAuthStore } from '@/app/store/authStore';
import { CATEGORIES } from '@/utils/constants';
import { formatCurrency, getMonthKey, getMonthLabel } from '@/utils/formatters';
import toast from 'react-hot-toast';

export default function BudgetsPage() {
  const currency = useAuthStore((s) => s.user?.currency) || 'INR';
  const { fetchBudgets, getBudgetForMonth, createOrUpdateBudget, getBudgetProgress, getTotalBudget, isLoading } =
    useBudgetStore();
  const [monthKey, setMonthKey] = useState(getMonthKey());
  const [showModal, setShowModal] = useState(false);
  const [editCategories, setEditCategories] = useState({});

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const budget = getBudgetForMonth(monthKey);
  const progress = getBudgetProgress(monthKey);
  const totalBudget = getTotalBudget(monthKey);
  const totalSpent = progress.reduce((s, p) => s + p.spent, 0);
  const overspentCategories = progress.filter((p) => p.overspent);

  const openEdit = () => {
    const cats = {};
    CATEGORIES.expense.slice(0, 5).forEach((c) => {
      cats[c] = budget?.categories?.[c] || 0;
    });
    setEditCategories(cats);
    setShowModal(true);
  };

  const handleSave = () => {
    createOrUpdateBudget(monthKey, editCategories);
    setShowModal(false);
    toast.success('Budget saved!');
  };

  return (
    <AppLayout>
      <Navbar
        title="Budgets"
        subtitle={getMonthLabel(monthKey)}
        actions={
          <div className="flex gap-2">
            <input
              type="month"
              value={monthKey}
              onChange={(e) => setMonthKey(e.target.value)}
              className="px-3 py-2 rounded-xl glass text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <Button onClick={openEdit} size="sm">
              {budget ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {budget ? 'Edit Budget' : 'Create Budget'}
            </Button>
          </div>
        }
      />

      <PageTransition className="p-6 max-w-7xl mx-auto w-full space-y-6">
        {overspentCategories.length > 0 && (
          <FadeIn>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-danger/10 border border-danger/20">
              <AlertTriangle className="w-5 h-5 text-danger shrink-0" />
              <div>
                <p className="text-sm font-medium text-danger">Overspending Alert</p>
                <p className="text-xs text-text-muted">
                  You've exceeded budget in: {overspentCategories.map((c) => c.category).join(', ')}
                </p>
              </div>
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <p className="text-sm text-text-muted mb-1">Total Budget</p>
            <p className="text-2xl font-bold numeric">{formatCurrency(totalBudget, currency)}</p>
          </Card>
          <Card>
            <p className="text-sm text-text-muted mb-1">Total Spent</p>
            <p className="text-2xl font-bold numeric">{formatCurrency(totalSpent, currency)}</p>
          </Card>
          <Card>
            <p className="text-sm text-text-muted mb-1">Remaining</p>
            <p className="text-2xl font-bold numeric text-accent">
              {formatCurrency(Math.max(totalBudget - totalSpent, 0), currency)}
            </p>
          </Card>
        </div>

        {!budget ? (
          <Card className="text-center py-16">
            <p className="text-text-muted mb-4">No budget set for this month</p>
            <Button onClick={openEdit}>Create Monthly Budget</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progress.map((item) => (
              <FadeIn key={item.category}>
                <Card hover>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.category}</span>
                      {item.overspent && <Badge variant="danger">Over budget</Badge>}
                    </div>
                    <span className="text-sm text-text-muted numeric">
                      {formatCurrency(item.spent, currency)} / {formatCurrency(item.limit, currency)}
                    </span>
                  </div>
                  <ProgressBar
                    value={item.spent}
                    max={item.limit}
                    showLabel
                    color={item.overspent ? '#EF4444' : item.percentage >= 80 ? '#F59E0B' : '#6D5BFF'}
                  />
                </Card>
              </FadeIn>
            ))}
          </div>
        )}
      </PageTransition>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Set Monthly Budget">
        <div className="space-y-4">
          {Object.keys(editCategories).map((cat) => (
            <div key={cat} className="flex items-center gap-4">
              <span className="w-32 text-sm font-medium">{cat}</span>
              <input
                type="number"
                value={editCategories[cat]}
                onChange={(e) =>
                  setEditCategories({ ...editCategories, [cat]: parseFloat(e.target.value) || 0 })
                }
                className="flex-1 px-4 py-2 rounded-xl glass text-sm numeric focus:outline-none focus:ring-2 focus:ring-primary/40"
                min="0"
              />
            </div>
          ))}
          <Button onClick={handleSave} className="w-full">Save Budget</Button>
        </div>
      </Modal>
    </AppLayout>
  );
}
