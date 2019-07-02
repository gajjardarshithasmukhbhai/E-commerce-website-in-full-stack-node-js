const path=require('path');
let Price;
let mongodb=require('mongodb');
let getdb=require('../util/database.js');
const paypal=require('paypal-rest-sdk');
let Adminproducts=require('../modal/products.js');
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AZl1vuigdNFyaWSj8ggRBSA32EsVDhnmKNDSpw5uOjRV0uBJ5pgmtILVYKElsdEAlpBVGrPuxhiAlWie',
  'client_secret': 'EP1x1YlPuhS_zHkGERA5oiumE5rZLbJhnkCRT_qMI7NiGdo2rJ413n0kBw1jNcOZKKMdkwGFKVPxmmUD',
});
exports.paypal_money_controller=(req,res,next)=>{
	let id=req.body.ProductId;
	let price=req.body.price;
	req.session.buyprice=price;
	Price=price;
	let Title=req.body.Title;
	req.session.title=Title;

		var create_payment_json = {

	    "intent": "sale",
	    "payer": {
	        "payment_method": "paypal"
	    },
	    "redirect_urls": {
	        "return_url": "http://localhost:4040/success_payment",
	        "cancel_url": "http://localhost:4040/cancel_payment",
	    },
	    "transactions": [{
	        "item_list": {
	            "items": [{
	                "name": Title,
	                "sku": "001",
	                "price": price,
	                "currency": "USD",
	                "quantity": 1,
	            }]
	        },
	        "amount": {
	            "currency": "USD",
	            "total": price
	        },
	        "description": "yay you buy product through darshit gajjar system"
	    }]
	};
	paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error.message;
    } 
    else {
    	// console.log(payment);
        for(let i=0;i<payment.links.length;i++)
        {
        	if(payment.links[i].rel==="approval_url")
        	{
        		res.redirect(payment.links[i].href);
        	}
        }
    }
});

}
exports.paypal_success_controller=(req,res,next)=>{
	const payerId=req.query.PayerID;
	const paymentId=req.query.paymentId;
	var execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": Price,
        }
    }]
};
paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    	let price=req.session.buyprice;
    let title=req.session.title;
    console.log("->",price);
    console.log("->",title);
    let Email=req.session.myuser;
    if (error) {
        throw error;
    } 
    else {
         let db = getdb.getDb();//call the method
        // $set is operator basically use to relace value
        Adminproducts.order(Email,title,price)
        .then(ex=>{
        	res.redirect("/Order");
        }).catch(err=>{
        	console.log(err);
        });

    }
});

}
exports.paypal_cancel_controller=(req,res,next)=>{
	res.send("payment cancel");
}