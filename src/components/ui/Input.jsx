import { cn } from '@/utils/formatters';

export function Input({ label, error, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-text-muted">{label}</label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2.5 rounded-xl bg-bg-card/80 backdrop-blur-md border border-border text-text placeholder:text-text-muted/50',
          'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40',
          'transition-all duration-200',
          error && 'border-danger/50 focus:ring-danger/40',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

export function Select({ label, error, options, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-text-muted">{label}</label>
      )}
      <select
        className={cn(
          'w-full px-4 py-2.5 rounded-xl bg-bg-card/80 backdrop-blur-md border border-border text-text',
          'focus:outline-none focus:ring-2 focus:ring-primary/40',
          'transition-all duration-200 appearance-none cursor-pointer',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-bg-secondary">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-text-muted">{label}</label>
      )}
      <textarea
        className={cn(
          'w-full px-4 py-2.5 rounded-xl bg-bg-card/80 backdrop-blur-md border border-border text-text placeholder:text-text-muted/50',
          'focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none',
          'transition-all duration-200 min-h-[80px]',
          error && 'border-danger/50',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
