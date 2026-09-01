export default function StepIndicator({ step, total }) {
  return (
    <div>
      <p className="mb-3 text-[12px] uppercase tracking-[0.08em] text-charcoal/80">
        Step {step} of {total}
      </p>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-[2px] flex-1 ${i < step ? "bg-plum" : "bg-plum/15"}`}
          />
        ))}
      </div>
    </div>
  );
}
