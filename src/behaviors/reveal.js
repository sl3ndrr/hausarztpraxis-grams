/**
 * Sanftes einmaliges Einblenden; Inhalte bleiben bei Fehlern zugänglich.
 * Eingaben: neue View und prefers-reduced-motion; kein Datenzustand.
 * Bewegung in motion.css ändern; Observer beim Seitenwechsel aufräumen.
 */
export function reveal(root) {
  const items = [...root.querySelectorAll('[data-reveal]')];
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  if (media.matches || !('IntersectionObserver' in window)) return () => {};
  const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { entry.target.dataset.revealed = ''; observer.unobserve(entry.target); } }, { threshold: 0.08 });
  const showAll = () => { if (media.matches) { items.forEach(item => { item.dataset.revealed = ''; }); observer.disconnect(); } };
  items.forEach(item => { item.dataset.revealPending = ''; observer.observe(item); });
  media.addEventListener('change', showAll);
  return () => { observer.disconnect(); media.removeEventListener('change', showAll); };
}
