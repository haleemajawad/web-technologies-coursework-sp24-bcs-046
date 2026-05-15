const express=require("express");   
const router=express.Router();
const User=require("../models/User");
const bcrypt=require("bcryptjs");
router.get("/register",function(req,res){
    res.render("register",{ layout: false });
}
);
router.post("/register",async function(req,res){
    try{
 const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
     if(!name || !email || !password){
        req.flash("error", "All fields are required");
        return res.render("register", { layout: false, error: "All fields are required" });
    }
     if(password.length<6){
        req.flash("error", "Password must be at least 6 characters");
        return res.render("register", { layout: false, error: "Password must be at least 6 characters" });
    }
   const existingUser=await User.findOne({email});
      if(existingUser){
        req.flash("error", "Email already registered");
        return res.render("register", { layout: false, error: "Email already registered" });
      }
      else{
       const hashPassword=bcrypt.hashSync(password,10);
      await User.create({ name, email, password: hashPassword }); 
        req.flash("success", "Registration successful");
        res.redirect("/login");
      }
   
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }
   
   
    
}
);

router.get("/login",function(req,res){
    res.render("login", { layout: false });
});
router.post("/login",async function(req,res){
const email=req.body.email;
const password=req.body.password;
try{
    const user=await User.findOne({email});
    if(!user){
        req.flash("error", "Invalid email or password");
        return res.render("login", { layout: false, error: "Invalid email or password" });
    }
    else{
        const ismatch= await bcrypt.compare(password,user.password);
        if (!ismatch){
            req.flash("error", "Invalid email or password");
            return res.render("login", { layout: false, error: "Invalid email or password" });

        }
        else{
            req.session.user = { id: user._id, name: user.name, role: user.role };
            req.flash("success", `Welcome back, ${user.name}!`);
            res.redirect("/");
        }
    }
}
catch(err){
    console.log(err);
    res.status(500).send("Server error");
}
});

router.post("/logout",function(req,res){
    req.session.destroy(function() {
    res.redirect("/login");
});
});

module.exports = router;