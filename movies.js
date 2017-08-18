//variables
//dropdown tag object
var selectTag;
//page load
window.addEventListener("load",function(){
	 //anonymous function
	 fillDropDown();//calling function to fill the dropdown options
	 
	 document.getElementById("submitButton").addEventListener("click",function(){
		 validate();
	 },false);
},false);
function validate()
{
	var numOfTickets=document.getElementById("numberTextBox").value;
	var name=document.getElementById("nameTextBox").value;
	var address=document.getElementById("addressTextArea").value
	if(numOfTickets=="" || name=="" || address=="")
	{
		document.getElementById("messageLabel").innerHTML="Invalid details..Please fill all the details";
	}
	else{
			calculateprice();
	}
	
}
function calculateprice()
{
	var movieSelect = document.getElementById("moviesList");
	var selectedMovie = movieSelect.options[movieSelect.selectedIndex].text;
	
	var name=document.getElementById("nameTextBox").value;
	var numOfTickets=parseInt(document.getElementById("numberTextBox").value);
	var price=document.getElementById("moviesList").value;
	var messageText="";
	if(numOfTickets<1 || isNaN(numOfTickets))
		{
			document.getElementById("messageLabel").innerHTML="Invalid number of tickets";
		}
		
		else{
			//calculating price basd on the selected route
			var totalprice=numOfTickets*price;
			messageText="Thank you "+name+"<br>"+"You Selected the movie: "+ selectedMovie 
									+" <br> No. of Tickets: "+ numOfTickets.toString() 
									+"<br> The Total Price: $ "+ totalprice;
			//displaying the result to label;
			//document.getElementById("messageLabel").innerHTML=messageText;
			var myWindow = window.open("", "MsgWindow", "width=500,height=300");
    myWindow.document.write(messageText);
		}
		

}
 function fillDropDown(){
	//make a synchronous request for movies.xml, loop through to populate the select --> options.
	//variables
	selectTag=document.getElementById("moviesList");
	
	var moviesArray;
	//synchronous request:
	var xhr=new XMLHttpRequest();
	xhr.open("GET","xml/movies.xml",false);
	xhr.send(null);
	moviesArray = xhr.responseXML.getElementsByTagName("movie");
	//console.log(moviesArray);
	//loop through the array and create option tags with movie name as value and innerHTML
	for(var i=0;i<moviesArray.length;i++){
		//create option tag for movieselect tag
		var movieOption=document.createElement("option");
		var movieName=moviesArray.item(i).getElementsByTagName("movieName").item(0).firstChild.nodeValue;//gives value for one movie from the xml file
		//add value and text to the option tag
		var price=moviesArray.item(i).getElementsByTagName("price").item(0).firstChild.nodeValue;
		movieOption.value=price;
		movieOption.innerHTML=movieName;
		selectTag.appendChild(movieOption);
	}// end looping for movie names
 }//end funtion fillDropDown
 