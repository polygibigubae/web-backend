import Joi from "joi";

export const registerMemberSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  woreda: Joi.string().allow("", null).optional(),
  zone: Joi.string().allow("", null).optional(),
  batchDept: Joi.string().required(),
  family: Joi.string().required(),
  role: Joi.string().required(),
  programAttending: Joi.string().allow("", null).optional(),
  notAttendingReason: Joi.string().allow("", null).optional(),
  departmentToServe: Joi.string().allow("", null).optional(),
  sundaySchoolBefore: Joi.string().required(),
  sundaySchoolLevel: Joi.string().allow("", null).optional(),
  sundaySchoolServed: Joi.string().required(),
  sundaySchoolServedDept: Joi.string().allow("", null).optional(),
});
