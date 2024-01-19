import db from '../models/index';

const getGroups = async () => {
    try {
        let group = [];
        group = await db.Group.findAll({
            attributes: ["id", "name", "description"],
            order: [['name', 'ASC']],
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