import { useState } from 'react';
import { Moon, Sun, Bell, User, Globe, Shield } from 'lucide-react';
import { AppLayout, Navbar } from '@/components/layout/Layout';
import { PageTransition, FadeIn } from '@/components/animations/PageTransition';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Badge';
import { useAuthStore } from '@/app/store/authStore';
import { useThemeStore } from '@/app/store/themeStore';
import { CURRENCIES } from '@/utils/constants';
import { isFirebaseConfigured } from '@/services/firebase';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, updateProfile } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currency: user?.currency || 'INR',
  });
  const [notifications, setNotifications] = useState(
    user?.notifications || { email: true, push: true, budgetAlerts: true }
  );

  const handleSaveProfile = () => {
    updateProfile({ ...profile, notifications });
    toast.success('Settings saved!');
  };

  const currencyOptions = CURRENCIES.map((c) => ({
    value: c.code,
    label: `${c.symbol} ${c.name} (${c.code})`,
  }));

  return (
    <AppLayout>
      <Navbar title="Settings" subtitle="Manage your account and preferences" />

      <PageTransition className="p-6 max-w-3xl mx-auto w-full space-y-6">
        {!isFirebaseConfigured() && (
          <FadeIn>
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm font-medium text-primary">Local Mode Active</p>
              <p className="text-xs text-text-muted mt-1">
                Data is stored locally. Firebase database setup is the final step — add your credentials to connect.
              </p>
            </div>
          </FadeIn>
        )}

        <FadeIn>
          <Card>
            <div className="flex items-center gap-4 mb-6">
              <Avatar name={user?.name} size="lg" />
              <div>
                <h2 className="text-lg font-semibold">{user?.name}</h2>
                <p className="text-sm text-text-muted">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label="Display Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled
              />
              <Select
                label="Currency"
                value={profile.currency}
                onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
                options={currencyOptions}
              />
              <Button onClick={handleSaveProfile}>Save Profile</Button>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Sun className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Appearance</h2>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl glass">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <div>
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-xs text-text-muted capitalize">{theme} mode</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="relative w-12 h-6 rounded-full bg-primary/30 transition-colors"
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary transition-transform ${
                    theme === 'dark' ? 'left-0.5' : 'left-6'
                  }`}
                />
              </button>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
            <div className="space-y-3">
              {[
                { key: 'email', label: 'Email notifications', desc: 'Receive updates via email' },
                { key: 'push', label: 'Push notifications', desc: 'Browser push alerts' },
                { key: 'budgetAlerts', label: 'Budget alerts', desc: 'Alert when overspending' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl glass">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications({ ...notifications, [item.key]: !notifications[item.key] })
                    }
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications[item.key] ? 'bg-primary/30' : 'bg-white/10'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full transition-transform ${
                        notifications[item.key] ? 'left-6 bg-primary' : 'left-0.5 bg-text-muted'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </PageTransition>
    </AppLayout>
  );
}
