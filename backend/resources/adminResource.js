const AdminResource = {
  user: (u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    isActive: u.isActive,
  }),

  template: (t) => ({
    id: t.id,
    name: t.name,
    subject: t.subject,
    body: t.body,
    variables: t.variables,
    isActive: t.isActive,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  }),

  weight: (w) => ({
    id: w.id,
    scoreType: w.scoreType,
    weights: w.weights,
    isActive: w.isActive,
  }),
};

module.exports = AdminResource;
