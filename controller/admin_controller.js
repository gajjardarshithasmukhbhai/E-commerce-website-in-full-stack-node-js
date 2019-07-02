let Admin=require('../modal/admin_product.js');
let Adminproducts=require('../modal/products.js');
const path=require('path');
exports.admin_products=(req,res,next)=>{
	let first_name=req.body.Firstname;
	let last_name=req.body.Lastname;
	let Password=req.body.Password;
	let email=req.body.Email;
	let Phonenumber=req.body.Phonenumber;
	let admin_login=req.session.zwos2ma29ma;
	console.log(first_name,last_name,Password,Phonenumber);
	let Admin_user=new Admin(first_name,last_name,email,Password,Phonenumber);
	Admin_user.save().then(ed=>{
		if(ed[0]){
			req.session.zwos2ma29ma=true;
			req.session.email=email;
			req.session.Password=Password;
			res.render("from_admin_product");
		}
		else{
			res.send("sorry your information is wrong");
		}
	})
	.catch(err=>{
		console.log("system crash");
	});
}
exports.admin_products_kem=(req,res,next)=>{
	let fullName=req.body.fullName;
	let productname=req.body.productname;
	let productprice=req.body.productprice;
	let description=req.body.description;
	let state=req.body.state;
	let email=req.body.email;
	let Phonenumber=req.body.phonenumber;
	let Image=req.body.Image;
	let Email=req.session.email;
	let Password=req.session.Password;
	let login=req.session.zwos2ma29ma;
	if(login)
	{
		// console.log(fullName,productname,productprice,description,state,email);
		let admin_products=new Adminproducts(fullName,productname,productprice,description,state,email,Phonenumber,Image);
		admin_products.save(Email,Password);
	}
	else
	{
		res.redirect("/shop");
	}
					
}	