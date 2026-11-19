import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, CreditCard } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/app/store/authStore';
import { FadeIn } from '@/components/animations/PageTransition';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useAuthStore((s) => s.isLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const from = location.state?.from?.pathname || '/app/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please complete all fields');
      return;
    }
    try {
      await authService.signInWithEmail(form.email, form.password);
      toast.success('Access Granted');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Authentication failed');
    }
  };

  const handleGoogle = async () => {
    try {
      await authService.signInWithGoogle();
      toast.success('Access Granted');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Google authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex selection:bg-primary/30 selection:text-white relative">
      {/* Logo — top left, links to landing */}
      <Link
        to="/"
        className="absolute top-6 left-8 z-50 flex items-center gap-2.5 group"
        title="ExpenseFlow — Back to Landing Page"
      >
        <div className="p-1.5 rounded bg-black border border-[#333] group-hover:border-primary/50 transition-colors">
          <CreditCard className="w-4 h-4 text-primary" />
        </div>
        <span className="font-luxury text-lg text-white/80 group-hover:text-primary tracking-wide transition-colors">
          ExpenseFlow
        </span>
      </Link>

      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center gradient-bg border-r border-[#222]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        </div>
        <FadeIn className="relative text-center px-16 max-w-2xl">
          <div className="p-3 rounded bg-black border border-[#333] inline-flex mb-8">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-luxury mb-6 text-white tracking-wide">Welcome to ExpenseFlow</h2>
          <p className="text-text-muted text-lg font-light leading-relaxed">
            The private wealth management interface. Secure, elegant, and uncompromising.
          </p>
        </FadeIn>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="p-2 rounded bg-black border border-[#333]">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <span className="font-luxury text-2xl text-white tracking-wide">ExpenseFlow</span>
          </div>

          <h1 className="text-3xl font-luxury mb-3 text-white tracking-wide">Sign In</h1>
          <p className="text-text-muted text-sm mb-10 font-light">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-white transition-colors uppercase tracking-wider text-xs font-medium ml-2">Apply Now</Link>
          </p>

          <button
            onClick={handleGoogle}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded border border-[#333] hover:border-primary/50 bg-black text-white transition-colors mb-8 text-sm font-medium tracking-wide"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-[#222]" />
            <span className="text-xs text-text-muted uppercase tracking-widest">Or</span>
            <div className="flex-1 h-px bg-[#222]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 rounded bg-[#111] border border-[#222] text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-12 pr-12 py-3.5 rounded bg-[#111] border border-[#222] text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded bg-gradient-to-r from-[#D4AF37] to-[#AA8222] text-black font-semibold tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading && <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
