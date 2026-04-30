const SkeletonCard = ({ lines = 2, className = '' }) => {
  return (
    <div
      className={`rounded-2xl border border-white/5 bg-surface-dark-secondary p-5 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/10" />
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className="h-2.5 animate-pulse rounded-full bg-white/5"
              style={{ width: `${80 - i * 15}%` }}
            />
          ))}
        </div>
        <div className="ml-4 h-8 w-8 animate-pulse rounded-xl bg-white/10" />
      </div>
    </div>
  );
};

export default SkeletonCard;