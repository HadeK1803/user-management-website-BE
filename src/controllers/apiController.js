import loginRegisterService from "../services/loginRegisterService"
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}
const handleRegister = async (req, res) => {
    try {
        // Validate input
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missed required parameters',
                EC: 1,
                DT: '',
            })
        }
        if (!req.body.password || req.body.password.length < 8) {
            return res.status(200).json({
                EM: 'Password must have at least 8 characters',
                EC: 2,
                DT: '',
            })
        }
        //service create user
        let data = await loginRegisterService.handleRegister(req.body);

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
const handleLogin = async (req, res) => {
    try {
        // Validate input
        if (!req.body.valueLogin) {
            return res.status(200).json({
                EM: 'Missed required parameters',
                EC: 1,
                DT: '',
            })
        }
        if (!req.body.password || req.body.password.length < 8) {
            return res.status(200).json({
                EM: 'Password must have at least 8 characters',
                EC: 2,
                DT: '',
            })
        }
        //service login user
        let data = await loginRegisterService.handleLoginUser(req.body);

        //Set cookie
        if (data && data.DT && data.DT.accessToken) {
            res.cookie("jwt_token", data.DT.accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: '',
        })
    }

}



module.exports = {
    testApi: testApi,
    handleRegister: handleRegister,
    handleLogin: handleLogin,
}