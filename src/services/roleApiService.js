import db from '../models/index';
import { Op } from 'sequelize';

const createNewRole = async (roles) => {
    try {
        //get current roles
        let currentRoles = await db.Role.findAll({
            attributes: ["url", "description"],
            raw: true,
        })

        // Get the difference between two arrays 
        const persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url2 === url1));

        //create new roles
        if (persists.length > 0) {
            await db.Role.bulkCreate(persists);
            return {
                EM: `Create new ${persists.length} roles successfully`,
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: 'Nothing to create',
                EC: -1,
                DT: [],
            }
        }


    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong from service',
            EC: -2,
            DT: '',
        }
    }
}
const getAllRoles = async () => {
    try {
        let roles = [];
        roles = await db.Role.findAll({
            attributes: ["id", "url", "description"],
            order: [['id', 'DESC']],
            // raw: true,
            // nest: true
        });
        return {
            EM: "Get all roles successfully",
            EC: 0,
            DT: roles
        }
    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong from service',
            EC: -2,
            DT: '',
        }
    }
}
const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: {
                id: id,
                [Op.not]: [
                    { url: '/role/create' },
                ]
            }
        })
        if (role) {
            await db.Role.destroy({
                where: { id: id }
            })
            return {
                EM: "Role was deleted successfully",
                EC: 0,
                DT: '',
            }
        } else {
            return {
                EM: `You can not delete role '/role/create'`,
                EC: 5,
                DT: '',
            }
        }
    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong from service',
            EC: -2,
            DT: '',
        }
    }
}
const getRolesByGroupId = async (groupId) => {
    try {
        if (!groupId) {
            return {
                EM: `Not found any roles`,
                EC: -1,
                DT: [],
            }
        }
        // From Group x to find all roles of x
        let roles = await db.Group.findOne({
            attributes: ["id", "name", "description"],
            where: { id: groupId },
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            },
            // raw: true,
            // nest: true,
        });

        if (roles) {
            return {
                EM: `Get all roles with group id successfully`,
                EC: 0,
                DT: roles,
            }
        } else {
            return {
                EM: `Not found any role`,
                EC: -1,
                DT: [],
            }
        }

    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong from service',
            EC: -2,
            DT: '',
        }
    }
}

const assignRolesToGroup = async (data) => {
    try {
        // Delete all roles belong to the group
        await db.Group_Role.destroy({
            where: { groupId: +data.groupId }
        })

        // Create new roles 
        // data ={ groupId: '', [{groupId: '', roleId: ''}, {groupId: '', roleId:''}, ...rest]}
        await db.Group_Role.bulkCreate(data.groupRole);

        return {
            EM: 'Assigned roles to group successfully',
            EC: 0,
            DT: '',
        }


    } catch (err) {
        console.log(err);
        return {
            EM: 'Something is wrong from service',
            EC: -2,
            DT: '',
        }
    }
}

module.exports = {
    createNewRole,
    getAllRoles,
    deleteRole,
    getRolesByGroupId,
    assignRolesToGroup
}