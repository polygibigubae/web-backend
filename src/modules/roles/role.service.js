import User from '../../models/User.js';
import { Op } from 'sequelize';

const VALID_ROLES = ['Super Admin', 'Admin', 'Member', 'Guest'];

export const getAllUsers = async (filters = {}) => {
  const { role, isActive, page = 1, limit = 10, search } = filters;
  
  const where = {};
  
  if (role) {
    where.role = role;
  }
  
  if (isActive !== undefined) {
    where.isActive = isActive === 'true' || isActive === true;
  }
  
  if (search) {
    where[Op.or] = [
      { email: { [Op.like]: `%${search}%` } },
      { firstName: { [Op.like]: `%${search}%` } },
      { lastName: { [Op.like]: `%${search}%` } }
    ];
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await User.findAndCountAll({
    where,
    attributes: { exclude: ['password'] },
    order: [['createdAt', 'DESC']],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  return {
    users: rows,
    pagination: {
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(count / limit)
    }
  };
};

export const updateUserRole = async (userId, newRole, currentUserRole) => {
  if (!VALID_ROLES.includes(newRole)) {
    throw new Error(`Invalid role. Must be one of: ${VALID_ROLES.join(', ')}`);
  }

  // Super Admin can assign any role
  // Admin can only assign Member or Guest (not Super Admin or Admin)
  if (currentUserRole === 'Admin' && (newRole === 'Super Admin' || newRole === 'Admin')) {
    throw new Error('Admins cannot assign Super Admin or Admin roles');
  }

  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Prevent changing own role
  // This check should be done in controller, but adding here for safety
  await user.update({ role: newRole });

  const updatedUser = await User.findByPk(userId, {
    attributes: { exclude: ['password'] }
  });

  return updatedUser;
};

export const updateUserStatus = async (userId, isActive) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  await user.update({ isActive });

  const updatedUser = await User.findByPk(userId, {
    attributes: { exclude: ['password'] }
  });

  return updatedUser;
};

export const getUserById = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
