import Membership from "../../models/Membership.js";

class MemberService {
  /**
   * Register a new member
   * @param {Object} memberData
   * @returns {Object} saved member
   */
  async registerMember(memberData) {
    try {
      const newMember = await Membership.create(memberData);
      return newMember;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all registered members
   * @returns {Array} members list
   */
  async getAllMembers() {
    try {
      const members = await Membership.findAll({
        order: [["createdAt", "DESC"]],
      });
      return members;
    } catch (error) {
      throw error;
    }
  }
}

export default new MemberService();
