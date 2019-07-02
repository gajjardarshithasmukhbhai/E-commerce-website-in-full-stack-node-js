const path=require('path');
let inner_data=[];
const fs=require('fs');
// let Data_conn=require("../modal/update_cart.js");
var sequelize=require('../util/database.js');
var Database=require('../modal/all_file_data.js');
var texsting=require('../index.js');
var User=require('../modal/user.js');
var Signup=require('../modal/signup.js');
let getdb=require('../util/database.js');
let mongodb=require('mongodb');
let bcrypt=require('bcryptjs');
let nodemailer=require('nodemailer');
let passportJs=require('../modal/passport.js');
let Adminproducts=require('../modal/products.js');
let transporter=nodemailer.createTransport({

host: 'smtp.gmail.com',
direct:false ,
port: 465,
secure: true,
auth:{
		user:'darshit.gajjar1998@gmail.com',
		type: 'OAuth2',
		clientId: '696016007441-gtdnqjpl3auit24qf2859efaks3t1lk2.apps.googleusercontent.com',
	    clientSecret: "XqHHv9dFyJc18qPZvkY3tZFO",
	    refreshToken:'1/-PAawTLhMi35jc5lubN-SMBVV67HjX8cua9Efq-N8vb8OpfOWs9T-tb8mS0NMfiF',
	}
});
// exports.passport_js_google=(req,res,next)=>{
//  //call passport js
// }
exports.signup_enter_controller=(req,res,next)=>{
	let email=req.body.email1;
	let password=req.body.password1;
	let retype=req.body.password2;
  let db = getdb.getDb();//call the method
  let sk=db.collection('user').find({email:email}).toArray()
  .then(users=>{
    if(users.length==0)
    {
          let wd = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

        if(wd.test(email) && (password.length>5 && password===retype))
  {
    console.log("hasmukh Gajjar");
    return bcrypt.hash(password,12)
      .then(hashPassword=>{
      let signup=new Signup(email,hashPassword,hashPassword);
      setTimeout(()=>{
        signup.save()
        .then(resolve=>{
          req.session.loggedIn=true;
          req.session.myuser=email;
          res.redirect('shop');
          let mailOptions={
              from:'darshit.gajjar1998@gmail.com',
              to:email,
              subject: `Hello user you signup`,
              html:`<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style>
    /* -------------------------------------
        INLINED WITH htmlemail.io/inline
    ------------------------------------- */
    /* -------------------------------------
        RESPONSIVE AND MOBILE FRIENDLY STYLES
    ------------------------------------- */
    @media only screen and (max-width: 620px) {
      table[class=body] h1 {
        font-size: 28px !important;
        margin-bottom: 10px !important;
      }
      table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
        font-size: 16px !important;
      }
      table[class=body] .wrapper,
            table[class=body] .article {
        padding: 10px !important;
      }
      table[class=body] .content {
        padding: 0 !important;
      }
      table[class=body] .container {
        padding: 0 !important;
        width: 100% !important;
      }
      table[class=body] .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
      }
      table[class=body] .btn table {
        width: 100% !important;
      }
      table[class=body] .btn a {
        width: 100% !important;
      }
      table[class=body] .img-responsive {
        height: auto !important;
        max-width: 100% !important;
        width: auto !important;
      }
    }
    /* -------------------------------------
        PRESERVE THESE STYLES IN THE HEAD
    ------------------------------------- */
    @media all {
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
        line-height: 100%;
      }
      .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
      }
      .btn-primary table td:hover {
        background-color: #34495e !important;
      }
      .btn-primary a:hover {
        background-color: #34495e !important;
        border-color: #34495e !important;
      }
    }
    </style>
  </head>
  <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
      <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
          <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
            <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                    <tr>
                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi there,</p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">I ma Gajjar Darshit HasmukhBhai(CEO of cismox)<br><b>you signup in my web-app</b></p>
                        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                          <tbody>
                            <tr>
                              <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                  <tbody>
                                    <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="https://darshitgajjars.herokuapp.com" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Company website</a> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;"><b>E-mail::-</b>${email}<br><b>password::-</b>${password}<br><b>Encrypted password::-</b>${hashPassword}</p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Good luck! Hope it works.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- START FOOTER -->
            <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                <tr>
                  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                    <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">cismox Company Inc, E-204 vinod Tower shrinath recedency karanagr Road,kadi</span>
                    <br> phone number 7984552350 
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                    Powered by <a href="http://htmlemail.io" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Gajjar Group</a>.
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
      </tr>
    </table>
  </body>
</html>`, 
      }
            transporter.sendMail(mailOptions,(err,data)=>{
              if(err)
              {
                console.log("darshit error avi",err);
              }
              else{
                console.log('email sent');
              }
            }); 
    
        })
        .catch(err=>{
          console.log(err);
        });
      },60);
      });
      
  }
  else{
    res.render("signup",{show:"your password is minimu 5 character"});
      res.end();

  }
    }
    else{
      res.render("signup",{show:"your are already signup "});
      res.end();

    }
  })
  .catch(err=>{
    console.log(err);
  });
	



	
	
}
exports.social_service=(req,res,next)=>{
  res.render('mypassword',{authenticated_email:passportJs.emailID});
      res.end();

}
exports.social_service_signup=(req,res,next)=>{
    let email=req.body.email;
    let password=req.body.password1;
    let retype=req.body.password2;
    let db = getdb.getDb();//call the method
  let sk=db.collection('user').find({email:email}).toArray()
  .then(users=>{
    if(users.length==0)
    {
         if(email!=null && password.length>5 && password==retype)
    {
    return bcrypt.hash(password,12)
      .then(hashPassword=>{
      let signup=new Signup(email,hashPassword,hashPassword);
      setTimeout(()=>{
        signup.save()
        .then(resolve=>{
          req.session.loggedIn=true;
          req.session.myuser=email;
          res.redirect('shop');
          let mailOptions={
              from:'darshit.gajjar1998@gmail.com',
              to:email,
              subject: `Hello user you signup`,
              html:`<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style>
    /* -------------------------------------
        INLINED WITH htmlemail.io/inline
    ------------------------------------- */
    /* -------------------------------------
        RESPONSIVE AND MOBILE FRIENDLY STYLES
    ------------------------------------- */
    @media only screen and (max-width: 620px) {
      table[class=body] h1 {
        font-size: 28px !important;
        margin-bottom: 10px !important;
      }
      table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
        font-size: 16px !important;
      }
      table[class=body] .wrapper,
            table[class=body] .article {
        padding: 10px !important;
      }
      table[class=body] .content {
        padding: 0 !important;
      }
      table[class=body] .container {
        padding: 0 !important;
        width: 100% !important;
      }
      table[class=body] .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
      }
      table[class=body] .btn table {
        width: 100% !important;
      }
      table[class=body] .btn a {
        width: 100% !important;
      }
      table[class=body] .img-responsive {
        height: auto !important;
        max-width: 100% !important;
        width: auto !important;
      }
    }
    /* -------------------------------------
        PRESERVE THESE STYLES IN THE HEAD
    ------------------------------------- */
    @media all {
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
        line-height: 100%;
      }
      .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
      }
      .btn-primary table td:hover {
        background-color: #34495e !important;
      }
      .btn-primary a:hover {
        background-color: #34495e !important;
        border-color: #34495e !important;
      }
    }
    </style>
  </head>
  <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
      <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
          <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
            <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                    <tr>
                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi there,</p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">I ma Gajjar Darshit HasmukhBhai(CEO of cismox)<br><b>you signup in my web-app</b></p>
                        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                          <tbody>
                            <tr>
                              <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                  <tbody>
                                    <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="https://darshitgajjars.herokuapp.com" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Company website</a> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;"><b>E-mail::-</b>${email}<br><b>password::-</b>${password}<br><b>Encrypted password::-</b>${hashPassword}</p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Good luck! Hope it works.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- START FOOTER -->
            <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                <tr>
                  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                    <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">cismox Company Inc, E-204 vinod Tower shrinath recedency karanagr Road,kadi</span>
                    <br> phone number 7984552350 
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                    Powered by <a href="http://htmlemail.io" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Gajjar Group</a>.
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
      </tr>
    </table>
  </body>
</html>`, 
      }
            transporter.sendMail(mailOptions,(err,data)=>{
              if(err)
              {
                console.log("darshit error avi",err);
              }
              else{
                console.log('email sent');
              }
            }); 
    
        })
        .catch(err=>{
          console.log(err);
        });
      },60);
      });

    }
    else{
        res.render("signup",{show:"your password is minimu 5 character or your email adress is wrong"});
    }  
    }
    else{
      res.render("signup",{show:"your are already signup "});
    }});
    // console.log(email,password,retype);
 
  // res.render('mypassword',{authenticated_email:passportJs.emailID});
}
exports.add_product_data_controller=(req,res,next)=>{
	console.log("hello->");
  let myuser=req.session.myuser;
  let random="";  
  var characters='ABC12344DEFGH234I334Q2344K45673XZASLMKPO08633';
   var charactersLength = characters.length;
   for ( var i = 1; i < 8; i++ ) {
      random += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

    let UserId=User.UserId(myuser)
    .then(sx=>{

      let obj=new Database(req.body.Title,req.body.Image,req.body.price,req.body.description,sx,random);
      obj.save();
      res.end();

    })
    .catch();
		
    let loggedIn=req.session.loggedIn;
    if(loggedIn)
    {
        res.redirect("/shop");
      res.end();

    }
    else{
        res.redirect("/");
      res.end();

    }
		
}
exports.order_controller=(req,res,next)=>{
  let Email=req.session.myuser;
  Adminproducts.fetchOrder(Email)
  .then(data=>{
    res.render("order",{order:data});
    res.end();
  })
  .catch(err=>{
    console.log(err);
  });
}
exports.admin_delete_product_controller=(req,res,next)=>{
	let delete_cart_id=req.params.iid;
	Database.productDelete(delete_cart_id)
	.then(e=>{
		res.redirect('/Admin_Product');
	})
	.catch(err=>{      
		console.log('not solved');
			res.end();
	
	});
}
exports.signin_controller=(req,res,next)=>{
	let email=req.body.email;
	let password=req.body.password;
		// User.saveUser(email,password)
		let sx=new User(email,password);
		sx.save()
		.then(resolve=>{
      console.log("----->>",resolve);
			if(resolve){
        req.session.loggedIn=true;
        req.session.myuser=email;
				res.redirect("/Products");//change res.redirect('Add_product');
      res.end();
							
			
			}
			else{
				res.render("index",{valid:false});
      res.end();

			}
		})
		.catch(err=>{
			console.log(err);
				res.end();		
		});
	
}
exports.Logout_controller=(req,res,next)=>{
	req.session.destroy(err=>{
		res.redirect('/');
      res.end();

	});
}
exports.admin_product_controller=(req,res,next)=>{
	// res.clearCookie('loggedIn');
	let xy=req.session.loggedIn;
  let EmailId=req.session.myuser;
	if(xy)
	{
      res.render("Admin_product_controll");
      res.end();
		// Database.fetchall(EmailId).then((ata)=>{
  //     let sw=ata[0].products;
		// 	res.render("Admin_product",{data:sw});
		// });
	}
	else{
		res.render("index",{wer:"your account is not verified"});
      res.end();

	}
}
exports.admin_edit_product_controller=(req,res,next)=>{
	let confirmId;
	let user_id=req.params.id;
  let email=req.session.myuser;
	let delete_cart_id=req.params.iid;
	Database.findProduct(user_id,email).then((ata)=>{
    let myObject=ata[0];
		res.render("Admin_edit_product",{verifies_data:myObject,csrf:req.csrfToken()});
	}).catch(err=>{
			res.end();

	});	
}
exports.add_products_controller=(req,res,next)=>{
  console.log("majama");
  let sx=new Adminproducts();
  sx.fetchall()
  .then(we=>{
      res.render("vendor",{my_product:we});
res.end();

  })
  .catch(err=>{
    console.log(err);
  });
}
exports.admin_update_product_controller=(req,res,next)=>{
	let Id=req.params.Id;
	let title=req.body.update_title;
	let price=req.body.update_price;
	let description=req.body.update_description;
	let image=req.body.update_image;
	let UserId=User.UserId();
	// let cookie=req.session.loggedIn;
	Database.upda(Id,title,price,description,image,UserId).then(er=>{
		res.redirect('/Admin_Product');
res.end();

	})
	.catch(err=>{
		console.log(err)
			res.end();

	});	
}


exports.SignUp_controller=(req,res,next)=>{
	res.render("signup");
}

exports.chat=(req,res,next)=>{
  let myuser=req.session.myuser;
  let shortname=myuser.split('@')[0];

  
  // if(loggedIn)
  // {
    res.render("chat",{myuser:shortname});
  // }
  // else{
    // res.redirect("/");
  // }
}
exports.products_controller=(req,res,next)=>{
	res.redirect("/Shop");
res.end();
}

exports.product_controller=(req,res,next)=>{
	let uid=req.params.productId;
  let email=req.session.myuser;
	Database.findId(uid,email).then((ata)=>{
    // console.log("psssssssss",ata[0]);
        ata.map(kkl=>{
          kkl.map(xd=>{
          res.render("product",{id_data:xd,csrf:req.csrfToken()});

          });
  
      });
      
	}).catch(err=>{
			res.end();

	});
}
exports.delete=(req,res,next)=>{
	res.end();
}
exports.shop_controller=(req,res,next)=>{
	let xy=req.session.loggedIn;
  let email=req.session.myuser;
	 // console.log("---->",req.session.loggedIn);
	if(xy){
				// res.redirect("/shop");
				// res.render("Add_product");
				Database.fetchall(email).then(products => {
	            products.map(der=>{
                console.log(der.products);
                res.render("shop", {
                  data: der.products,
                });
              });
              
	        	})
		        .catch(err => {
		            console.log(err);
					res.end();
		        
		        });
		}
	else{
				res.render("index",{wer:"your account is not verified"});
			}
}
exports.home_controller=(req,res,next)=>{
	let session=req.session.loggedIn;
	if(session)
	{
		res.redirect("/shop");
      res.end();
	
  }	
	else
	{
		res.render("index",{wer:"your account is not verified"});
      res.end();
	
  }
}
exports.add_product_controller=(req,res,next)=>{
  console.log("kem");
  // console.log("req.session.loggedIn",req.session.loggedIn);
	let xy=req.session.loggedIn;
	 // console.log("---->",req.session.loggedIn);
	if(xy){
		res.render("Add_product",{csrf:req.csrfToken()});
	}

	else{
		res.render("index",{wer:"your account is not verified please authicate"});
	}	
	
}
exports.shop_mongo_controller=(req,res,next)=>{
  let xy=req.session.loggedIn;
  let email=req.session.myuser;
  let shopId=req.params.shopId;
  Database.productSearch(email,shopId)
  .then(ed=>{
    // console.log(ed);
    if(xy)
    {
      res.redirect('/shop');
      res.end();
      
    }
    else{
      res.render('/');
      res.end();
    
    }
  })
  .catch(err=>{
    console.log(err);
  });
}
exports.delete_product=(req,res,next)=>{
  let xy=req.session.loggedIn;
  let email=req.session.myuser;
  let shopId=req.params.deleteid;
  console.log("shopId is receive",shopId);
  if(xy)
  {
      Database.productDelete(email,shopId)
    .then(data=>{
      res.redirect('/shop');
      res.end();
    })
    .catch(err=>{
      res.redirect("/");
      res.end();
      
    });
  }
  else{
   res.redirect('/'); 
      res.end();
  
  }
  
}