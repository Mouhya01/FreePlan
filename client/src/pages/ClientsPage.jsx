import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Users, Mail, Phone, Building2, Trash2, Pencil, X } from 'lucide-react';
import {
  useClients,
  useCreateClient,
  useUpdateClient,
  useDeleteClient,
} from '@/hooks/useClients';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';

const clientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  company: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

// Reusable modal for create and edit
const ClientModal = ({ onClose, defaultValues = null }) => {
  const { mutateAsync: create, isPending: creating } = useCreateClient();
  const { mutateAsync: update, isPending: updating } = useUpdateClient();
  const isEdit = !!defaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: defaultValues ?? {},
  });

  const onSubmit = async (formData) => {
    try {
      if (isEdit) {
        await update({ id: defaultValues._id, updates: formData });
        toast.success('Client updated!');
      } else {
        await create(formData);
        toast.success('Client created!');
      }
      onClose();
    } catch {
      toast.error('Something went wrong');
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
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {isEdit ? 'Edit Client' : 'New Client'}
          </h2>
          <button onClick={onClose} className="text-white/30 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-white/60">Full name *</Label>
            <Input
              {...register('name')}
              placeholder="Alice Martin"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
            />
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-white/60">Email *</Label>
            <Input
              {...register('email')}
              type="email"
              placeholder="alice@company.com"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-white/60">Company</Label>
              <Input
                {...register('company')}
                placeholder="Startup SAS"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/60">Phone</Label>
              <Input
                {...register('phone')}
                placeholder="+33 6 12 34 56"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-white/60">Notes</Label>
            <Input
              {...register('notes')}
              placeholder="Additional notes..."
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
              disabled={creating || updating}
              className="flex-1 bg-brand-500 text-white hover:bg-brand-600"
            >
              {creating || updating ? 'Saving...' : isEdit ? 'Save changes' : 'Create'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Single client card
const ClientCard = ({ client }) => {
  const { mutateAsync: deleteClient } = useDeleteClient();
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${client.name}?`)) return;
    try {
      await deleteClient(client._id);
      toast.success('Client deleted');
    } catch {
      toast.error('Failed to delete client');
    }
  };

  // Generate initials
  const initials = client.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <AnimatePresence>
        {showEdit && (
          <ClientModal
            onClose={() => setShowEdit(false)}
            defaultValues={client}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="group rounded-2xl border border-white/5 bg-surface-dark-secondary p-5 transition-colors hover:border-white/10"
      >
        <div className="flex items-start justify-between">
          {/* Avatar + info */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-sm font-semibold text-brand-400">
              {initials}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{client.name}</p>
              {client.company && (
                <p className="text-xs text-white/40">{client.company}</p>
              )}
            </div>
          </div>

          {/* Actions — visible on hover */}
          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => setShowEdit(true)}
              className="rounded-lg p-1.5 text-white/30 hover:bg-white/5 hover:text-white"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={handleDelete}
              className="rounded-lg p-1.5 text-white/30 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Contact details */}
        <div className="mt-4 space-y-1.5">
          {client.email && (
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Mail size={12} />
              <span>{client.email}</span>
            </div>
          )}
          {client.phone && (
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Phone size={12} />
              <span>{client.phone}</span>
            </div>
          )}
          {client.company && (
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Building2 size={12} />
              <span>{client.company}</span>
            </div>
          )}
        </div>

        {client.notes && (
          <p className="mt-3 rounded-lg bg-white/3 px-3 py-2 text-xs text-white/30">
            {client.notes}
          </p>
        )}
      </motion.div>
    </>
  );
};

const ClientsPage = () => {
  const { data, isLoading } = useClients();
  const [showCreate, setShowCreate] = useState(false);
  const clients = data?.data ?? [];

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showCreate && <ClientModal onClose={() => setShowCreate(false)} />}
      </AnimatePresence>

      <PageHeader
        title="Clients"
        subtitle={`${clients.length} client${clients.length !== 1 ? 's' : ''} total`}
        action={
          <Button
            onClick={() => setShowCreate(true)}
            className="gap-2 bg-brand-500 text-white hover:bg-brand-600"
          >
            <Plus size={16} />
            New Client
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} lines={3} />
          ))}
        </div>
      ) : clients.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No clients yet"
          description="Add your first client to start tracking your work relationships."
          action={
            <Button
              onClick={() => setShowCreate(true)}
              className="bg-brand-500 text-white hover:bg-brand-600"
            >
              Add your first client
            </Button>
          }
        />
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {clients.map((client) => (
              <ClientCard key={client._id} client={client} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default ClientsPage;