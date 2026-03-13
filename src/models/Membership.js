// Membership model - reserved for future use
// This model is intentionally left empty as membership functionality
// will be implemented separately

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Membership = sequelize.define('Membership', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
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
  tableName: 'memberships',
  timestamps: true
});

export default Membership;
