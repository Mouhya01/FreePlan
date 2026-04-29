import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const columnConfig = {
  todo: { label: 'To Do', color: '#8b88f8' },
  'in-progress': { label: 'In Progress', color: '#f59e0b' },
  done: { label: 'Done', color: '#10b981' },
};

const KanbanColumn = ({ status, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const config = columnConfig[status];

  return (
    <div className="flex flex-col rounded-2xl border border-white/5 bg-surface-dark-secondary p-4">
      {/* Column header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: config.color }}
          />
          <span className="text-sm font-medium text-white/70">
            {config.label}
          </span>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-medium"
          style={{
            color: config.color,
            backgroundColor: `${config.color}18`,
          }}
        >
          {tasks.length}
        </span>
      </div>

      {/* Droppable zone */}
      <div
        ref={setNodeRef}
        className={`flex flex-1 flex-col gap-2 min-h-32 rounded-xl transition-colors ${
          isOver ? 'bg-white/5' : ''
        }`}
      >
        <SortableContext
          items={tasks.map((t) => t._id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <p className="py-4 text-center text-xs text-white/20">
            Drop tasks here
          </p>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;