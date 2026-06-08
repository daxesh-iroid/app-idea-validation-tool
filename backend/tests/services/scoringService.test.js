const {
  calculateIdeaClarity,
  calculateMarketRisk,
  calculateMvpFeasibility,
  calculateMonetizationFit,
  calculateDevelopmentComplexity,
  calculateResultType,
  calculateAllScores,
} = require('../../services/scoringService');

const baseData = {
  ideaName: 'Test App',
  ideaDescription: 'A'.repeat(60),
  targetAudience: 'B'.repeat(15),
  problemDescription: 'C'.repeat(60),
  differentiation: 'D'.repeat(35),
  mvpFeatures: ['feature1', 'feature2'],
  competitorStatus: 'few',
  problemProven: true,
  spokenToUsers: true,
  hasUserFeedback: true,
  launchScope: 'city',
  hasLocalRequirements: false,
  monetizationModel: 'subscription',
  usageFrequency: 'daily',
  painLevel: 'high',
  businessModel: 'b2b',
  monetizationTiming: 'mvp',
  needsAI: false,
  needsIntegrations: false,
  needsLocation: false,
  needsChat: false,
  needsPayment: false,
  needsAdminPanel: false,
  userRoles: ['user'],
  platformNeeds: 'web',
  appType: 'web_app',
};

