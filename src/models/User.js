import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  woredaOfOrigin: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  zoneOfOrigin: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  batchAndDepartment: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  familyNumber: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  gibiGubaeServiceLevel: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  attendedProgram: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  reasonForNotParticipating: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  programImprovementSuggestions: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  learnedInSundaySchool: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  sundaySchoolLevel: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  servedInSundaySchool: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  sundaySchoolServiceDepartment: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  departmentToServeInGibiGubae: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  feedbackOnFamilyStructure: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Super Admin', 'Admin', 'Member', 'Guest'),
    allowNull: false,
    defaultValue: 'Guest'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: true
});

export default User;
