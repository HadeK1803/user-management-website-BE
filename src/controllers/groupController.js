import groupService from "../services/groupService";

//[GET] /api/v1/group/read
const readFunc = async (req, res) => {
    try {
        let data = await groupService.getGroups();

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: '',
        })
    }
}
module.exports = {
    readFunc,
}