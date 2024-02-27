import db from '../models/index';
import { Op } from 'sequelize';

const getGroups = async () => {
    try {
        let group = [];
        group = await db.Group.findAll({
            attributes: ["id", "name", "description"],
            order: [['name', 'ASC']],
            where: {
                [Op.not]: [
                    { id: 7 },
                ]
            },
        })
        return {
            EM: 'Get all groups successfully',
            EC: 0,
            DT: group,
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
    getGroups,
}