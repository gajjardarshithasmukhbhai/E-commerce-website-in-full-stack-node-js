let mongodb=require('mongodb');
let getdb=require('../util/database.js');
module.exports=class Product{
	constructor(title,Image,Price,description,userId,random)
	{
		this.title=title;
		this.Image=Image;
		this.Price=Price;
		this.description=description;
        this.userId=userId;
        this.random=random;
	}
	save()
	{
        let db = getdb.getDb();//call the method
        //$set is operator basically use to relace value
        db.collection('user').updateOne({_id:this.userId},{$push:{products:this}},{ upsert: true })
        .catch(err => {
            console.log("my error",err);
        });
           
	}
	static fetchall(emailID)
	{
        let db = getdb.getDb();//call the method
        return db.collection('user').
        	   find({email:emailID}).toArray().
        	   then(products=>{
                    // console.log("products",products);
        	   		return products;
        	   }).
        	   catch(err=>{
        	   		console.log("My"+err);
        	   });
	}
	static findProduct(id,email)
	{
		let db = getdb.getDb();//call the method
		
        return db.collection('user').
        	   find({email:email}).toArray().
        	   then(data=>{
                    // console.log(data); 
                    let profile=data[0].products;
                    // console.log(profile);
                    return profile.map(ex=>{
                        if(ex.random===id)
                        {
                            return ex;
                        }
                    });
        	   }).
        	   catch(err=>{
        	   		console.log("My"+err);
        	   });
	}
	static upda(id,title,price,description,image,userId)
	{
		this.title=title;
		this.price=price;
		this.description=description;
		this.image=image;
        this.userId=userId;
		let Id=mongodb.ObjectId(id);
		let db = getdb.getDb();//call the method
        return db.collection('products')
        .update({_id:Id},{"title":this.title,"Image":this.image,"Price":this.price,"description":this.description,"userId":this.userId},{upsert:true})
            .then(products => {
                return products;
            }).
        catch(err => {
            console.log("My" + err);
        });
	}
	static productDelete(email,productid)
	{
        console.log(productid);
		// let se=new mongodb.ObjectId(id);
		let db = getdb.getDb();//call the method
        return db.collection('user').find({email:email}).toArray()
        .then(edx=>{

            let xs=edx[0].products;
            return db.collection('user').update(
                {email:email}, 
                {$pull:{products:{productId:productid}}}
            ).
            then(ed=>{
                console.log("query is fire darshit successfully");
            }).
            catch(err=>{
                console.log(err);
            });
            // console.log(xs);
            // var check=xs.map((scd)=>scd.productId);
            // console.log("check",check);
            // let sp=[];
                // let sx=xs.findIndex(pro=>pro.productId==productid);
                // console.log("my array position",sx);
            // xs.
            // return xs.map(ws=>{
            //     console.log("index",sx);
            // });
        }).catch(err=>{
            console.log(err);
        });
		// return db.collection('user').
  //       deleteOne({
  //               _id:se,
  //           })
  //           .catch(err=>{
  //           	console.log(err,"my error");
  //           });
	}
    static findId(uid,email)
    {
        // let see=new mongodb.ObjectId(uid);
        let db = getdb.getDb();//call the method
        return db.collection('user').
               find({email:email}).toArray().
               then(product=>{
                    return product.map(all_data=>{
                        var filteredData = all_data.products.filter(function(obj) {
                                return obj["productId"] === uid;
                        });
                        if(filteredData.length==1)
                        {
                            return filteredData;
                        }
                    });

               }).
               catch(err=>{
                    console.log("My"+err);
               });
    }
    static get_user()
    {
        let db = getdb.getDb();//call the method
        let check_array=[];
        return db.collection('user').find().toArray()
        .then(ew=>{
                check_array=ew;
                if(check_array.length>0)//use che
                {
                    db.collection('products').insertOne(this)
                    .catch(err => {
                        console.log(err);
                    });
                    return true;
                }
                else{
                    return false;
                }
            }
        ).catch(err=>{console.log(err)});
    }
    static productSearch(email,shopId){
        let db = getdb.getDb();//call the method
        return db.collection('admin').
               find().toArray().
               then(products=>{
                let xs=products[0].adminpro;
                    // console.log("products",xs);
                    xs.map(dwe=>{
                        if(dwe.productId===shopId)
                        {
                            return db.collection('user').updateOne({email:email},{$push:{products:dwe}},{ upsert: true })
                                .catch(err => {
                                    console.log("my error",err);
                                });                 
                            }
                    });
               }).
               catch(err=>{
                console.log(err);
               });
    }
}
