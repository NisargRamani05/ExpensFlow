import { useEffect, useState } from 'react';
import { Plus, Target, Calendar, Trash2 } from 'lucide-react';
import { AppLayout, Navbar } from '@/components/layout/Layout';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar, Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useGoalStore } from '@/app/store/goalStore';
import { useAuthStore } from '@/app/store/authStore';
import { formatCurrency, calculatePercentage, getDaysRemaining } from '@/utils/formatters';
import toast from 'react-hot-toast';

export default function GoalsPage() {
  const currency = useAuthStore((s) => s.user?.currency) || 'INR';
  const { goals, fetchGoals, addGoal, updateGoal, deleteGoal, addToGoal, getTotalSaved, getTotalTarget } =
    useGoalStore();
  const [showModal, setShowModal] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(null);
  const [fundAmount, setFundAmount] = useState('');
  const [form, setForm] = useState({ title: '', targetAmount: '', deadline: '' });

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || !form.targetAmount) return;
    addGoal({
      title: form.title,
      targetAmount: parseFloat(form.targetAmount),
      deadline: form.deadline || new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
    });
    setForm({ title: '', targetAmount: '', deadline: '' });
    setShowModal(false);
    toast.success('Goal created!');
  };

  const handleAddFunds = () => {
    if (!fundAmount || parseFloat(fundAmount) <= 0) return;
    addToGoal(showAddFunds, parseFloat(fundAmount));
    setFundAmount('');
    setShowAddFunds(null);
    toast.success('Funds added & transaction logged!');
  };

  return (
    <AppLayout>
      <Navbar
        title="Savings Goals"
        subtitle={`${goals.length} active goals`}
        actions={
          <Button onClick={() => setShowModal(true)} size="sm">
            <Plus className="w-4 h-4" /> New Goal
          </Button>
        }
      />

      <PageTransition className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <p className="text-sm text-text-muted mb-1">Total Saved</p>
            <p className="text-2xl font-bold numeric text-accent">{formatCurrency(getTotalSaved(), currency)}</p>
          </Card>
          <Card>
            <p className="text-sm text-text-muted mb-1">Total Target</p>
            <p className="text-2xl font-bold numeric">{formatCurrency(getTotalTarget(), currency)}</p>
          </Card>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => {
            const pct = calculatePercentage(goal.savedAmount, goal.targetAmount);
            const daysLeft = getDaysRemaining(goal.deadline);
            const completed = pct >= 100;

            return (
              <StaggerItem key={goal.id}>
                <Card hover className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-primary/10">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{goal.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-text-muted mt-0.5">
                          <Calendar className="w-3 h-3" />
                          {daysLeft} days left
                        </div>
                      </div>
                    </div>
                    {completed && <Badge variant="success">Completed</Badge>}
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="numeric font-semibold text-accent">
                        {formatCurrency(goal.savedAmount, currency)}
                      </span>
                      <span className="numeric text-text-muted">
                        {formatCurrency(goal.targetAmount, currency)}
                      </span>
                    </div>
                    <ProgressBar value={goal.savedAmount} max={goal.targetAmount} color="#6D5BFF" />
                    <p className="text-xs text-text-muted mt-1">{pct}% complete</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      onClick={() => setShowAddFunds(goal.id)}
                      disabled={completed}
                    >
                      Add Funds
                    </Button>
                    <button
                      onClick={() => { deleteGoal(goal.id); toast.success('Goal deleted'); }}
                      className="p-2 rounded-xl hover:bg-danger/10 text-danger transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </PageTransition>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Savings Goal">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Goal Title"
            placeholder="e.g. MacBook Pro"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <Input
            label="Target Amount"
            type="number"
            placeholder="150000"
            value={form.targetAmount}
            onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
            required
            min="1"
          />
          <Input
            label="Deadline"
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
          <Button type="submit" className="w-full">Create Goal</Button>
        </form>
      </Modal>

      <Modal isOpen={!!showAddFunds} onClose={() => setShowAddFunds(null)} title="Add Funds">
        <div className="space-y-4">
          <Input
            label="Amount"
            type="number"
            placeholder="5000"
            value={fundAmount}
            onChange={(e) => setFundAmount(e.target.value)}
            min="1"
          />
          <Button onClick={handleAddFunds} className="w-full">Add to Goal</Button>
        </div>
      </Modal>
    </AppLayout>
  );
}
