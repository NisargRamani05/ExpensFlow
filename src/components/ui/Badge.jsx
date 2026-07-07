import { cn } from '@/utils/formatters';

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-accent/10 text-accent border-accent/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    muted: 'bg-white/5 text-text-muted border-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function ProgressBar({ value, max = 100, color, showLabel, className }) {
  const pct = Math.min((value / max) * 100, 100);
  const barColor = color || (pct >= 100 ? '#EF4444' : pct >= 80 ? '#F59E0B' : '#6D5BFF');

  return (
    <div className={cn('space-y-1', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-text-muted">
          <span>{Math.round(pct)}%</span>
          <span>{value.toLocaleString()} / {max.toLocaleString()}</span>
        </div>
      )}
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}

export function Avatar({ name, src, size = 'md' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';

  if (src) {
    return <img src={src} alt={name} className={cn('rounded-full object-cover', sizes[size])} />;
  }

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-semibold text-white',
        sizes[size]
      )}
    >
      {initials}
    </div>
  );
}

export function Skeleton({ className }) {
  return (
    <div className={cn('animate-pulse rounded-xl bg-white/5', className)} />
  );
}
