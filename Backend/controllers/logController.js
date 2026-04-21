import AuditLog from "../models/AuditLog.js";

export const getLogs = async (req, res) => {
  let logs;

  if (req.user.role === "admin") {
    logs = await AuditLog.find();
  } else if (req.user.role === "editor") {
    logs = await AuditLog.find({ userId: req.user.id });
  } else {
    return res.status(403).json({ msg: "Forbidden" });
  }

  res.json(logs);
};