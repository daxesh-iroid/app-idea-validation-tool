const LeadResource = {
  single: (l) => ({
    id: l.id,
    validationId: l.validationId,
    fullName: l.fullName,
    email: l.email,
    whatsapp: l.whatsapp,
    country: l.country,
    companyName: l.companyName,
    ideaName: l.ideaName,
    expectedBudget: l.expectedBudget,
    expectedTimeline: l.expectedTimeline,
    readiness: l.readiness,
    leadScore: l.leadScore,
    leadStatus: l.leadStatus,
    salesNotes: l.salesNotes,
    followUpDate: l.followUpDate,
    emailSent: l.emailSent,
    reportDownloaded: l.reportDownloaded,
    createdAt: l.createdAt,
    updatedAt: l.updatedAt,
  }),

  list: (leads) => leads.map(LeadResource.single),
};

module.exports = LeadResource;
