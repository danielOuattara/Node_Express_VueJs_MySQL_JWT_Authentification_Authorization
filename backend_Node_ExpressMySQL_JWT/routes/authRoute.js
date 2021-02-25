
const  { verifySignUp} = require('./../middleware');
const controller = require('./../controllers/authController.js');

module.exports = (app) => {
    app.use ((req, res, next) => {
        res.header (
            "Acces-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post ( "/api/auth/signup",  [verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted ],  controller.signup );

    app.post("/api/auth/signin", controller.signin)
}