const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multerConfig = require('./config/multerConfig');

app.use(cookieParser());

const secretKey = "SECRETKEY";

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const userModel = require('./Models/user');

// Protected Route
const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;
    if(token == "" || !token){
        return res.redirect('login');
    }
    else{
        let data = jwt.verify(req.cookies.token, secretKey);
        req.user = data;
    }
    next(); 
};

const isUser = async (request, response) => {
    let token = request.cookies.token;
    if(token == "" || !token){
        return null;
    }
    else{
        try {
            let data = jwt.verify(request.cookies.token, secretKey);
            let user = await userModel.findOne({email: data.email});
            return user; 
        } catch (error) {
            console.log("JWT verification error:", error);
            return null;
        }
    }
}

// Initial Route
app.get('/', async (req, res) => {
    const user = await isUser(req, res);
    return res.render('index', {user});
});

// Signup routes
app.get('/signup', (req, res) => {
    res.render('signup');
}); 

app.post('/signup', multerConfig.single('profilepic'), async (req, res) => {

    const {username, fullname, email, password, profilepic} = req.body;
    const preUser = await userModel.findOne({email});
    
    if(preUser) return res.status(500).send("An account already exists with this email!");
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const userImage = req.file? req.file.filename: profilepic;

            let newUser = await userModel.create({
                username, 
                fullname,
                email,
                password: hash,
                profilepic: userImage
            });

            const token = jwt.sign({email, userId: newUser._id}, secretKey);
            res.cookie('token', token);
            res.redirect('/profile');
        })
    });
});

// Login Routes
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const userOrNot = await userModel.findOne({email});
    if(!userOrNot) return res.send('Email or password is incorrect');

    bcrypt.compare(password, userOrNot.password, (err, result) => {
        if(result){
            const token = jwt.sign({email: email, userId: userOrNot._id}, secretKey);
            res.cookie('token', token);
            res.redirect('/');
        }
        else{
            res.send("Email or password is incorrect");
        }
    });
});  

// Profile Route
app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    res.render("profile", {user});
});

// Logout route
app.get('/logout', isLoggedIn, async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

// Course details page
app.get('/courseDetail', async (req, res) => { 
    const user = await isUser(req, res);   
    return res.render('courseDetail', {user});
});

// cart details page
app.get("/cart", isLoggedIn, async (req, res) => {
    const user = await isUser(req, res);   
    user.password = "";
    await user.save();
    console.log(user);
    res.render("cart", {user});
});

// Course buy - Version-2
// app.get("/learnings", isLoggedIn, async (req, res) => {
//     const user = await isUser(req, res);   
//     user.password = "";
//     await user.save();
//     res.render("learnings", {user});
// });

app.listen(3200);