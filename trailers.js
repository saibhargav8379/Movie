//page load
window.addEventListener("load",start,false);

function start()
{
	asyncRequest=new XMLHttpRequest;
	
	asyncRequest.open("GET","xml/movies.xml",true);
	asyncRequest.send(null);
	asyncRequest.addEventListener("readystatechange",function(){
		if(asyncRequest.readyState==4&&asyncRequest.status==200&&asyncRequest.responseXML){
		var movieArray=asyncRequest.responseXML.getElementsByTagName("movie");
		//iterate through the movieArray:
		for(var i=0;i<movieArray.length;i++)
		{
			var iframe=document.createElement("iframe");
			var image = movieArray.item(i).getElementsByTagName("trailer").item(0).firstChild.nodeValue;
			iframe.width="220";
			iframe.height="200";
			iframe.setAttribute( "src", image); 
			iframe.setAttribute("allowfullscreen",true);
			document.getElementById("movieTable").appendChild(iframe);
		}//end for
		
	}//end if
	},false);
	
}