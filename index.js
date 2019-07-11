const express=require('express');
const app=express();
const session=require('express-session');

var socket=require('socket.io');

const MongoDBStore=require('connect-mongodb-session')(session);
const path=require('path');
var csrf=require('csurf');
var EMail;
var csrfprotection=csrf();
const nodemailer=require('nodemailer');
const bodyParser=require('body-parser');
const Paypal=require('./controller/paypal.js');
const Add_product=require('./controller/Add_product.js');
const passportx=require('passport');
const passport=require('./modal/passport.js');
const order=require('./controller/Add_product.js');
const Admin_product=require('./controller/Add_product.js');
const cart=require('./controller/Add_product.js');
const product=require('./controller/Add_product.js');
const shop=require('./controller/Add_product.js');
const home=require('./controller/Add_product.js');
const signup=require('./controller/Add_product.js');
let  add_product=require('./controller/Add_product.js');
var texsting=require('./index.js');
const admin_check_product_control=require('./controller/admin_controller.js');
var mongoConnect=require('./util/database.js').mongoConnect;
var products=require('./modal/all_file_data.js');//product data
var User=require('./modal/user.js');
// var port=process.env.PORT ||5060;
app.set("view engine","pug");
app.set("views","view");

var store = new MongoDBStore({
  uri: 'mongodb+srv://darshitgajjars:Zxcvbnm@12345)@cluster0-xlx84.mongodb.net/e-commerce?retryWrites=true',
  collection: 'mySessions',
});
app.use(session({
	secret:'Gajjar darshit Hasmukhbhai',/*any text given sigin time e hash code ma hash code rupe cookie ma te store te thase production ma long string hovi joie*/
	resave:false,/*aa em batave upcoming req ma te session te save thato nathi*/
	saveUninitialized:false,/*the session cookie will not be set on the browser unless the session is modified.*/
	store:store,

}));




// app.use(csrfprotection);//csrf protected website
app.use(passportx.initialize());
app.use(passportx.session());


app.use("/socket",express.static(path.join(__dirname,"socketIo/")));
app.use("/mdB",express.static(path.join(__dirname,"mdBootstrap/")));
app.use("/md",express.static(path.join(__dirname,"MDBPro/")));
app.use("/css",express.static(path.join(__dirname,"css/css/")));
app.use("/bootstrap",express.static(path.join(__dirname,"node_modules/bootstrap/dist/css/")));
app.use("/bootstrap-js",express.static(path.join(__dirname,"node_modules/bootstrap/dist/js/")));
app.use("/jquery",express.static(path.join(__dirname,"node_modules/jquery/dist/")));
app.use("/anime-js",express.static(path.join(__dirname,"node_modules/anime/")));
app.use('/notification',express.static(path.join(__dirname,"node_modules/toastr/")));
app.use(bodyParser.urlencoded({
  extended:true}));
//social service//Gajjar ready to rock or not
app.get('/passport-google',passportx.authenticate('google',{
	scope:['email'],
}));
app.get('/success_payment',Paypal.paypal_success_controller);
app.get('/cancel_payment',Paypal.paypal_cancel_controller);
app.post("/paypal",Paypal.paypal_money_controller);
app.post("/admin_product_controll_check",admin_check_product_control.admin_products);
app.get('/github',passportx.authenticate('github'));
app.get('/instagramx',passportx.authenticate('instagram'));
app.post('/admin_products_add',admin_check_product_control.admin_products_kem);
app.post("/signup-enter",Add_product.signup_enter_controller);
app.get("/Products",csrfprotection,Add_product.add_products_controller);

app.post("/add_Product_data",csrfprotection,Add_product.add_product_data_controller);
app.get("/Admin_product",csrfprotection,Admin_product.admin_product_controller);
app.get("/Admin_product/:id",csrfprotection,Admin_product.admin_edit_product_controller);
app.post("/admin_product_update_data/:Id",csrfprotection,Admin_product.admin_update_product_controller);
app.get("/Admin_delete_product/:iid",csrfprotection,Admin_product.admin_delete_product_controller);
let sk=215;

app.get("/chat",csrfprotection,add_product.chat);
app.get('/Product_delete/:deleteid',Add_product.delete_product);

app.get("/signUp",signup.SignUp_controller);
app.get("/order",csrfprotection,order.order_controller);
app.get("/Add_product",csrfprotection,add_product.add_product_controller);
app.post("/signin",add_product.signin_controller);
app.get("/LOGOUT",csrfprotection,Add_product.Logout_controller);//change
app.get("/mypassword",add_product.social_service);
app.post('/socialservice_enter',add_product.social_service_signup);
//serializeUser and deserializeUser basically use for session create and destory so identify unique user
//serialize call when user click 

passportx.serializeUser(function(user, done) {
  done(null, user);
})
passportx.deserializeUser(function(user, done) {
  done(null, user);
});


app.get('/gajjurock', 
  passportx.authenticate('google'),
  (req,res)=>{
    
    res.redirect('/mypassword');
  });
app.get('/instagram', 
  passportx.authenticate('instagram'),
  (req,res)=>{

    res.redirect('/mypassword');
  });

app.get('/gajjurocks',passportx.authenticate('github'),
  (req,res)=>{
    // Successful authentication, redirect home.
    // console.log('hello->',EMail);
    res.redirect('/mypassword');
  });
app.get('/instagram', 
  passportx.authenticate('instagram'),
  (req,res)=>{
    // Successful authentication, redirect home.
    // console.log('hello->',EMail);
    res.redirect('/');
  });
// app.use('/gajjurock',passportx.authenticate('google',{
// 	successRedirect: '/',failureRedirect: '/login' 
// },(req,res,next)=>{
// 	res.redirect('/');
// }));
app.get("/product",csrfprotection,product.products_controller);
app.get("/product/:productId",csrfprotection,product.product_controller);
app.get("/shop",csrfprotection,shop.shop_controller);
app.get("/shoping/:shopId",shop.shop_mongo_controller);

app.get("/",home.home_controller);
app.use((req,res,next)=>{
	res.status(404).render("404",{error:"url is wrong"});
})
var port=process.env.PORT ||4040;
var server;
mongoConnect(() => {
    server=app.listen(port, (wer) => console.log("i am new"));
    var io=socket(server);
    io.on('connection',(socket)=>{
      socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
      });
    });  
});


