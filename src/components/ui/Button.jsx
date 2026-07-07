import { cn } from '@/utils/formatters';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  loading,
  disabled,
  ...props
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#D4AF37] to-[#AA8222] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-semibold shadow-[0_4px_15px_rgba(212,175,55,0.2)]',
    secondary: 'bg-black text-white border border-[#333] hover:border-primary/50 hover:bg-[#111]',
    ghost: 'hover:text-primary text-text-muted transition-colors',
    danger: 'text-danger border border-danger/30 hover:bg-danger/10',
    accent: 'text-white border border-white/20 hover:border-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-2.5 text-sm rounded-lg',
    lg: 'px-8 py-3.5 text-base rounded-xl',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
