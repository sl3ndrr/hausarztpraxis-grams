/**
 * Reine Darstellung vorhandener Altersgrenzen, ohne medizinische Ableitungen.
 * Eingaben: Stufen mit minAge und optional maxAge, Titel und Originaltext.
 * Altersangaben ausschließlich in content/ pflegen; Tests halten Grenzen fest.
 */
export function ageStages(steps) {
  return steps.map(step => ({ ...step, range: step.maxAge === undefined ? `${step.minAge}+` : `${step.minAge}–${step.maxAge}` }));
}
