import { motion } from 'framer-motion';
import { cn } from '@/utils/formatters';

export function Card({ children, className, hover = false, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ type: 'tween', duration: 0.3 }}
      className={cn('glass p-6', hover && 'glass-hover cursor-default', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, className }) {
  return (
    <Card className={cn('relative overflow-hidden', className)} hover>
      {/* Subtle gold gradient edge */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-text-muted font-medium uppercase tracking-wider">{title}</span>
          {Icon && (
            <div className="p-2 rounded-lg bg-black border border-white/5">
              <Icon className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>
        <p className="text-3xl font-luxury numeric text-white mb-1">{value}</p>
        {(subtitle || trend) && (
          <div className="flex items-center gap-2 mt-2">
            {trend && (
              <span className={cn('text-xs font-semibold px-2 py-1 rounded bg-black border', trend > 0 ? 'text-primary border-primary/30' : 'text-danger border-danger/30')}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
            {subtitle && <span className="text-xs text-text-muted">{subtitle}</span>}
          </div>
        )}
      </div>
    </Card>
  );
}
