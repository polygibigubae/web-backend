import memberService from "./member.service.js";
import { registerMemberSchema } from "./member.validation.js";

class MemberController {
  /**
   * @desc    Register a new member
   * @route   POST /api/members/register
   * @access  Public
   */
  async registerMember(req, res, next) {
    try {
      // Validate request body
      const { error, value } = registerMemberSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.details.map((err) => err.message),
        });
      }

      // Create new member record
      const member = await memberService.registerMember(value);

      return res.status(201).json({
        success: true,
        message: "Member registered successfully",
        data: member,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Get all members
   * @route   GET /api/members
   * @access  Private/Admin (todo)
   */
  async getMembers(req, res, next) {
    try {
      const members = await memberService.getAllMembers();

      return res.status(200).json({
        success: true,
        count: members.length,
        data: members,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MemberController();
