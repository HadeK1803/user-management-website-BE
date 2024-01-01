import userService from '../services/userService';

const handleHome = (req, res) => {
    return res.render("home.ejs");
}
// [GET] /user
const handleUser = async (req, res) => {
    //Model => get all users data from database
    let userList = await userService.getUserList();

    return res.render("user.ejs", { userList: userList });
}

// [POST] /user/create
const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    userService.createNewUser(email, username, password);
    return res.redirect('/user');
}
// [POST] /delete-user
const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect('/user');
}

// [GET] /update-user/:id
const handleUpdateUserPage = async (req, res) => {
    let user = await userService.getUserById(req.params.id);
    let userData = {};
    // if (user && user.length > 0) {
    //     userData = user[0];
    // }
    userData = user;
    res.render('update-user.ejs', { userData: userData });
}

// [POST] /update-user
const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userService.updateUser(email, username, id);

    return res.redirect('/user');

}
module.exports = {
    handleHome: handleHome,
    handleUser: handleUser,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUserPage: handleUpdateUserPage,
    handleUpdateUser: handleUpdateUser

}