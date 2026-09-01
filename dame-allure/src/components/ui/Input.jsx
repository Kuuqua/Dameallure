export default function Input({ label, id, className = "", ...props }) {
  return (
    <label htmlFor={id} className="block">
      {label ? (
        <span className="mb-2 block text-[12px] tracking-[0.08em] uppercase text-charcoal/80">
          {label}
        </span>
      ) : null}
      <input
        id={id}
        className={`w-full border-b border-charcoal/25 bg-transparent px-1 py-2.5 text-[15px] text-charcoal placeholder:text-charcoal/40 focus:border-plum focus:outline-none ${className}`}
        {...props}
      />
    </label>
  );
}
