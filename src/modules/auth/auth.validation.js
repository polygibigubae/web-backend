export const validateSignup = (req, res, next) => {
  const { 
    email, password, fullName, phoneNumber, batchAndDepartment, 
    familyNumber, gibiGubaeServiceLevel, attendedProgram, 
    programImprovementSuggestions, learnedInSundaySchool, 
    servedInSundaySchool, feedbackOnFamilyStructure 
  } = req.body;

  const errors = [];

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    errors.push('Full name is required');
  }

  if (!phoneNumber || typeof phoneNumber !== 'string' || !phoneNumber.trim()) {
    errors.push('Phone number is required');
  }

  if (!batchAndDepartment || typeof batchAndDepartment !== 'string' || !batchAndDepartment.trim()) {
    errors.push('Batch and Department is required');
  }

  if (!familyNumber || typeof familyNumber !== 'string' || !familyNumber.trim()) {
    errors.push('Family number is required');
  }

  if (!gibiGubaeServiceLevel || typeof gibiGubaeServiceLevel !== 'string' || !gibiGubaeServiceLevel.trim()) {
    errors.push('Gibi Gubae service level is required');
  }

  if (!attendedProgram || typeof attendedProgram !== 'string' || !attendedProgram.trim()) {
    errors.push('Attended program information is required');
  }

  if (!programImprovementSuggestions || typeof programImprovementSuggestions !== 'string' || !programImprovementSuggestions.trim()) {
    errors.push('Program improvement suggestions are required');
  }

  if (!learnedInSundaySchool || typeof learnedInSundaySchool !== 'string' || !learnedInSundaySchool.trim()) {
    errors.push('Information about previous Sunday School learning is required');
  }

  if (!servedInSundaySchool || typeof servedInSundaySchool !== 'string' || !servedInSundaySchool.trim()) {
    errors.push('Information about previous Sunday School service is required');
  }

  if (!feedbackOnFamilyStructure || typeof feedbackOnFamilyStructure !== 'string' || !feedbackOnFamilyStructure.trim()) {
    errors.push('Feedback on family structure is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email is required');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};
