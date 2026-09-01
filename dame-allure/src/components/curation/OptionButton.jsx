export default function OptionButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`border px-5 py-3 text-left text-[14px] transition-colors ${
        selected
          ? "border-plum bg-plum text-ivory"
          : "border-plum/25 text-plum/85 hover:border-plum"
      }`}
    >
      {label}
    </button>
  );
}
