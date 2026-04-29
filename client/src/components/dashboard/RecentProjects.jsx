import { motion } from 'framer-motion';
import { useProjects } from '@/hooks/useProjects';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
  planning: { label: 'Planning', color: '#8b88f8', bg: '#8b88f820' },
  'in-progress': { label: 'In Progress', color: '#10b981', bg: '#10b98120' },
  completed: { label: 'Completed', color: '#34d399', bg: '#34d39920' },
  'on-hold': { label: 'On Hold', color: '#f59e0b', bg: '#f59e0b20' },
};

const RecentProjects = () => {
  const { data, isLoading } = useProjects({ limit: 5 });
  const navigate = useNavigate();
  const projects = data?.data ?? [];

  return (
    <div className="rounded-2xl border border-white/5 bg-surface-dark-secondary p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-white">Recent Projects</p>
        <button
          onClick={() => navigate('/projects')}
          className="text-xs text-brand-400 hover:underline"
        >
          View all
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-12 animate-pulse rounded-xl bg-white/5"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p className="py-6 text-center text-sm text-white/30">
          No projects yet — create your first one!
        </p>
      ) : (
        <div className="space-y-2">
          {projects.map((project, i) => {
            const config = statusConfig[project.status] ?? statusConfig.planning;
            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-white/5 cursor-pointer transition-colors"
                onClick={() => navigate(`/projects`)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="text-sm text-white/80">{project.title}</span>
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ color: config.color, backgroundColor: config.bg }}
                >
                  {config.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentProjects;