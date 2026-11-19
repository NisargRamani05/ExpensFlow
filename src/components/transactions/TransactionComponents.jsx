import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatShortDate, cn } from '@/utils/formatters';
import { CATEGORY_COLORS } from '@/utils/constants';
import { useAuthStore } from '@/app/store/authStore';

export function TransactionItem({ transaction, onEdit, onDelete }) {
  const currency = useAuthStore((s) => s.user?.currency) || 'INR';
  const isIncome = transaction.type === 'income';

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-colors group">
      <div
        className={cn(
          'p-2.5 rounded-xl',
          isIncome ? 'bg-accent/10' : 'bg-danger/10'
        )}
      >
        {isIncome ? (
          <ArrowDownLeft className="w-4 h-4 text-accent" />
        ) : (
          <ArrowUpRight className="w-4 h-4 text-danger" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">{transaction.note || transaction.category}</p>
          <Badge variant="muted" className="shrink-0">
            {transaction.category}
          </Badge>
        </div>
        <p className="text-xs text-text-muted mt-0.5">{formatShortDate(transaction.date)}</p>
      </div>
      <div className="text-right shrink-0">
        <p className={cn('font-semibold numeric', isIncome ? 'text-accent' : 'text-text')}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount, currency)}
        </p>
      </div>
      {(onEdit || onDelete) && (
        <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
          {onEdit && (
            <button onClick={() => onEdit(transaction)} className="p-1.5 rounded-lg hover:bg-white/5 text-text-muted text-xs">
              Edit
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(transaction.id)} className="p-1.5 rounded-lg hover:bg-danger/10 text-danger text-xs">
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function TransactionForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial || {
      type: 'expense',
      amount: '',
      category: 'Food',
      note: '',
      date: new Date().toISOString().split('T')[0],
    }
  );

  const categories =
    form.type === 'income'
      ? ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income']
      : ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Education', 'Travel', 'Savings Goal', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || parseFloat(form.amount) <= 0) return;
    onSubmit({ ...form, amount: parseFloat(form.amount) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2 p-1 glass rounded-xl">
        {['expense', 'income'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setForm({ ...form, type, category: type === 'income' ? 'Salary' : 'Food' })}
            className={cn(
              'flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all',
              form.type === type
                ? type === 'income'
                  ? 'bg-accent/20 text-accent'
                  : 'bg-danger/20 text-danger'
                : 'text-text-muted hover:text-text'
            )}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-text-muted mb-1.5">Amount</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="0.00"
            className="w-full px-4 py-2.5 rounded-xl glass text-text text-lg font-semibold numeric focus:outline-none focus:ring-2 focus:ring-primary/40"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1.5">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl glass text-text focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1.5">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl glass text-text focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-text-muted mb-1.5">Note</label>
          <input
            type="text"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Add a note..."
            className="w-full px-4 py-2.5 rounded-xl glass text-text focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-xl glass text-text-muted hover:text-text transition-colors">
            Cancel
          </button>
        )}
        <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-light transition-colors">
          {initial ? 'Update' : 'Add'} Transaction
        </button>
      </div>
    </form>
  );
}

export function TransactionList({ transactions, onEdit, onDelete, emptyMessage = 'No transactions found' }) {
  if (!transactions.length) {
    return (
      <div className="text-center py-12 text-text-muted text-sm">{emptyMessage}</div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export function CategoryDot({ category }) {
  return (
    <span
      className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
      style={{ backgroundColor: CATEGORY_COLORS[category] || '#6B7280' }}
    />
  );
}
