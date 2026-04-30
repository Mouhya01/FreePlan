import { motion } from 'framer-motion';

const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-surface-dark-secondary py-16 text-center"
    >
      {/* Illustrated icon container */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10">
        <Icon size={28} className="text-brand-400" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-medium text-white/70">{title}</h3>
      <p className="mt-1 max-w-xs text-xs text-white/30">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
};

export default EmptyState;