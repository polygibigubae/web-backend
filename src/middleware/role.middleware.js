export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions. Required role: ' + allowedRoles.join(' or ')
      });
    }

    next();
  };
};

// Convenience middleware for specific roles
export const requireSuperAdmin = authorize('Super Admin');
export const requireAdmin = authorize('Super Admin', 'Admin');
export const requireMember = authorize('Super Admin', 'Admin', 'Member');
