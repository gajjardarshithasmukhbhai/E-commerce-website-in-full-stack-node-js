let mongodb=require('mongodb');
let getdb=require('../util/database.js');
module.exports=class Signup{
	constructor(email,password,retype)
	{
		this.email=email;
		this.password=password;
		this.retype=retype;
	}
	save()
	{
		let db=getdb.getDb();
		return db.collection('user').insertOne(this)
			.catch(error=>{
				return error;
			});
	}

}