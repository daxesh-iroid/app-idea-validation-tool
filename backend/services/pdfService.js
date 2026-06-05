const PDFDocument = require('pdfkit');

/**
 * Generate a PDF validation report.
 *
 * @param {Object} validationData - The Validation model instance (or plain object with scores)
 * @param {Object} leadData - The Lead model instance (or plain object with founder info)
 * @returns {Promise<Buffer>} - PDF buffer
 */
const generateReport = (validationData, leadData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const founderName = leadData?.fullName || 'Founder';
      const ideaName = validationData?.ideaName || leadData?.ideaName || 'Your App Idea';
      const scores = {
        ideaClarity: validationData?.ideaClarity ?? 0,
        marketRisk: validationData?.marketRisk ?? 0,
        mvpFeasibility: validationData?.mvpFeasibility ?? 0,
        monetizationFit: validationData?.monetizationFit ?? 0,
        developmentComplexity: validationData?.developmentComplexity ?? 0,
        overallScore: validationData?.overallScore ?? 0,
      };
      const resultType = validationData?.resultType || 'needs_validation';
      const recommendedMvp = validationData?.recommendedMvp || '';
      const featuresToAvoid = validationData?.featuresToAvoid || '';
      const suggestedTech = validationData?.suggestedTech || '';
      const strengths = validationData?.strengths || '';
      const weaknesses = validationData?.weaknesses || '';

      // ─── Helper: Draw a score bar ────────────────────────────────
      const drawScoreBar = (label, score, y, color) => {
        const barWidth = 200;
        const barHeight = 12;
        const x = 250;

        // Label
        doc.fontSize(11).fillColor('#334155').text(label, 50, y + 1);

        // Background bar
        doc.roundedRect(x, y, barWidth, barHeight, 4).fill('#E2E8F0');

        // Filled bar
        const fillWidth = Math.max(0, (score / 100) * barWidth);
        if (fillWidth > 0) {
          doc.roundedRect(x, y, fillWidth, barHeight, 4).fill(color);
        }

        // Score text
        doc.fontSize(10).fillColor('#1E293B').text(`${score}/100`, x + barWidth + 10, y + 1);

        return y + 22;
      };

      // ─── Header ──────────────────────────────────────────────────
      doc.rect(0, 0, doc.page.width, 80).fill('#2563EB');

      doc.fillColor('#FFFFFF')
        .fontSize(24)
        .font('Helvetica-Bold')
        .text('iRoid Solutions', 50, 18);

      doc.fontSize(12)
        .font('Helvetica')
        .text('App Idea Validation Report', 50, 50);

      // Date on right
      const reportDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      });
      doc.fontSize(10)
        .text(reportDate, 420, 50, { align: 'right', width: 130 });

      // ─── Founder & Idea Info ─────────────────────────────────────
      let y = 110;

      doc.fillColor('#0F172A')
        .fontSize(16)
        .font('Helvetica-Bold')
        .text(ideaName, 50, y);

      y += 24;

      doc.fontSize(11)
        .font('Helvetica')
        .fillColor('#475569')
        .text(`Prepared for: ${founderName}`, 50, y);

      y += 30;

      // Divider
      doc.moveTo(50, y).lineTo(545, y).stroke('#E2E8F0');
      y += 20;

      // ─── Overall Score ───────────────────────────────────────────
      doc.fillColor('#0F172A')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Overall Score', 50, y);

      y += 24;

      // Big score circle
      const overallColor = scores.overallScore >= 70 ? '#059669'
        : scores.overallScore >= 50 ? '#D97706' : '#DC2626';

      doc.circle(110, y + 25, 30).fill(overallColor);
      doc.fillColor('#FFFFFF')
        .fontSize(18)
        .font('Helvetica-Bold')
        .text(String(scores.overallScore), 80, y + 18, { width: 60, align: 'center' });

      // Result type badge
      const resultLabel = resultType.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      doc.fontSize(12)
        .font('Helvetica-Bold')
        .fillColor(overallColor)
        .text(resultLabel, 155, y + 18);

      y += 75;

      // Divider
      doc.moveTo(50, y).lineTo(545, y).stroke('#E2E8F0');
      y += 20;

      // ─── Individual Scores ───────────────────────────────────────
      doc.fillColor('#0F172A')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Score Breakdown', 50, y);

      y += 28;

      y = drawScoreBar('Idea Clarity', scores.ideaClarity, y, '#2563EB');
      y = drawScoreBar('Market Risk', scores.marketRisk, y, '#DC2626');
      y = drawScoreBar('MVP Feasibility', scores.mvpFeasibility, y, '#059669');
      y = drawScoreBar('Monetization Fit', scores.monetizationFit, y, '#7C3AED');
      y = drawScoreBar('Development Complexity', scores.developmentComplexity, y, '#D97706');

      y += 15;

      // Divider
      doc.moveTo(50, y).lineTo(545, y).stroke('#E2E8F0');
      y += 20;

      // ─── Strengths ───────────────────────────────────────────────
      if (y > 650) { doc.addPage(); y = 50; }

      doc.fillColor('#0F172A')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Strengths', 50, y);

      y += 22;

      doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#334155');

      if (Array.isArray(strengths) && strengths.length > 0) {
        for (const s of strengths) {
          doc.text(`•  ${s}`, 60, y, { width: 470 });
          y += 16;
        }
      } else if (typeof strengths === 'string' && strengths) {
        doc.text(strengths, 60, y, { width: 470 });
        y += 30;
      } else {
        doc.text('No major strengths identified yet.', 60, y);
        y += 20;
      }

      y += 15;

      // ─── Risks / Weaknesses ──────────────────────────────────────
      if (y > 650) { doc.addPage(); y = 50; }

      doc.fillColor('#0F172A')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Risks & Weaknesses', 50, y);

      y += 22;

      doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#334155');

      if (Array.isArray(weaknesses) && weaknesses.length > 0) {
        for (const w of weaknesses) {
          doc.text(`•  ${w}`, 60, y, { width: 470 });
          y += 16;
        }
      } else if (typeof weaknesses === 'string' && weaknesses) {
        doc.text(weaknesses, 60, y, { width: 470 });
        y += 30;
      } else {
        doc.text('No major risks identified.', 60, y);
        y += 20;
      }

      y += 15;

      // Divider
      doc.moveTo(50, y).lineTo(545, y).stroke('#E2E8F0');
      y += 20;

      // ─── MVP Recommendation ──────────────────────────────────────
      if (y > 620) { doc.addPage(); y = 50; }

      doc.fillColor('#0F172A')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('MVP Recommendation', 50, y);

      y += 22;

      doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#334155')
        .text(recommendedMvp || 'No specific recommendation available.', 60, y, { width: 470 });

      y += 45;

      // ─── Features to Build / Avoid ───────────────────────────────
      if (y > 620) { doc.addPage(); y = 50; }

      doc.fillColor('#0F172A')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Features to Avoid in v1', 50, y);

      y += 22;

      doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#334155')
        .text(featuresToAvoid || 'No specific features to avoid.', 60, y, { width: 470 });

      y += 45;

      // ─── Suggested Tech Stack ────────────────────────────────────
      if (y > 620) { doc.addPage(); y = 50; }

      doc.fillColor('#0F172A')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Suggested Tech Stack', 50, y);

      y += 22;

      doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#334155')
        .text(suggestedTech || 'No specific tech suggestions available.', 60, y, { width: 470 });

      y += 50;

      // ─── Consultation CTA ────────────────────────────────────────
      if (y > 620) { doc.addPage(); y = 50; }

      doc.roundedRect(50, y, 495, 80, 8).fill('#EFF6FF').stroke('#BFDBFE');

      doc.fillColor('#1E40AF')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Ready to Build Your MVP?', 70, y + 15);

      doc.fillColor('#334155')
        .fontSize(10)
        .font('Helvetica')
        .text(
          'Book a free consultation with the iRoid Solutions team. We\'ll help you turn your validated idea into a real product.',
          70, y + 38, { width: 380 }
        );

      doc.fontSize(10)
        .font('Helvetica-Bold')
        .fillColor('#2563EB')
        .text('https://iroid.com/contact', 70, y + 60);

      // ─── Footer ──────────────────────────────────────────────────
      doc.fontSize(8)
        .fillColor('#94A3B8')
        .text(
          '© ' + new Date().getFullYear() + ' iRoid Solutions. This report was generated automatically by the App Idea Validation Tool.',
          50, doc.page.height - 50, { width: 495, align: 'center' }
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  generateReport,
};
