import db from '../models/index';
import { Op } from 'sequelize';

const createNewRole = async (roles) => {
    try {
        //get current roless
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
module.exports = {
    createNewRole
}