import { motion } from 'framer-motion';
import {
  FolderKanban,
  CheckSquare,
  Users,
  TrendingUp,
} from 'lucide-react';
import useStats from '@/hooks/useStats';
import StatCard from '@/components/dashboard/StatCard';
import StatsChart from '@/components/dashboard/StatsChart';
import RecentProjects from '@/components/dashboard/RecentProjects';
import useAuth from '@/hooks/useAuth';

const DashboardPage = () => {
  const { data: stats, isLoading } = useStats();
  const { user } = useAuth();

  const cards = [
    {
      label: 'Active Projects',
      value: stats?.projects?.active ?? 0,
      icon: FolderKanban,
      color: '#6c63ff',
    },
    {
      label: 'Total Tasks',
      value: stats?.tasks?.total ?? 0,
      icon: CheckSquare,
      color: '#10b981',
    },
    {
      label: 'Clients',
      value: stats?.clients?.total ?? 0,
      icon: Users,
      color: '#f59e0b',
    },
    {
      label: 'Completion Rate',
      value: stats?.tasks?.completionRate ?? 0,
      icon: TrendingUp,
      color: '#34d399',
      suffix: '%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-semibold text-white">
          Good day, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Here's what's happening with your projects.
        </p>
      </motion.div>

      {/* KPI Cards */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-surface-dark-secondary"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <StatCard {...card} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Chart + Recent Projects */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StatsChart completionRate={stats?.tasks?.completionRate ?? 0} />
        <RecentProjects />
      </div>
    </div>
  );
};

export default DashboardPage;