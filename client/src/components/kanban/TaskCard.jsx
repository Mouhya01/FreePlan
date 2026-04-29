import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, AlertCircle } from 'lucide-react';

const priorityConfig = {
  low: { color: '#10b981', label: 'Low' },
  medium: { color: '#f59e0b', label: 'Medium' },
  high: { color: '#ef4444', label: 'High' },
};

const TaskCard = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const priority = priorityConfig[task.priority] ?? priorityConfig.medium;
  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group rounded-xl border border-white/5 bg-surface-dark p-3.5 shadow-sm"
    >
      <div className="flex items-start gap-2">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 cursor-grab text-white/20 opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
        >
          <GripVertical size={14} />
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-white/80 leading-snug">{task.title}</p>

          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            {/* Priority badge */}
            <span
              className="rounded-full px-2 py-0.5 text-xs font-medium"
              style={{
                color: priority.color,
                backgroundColor: `${priority.color}18`,
              }}
            >
              {priority.label}
            </span>

            {/* Overdue warning */}
            {isOverdue && (
              <span className="flex items-center gap-1 text-xs text-red-400">
                <AlertCircle size={11} />
                Overdue
              </span>
            )}

            {/* Due date */}
            {task.dueDate && (
              <span className="text-xs text-white/25">
                {new Date(task.dueDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;