describe('scoringService', () => {
  describe('calculateIdeaClarity', () => {
    test('returns 100 for complete data', () => {
      expect(calculateIdeaClarity(baseData)).toBe(100);
    });

    test('returns 0 for empty data', () => {
      expect(calculateIdeaClarity({})).toBe(0);
    });

    test('returns partial score for partial data', () => {
      const data = { ideaDescription: 'A'.repeat(60), targetAudience: 'B'.repeat(15) };
      expect(calculateIdeaClarity(data)).toBe(40);
    });

    test('caps at 100', () => {
      const data = { ...baseData, mvpFeatures: ['a', 'b', 'c', 'd', 'e', 'f'] };
      expect(calculateIdeaClarity(data)).toBeLessThanOrEqual(100);
    });
  });

  describe('calculateMarketRisk', () => {
    test('returns base score 30 for low-risk data', () => {
      const data = { ...baseData, competitorStatus: 'few', problemProven: true, spokenToUsers: true, hasUserFeedback: true, launchScope: 'city', hasLocalRequirements: false };
      expect(calculateMarketRisk(data)).toBe(30);
    });

    test('returns high score for high-risk data', () => {
      const data = { competitorStatus: 'not_researched', problemProven: false, spokenToUsers: false, hasUserFeedback: false, launchScope: 'global', hasLocalRequirements: true };
      expect(calculateMarketRisk(data)).toBeGreaterThanOrEqual(85);
    });

    test('caps at 100', () => {
      const data = { competitorStatus: 'not_researched', problemProven: false, spokenToUsers: false, hasUserFeedback: false, launchScope: 'global', hasLocalRequirements: true };
      expect(calculateMarketRisk(data)).toBeLessThanOrEqual(100);
    });
  });

  describe('calculateMvpFeasibility', () => {
    test('returns high score for simple MVP', () => {
      const data = { ...baseData, mvpFeatures: ['feature1'], userRoles: ['user'], platformNeeds: 'web', needsAI: false, needsIntegrations: false, needsLocation: false, needsChat: false };
      expect(calculateMvpFeasibility(data)).toBeGreaterThanOrEqual(70);
    });

    test('returns lower score for complex MVP', () => {
      const data = { ...baseData, mvpFeatures: ['a', 'b', 'c', 'd', 'e', 'f', 'g'], userRoles: ['admin', 'user', 'moderator', 'guest'], platformNeeds: 'mobile,web', needsAI: true, needsIntegrations: true, needsLocation: true, needsChat: true };
      expect(calculateMvpFeasibility(data)).toBeLessThan(60);
    });

    test('does not go below 0', () => {
      const data = { mvpFeatures: ['a','b','c','d','e','f','g','h','i','j'], userRoles: ['a','b','c','d','e','f'], platformNeeds: 'mobile,web', needsAI: true, needsIntegrations: true, needsLocation: true, needsChat: true };
      expect(calculateMvpFeasibility(data)).toBeGreaterThanOrEqual(0);
    });
  });

  describe('calculateMonetizationFit', () => {
    test('returns high score for strong monetization', () => {
      expect(calculateMonetizationFit(baseData)).toBeGreaterThanOrEqual(80);
    });

    test('returns low score for weak monetization', () => {
      const data = { monetizationModel: 'not_sure_yet', usageFrequency: 'occasionally', painLevel: 'low', businessModel: 'b2c', monetizationTiming: 'later' };
      expect(calculateMonetizationFit(data)).toBeLessThanOrEqual(20);
    });

    test('caps at 100', () => {
      const data = { ...baseData, monetizationModel: 'subscription', usageFrequency: 'daily', painLevel: 'urgent', businessModel: 'saas', monetizationTiming: 'mvp' };
      expect(calculateMonetizationFit(data)).toBeLessThanOrEqual(100);
    });
  });

  describe('calculateDevelopmentComplexity', () => {
    test('returns low score for simple app', () => {
      const data = { platformNeeds: 'web', userRoles: ['user'], needsPayment: false, needsChat: false, needsLocation: false, needsAI: false, needsIntegrations: false, needsAdminPanel: false, mvpFeatures: [] };
      expect(calculateDevelopmentComplexity(data)).toBeLessThanOrEqual(20);
    });

    test('returns high score for complex app', () => {
      const data = { platformNeeds: 'mobile,web', userRoles: ['admin', 'user', 'moderator'], needsPayment: true, needsChat: true, needsLocation: true, needsAI: true, needsIntegrations: true, needsAdminPanel: true, mvpFeatures: ['real_time_tracking'] };
      expect(calculateDevelopmentComplexity(data)).toBeGreaterThanOrEqual(80);
    });

    test('caps at 100', () => {
      const data = { platformNeeds: 'mobile,web', userRoles: ['a','b','c','d','e','f'], needsPayment: true, needsChat: true, needsLocation: true, needsAI: true, needsIntegrations: true, needsAdminPanel: true, mvpFeatures: ['real_time_tracking'] };
      expect(calculateDevelopmentComplexity(data)).toBeLessThanOrEqual(100);
    });
  });

  describe('calculateResultType', () => {
    test('returns high_risk when market risk >= 70', () => {
      expect(calculateResultType(baseData, { marketRisk: 70, mvpFeasibility: 80, developmentComplexity: 30, ideaClarity: 80 })).toBe('high_risk');
    });

    test('returns too_broad when mvp feasibility < 50', () => {
      expect(calculateResultType(baseData, { marketRisk: 30, mvpFeasibility: 40, developmentComplexity: 30, ideaClarity: 80 })).toBe('too_broad');
    });

    test('returns strong_complex when dev complexity >= 70', () => {
      expect(calculateResultType(baseData, { marketRisk: 30, mvpFeasibility: 80, developmentComplexity: 70, ideaClarity: 80 })).toBe('strong_complex');
    });

    test('returns needs_validation when idea clarity < 60', () => {
      expect(calculateResultType(baseData, { marketRisk: 30, mvpFeasibility: 80, developmentComplexity: 30, ideaClarity: 50 })).toBe('needs_validation');
    });

    test('returns ready_for_mvp when all scores good', () => {
      expect(calculateResultType(baseData, { marketRisk: 30, mvpFeasibility: 80, developmentComplexity: 30, ideaClarity: 80 })).toBe('ready_for_mvp');
    });
  });

  describe('calculateAllScores', () => {
    test('returns all score fields', () => {
      const result = calculateAllScores(baseData);
      expect(result).toHaveProperty('ideaClarity');
      expect(result).toHaveProperty('marketRisk');
      expect(result).toHaveProperty('mvpFeasibility');
      expect(result).toHaveProperty('monetizationFit');
      expect(result).toHaveProperty('developmentComplexity');
      expect(result).toHaveProperty('overallScore');
      expect(result).toHaveProperty('resultType');
      expect(result).toHaveProperty('recommendedMvp');
      expect(result).toHaveProperty('featuresToAvoid');
      expect(result).toHaveProperty('suggestedTech');
      expect(result).toHaveProperty('strengths');
      expect(result).toHaveProperty('weaknesses');
    });

    test('overall score is between 0 and 100', () => {
      const result = calculateAllScores(baseData);
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.overallScore).toBeLessThanOrEqual(100);
    });

    test('resultType is a valid enum value', () => {
      const result = calculateAllScores(baseData);
      expect(['ready_for_mvp', 'needs_validation', 'too_broad', 'high_risk', 'strong_complex']).toContain(result.resultType);
    });

    test('recommendedMvp is a non-empty string', () => {
      const result = calculateAllScores(baseData);
      expect(typeof result.recommendedMvp).toBe('string');
      expect(result.recommendedMvp.length).toBeGreaterThan(0);
    });

    test('strengths and weaknesses are arrays', () => {
      const result = calculateAllScores(baseData);
      expect(Array.isArray(result.strengths)).toBe(true);
      expect(Array.isArray(result.weaknesses)).toBe(true);
    });
  });
});
