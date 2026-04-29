import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FolderKanban, ChevronDown } from 'lucide-react';
import { useProjects, useCreateProject } from '@/hooks/useProjects';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';

const statusConfig = {
  planning: { label: 'Planning', color: '#8b88f8' },
  'in-progress': { label: 'In Progress', color: '#10b981' },
  completed: { label: 'Completed', color: '#34d399' },
  'on-hold': { label: 'On Hold', color: '#f59e0b' },
};

const CreateProjectModal = ({ onClose }) => {
  const { mutateAsync, isPending } = useCreateProject();
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'planning',
    priority: 'medium',
    budget: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Title is required');
    try {
      await mutateAsync({
        ...form,
        budget: Number(form.budget) || 0,
      });
      toast.success('Project created!');
      onClose();
    } catch {
      toast.error('Failed to create project');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-surface-dark-secondary p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-5 text-lg font-semibold text-white">New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-white/60">Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Project name"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-white/60">Description</Label>
            <Input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Brief description"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-white/60">Status</Label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-surface-dark px-3 py-2 text-sm text-white [&>option]:bg-surface-dark [&>option]:text-white"
                >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/60">Priority</Label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-surface-dark px-3 py-2 text-sm text-white [&>option]:bg-surface-dark [&>option]:text-white"
                >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-white/60">Budget ($)</Label>
            <Input
              type="number"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              placeholder="0"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 border border-white/10 text-white/60"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-brand-500 text-white hover:bg-brand-600"
            >
              {isPending ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const { data, isLoading } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const projects = data?.data ?? [];

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showModal && <CreateProjectModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Projects</h1>
          <p className="mt-1 text-sm text-white/40">
            {projects.length} project{projects.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="gap-2 bg-brand-500 text-white hover:bg-brand-600"
        >
          <Plus size={16} />
          New Project
        </Button>
      </div>

      {/* Projects list */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-surface-dark-secondary" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-surface-dark-secondary py-16">
          <FolderKanban size={40} className="mb-3 text-white/20" />
          <p className="text-sm text-white/40">No projects yet</p>
          <Button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-brand-500 text-white hover:bg-brand-600"
          >
            Create your first project
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project, i) => {
            const config = statusConfig[project.status] ?? statusConfig.planning;
            const isSelected = selectedProject?._id === project._id;

            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {/* Project row */}
                <div
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/5 bg-surface-dark-secondary px-5 py-4 transition-colors hover:bg-white/5"
                  onClick={() =>
                    setSelectedProject(isSelected ? null : project)
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {project.title}
                      </p>
                      {project.description && (
                        <p className="text-xs text-white/30">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        color: config.color,
                        backgroundColor: `${config.color}18`,
                      }}
                    >
                      {config.label}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-white/30 transition-transform ${isSelected ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>

                {/* Kanban board — slides open on click */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3">
                        <KanbanBoard projectId={project._id} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;