import { useEffect, useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { AppLayout, Navbar } from '@/components/layout/Layout';
import { PageTransition } from '@/components/animations/PageTransition';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Input';
import { TransactionForm, TransactionList } from '@/components/transactions/TransactionComponents';
import { useTransactionStore } from '@/app/store/transactionStore';
import { CATEGORIES } from '@/utils/constants';
import { getMonthKey, getMonthLabel } from '@/utils/formatters';
import toast from 'react-hot-toast';

export default function TransactionsPage() {
  const { fetchTransactions, getFiltered, addTransaction, updateTransaction, deleteTransaction, isLoading } =
    useTransactionStore();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({ type: 'all', category: 'all', search: '', monthKey: getMonthKey() });

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const transactions = getFiltered(filters);

  const handleSubmit = (data) => {
    if (editing) {
      updateTransaction(editing.id, data);
      toast.success('Transaction updated!');
    } else {
      addTransaction(data);
      toast.success('Transaction added!');
    }
    setShowModal(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    deleteTransaction(id);
    toast.success('Transaction deleted');
  };

  const handleEdit = (transaction) => {
    setEditing(transaction);
    setShowModal(true);
  };

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...CATEGORIES.expense.map((c) => ({ value: c, label: c })),
    ...CATEGORIES.income.map((c) => ({ value: c, label: c })),
  ];

  return (
    <AppLayout>
      <Navbar
        title="Transactions"
        subtitle={`${transactions.length} transactions · ${getMonthLabel(filters.monthKey)}`}
        actions={
          <Button onClick={() => { setEditing(null); setShowModal(true); }} size="sm">
            <Plus className="w-4 h-4" /> Add Transaction
          </Button>
        }
      />

      <PageTransition className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <Card className="!p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="px-4 py-2.5 rounded-xl glass text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="px-4 py-2.5 rounded-xl glass text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {categoryOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <input
                type="month"
                value={filters.monthKey}
                onChange={(e) => setFilters({ ...filters, monthKey: e.target.value })}
                className="px-4 py-2.5 rounded-xl glass text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>
        </Card>

        <Card>
          {isLoading ? (
            <div className="py-12 text-center text-text-muted">Loading transactions...</div>
          ) : (
            <TransactionList
              transactions={transactions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </Card>
      </PageTransition>

      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditing(null); }}
        title={editing ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => { setShowModal(false); setEditing(null); }}
        />
      </Modal>
    </AppLayout>
  );
}
