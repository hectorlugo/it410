var endorsements = [];
var timer = null;


window.onload=function getUsername(){			

	var name = localStorage.username;        
	name = localStorage["username"];          
	
	if (!name || name=="" || name=="null") {
		//turns on blanket over content
		document.getElementById("first_view").style.display="inline";
   		// Ask the user for name
		name = prompt("What is your name?"); 
		if(!name || name=="" || name=="null"){
		//redirect to home if username is empty								
			window.location="home.html";
		}
		// Store the user's response.
		localStorage.username = name;
		user();
	}
	//var page = window.location;
	//if(page=="http://localhost/endorsements.html"){writeTo();}
	loadSlide();



}

//display the name the user entered
function user(){
	var name = localStorage.username;        
	name = localStorage["username"];
	if(!name || name=="" || name=="null"){
		document.getElementById("change").innerHTML="";
	}else{
		//turns off blanket over content
		document.getElementById("first_view").style.display="none";			
	 	document.getElementById("change").innerHTML=name+" !";
	}
}
//save text in textarea to localstorage
function saveText(){														
	var text = document.getElementById("textarea").value;
	localStorage["textArea"] = text;
	
}

//gets text from textarea and adds it to endorsements arrary
function submit()
{
	saveText();
	var today = new Date();
	var year, month, day, hours, minut, secnd;
	
	year = today.getFullYear();
	month = dayModify((today.getMonth()+1));
	day = dayModify(today.getDate());
	hours = dayModify(today.getHours());
	minut = dayModify(today.getMinutes());
	secnd = dayModify(today.getSeconds());
	
	var datetime = (today.getMonth()+1) + "-" + today.getDate() + "-" + today.getFullYear() + " @ " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

	var sortdate = year+""+ month + day + hours + minut + secnd;


	var data = { "user" : localStorage["username"] , "date" : datetime , "text" : document.getElementById("textarea").value, "sortdate" : sortdate };

	if(document.getElementById("textarea").value==""){
		alert("Your comment was Empty");
	}else{
		endorsements.push(data);
		writeTo();
		//displayEndorsements();
		eraseTxt();
		
		
	}
}

function dayModify(value){
	if(value < 10){
		return "0" + value;
	}else{
		return value;
	}
}

//erase text in the textarea
function eraseTxt(){
	document.getElementById("textarea").value="";
	
}
//get saved data in endorsements array and display it
function displayEndorsements()
{	
	//document.getElementById("endorsements").innerHTML= "";
	for(var i = 0; i < endorsements.length; i++)
	{
	document.getElementById("endorsements").innerHTML= document.getElementById("endorsements").innerHTML + endorsements[i].user + " - " + endorsements[i].date + "<br>" + endorsements[i].text + "<br><br>";
	}
	
}

//set carousel page

function getQueryString(x){
	
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	
	for (var i = 0; i < sURLVariables.length; i++){
		
		var sParameterName = sURLVariables[i].split('=');
		if(sParameterName[0] == x){
			return sParameterName[1];
		}
	}
}

function loadSlide(){
	var slideNumber = getQueryString('slide');
	var slideInt = parseFloat(slideNumber);
	$('#myCarousel').carousel(slideInt);
	
	
}
//arrange from most recent to oldest
function sorterStyle(x){
	return function(a,b){
		if(a[x] > b[x]){
			return -1;
		}else if(a[x] < b[x]){
			return 1;
		}
		return 0;
	}
}
//load endorsements from json file
function writeTo(){
	
	$.getJSON("endorsements.json", function(data){
		document.getElementById("endorsements").innerHTML="";
		var endorVar = data.sort(sorterStyle("sortdate"));

		for(var i = 0; i < endorVar.length; i++){
			document.getElementById("endorsements").innerHTML = document.getElementById("endorsements").innerHTML + endorVar[i].user + " - " + endorVar[i].date + "<br>" + endorVar[i].text + "<br><br>";
		}
		displayEndorsements();
	});
	timer = setTimeout('writeTo()', 5000); //refresh, check for new endrosements
	//alert("hello");
}
//try to stop robots
function submitTest(){
	var password = prompt("What year are we in?");
	if(password ==="2013"){
		
		submit();
	}else{
		
		alert("You shall not pass");
	}
}


