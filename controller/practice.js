let number=5764;//particaular number take from user
let k;
var s;
for(let i=number.length;i>=null;i--)//loop is running the number is not
{
	s=number%10;
	number=number/10;
	number=number%10;
	k=s*10+number;//the one by one number is arrive
	console.log(k);
}
