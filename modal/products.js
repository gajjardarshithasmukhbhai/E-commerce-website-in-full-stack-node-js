let mongodb=require('mongodb');
let getdb=require('../util/database.js');
module.exports=class Adminproducts{
	constructor(fullname,productname,productprice,description,state,email,phonenumber,image)
	{
		this.fullname=fullname;
		this.productname=productname;
		this.productprice=productprice;
		this.description=description;
		this.state=state;
		this.email=email;
		this.phonenumber=phonenumber;
		this.image=image;

	}
	save(email,password)
	{
		  let random="";  
		  var characters='ABC12344DEFGH234I334Q2344K45673XZASLMKPO08633';
		   var charactersLength = characters.length;
		   for ( var i = 1; i < 8; i++ ) {
		      random += characters.charAt(Math.floor(Math.random() * charactersLength));
		   }
		   this.productId=random;
		console.log('myname',this.fullname,this.email);
		let db=getdb.getDb();

		   db.collection('admin').updateOne({email:email},{$push:{"adminpro":this}},{upsert: false})
        .catch(err => {
            console.log("my error",err);
        });

	}
	fetchall(){
		let db=getdb.getDb();
		return db.collection('admin').
        	   find().toArray().
        	   then(products=>{
        	   	let xs=products[0].adminpro;
                    // console.log("products",xs);
        	   		return xs;
        	   }).
        	   catch(err=>{
        	   	console.log(err);
        	   });
	}
	static order(email,title,price)
	{
		this.TItle=title;
		this.PRice=price;
		let db=getdb.getDb();

		return db.collection('user').updateOne({email:email},{$push:{orders:{"name":title,"price":price}}},{upsert:true})
        .catch(err => {
            console.log("my error",err);
        });
	}
	static fetchOrder(email)
	{
		let db=getdb.getDb();
		return db.collection('user').find({email:email})
		.toArray()
		.then(data=>{
			let cx=data[0].orders;
			return cx;
		}).catch(err=>{
	        res.end();
		});
	}

}