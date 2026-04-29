import { Menu, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Generate initials from user name
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'FP';

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/5 bg-surface-dark-secondary px-4">
      {/* Left — menu toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="text-white/50 hover:text-white"
      >
        <Menu size={20} />
      </Button>

      {/* Right — actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-white/50 hover:text-white"
        >
          <Bell size={18} />
        </Button>

        {/* User avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 text-xs font-semibold text-brand-400">
          {initials}
        </div>

        <span className="text-sm text-white/60 hidden sm:block">
          {user?.name}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-white/50 hover:text-red-400"
        >
          <LogOut size={18} />
        </Button>
      </div>
    </header>
  );
};

export default Topbar;