import db from '../models/index';

//
const getGroupWithRoles = async (user) => {
    // From Group x to find all roles of x
    let roles = await db.Group.findAll({
        attributes: ["id", "name", "description"],
        where: { id: user.groupId },
        include: {
            model: db.Role,
            attributes: ["id", "url", "description"],
            through: { attributes: [] }
        },
        // raw: true,
        // nest: true,
    });
    return roles ? roles : [];
}
module.exports = {
    getGroupWithRoles,
}