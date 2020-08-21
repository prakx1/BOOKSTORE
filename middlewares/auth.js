module.exports = function (req, res, next) {
    console.log("User is  " + req.session.user);
    if (!req.session.user) {
        res.render('index', {
            title: "Please log in to proceed further",
            route: "login"
        });

    } else {
        if (req.session.user === 'authenticated') {
            //User is authenticated,access  allowed to protected routes.
            next();
        } else {
            res.render('index', {
                title: "Please log in to proceed ",
                route: "login",

            });
        }


    }
};