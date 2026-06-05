/**
 * scoringService.js — Core Scoring Engine
 *
 * Calculates 5 dimension scores for app idea validation:
 *   1. Idea Clarity    (0-100)
 *   2. Market Risk     (0-100, higher = riskier)
 *   3. MVP Feasibility (0-100)
 *   4. Monetization Fit (0-100)
 *   5. Development Complexity (0-100, higher = more complex)
 *
 * Also computes overall score, result type, and recommendations.
 */

// ─── 1. Idea Clarity ────────────────────────────────────────────────

const calculateIdeaClarity = (data) => {
  let score = 0;

  if (data.ideaDescription && data.ideaDescription.length > 50) score += 20;
  if (data.targetAudience && data.targetAudience.length > 10) score += 20;
  if (data.problemDescription && data.problemDescription.length > 50) score += 20;
  if (data.differentiation && data.differentiation.length > 30) score += 20;
  if (data.mvpFeatures && data.mvpFeatures.length > 0) score += 20;

  return Math.min(100, score);
};

// ─── 2. Market Risk ─────────────────────────────────────────────────

const calculateMarketRisk = (data) => {
  let score = 30;

  if (data.competitorStatus === 'not_researched') score += 15;
  if (data.competitorStatus === 'none') score += 10;
  if (!data.problemProven) score += 10;
  if (!data.spokenToUsers) score += 10;
  if (!data.hasUserFeedback) score += 10;
  if (data.launchScope === 'global') score += 15;
  if (data.hasLocalRequirements) score += 10;

  return Math.min(100, score);
};

// ─── 3. MVP Feasibility ─────────────────────────────────────────────

const calculateMvpFeasibility = (data) => {
  let score = 80;

  const features = Array.isArray(data.mvpFeatures) ? data.mvpFeatures : [];
  if (features.length > 5) {
    score -= (features.length - 5) * 5;
  }

  if (data.needsAI) score -= 10;
  if (data.needsIntegrations) score -= 10;
  if (data.needsLocation) score -= 10;
  if (data.needsChat) score -= 10;

  const roles = Array.isArray(data.userRoles) ? data.userRoles : [];
  if (roles.length > 2) {
    score -= (roles.length - 2) * 5;
  }

  const platforms = Array.isArray(data.platformNeeds)
    ? data.platformNeeds
    : (data.platformNeeds ? data.platformNeeds.split(',').map(p => p.trim()).filter(Boolean) : []);

  if (platforms.includes('mobile') && platforms.includes('web')) {
    score -= 10;
  }

  return Math.max(0, score);
};

// ─── 4. Monetization Fit ────────────────────────────────────────────

const calculateMonetizationFit = (data) => {
  let score = 10;

  if (data.monetizationModel && !['free_app_only', 'not_sure_yet', ''].includes(data.monetizationModel)) {
    score += 30;
  }

  if (['daily', 'weekly'].includes(data.usageFrequency)) {
    score += 20;
  }

  if (['high', 'urgent'].includes(data.painLevel)) {
    score += 20;
  }

  if (['b2b', 'saas', 'b2b2c'].includes(data.businessModel)) {
    score += 15;
  }

  if (data.monetizationTiming === 'mvp') {
    score += 15;
  }

  return Math.min(100, score);
};

// ─── 5. Development Complexity ──────────────────────────────────────

const calculateDevelopmentComplexity = (data) => {
  let score = 10;

  const platforms = Array.isArray(data.platformNeeds)
    ? data.platformNeeds
    : (data.platformNeeds ? data.platformNeeds.split(',').map(p => p.trim()).filter(Boolean) : []);

  if (platforms.includes('mobile')) score += 10;
  if (platforms.includes('web')) score += 10;

  const roles = Array.isArray(data.userRoles) ? data.userRoles : [];
  if (roles.length > 1) {
    score += (roles.length - 1) * 10;
  }

  if (data.needsPayment) score += 15;
  if (data.needsChat) score += 15;
  if (data.needsLocation) score += 15;
  if (data.needsAI) score += 20;
  if (data.needsIntegrations) score += 10;
  if (data.needsAdminPanel) score += 10;

  const features = Array.isArray(data.mvpFeatures) ? data.mvpFeatures : [];
  if (features.includes('real_time_tracking')) score += 10;

  return Math.min(100, score);
};

