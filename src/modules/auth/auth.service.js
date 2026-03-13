import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import { generateToken } from '../../utils/token.js';

export const signup = async (userData) => {
  const { 
    email, password, fullName, phoneNumber, woredaOfOrigin, zoneOfOrigin,
    batchAndDepartment, familyNumber, gibiGubaeServiceLevel, attendedProgram,
    reasonForNotParticipating, programImprovementSuggestions, learnedInSundaySchool,
    sundaySchoolLevel, servedInSundaySchool, sundaySchoolServiceDepartment,
    departmentToServeInGibiGubae, feedbackOnFamilyStructure, role = 'Guest' 
  } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const user = await User.create({
    email,
    password: hashedPassword,
    fullName,
    phoneNumber,
    woredaOfOrigin,
    zoneOfOrigin,
    batchAndDepartment,
    familyNumber,
    gibiGubaeServiceLevel,
    attendedProgram,
    reasonForNotParticipating,
    programImprovementSuggestions,
    learnedInSundaySchool,
    sundaySchoolLevel,
    servedInSundaySchool,
    sundaySchoolServiceDepartment,
    departmentToServeInGibiGubae,
    feedbackOnFamilyStructure,
    role
  });

  // Generate token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  // Remove password from response
  const userResponse = user.toJSON();
  delete userResponse.password;

  return {
    user: userResponse,
    token
  };
};

export const login = async (email, password) => {
  // Find user
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if user is active
  if (!user.isActive) {
    throw new Error('Account is inactive. Please contact administrator.');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  // Remove password from response
  const userResponse = user.toJSON();
  delete userResponse.password;

  return {
    user: userResponse,
    token
  };
};

export const getProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
