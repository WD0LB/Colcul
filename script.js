//variables
//buttons
let equal = document.getElementById('=');
let equalTop = document.getElementById('=top');
let plusTop = document.getElementById('+top');
let plusBottom = document.getElementById('+bottom');
let multi = document.getElementById('multiBtn');
let devise = document.getElementById('deviseBtn');
let minise = document.getElementById('miniseBtn');
let zero = document.getElementById('0');
let one = document.getElementById('1');
let two = document.getElementById('2');
let tree = document.getElementById('3');
let four = document.getElementById('4');
let five = document.getElementById('5');
let six = document.getElementById('6');
let siven = document.getElementById('7');
let eight = document.getElementById('8');
let nine = document.getElementById('9');
let delet = document.getElementById('delet');
let clear = document.getElementById('clear');

let normalBg = document.getElementById('normal-background');
let linearBg = document.getElementById('linear-background');
let oneColorBg = document.getElementById('one-color-background');
let header = document.getElementById('header');

let result = document.getElementById('result');
let input = document.getElementById('input');
let numb = 0;
let sum = 0;

//booleans
let isEqual = false; let initialSum  = false; let isClear = false;
let isPlusOp = false; let isMiniseOp = false; 
let isMultiOp = false; let isDeviseOp = false;
let isNegative = false; let isClearMode = true;
let isLinearBg = false ; let isOneColorBg = false; 

//functions
function rgbGenerator() {
	red = Math.round((Math.random()*1000)%100);
	green = Math.round((Math.random()*1000)%100);
	blue = Math.round((Math.random()*1000)%100);
}
function setColor() {
	rgbGenerator();
	let color = "rgb("+ String(red+10)+ ", "+String(green) +", " + String(blue)+ ")";
	if(isLinearBg) {
	body.style.background = "linear-gradient(to right ," + color + ", white)"; 
	linearBg.style.background = "linear-gradient(to right ," + color + ", white)";
	input.style.background = "linear-gradient(to right ," + color + ", white)";  
	header.style.background = "rgba("+red+","+ green+","+ blue+", 1)" ;
	} else if(isOneColorBg) {
	body.style.background = "rgba("+red+","+ green+","+ blue+", 0.6)" ;
	oneColorBg.style.background = "rgba("+red+","+ green+","+ blue+", 0.8)" ;
	input.style.background = "rgba("+red+","+ green+","+ blue+", 0.15)" ;
	header.style.background = "linear-gradient(to right ," + color + ", white)"; 
	} else {
	body.style.background = "white";
	input.style.background = "white";
	header.style.background = "#009688";
	}
}

function opBool(p, mi, mu, d) {
	isPlusOp = p;
	isMultiOp = mu;
	isDeviseOp = d;
	isMiniseOp = mi;
}

function isNegIniSumFun() {
	isNegative = false;
	initialSum = false;
}
function helpSetValueFun(arg, num) {
	result.innerHTML = arg + String(num);
	setColor();
	if (isClear) {
		input.value = "";
		isClear = false;
	} else {
		input.value = num;	
	}
}

function setValue(num) {
	result.innerHTML = "";
	if(isPlusOp) {
		helpSetValueFun("[+ ] ", num);
	} else if (isEqual) {
		helpSetValueFun("[= ] ", num);
	} else if (isMultiOp) {
		helpSetValueFun("[* ] ", num);
	}  else if (isDeviseOp) {
		helpSetValueFun("[/ ] ", num);
	}  else if (isMiniseOp) {
		helpSetValueFun("[- ] ", num);
	} else {
		helpSetValueFun("", num);
	}
}

buildNum=(originNum, addingNum) => {return numb = Math.abs(originNum*10) +addingNum;}

tapNumber=(arg)=> {
	if(initialSum) {
		sum = 0;
		initialSum = false;
		isPlusOp = false;
		isEqual = false;
	}
	buildNum(numb,arg);
	if (isNegative) {
	setValue(-numb);		
	} else {
	setValue(numb);	
	}
}

function inputFun() {
	numb = Number(input.value);
	setValue(numb);
}

function deletFun() {
	if(isEqual) {
		isEqual = false;
		sum = 0;
	}
	numb = (numb - numb%10)/10 ;
	if (isNegative) {
	setValue(-numb);		
	} else {
	setValue(numb);	
	}
}

function clearFun() {
	isNegIniSumFun();
	isEqual = false;
	opBool(false, false, false, false);
	numb = 0;
	sum = 0;
	setValue("Colcul here!");
	isClear = true;
	isClearMode =  true;
}

function storeValue() {
	sum += numb;
	numb = 0;
}

function plusFun(argument) {
	isNegIniSumFun();
	storeValue()
	isEqual = false;
	opBool(true, false, false, false);
	setValue("");
}

function miniseFun() {
	if (isClearMode) {
	isNegative = true;
	}
	initialSum = false;
	storeValue();
	isEqual = false;
	opBool(false, true, false, false);
	setValue("");
}
function multiFun(argument) {
	isNegIniSumFun();
	storeValue();
	isEqual = false;
	opBool(false, false, true, false);
	setValue("");
}

function deviseFun(argument) {
	isNegIniSumFun();
	storeValue();
	isEqual = false;
	opBool(false, false, false, true);
	setValue("");
}

function equalFun() {
	isNegative = false;
	initialSum = true;
	isEqual = true;
	if(isPlusOp) {
	sum += numb;
	isPlusOp = false;
	} else if(isMiniseOp) {
	sum -= numb;
	isMiniseOp = false;
	} else if(isMultiOp) {
	sum *= numb;
	isMultiOp = false;
	} else if(isDeviseOp) {
	sum /= numb;
	isDeviseOp = false;
	}
	setValue(sum.toFixed(2));
	numb = 0;
}

//Events
clear.addEventListener("click", clearFun);
equal.addEventListener("click", equalFun);
equalTop.addEventListener("click", equalFun);
plusTop.addEventListener("click", plusFun);
plusBottom.addEventListener("click", plusFun);
minise.addEventListener("click", miniseFun);
multi.addEventListener("click", multiFun);
devise.addEventListener("click", deviseFun);
delet.addEventListener("click", deletFun)
zero.addEventListener("click",()=> tapNumber(0));
one.addEventListener("click",()=> tapNumber(1));
two.addEventListener("click",()=> tapNumber(2));
tree.addEventListener("click",()=> tapNumber(3));
four.addEventListener("click",()=> tapNumber(4));
five.addEventListener("click",()=> tapNumber(5));
six.addEventListener("click",()=> tapNumber(6));
siven.addEventListener("click",()=> tapNumber(7));
eight.addEventListener("click",()=> tapNumber(8));
nine.addEventListener("click",()=> tapNumber(9));
normalBg.addEventListener("click",()=> {isOneColorBg = false; isLinearBg = false;setColor()});
linearBg.addEventListener("click",()=> {isOneColorBg = false; isLinearBg = true;setColor()});
oneColorBg.addEventListener("click",()=> {isOneColorBg = true; isLinearBg = false;setColor()});