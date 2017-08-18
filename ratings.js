//pageload eventlistner:
window.addEventListener("load",function(){
	loadMovies();
},false);//end pageload

function loadMovies()
{
	asyncRequest=new XMLHttpRequest;
	 asyncRequest.open("GET","xml/movies.xml",true);
	 asyncRequest.send(null);
	 asyncRequest.addEventListener("readystatechange",function(){
		 if(asyncRequest.readyState==4&&asyncRequest.status==200&&asyncRequest.responseXML){
			 
			 //get the ratingDetails element
			 var ratingDetails=asyncRequest.responseXML.getElementsByTagName("movie");//this will be an array of lenghth=4 because we have 4 elements in xml
			 for(var i=0;i<ratingDetails.length;i++){
				 var rating=ratingDetails.item(i).getElementsByTagName("movieName").item(0).firstChild.nodeValue;
				 //gets the i-th rating
				 var pTag=document.createElement("p");
				 var textNode=document.createTextNode(rating);//text
				 var radioBtn=document.createElement("input");
				 //setting properties
				 radioBtn.type="radio";
				 radioBtn.id=rating;
				 radioBtn.name="ratingDetails";
				 radioBtn.value=rating;
				 //create eventlistner for the radioBtn
				 radioBtn.addEventListener("change",function(){
					 //call another function to show the ratingDetails by supplying the radio button's value property as argument:
					 showratings(this.value);
				 },false);//end eventlistner
				 
				 //add the elements to the page and parent elements:
					pTag.appendChild(radioBtn);//added radiobutton to p
					pTag.appendChild(textNode);//added textNode
					//add the pTag to the table (td)
				document.getElementById("ratingTD").appendChild(pTag);
			 }//end for
		 }//end if
	 },false);//eventlistner and call back
	 
}
function showratings(ratingSelected)
{
	//raising an asynchronous request for xml file:
	 asyncRequest=new XMLHttpRequest;
	 asyncRequest.open("GET","xml/movies.xml",true);
	 asyncRequest.send(null);
	 asyncRequest.addEventListener("readystatechange",function(){
		 if(asyncRequest.readyState==4&&asyncRequest.status==200&&asyncRequest.responseXML){
			 //get the ratingDetails element
			 var ratingDetails=asyncRequest.responseXML.getElementsByTagName("movie");//this will be an array of lenghth=4 because we have 4 elements in xml
			 //console.log(ratingDetails);
			 for(var i=0;i<ratingDetails.length;i++){
				 var ratingName=ratingDetails.item(i).getElementsByTagName("movieName").item(0).firstChild.nodeValue;
				 //gets the i-th ratingName
				 //compare the ratingName to the ratingSelected
				 if(ratingName==ratingSelected){
					 var rating=ratingDetails.item(i).getElementsByTagName("rating").item(0).firstChild.nodeValue;
					 //creating a message text from the values above:
					 var messageText="rating for the movie: "+ratingName+ " is "+rating;
					 //display the message on the page:
					 document.getElementById("detailsTD").innerHTML=messageText;
					 //because a match is found, exit out of the loop:
					 break;
				 }//end if
				
			 }//end for
		 }//end if
	 },false);//eventlistner and call back
	
}