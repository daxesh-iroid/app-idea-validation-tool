const { transporter } = require('../config/email');
const { EmailTemplate } = require('../models');

/**
 * Replace template variables in a string.
 * Variables are in the format {{variableName}}.
 */
const renderTemplate = (templateStr, variables = {}) => {
  let result = templateStr;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, value ?? '');
  }
  return result;
};

/**
 * Send the validation report email to the user.
 */
const sendUserReport = async (leadEmail, leadName, scores, resultType) => {
  let template = await EmailTemplate.findOne({
    where: { name: 'user_report', isActive: true },
  });

  // Fallback template if none exists in DB
  const defaultSubject = 'Your App Idea Validation Report | iRoid Solutions';
  const defaultBody = `Hi {{name}},\n\nThank you for using the iRoid Solutions App Idea Validation Tool!\n\nHere are your results:\n\nOverall Score: {{overallScore}}/100\nIdea Clarity: {{ideaClarity}}/100\nMarket Risk: {{marketRisk}}/100\nMVP Feasibility: {{mvpFeasibility}}/100\nMonetization Fit: {{monetizationFit}}/100\nDevelopment Complexity: {{developmentComplexity}}/100\n\nResult: {{resultType}}\n\nYour MVP Recommendation:\n{{recommendedMvp}}\n\nFeatures to Avoid:\n{{featuresToAvoid}}\n\nSuggested Tech Stack:\n{{suggestedTech}}\n\n---\nWant to bring your idea to life? Book a free consultation with our team:\nhttps://iroid.com/contact\n\nBest regards,\niRoid Solutions Team`;

  const variables = {
    name: leadName || 'Founder',
    overallScore: scores.overallScore ?? 'N/A',
    ideaClarity: scores.ideaClarity ?? 'N/A',
    marketRisk: scores.marketRisk ?? 'N/A',
    mvpFeasibility: scores.mvpFeasibility ?? 'N/A',
    monetizationFit: scores.monetizationFit ?? 'N/A',
    developmentComplexity: scores.developmentComplexity ?? 'N/A',
    resultType: resultType || 'N/A',
    recommendedMvp: scores.recommendedMvp || '',
    featuresToAvoid: scores.featuresToAvoid || '',
    suggestedTech: scores.suggestedTech || '',
  };

  const subject = template
    ? renderTemplate(template.subject, variables)
    : defaultSubject;

  const htmlBody = template
    ? renderTemplate(template.body, variables)
    : renderTemplate(defaultBody, variables);

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: leadEmail,
    subject,
    html: htmlBody.replace(/\n/g, '<br>'),
    text: htmlBody,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

/**
 * Send sales notification email to the iRoid team.
 */
const sendSalesNotification = async (leadData, scores, resultType) => {
  let template = await EmailTemplate.findOne({
    where: { name: 'sales_notification', isActive: true },
  });

  const defaultSubject = `New Lead: ${leadData.fullName || 'Unknown'} - ${resultType || 'N/A'}`;
  const defaultBody = `New lead captured!\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nIdea: {{ideaName}}\nBudget: {{budget}}\nTimeline: {{timeline}}\nReadiness: {{readiness}}\nLead Score: {{leadScore}}\n\nValidation Scores:\nOverall: {{overallScore}}/100\nIdea Clarity: {{ideaClarity}}/100\nMarket Risk: {{marketRisk}}/100\nMVP Feasibility: {{mvpFeasibility}}/100\nMonetization Fit: {{monetizationFit}}/100\nDevelopment Complexity: {{developmentComplexity}}/100\n\nResult Type: {{resultType}}\n\n---\nCheck the admin panel for full details.`;

  const variables = {
    name: leadData.fullName || 'N/A',
    email: leadData.email || 'N/A',
    phone: leadData.whatsapp || 'N/A',
    ideaName: leadData.ideaName || 'N/A',
    budget: leadData.expectedBudget || 'N/A',
    timeline: leadData.expectedTimeline || 'N/A',
    readiness: leadData.readiness || 'N/A',
    leadScore: leadData.leadScore || 'N/A',
    overallScore: scores.overallScore ?? 'N/A',
    ideaClarity: scores.ideaClarity ?? 'N/A',
    marketRisk: scores.marketRisk ?? 'N/A',
    mvpFeasibility: scores.mvpFeasibility ?? 'N/A',
    monetizationFit: scores.monetizationFit ?? 'N/A',
    developmentComplexity: scores.developmentComplexity ?? 'N/A',
    resultType: resultType || 'N/A',
  };

  const subject = template
    ? renderTemplate(template.subject, variables)
    : defaultSubject;

  const htmlBody = template
    ? renderTemplate(template.body, variables)
    : renderTemplate(defaultBody, variables);

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: process.env.SALES_EMAIL || process.env.EMAIL_USER,
    subject,
    html: htmlBody.replace(/\n/g, '<br>'),
    text: htmlBody,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = {
  sendUserReport,
  sendSalesNotification,
};
