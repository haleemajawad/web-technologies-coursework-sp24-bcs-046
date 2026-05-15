function isLoggedIn(req,res,next){
    if (req.session.user){
        next();
    }
    else{
        req.flash("error", "Please log in to access this page");
        res.redirect("/login");
    }
}
function isAdmin(req,res,next){
    if (req.session.user && req.session.user.role === "admin"){
        next();
    }
    else{
        req.flash("error", "Access denied. Admins only.");
        res.redirect("/login");
    }
}
module.exports = { isLoggedIn, isAdmin };