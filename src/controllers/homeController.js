const handleHome = (req, res) => {
    return res.render("home.ejs");
}
const handleAbout = (req, res) => {
    return res.json("I'm HadeK");
}
module.exports = {
    handleHome: handleHome,
    handleAbout: handleAbout

}