// ─── Result Type ────────────────────────────────────────────────────

const calculateResultType = (data, scores) => {
  if (scores.marketRisk >= 70) return 'high_risk';
  if (scores.mvpFeasibility < 50) return 'too_broad';
  if (scores.developmentComplexity >= 70) return 'strong_complex';
  if (scores.ideaClarity < 60) return 'needs_validation';
  return 'ready_for_mvp';
};

// ─── Recommendation Generators ──────────────────────────────────────

const generateRecommendedMvp = (data) => {
  const features = Array.isArray(data.mvpFeatures) ? data.mvpFeatures : [];
  const topFeatures = features.slice(0, 3).join(', ') || 'core functionality';

  const appType = data.appType || 'app';

  switch (appType) {
    case 'mobile_app':
      return `Build a mobile-first MVP focused on: ${topFeatures}. Use React Native or Flutter for cross-platform deployment. Launch on one platform (iOS or Android) first.`;
    case 'website':
      return `Build a responsive website MVP focused on: ${topFeatures}. Use Next.js or a similar framework for fast deployment and SEO benefits.`;
    case 'web_app':
      return `Build a web application MVP focused on: ${topFeatures}. Use React or Vue.js for the frontend with a Node.js backend.`;
    case 'marketplace':
      return `Build a marketplace MVP focused on: ${topFeatures}. Start with one side of the marketplace first, then add the other side once you have traction.`;
    case 'saas':
      return `Build a SaaS MVP focused on: ${topFeatures}. Use a modern stack like Next.js + Stripe for subscriptions. Focus on one core workflow.`;
    case 'platform':
      return `Build a platform MVP focused on: ${topFeatures}. Start with the core interaction loop and expand based on user feedback.`;
    default:
      return `Build an MVP focused on: ${topFeatures}. Start simple, validate with real users, and iterate based on feedback.`;
  }
};

const generateFeaturesToAvoid = (data) => {
  const features = Array.isArray(data.mvpFeatures) ? data.mvpFeatures : [];
  const appType = data.appType || '';
  const avoid = [];

  if (features.length > 5) {
    avoid.push(`More than 5 features (currently ${features.length}). Focus on the top 3-5 for your MVP.`);
  }

  if (data.needsAI) {
    avoid.push('AI/ML features in v1 — add after validating core product-market fit.');
  }

  if (data.needsIntegrations) {
    avoid.push('Third-party integrations in v1 — build core functionality first.');
  }

  if (data.needsChat) {
    avoid.push('Real-time chat in v1 — use simple contact forms or email initially.');
  }

  if (data.needsLocation) {
    avoid.push('Location-based features in v1 — add after validating demand.');
  }

  if (data.needsPayment) {
    avoid.push('Payment processing in v1 — validate willingness to pay first.');
  }

  const platforms = Array.isArray(data.platformNeeds)
    ? data.platformNeeds
    : (data.platformNeeds ? data.platformNeeds.split(',').map(p => p.trim()).filter(Boolean) : []);

  if (platforms.includes('mobile') && platforms.includes('web')) {
    avoid.push('Building both mobile and web simultaneously — pick one platform for MVP.');
  }

  if (['marketplace', 'platform'].includes(appType)) {
    avoid.push('Building both sides of the marketplace at once — start with one side.');
  }

  if (avoid.length === 0) {
    return 'No major features to avoid — scope looks reasonable for an MVP.';
  }

  return avoid.join(' ');
};

const generateSuggestedTech = (data) => {
  const suggestions = [];
  const appType = data.appType || '';

  const platforms = Array.isArray(data.platformNeeds)
    ? data.platformNeeds
    : (data.platformNeeds ? data.platformNeeds.split(',').map(p => p.trim()).filter(Boolean) : []);

  if (platforms.includes('mobile')) {
    suggestions.push('React Native or Flutter for mobile');
  }
  if (platforms.includes('web')) {
    suggestions.push('Next.js or React for web');
  }

  suggestions.push('Node.js + Express for backend');
  suggestions.push('PostgreSQL for database');

  if (data.needsAI) suggestions.push('OpenAI API or similar for AI features');
  if (data.needsChat) suggestions.push('Socket.io for real-time chat');
  if (data.needsPayment) suggestions.push('Stripe for payments');
  if (data.needsLocation) suggestions.push('Google Maps API for location');

  switch (appType) {
    case 'saas':
      suggestions.push('Stripe Billing for subscription management');
      break;
    case 'marketplace':
      suggestions.push('Stripe Connect for marketplace payments');
      break;
  }

  return suggestions.join(', ');
};

