export default function Chip({ children, onClick, active = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-150 cursor-pointer ${
        active
          ? "bg-navy-900 text-white border-navy-900"
          : "bg-white text-navy-700 border-border-default hover:border-navy-400 hover:text-navy-900"
      }`}
    >
      {children}
    </button>
  );
}
