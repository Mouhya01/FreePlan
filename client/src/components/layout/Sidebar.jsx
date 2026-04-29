import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  FileText,
  Settings,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/clients', icon: Users, label: 'Clients' },
  { to: '/invoices', icon: FileText, label: 'Invoices' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-white/5 bg-surface-dark-secondary transition-all duration-300',
        isOpen ? 'w-60' : 'w-16'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-4 border-b border-white/5">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-500">
          {/* Stylized P logo */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 3h6a4 4 0 0 1 0 8H4V3z"
              fill="white"
              fillOpacity="0.95"
            />
            <path d="M4 11v4" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
        {isOpen && (
          <span className="text-lg font-semibold tracking-tight text-white">
            Free<span className="text-brand-400">Plan</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-500/15 text-brand-400'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80'
              )
            }
          >
            <Icon size={18} strokeWidth={1.8} className="flex-shrink-0" />
            {isOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom badge */}
      {isOpen && (
        <div className="m-3 rounded-lg bg-brand-500/10 p-3">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-brand-400" />
            <span className="text-xs font-medium text-brand-400">FreePlan MVP</span>
          </div>
          <p className="mt-1 text-xs text-white/30">Portfolio project</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;