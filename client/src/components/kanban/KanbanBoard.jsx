import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/api/axios';
import KanbanColumn from './KanbanColumn';
import toast from 'react-hot-toast';

const COLUMNS = ['todo', 'in-progress', 'done'];

const KanbanBoard = ({ projectId }) => {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async () => {
      const { data } = await api.get(`/projects/${projectId}/tasks`);
      return data.data;
    },
    enabled: !!projectId,
  });

  // Local state initialized from query data
  const [tasks, setTasks] = useState([]);

  // Sync local tasks when query data changes (without useEffect)
  const displayTasks = tasks.length > 0 || data.length === 0 ? tasks : data;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const getTasksByStatus = (status) =>
    displayTasks.filter((t) => t.status === status);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = displayTasks.find((t) => t._id === active.id);
    if (!activeTask) return;

    const newStatus = COLUMNS.includes(over.id)
      ? over.id
      : displayTasks.find((t) => t._id === over.id)?.status;

    if (!newStatus || newStatus === activeTask.status) return;

    // Optimistic update
    const updated = displayTasks.map((t) =>
      t._id === activeTask._id ? { ...t, status: newStatus } : t
    );
    setTasks(updated);

    try {
      await api.put(`/projects/${projectId}/tasks/${activeTask._id}`, {
        status: newStatus,
      });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    } catch {
      setTasks(data);
      toast.error('Failed to update task status');
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {COLUMNS.map((col) => (
          <div
            key={col}
            className="h-64 animate-pulse rounded-2xl bg-surface-dark-secondary"
          />
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {COLUMNS.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={getTasksByStatus(status)}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;