/**
 * Format a score to one decimal place
 */
export function formatScore(score) {
  if (score === null || score === undefined) return '—';
  return Number(score).toFixed(1);
}

/**
 * Get Tailwind color class based on score value
 */
export function getScoreColor(score) {
  if (score === null || score === undefined) return 'text-slate-400';
  if (score >= 75) return 'text-accent';
  if (score >= 50) return 'text-primary';
  if (score >= 25) return 'text-warning';
  return 'text-danger';
}

/**
 * Get Tailwind background color class based on score value
 */
export function getScoreBgColor(score) {
  if (score === null || score === undefined) return 'bg-slate-200';
  if (score >= 75) return 'bg-accent';
  if (score >= 50) return 'bg-primary';
  if (score >= 25) return 'bg-warning';
  return 'bg-danger';
}

/**
 * Get label based on score value
 */
export function getScoreLabel(score) {
  if (score === null || score === undefined) return 'Not Scored';
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  if (score >= 20) return 'Needs Work';
  return 'Critical';
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(current, total) {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}

/**
 * Get result type label
 */
export function getResultTypeLabel(type) {
  const labels = {
    ready: 'Ready for MVP',
    promising: 'Promising — Needs Refinement',
    risky: 'Risky — Major Concerns',
    not_ready: 'Not Ready — Reconsider',
  };
  return labels[type] || 'Unknown';
}

/**
 * Get result type color
 */
export function getResultTypeColor(type) {
  const colors = {
    ready: 'bg-accent',
    promising: 'bg-primary',
    risky: 'bg-warning',
    not_ready: 'bg-danger',
  };
  return colors[type] || 'bg-slate-400';
}
