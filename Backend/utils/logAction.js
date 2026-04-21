import AuditLog from "../models/AuditLog.js";

const logAction = async (userId, action, articleId) => {
  await AuditLog.create({
    userId,
    action,
    articleId
  });
};

export default logAction;