import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Target,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  CreditCard
} from 'lucide-react';
import { useAuthStore } from '@/app/store/authStore';
import { useUIStore } from '@/app/store/themeStore';
import { authService } from '@/services/auth.service';
import { NAV_ITEMS } from '@/utils/constants';
import { cn } from '@/utils/formatters';
import toast from 'react-hot-toast';
import { useMediaQuery } from '@/hooks/useTheme';

const ICON_MAP = {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Target,
  BarChart3,
  Settings,
};

export function Sidebar() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleLogout = async () => {
    await authService.signOut();
    toast.success('Signed out successfully');
    navigate('/login');
  };

  return (
    <>
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen || isDesktop ? 0 : -280 }}
        className={cn(
          'fixed left-0 top-0 h-full w-[280px] z-50 flex flex-col',
          'bg-[#0A0A0A] border-r border-[#222]',
          'lg:translate-x-0 lg:static lg:z-auto'
        )}
      >
        <div className="p-8 flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-3 mb-2 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="p-2 rounded bg-black border border-[#333]">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-luxury text-2xl text-white tracking-wide">ExpenseFlow</h1>
          </Link>
          <p className="text-xs text-text-muted uppercase tracking-[0.2em]">Private Wealth</p>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-8 right-6 lg:hidden p-1.5 text-text-muted hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-8">
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-4 px-4 py-3 rounded-lg text-sm transition-all duration-300',
                    isActive
                      ? 'bg-[#111] text-primary font-medium shadow-[inset_2px_0_0_#D4AF37]'
                      : 'text-text-muted hover:text-white hover:bg-[#111]'
                  )
                }
              >
                <Icon className={cn("w-4 h-4", item.isActive ? "text-primary" : "")} />
                <span className="tracking-wide">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#222]">
          <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-lg bg-black border border-[#333]">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-[#AA8222] flex items-center justify-center text-sm font-luxury text-black">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{user?.name}</p>
              <p className="text-xs text-text-muted truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-text-muted hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="tracking-wide">Sign Out</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}

export function Navbar({ title, subtitle, actions }) {
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  return (
    <header className="sticky top-0 z-30 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#222] px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded hover:bg-[#111] border border-[#333]"
          >
            <Menu className="w-5 h-5 text-text-muted" />
          </button>
          <div>
            <h1 className="text-2xl font-luxury text-white tracking-wide">{title}</h1>
            {subtitle && <p className="text-sm text-text-muted mt-1 tracking-wider uppercase">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-4">{actions}</div>}
      </div>
    </header>
  );
}

export function AppLayout({ children }) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  return (
    <div className="flex min-h-screen bg-bg relative selection:bg-primary/30 selection:text-white">
      <Sidebar />
      <main className={cn('flex-1 flex flex-col min-w-0 transition-all relative z-10', sidebarOpen ? 'lg:ml-0' : '')}>
        {children}
      </main>
    </div>
  );
}

export function MarketingNavbar() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-2xl border-b border-[#222] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <motion.div
          whileHover={{ opacity: 0.8 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="p-2 rounded bg-black border border-[#333]">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <span className="font-luxury text-2xl tracking-wide text-white">ExpenseFlow</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10 text-xs font-medium text-text-muted uppercase tracking-[0.15em]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">Philosophy</a>
          <a href="#pricing" className="hover:text-white transition-colors">Membership</a>
        </div>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <button
              onClick={() => navigate('/app/dashboard')}
              className="hidden md:block px-6 py-2.5 rounded text-black bg-gradient-to-r from-[#D4AF37] to-[#AA8222] text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity"
            >
              Access Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="hidden md:block text-xs font-medium text-text-muted hover:text-white transition-colors uppercase tracking-[0.1em]"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="hidden md:block px-6 py-2.5 rounded text-black bg-gradient-to-r from-[#D4AF37] to-[#AA8222] text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity"
              >
                Apply Now
              </button>
            </>
          )}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0A] border-t border-[#222]"
          >
            <div className="p-8 flex flex-col gap-6 text-center">
              <a href="#features" className="text-text-muted hover:text-white text-xs uppercase tracking-[0.15em]" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="text-text-muted hover:text-white text-xs uppercase tracking-[0.15em]" onClick={() => setMobileMenuOpen(false)}>Philosophy</a>
              <a href="#pricing" className="text-text-muted hover:text-white text-xs uppercase tracking-[0.15em]" onClick={() => setMobileMenuOpen(false)}>Membership</a>
              <div className="h-px bg-[#222] my-4" />
              {isAuthenticated ? (
                <button onClick={() => navigate('/app/dashboard')} className="w-full py-4 rounded bg-gradient-to-r from-[#D4AF37] to-[#AA8222] text-black font-semibold tracking-wide">Access Dashboard</button>
              ) : (
                <div className="flex flex-col gap-4">
                  <button onClick={() => navigate('/login')} className="w-full py-4 rounded border border-[#333] text-white font-semibold">Sign In</button>
                  <button onClick={() => navigate('/signup')} className="w-full py-4 rounded bg-gradient-to-r from-[#D4AF37] to-[#AA8222] text-black font-semibold tracking-wide">Apply Now</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
