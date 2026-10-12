import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Membership = sequelize.define(
  "Membership",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    woreda: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    batchDept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    family: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    programAttending: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notAttendingReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    departmentToServe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sundaySchoolBefore: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sundaySchoolLevel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sundaySchoolServed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sundaySchoolServedDept: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "memberships",
    timestamps: true,
  },
);

export default Membership;
