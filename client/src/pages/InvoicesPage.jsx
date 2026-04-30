import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, FileText, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useInvoices, useCreateInvoice } from '@/hooks/useInvoices';
import { useClients } from '@/hooks/useClients';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';

const invoiceSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  clientId: z.string().min(1, 'Please select a client'),
  amount: z.coerce.number().min(1, 'Amount must be greater than 0'),
  dueDate: z.string().min(1, 'Due date is required'),
  status: z.enum(['draft', 'sent', 'paid']),
});

const statusConfig = {
  draft: {
    label: 'Draft',
    color: '#8b88f8',
    bg: '#8b88f820',
    icon: Clock,
  },
  sent: {
    label: 'Sent',
    color: '#f59e0b',
    bg: '#f59e0b20',
    icon: AlertCircle,
  },
  paid: {
    label: 'Paid',
    color: '#10b981',
    bg: '#10b98120',
    icon: CheckCircle,
  },
};

const InvoiceModal = ({ onClose }) => {
  const { mutateAsync: create, isPending } = useCreateInvoice();
  const { data: clientsData } = useClients();
  const clients = clientsData?.data ?? [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: { status: 'draft' },
  });

  const onSubmit = async (formData) => {
    try {
      await create(formData);
      toast.success('Invoice created!');
      onClose();
    } catch {
      toast.error('Failed to create invoice — API coming in Day 7');
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
          <h2 className="text-lg font-semibold text-white">New Invoice</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-white/60">Invoice title *</Label>
            <Input
              {...register('title')}
              placeholder="Website design — May 2025"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
            />
            {errors.title && (
              <p className="text-xs text-red-400">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-white/60">Client *</Label>
            <select
              {...register('clientId')}
              className="w-full rounded-lg border border-white/10 bg-surface-dark px-3 py-2 text-sm text-white [&>option]:bg-surface-dark [&>option]:text-white"
            >
              <option value="">Select a client</option>
              {clients.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} — {c.company || c.email}
                </option>
              ))}
            </select>
            {errors.clientId && (
              <p className="text-xs text-red-400">{errors.clientId.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-white/60">Amount ($) *</Label>
              <Input
                {...register('amount')}
                type="number"
                placeholder="1500"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
              />
              {errors.amount && (
                <p className="text-xs text-red-400">{errors.amount.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/60">Due date *</Label>
              <Input
                {...register('dueDate')}
                type="date"
                className="border-white/10 bg-white/5 text-white"
              />
              {errors.dueDate && (
                <p className="text-xs text-red-400">{errors.dueDate.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-white/60">Status</Label>
            <select
              {...register('status')}
              className="w-full rounded-lg border border-white/10 bg-surface-dark px-3 py-2 text-sm text-white [&>option]:bg-surface-dark [&>option]:text-white"
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
            </select>
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
              {isPending ? 'Creating...' : 'Create Invoice'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const InvoiceRow = ({ invoice, index }) => {
  const config = statusConfig[invoice.status] ?? statusConfig.draft;
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="flex items-center justify-between rounded-xl border border-white/5 bg-surface-dark-secondary px-5 py-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10">
          <FileText size={16} className="text-brand-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{invoice.title}</p>
          <p className="text-xs text-white/30">
            Due {new Date(invoice.dueDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-white">
          ${Number(invoice.amount).toLocaleString()}
        </span>
        <span
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ color: config.color, backgroundColor: config.bg }}
        >
          <StatusIcon size={11} />
          {config.label}
        </span>
      </div>
    </motion.div>
  );
};

const InvoicesPage = () => {
  const { data, isLoading } = useInvoices();
  const [showCreate, setShowCreate] = useState(false);
  const invoices = data?.data ?? [];

  // Summary totals
  const totalPaid = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const totalPending = invoices
    .filter((i) => i.status === 'sent')
    .reduce((sum, i) => sum + Number(i.amount), 0);

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showCreate && <InvoiceModal onClose={() => setShowCreate(false)} />}
      </AnimatePresence>

      <PageHeader
        title="Invoices"
        subtitle={`${invoices.length} invoice${invoices.length !== 1 ? 's' : ''} total`}
        action={
          <Button
            onClick={() => setShowCreate(true)}
            className="gap-2 bg-brand-500 text-white hover:bg-brand-600"
          >
            <Plus size={16} />
            New Invoice
          </Button>
        }
      />

      {/* Summary cards */}
      {invoices.length > 0 && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {[
            { label: 'Total Paid', value: totalPaid, color: '#10b981' },
            { label: 'Total Pending', value: totalPending, color: '#f59e0b' },
            { label: 'Total Invoices', value: invoices.length, color: '#8b88f8', isCount: true },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/5 bg-surface-dark-secondary p-4"
            >
              <p className="text-xs text-white/40">{item.label}</p>
              <p className="mt-1 text-xl font-semibold text-white">
                {item.isCount
                  ? item.value
                  : `$${item.value.toLocaleString()}`}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Invoice list */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} lines={1} />
          ))}
        </div>
      ) : invoices.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No invoices yet"
          description="Create your first invoice to start tracking your revenue."
          action={
            <Button
              onClick={() => setShowCreate(true)}
              className="bg-brand-500 text-white hover:bg-brand-600"
            >
              Create your first invoice
            </Button>
          }
        />
      ) : (
        <div className="space-y-2">
          {invoices.map((invoice, i) => (
            <InvoiceRow key={invoice._id} invoice={invoice} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;