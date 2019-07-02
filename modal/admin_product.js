let mongodb=require('mongodb');
let getdb=require('../util/database.js');
module.exports=class Admin{
	constructor(first_name,last_name,email,Password,Phonenumber)
	{
		this.first_name=first_name;
		this.last_name=last_name;
		this.email=email;
		this.Password=Password;
		this.Phonenumber=Phonenumber;
	}
	save()
	{
		let db=getdb.getDb();
		return db.collection('admin').find({"email":this.email}).toArray()
		.then(ed=>{
			// console.log(ed);
			return ed.map(data=>{
				if((data.first_name===this.first_name)&&(data.last_name===this.last_name)&&(data.Password==this.Password)&&(data.Phonenumber==this.Phonenumber))
				{
					return true;
				}
				else{
					return false;
				}
			});
		})
			.catch(error=>{
				return false;
			});

	}

}