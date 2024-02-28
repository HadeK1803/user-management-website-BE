import roleApiService from '../services/roleApiService';

// [GET] /api/v1/role/read
const readFunc = async (req, res) => {
    try {
        //Get all users without pagination
        let data = await roleApiService.getAllRoles();

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
    catch (err) {
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: '',
        })
    }
}

// [POST] /api/v1/role/create
const createFunc = async (req, res) => {
    try {
        let data = await roleApiService.createNewRole(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (err) {
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: '',
        })
    }
}
// [PUT] /api/v1/role/update
const updateFunc = async (req, res) => {
    try {
        let data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (err) {
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: '',
        })
    }
}
// [DELETE] /api/v1/role/delete
const deleteFunc = async (req, res) => {
    try {
        let data = await roleApiService.deleteRole(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (err) {
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: '',
        })
    }
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}