export interface ScoringEntity {
  id: string;
  category: string;
  technologies: string[];
  features: string[];
}

export function calculateProjectSimilarity(source: ScoringEntity, candidate: ScoringEntity): number {
  if (source.id === candidate.id) return 0;

  let score = 0;

  // 1. Same Primary Category Weight (+40 points)
  if (source.category === candidate.category) {
    score += 40;
  }

  // 2. Shared Tech Stack Weight (+15 points per matching technology)
  const sourceTechSet = new Set(source.technologies);
  const sharedTechCount = candidate.technologies.filter((t) => sourceTechSet.has(t)).length;
  score += sharedTechCount * 15;

  // 3. Shared Architectural Keywords (+5 points per match)
  const sourceFeatureWords = new Set(source.features.flatMap((f) => f.toLowerCase().split(/\s+/)));
  const candidateFeatureWords = candidate.features.flatMap((f) => f.toLowerCase().split(/\s+/));
  const sharedWords = candidateFeatureWords.filter((w) => sourceFeatureWords.has(w) && w.length > 3).length;
  score += Math.min(sharedWords * 5, 20);

  return score;
}