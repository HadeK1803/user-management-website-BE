import userApiService from '../services/userApiService'

// [GET] /api/v1/user/read
const readFunc = async (req, res) => {
    try {
        //Get users with pagination
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await userApiService.getUsersWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })

        } else {
            //Get all users without pagination
            let data = await userApiService.getAllUsers();

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
    } catch (err) {
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: '',
        })
    }
}

// [POST] /api/v1/user/create
const createFunc = (req, res) => {
    try {
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
// [PUT] /api/v1/user/PUT
const updateFunc = (req, res) => {
    try {
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
// [DELETE] /api/v1/user/delete
const deleteFunc = (req, res) => {
    try {
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
    readFunc, createFunc, updateFunc, deleteFunc,
}