const { AdminUser, ScoreWeight, EmailTemplate } = require('../models');

const seed = async () => {
  try {
    // Seed admin user
    const [admin, adminCreated] = await AdminUser.findOrCreate({
      where: { email: 'admin@iroid.com' },
      defaults: {
        name: 'Admin',
        email: 'admin@iroid.com',
        password: 'Admin@123456',
        role: 'admin',
      },
    });
    console.log(adminCreated ? 'Admin user created' : 'Admin user already exists');

    // Seed default score weights
    const defaultWeights = [
      { scoreType: 'ideaClarity', weights: { ideaDescription: 20, targetAudience: 20, problemDescription: 20, differentiation: 20, mvpFeatures: 20 } },
      { scoreType: 'marketRisk', weights: { base: 30, notResearched: 15, noCompetitors: 10, problemNotProven: 10, notSpokenToUsers: 10, noUserFeedback: 10, globalScope: 15, localRequirements: 10 } },
      { scoreType: 'mvpFeasibility', weights: { base: 80, perExtraFeature: 5, needsAI: 10, needsIntegrations: 10, needsLocation: 10, needsChat: 10, perExtraRole: 5, bothPlatforms: 10 } },
      { scoreType: 'monetizationFit', weights: { hasModel: 30, frequentUsage: 20, highPain: 20, b2bOrSaas: 15, monetizeInMvp: 15 } },
      { scoreType: 'developmentComplexity', weights: { base: 10, perPlatform: 10, perExtraRole: 10, needsPayment: 15, needsChat: 15, needsLocation: 15, needsAI: 20, needsIntegrations: 10, needsAdminPanel: 10, needsRealTime: 10 } },
    ];

    for (const w of defaultWeights) {
      const [, created] = await ScoreWeight.findOrCreate({
        where: { scoreType: w.scoreType },
        defaults: { scoreType: w.scoreType, weights: w.weights },
      });
      if (created) console.log(`Score weight created: ${w.scoreType}`);
    }

    // Seed default email templates
    const templates = [
      {
        name: 'user_report',
        subject: 'Your App Idea Validation Report from iRoid Solutions',
        body: `Hi {{fullName}},

Thank you for using the iRoid Solutions App Idea Validation Tool!

Here's a summary of your validation results:

App Idea: {{ideaName}}
Overall Score: {{overallScore}}/100
Result: {{resultType}}

Scores:
- Idea Clarity: {{ideaClarity}}/100
- Market Risk: {{marketRisk}}/100
- MVP Feasibility: {{mvpFeasibility}}/100
- Monetization Fit: {{monetizationFit}}/100
- Development Complexity: {{developmentComplexity}}/100

Recommended MVP: {{recommendedMvp}}
Features to Avoid: {{featuresToAvoid}}
Suggested Tech Stack: {{suggestedTech}}

Strengths: {{strengths}}
Weaknesses: {{weaknesses}}

We'd love to help you bring your idea to life. Reply to this email or call us to discuss your project.

Best regards,
iRoid Solutions Team`,
        variables: ['fullName', 'ideaName', 'overallScore', 'resultType', 'ideaClarity', 'marketRisk', 'mvpFeasibility', 'monetizationFit', 'developmentComplexity', 'recommendedMvp', 'featuresToAvoid', 'suggestedTech', 'strengths', 'weaknesses'],
      },
      {
        name: 'sales_notification',
        subject: 'New Lead: {{fullName}} - {{ideaName}}',
        body: `New lead captured from App Idea Validation Tool:

Name: {{fullName}}
Email: {{email}}
WhatsApp: {{whatsapp}}
Country: {{country}}
Company: {{companyName}}
Idea: {{ideaName}}
Budget: {{expectedBudget}}
Timeline: {{expectedTimeline}}
Readiness: {{readiness}}
Lead Score: {{leadScore}}

Validation ID: {{validationId}}
Overall Score: {{overallScore}}/100

Follow up soon!`,
        variables: ['fullName', 'email', 'whatsapp', 'country', 'companyName', 'ideaName', 'expectedBudget', 'expectedTimeline', 'readiness', 'leadScore', 'validationId', 'overallScore'],
      },
    ];

    for (const t of templates) {
      const [, created] = await EmailTemplate.findOrCreate({
        where: { name: t.name },
        defaults: { name: t.name, subject: t.subject, body: t.body, variables: t.variables },
      });
      if (created) console.log(`Email template created: ${t.name}`);
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
