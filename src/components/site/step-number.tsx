// Numbered step badge used on the solutions pages: the same black circle
// with Geist Mono digits as the homepage Solutions accordion, turning
// ZINC orange when its card is hovered. Accepts "01" or "01 · Assess"
// (the label renders beside the circle in mono).
export function StepNumber({ value }: { value: string }) {
  const [num, ...rest] = value.split(" · ");
  const label = rest.join(" · ");
  return (
    <div className="step-number">
      <span className="step-number__badge" aria-hidden="true">{num}</span>
      <span className="u-sr-only">Step {num}</span>
      {label ? <span className="step-number__text">{label}</span> : null}
    </div>
  );
}
