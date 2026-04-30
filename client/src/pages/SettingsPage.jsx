import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Lock } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import api from '@/api/axios';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Required'),
    newPassword: z.string().min(6, 'At least 6 characters'),
    confirmPassword: z.string().min(6, 'Required'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const SectionCard = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl border border-white/5 bg-surface-dark-secondary p-6"
  >
    <div className="mb-5 flex items-center gap-2">
      <Icon size={16} className="text-brand-400" />
      <h2 className="text-sm font-medium text-white">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const SettingsPage = () => {
  const { user, login } = useAuth();
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? '', email: user?.email ?? '' },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = async (formData) => {
    setProfileLoading(true);
    try {
      const { data } = await api.put('/auth/profile', formData);
      // Update context with new user data
      login(localStorage.getItem('token'), data.user);
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const onPasswordSubmit = async (formData) => {
    setPasswordLoading(true);
    try {
      await api.put('/auth/password', formData);
      toast.success('Password changed!');
      passwordForm.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  // User initials for avatar
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'FP';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Manage your account preferences"
      />

      {/* Avatar display */}
      <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-surface-dark-secondary p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/20 text-xl font-semibold text-brand-400">
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{user?.name}</p>
          <p className="text-xs text-white/40">{user?.email}</p>
          <p className="mt-0.5 text-xs text-white/25 capitalize">{user?.role}</p>
        </div>
      </div>

      {/* Profile form */}
      <SectionCard icon={User} title="Profile Information">
        <form
          onSubmit={profileForm.handleSubmit(onProfileSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-white/60">Full name</Label>
              <Input
                {...profileForm.register('name')}
                className="border-white/10 bg-white/5 text-white"
              />
              {profileForm.formState.errors.name && (
                <p className="text-xs text-red-400">
                  {profileForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/60">Email</Label>
              <Input
                {...profileForm.register('email')}
                type="email"
                className="border-white/10 bg-white/5 text-white"
              />
              {profileForm.formState.errors.email && (
                <p className="text-xs text-red-400">
                  {profileForm.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            disabled={profileLoading}
            className="bg-brand-500 text-white hover:bg-brand-600"
          >
            {profileLoading ? 'Saving...' : 'Save changes'}
          </Button>
        </form>
      </SectionCard>

      {/* Password form */}
      <SectionCard icon={Lock} title="Change Password">
        <form
          onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <Label className="text-white/60">Current password</Label>
            <Input
              {...passwordForm.register('currentPassword')}
              type="password"
              placeholder="••••••••"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-white/60">New password</Label>
              <Input
                {...passwordForm.register('newPassword')}
                type="password"
                placeholder="••••••••"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
              />
              {passwordForm.formState.errors.newPassword && (
                <p className="text-xs text-red-400">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/60">Confirm password</Label>
              <Input
                {...passwordForm.register('confirmPassword')}
                type="password"
                placeholder="••••••••"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-xs text-red-400">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            disabled={passwordLoading}
            className="bg-brand-500 text-white hover:bg-brand-600"
          >
            {passwordLoading ? 'Changing...' : 'Change password'}
          </Button>
        </form>
      </SectionCard>
    </div>
  );
};

export default SettingsPage;