// ─── Strengths & Weaknesses ─────────────────────────────────────────

const generateStrengths = (data, scores) => {
  const strengths = [];

  if (scores.ideaClarity >= 70) strengths.push('Clear and well-defined idea');
  if (scores.marketRisk < 50) strengths.push('Low market risk');
  if (scores.mvpFeasibility >= 70) strengths.push('Highly feasible MVP scope');
  if (scores.monetizationFit >= 70) strengths.push('Strong monetization potential');
  if (scores.developmentComplexity < 50) strengths.push('Low development complexity');

  if (data.problemProven) strengths.push('Problem validated with real users');
  if (data.spokenToUsers) strengths.push('Spoken to potential users');
  if (data.hasUserFeedback) strengths.push('Has collected user feedback');
  if (data.hasEarlyCustomers) strengths.push('Has early customers or waitlist');
  if (data.differentiation && data.differentiation.length > 30) strengths.push('Clear competitive differentiation');
  if (data.competitorStatus === 'few') strengths.push('Low competition in target market');
  if (data.monetizationModel && !['free_app_only', 'not_sure_yet', ''].includes(data.monetizationModel)) {
    strengths.push('Clear monetization strategy');
  }

  return strengths;
};

const generateWeaknesses = (data, scores) => {
  const weaknesses = [];

  if (scores.ideaClarity < 50) weaknesses.push('Idea needs more clarity and detail');
  if (scores.marketRisk >= 70) weaknesses.push('High market risk — more research needed');
  if (scores.mvpFeasibility < 50) weaknesses.push('MVP scope too broad — narrow down features');
  if (scores.monetizationFit < 50) weaknesses.push('Monetization strategy needs work');
  if (scores.developmentComplexity >= 70) weaknesses.push('High development complexity — consider simplifying');

  if (!data.targetAudience || data.targetAudience.length <= 10) weaknesses.push('Target audience not well defined');
  if (!data.problemProven) weaknesses.push('Problem not yet validated with users');
  if (!data.spokenToUsers) weaknesses.push('Haven\'t spoken to potential users yet');
  if (!data.hasUserFeedback) weaknesses.push('No user feedback collected');
  if (data.competitorStatus === 'not_researched') weaknesses.push('Competitors not researched');
  if (data.competitorStatus === 'many' || data.competitorStatus === 'strong') weaknesses.push('High competition in the market');

  return weaknesses;
};

// ─── Master Calculator ──────────────────────────────────────────────

const calculateAllScores = (data) => {
  const ideaClarity = calculateIdeaClarity(data);
  const marketRisk = calculateMarketRisk(data);
  const mvpFeasibility = calculateMvpFeasibility(data);
  const monetizationFit = calculateMonetizationFit(data);
  const developmentComplexity = calculateDevelopmentComplexity(data);

  const overallScore = Math.round(
    (ideaClarity + mvpFeasibility + monetizationFit + (100 - marketRisk) + (100 - developmentComplexity)) / 5
  );

  const scores = {
    ideaClarity,
    marketRisk,
    mvpFeasibility,
    monetizationFit,
    developmentComplexity,
    overallScore: Math.max(0, Math.min(100, overallScore)),
  };

  const resultType = calculateResultType(data, scores);

  return {
    ...scores,
    resultType,
    recommendedMvp: generateRecommendedMvp(data),
    featuresToAvoid: generateFeaturesToAvoid(data),
    suggestedTech: generateSuggestedTech(data),
    strengths: generateStrengths(data, scores),
    weaknesses: generateWeaknesses(data, scores),
  };
};

module.exports = {
  calculateIdeaClarity,
  calculateMarketRisk,
  calculateMvpFeasibility,
  calculateMonetizationFit,
  calculateDevelopmentComplexity,
  calculateResultType,
  calculateAllScores,
};
