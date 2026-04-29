import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCounter = ({ value }) => {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (value === 0) return;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return <span>{display}</span>;
};

const StatCard = ({ label, value = 0, icon: Icon, color, suffix = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="rounded-2xl border border-white/5 bg-surface-dark-secondary p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/40">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            <AnimatedCounter value={value} />
            {suffix && (
              <span className="ml-1 text-xl text-white/40">{suffix}</span>
            )}
          </p>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={20} style={{ color }} strokeWidth={1.8} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;