let mongodb=require('mongodb');
let getdb=require('../util/database.js');
let UserId;
let bcrypt=require('bcryptjs');
module.exports=class User{
	constructor(email,password)
	{
		this.email=email;
		this.password=password;
	}
	save()
	{//direct this method thi data na mokali sako mongo ma tamare constructor te banavu te padse jo this no te use te karvo hoy to
		// this.email=emial;
		// this.password=password;
		let db=getdb.getDb();
		let username;
		let passwrd;
		return db.collection('user').find({email:this.email}).toArray()
		.then(der=>{
			let sk="hello";
			der.map(se=>{
				username=se.email;
				passwrd=se.password;
			});
			return bcrypt.compare(this.password,passwrd)
			.then(res=>{
				return true;
			})
			.catch(err=>{
				return false;
			});
		})
		.catch(err=>{
			return err;
		});
		
	}
	static UserId(email)
	{
		// console.log("hello");
		// console.log(email);

		let db=getdb.getDb();
		return db.collection('user').find({email:email}).toArray()
		.then(return_data=>{
			return_data.map(data=>{
				UserId=new mongodb.ObjectId(data._id);
			});
		return UserId;//hello gajajjdnd
	
			
		})
		.catch(err=>{
			console.log("my error",err);
		});

	}
}