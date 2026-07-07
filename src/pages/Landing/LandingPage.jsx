import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Target,
  Zap,
  Check,
  TrendingUp,
  Wallet,
  PieChart,
  BarChart3,
  CreditCard,
  Lock
} from 'lucide-react';
import { MarketingNavbar } from '@/components/layout/Layout';
import { IncomeExpenseChart } from '@/components/charts/Charts';

const DEMO_CHART = [
  { month: 'Feb', income: 85000, expense: 42000 },
  { month: 'Mar', income: 92000, expense: 38000 },
  { month: 'Apr', income: 85000, expense: 51000 },
  { month: 'May', income: 100000, expense: 45000 },
  { month: 'Jun', income: 85000, expense: 48000 },
  { month: 'Jul', income: 100000, expense: 35000 },
];

const FEATURES = [
  {
    icon: Wallet,
    title: 'Precision Budgeting',
    desc: 'Intelligent allocation of your resources. Set strict limits and monitor capital deployment.',
  },
  {
    icon: TrendingUp,
    title: 'Wealth Trajectory',
    desc: 'Visualize your net worth growth with institutional-grade charting and forecasting tools.',
  },
  {
    icon: Shield,
    title: 'Uncompromised Security',
    desc: 'Your data is secured behind 256-bit AES encryption. Absolute privacy, absolute control.',
  },
  {
    icon: PieChart,
    title: 'Portfolio Analysis',
    desc: 'Deep-dive into your spending patterns. Understand exactly where your capital flows.',
  },
  {
    icon: Target,
    title: 'Capital Goals',
    desc: 'Define financial milestones. We track your progress toward significant acquisitions.',
  },
  {
    icon: Zap,
    title: 'Real-Time Sync',
    desc: 'Your financial dashboard, synchronized instantaneously across all your personal devices.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg text-text font-sans overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <MarketingNavbar />

      <main className="relative z-10">
        
        {/* ===== HERO ===== */}
        <section className="relative pt-48 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
          {/* Subtle gold center glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#333] bg-black text-text-muted text-xs uppercase tracking-[0.2em] mb-12"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Exclusive Wealth Management</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl font-luxury text-white mb-8 leading-[1.1] tracking-wide"
            >
              Elevate your <span className="gradient-text italic">financial</span> standard.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-16 leading-relaxed font-light"
            >
              A private, secure, and impeccably designed interface for those who demand total control over their personal wealth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button
                onClick={() => navigate('/signup')}
                className="px-10 py-4 rounded text-black bg-gradient-to-r from-[#D4AF37] to-[#AA8222] font-semibold tracking-wide hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Apply for Membership
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-10 py-4 rounded text-white border border-[#333] hover:border-primary/50 transition-colors w-full sm:w-auto uppercase tracking-wider text-sm"
              >
                Sign In
              </button>
            </motion.div>
          </div>
        </section>

        {/* ===== DASHBOARD PREVIEW ===== */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-40 relative z-10">
          <motion.div {...fadeUp} className="glass p-8 md:p-12 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
              <div>
                <h2 className="text-2xl font-luxury text-white tracking-wide">Portfolio Performance</h2>
                <p className="text-xs text-text-muted uppercase tracking-[0.15em] mt-2">6-Month Analysis</p>
              </div>
              <div className="flex gap-6 text-xs uppercase tracking-widest text-text-muted">
                <span className="flex items-center gap-2"><span className="w-2 h-2 bg-primary" /> Income</span>
                <span className="flex items-center gap-2"><span className="w-2 h-2 bg-danger" /> Expenses</span>
              </div>
            </div>
            <div className="h-[400px]">
                <IncomeExpenseChart data={DEMO_CHART} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { label: 'Monthly Surplus', value: '₹55,000', change: '+18.5%', icon: TrendingUp },
              { label: 'Total Assets', value: '₹1,43,000', change: 'Live', icon: Wallet },
              { label: 'Active Allocations', value: '4', change: 'Optimized', icon: BarChart3 },
            ].map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="glass p-8 glass-hover"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs text-text-muted tracking-[0.15em] uppercase">{stat.label}</span>
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-4xl font-luxury numeric mb-2 text-white">{stat.value}</p>
                <span className="text-xs text-primary tracking-wider">{stat.change}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section id="features" className="px-6 md:px-12 max-w-7xl mx-auto mb-40 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-luxury tracking-wide mb-6 text-white">
              The Standard of Excellence
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Designed for uncompromising individuals. Every tool required to manage significant capital.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
                className="glass p-10 hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="mb-8">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-luxury tracking-wide mb-4 text-white">{feature.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== PRICING ===== */}
        <section id="pricing" className="px-6 md:px-12 max-w-7xl mx-auto mb-40 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-luxury tracking-wide mb-6 text-white">Membership Tiers</h2>
            <p className="text-text-muted text-lg font-light">Select the level of access you require.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Standard Plan */}
            <motion.div {...fadeUp} className="glass p-12 flex flex-col">
              <h3 className="text-2xl font-luxury mb-4 text-white">Standard Edition</h3>
              <p className="text-text-muted text-sm mb-12 font-light leading-relaxed">Essential portfolio tracking for individual investors.</p>
              <div className="flex items-baseline gap-2 mb-12">
                <span className="text-5xl font-luxury text-white">₹0</span>
                <span className="text-text-muted text-xs uppercase tracking-[0.1em]">/ lifetime</span>
              </div>
              <ul className="space-y-6 mb-12 flex-1">
                {['Up to 100 entries per cycle', 'Core analytics dashboard', '3 capital allocation buckets', 'Mobile web access'].map(f => (
                  <li key={f} className="flex items-center gap-4 text-sm text-text-muted font-light">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/signup')}
                className="w-full py-4 rounded border border-[#333] hover:border-primary/50 text-white font-medium uppercase tracking-wider text-sm transition-colors"
              >
                Begin Standard
              </button>
            </motion.div>

            {/* Black Card Plan */}
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="glass p-12 flex flex-col relative overflow-hidden border-primary/40 shadow-[0_20px_50px_rgba(212,175,55,0.05)]"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-[#AA8222]" />
              
              <h3 className="text-2xl font-luxury mb-4 text-primary">Black Card Edition</h3>
              <p className="text-text-muted text-sm mb-12 font-light leading-relaxed">Unrestricted access for high-net-worth individuals requiring total oversight.</p>
              <div className="flex items-baseline gap-2 mb-12">
                <span className="text-5xl font-luxury text-white">₹499</span>
                <span className="text-text-muted text-xs uppercase tracking-[0.1em]">/ month</span>
              </div>
              <ul className="space-y-6 mb-12 flex-1">
                {['Unlimited capital entries', 'Advanced predictive AI', 'Unlimited portfolio allocations', 'Private client support', 'Export secure reports'].map(f => (
                  <li key={f} className="flex items-center gap-4 text-sm text-text-muted font-light">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-white">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/signup')}
                className="w-full py-4 rounded bg-gradient-to-r from-[#D4AF37] to-[#AA8222] text-black font-semibold uppercase tracking-wider text-sm shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:opacity-90 transition-opacity"
              >
                Apply for Black Card
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#222] pt-20 pb-12 px-6 md:px-12 bg-black relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded bg-[#111] border border-[#333]">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <span className="font-luxury text-2xl text-white tracking-wide">ExpenseFlow</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed font-light">The standard of excellence in personal wealth management. Designed in absolute precision.</p>
          </div>
          {[
            { title: 'The Product', links: ['Features', 'Black Card', 'Security', 'Releases'] },
            { title: 'Information', links: ['Knowledge Base', 'Editorial', 'Partners', 'Developer API'] },
            { title: 'Corporate', links: ['The Firm', 'Careers', 'Privacy', 'Legal'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-luxury mb-6 text-white tracking-wide">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors font-light">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-[#222] flex flex-col md:flex-row items-center justify-between gap-6 text-xs uppercase tracking-[0.1em] text-text-muted">
          <p>© 2026 ExpenseFlow Inc. All rights reserved.</p>
          <div className="flex items-center gap-3 bg-[#111] px-4 py-2 rounded border border-[#222]">
            <Lock className="w-4 h-4 text-primary" />
            <span>256-Bit Encrypted Facility</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
