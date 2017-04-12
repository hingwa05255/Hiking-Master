  var postNum=0;
  var showingActivity=0;
  var test=0;
	
function showActivity(activity_id) {
    var ul = document.getElementById("activityRegion");
	var btndiv = document.getElementById("buttonRegion");
	var commentRegion = document.getElementById("commentRegion");
	
	ul.style.display = "block";
	btndiv.style.display = "block";
	commentRegion.style.display = "block";

    if(showingActivity===1){
      while (ul.hasChildNodes()) {
        ul.removeChild(ul.lastChild);
      }
    }
    
    if(showingActivity===1){
      while (commentRegion.hasChildNodes()) {
        commentRegion.removeChild(commentRegion.lastChild);
      }
    }
	
	if(showingActivity===1){
      while (btndiv.hasChildNodes()) {
        btndiv.removeChild(btndiv.lastChild);
      }
    }
	
	var url = "activity?id=" + activity_id;
	loadXMLDoc(url, function(jsonString) {
		var json = JSON.parse(jsonString);
		showingActivity = 1;
		
		var table = document.createElement("table");
		table.setAttribute("width", "100%");
		table.setAttribute("height", "100%");
		var col1 = document.createElement("col");
		var col2 = document.createElement("col");
		col1.setAttribute("width", "20%");
		col2.setAttribute("width", "80%");
		table.appendChild(col1);
		table.appendChild(col2);
		
		var topic = table.insertRow(0);
		var topic_head = topic.insertCell(0);
		topic_head.setAttribute("id", "col1");
		var topic_value = topic.insertCell(1);
		topic_head.innerHTML = "Topic";
		topic_value.innerHTML = json.activity_topic;
		
		var id = table.insertRow(1);
		var id_head = id.insertCell(0);
		id_head.setAttribute("id", "col1");
		var id_value = id.insertCell(1);
		id_head.innerHTML = "Activity ID";
		id_value.innerHTML = json.activity_id;

		var creator = table.insertRow(2);
		var creator_head = creator.insertCell(0);
		creator_head.setAttribute("id", "col1");
		var creator_value = creator.insertCell(1);
		creator_head.innerHTML = "Organizer ";
		creator_value.innerHTML = json.member_name;

		var date = table.insertRow(3);
		var date_head = date.insertCell(0);
		date_head.setAttribute("id", "col1");
		var date_value = date.insertCell(1);
		date_head.innerHTML = "Date ";
		date_value.innerHTML = json.formatted_date;		
		
		var dest = table.insertRow(4);
		var dest_head = dest.insertCell(0);
		dest_head.setAttribute("id", "col1");
		var dest_value = dest.insertCell(1);
		dest_head.innerHTML = "Location ";
		dest_value.innerHTML = json.trail_name;
		
		var content = table.insertRow(5);
		var content_head = content.insertCell(0);
		content_head.setAttribute("id", "col1");
		var content_value = content.insertCell(1);
		var pre = document.createElement("pre");
		pre.appendChild(document.createTextNode(json.activity_content));
		content_head.innerHTML = "Content ";
		content_value.appendChild(pre);
		
		ul.appendChild(table);
		
		var btndiv = document.getElementById("buttonRegion");
		var route = document.createElement("a");
		route.setAttribute('href','route?id=' + json.activity_trail_id);
		route.setAttribute('target','_blank');
		var routebtn = document.createElement("button");
		routebtn.setAttribute("id","btn");
		routebtn.appendChild(document.createTextNode("Route"));
		route.appendChild(routebtn);
		btndiv.appendChild(route);
		
		var join = document.createElement("form");
		join.setAttribute('action','join?aid=' + json.activity_id);
		join.setAttribute('method','POST');
		var joinbtn = document.createElement("input");
		joinbtn.setAttribute("type", "submit");
		joinbtn.setAttribute('id','btn');
		joinbtn.setAttribute('value','Join');
		joinbtn.setAttribute('style','display: block;');
		join.appendChild(joinbtn);
		//join.appendChild(route);
		btndiv.appendChild(join);
	});
	
	//Show comment
	var url = "comment?id=" + activity_id;
	var head = document.createElement("h3");
	head.appendChild(document.createTextNode('Comments'));
	commentRegion.appendChild(head);
	loadXMLDoc(url, function(jsonString) {
		var json = JSON.parse(jsonString);

		for(var i=0; i<json.length; i++){
			var comment = document.createElement("div");
			comment.setAttribute('class','comment')
			comment.appendChild(document.createTextNode(json[i].formatted_date));
			comment.appendChild(document.createElement("br"));
			comment.appendChild(document.createTextNode(json[i].member_name));
			comment.appendChild(document.createElement("br"));
			comment.appendChild(document.createTextNode(json[i].comment_content));
			commentRegion.appendChild(comment);
		}
		
	});	
	// show textfield for inputting comment
		var commentform = document.createElement("form");
		commentform.action = "/postcomment";
		commentform.method = "post";
		content = document.createElement("textarea");
		content.style.width = "92%";
		content.style.height = "100px";
		content.value = "Your comments...";
		content.name = "content";
		commentform.appendChild(content);
		id = document.createElement("input");
		id.style.display = "none";
		id.value = activity_id;
		id.name = "id";
		commentform.appendChild(id);
		submit = document.createElement("button");
		submit.appendChild(document.createTextNode("submit"));
		commentform.appendChild(submit);
		commentRegion.appendChild(commentform);
  }

  function removeDummy() {
    var elem = document.getElementById('noAct');
    elem.parentNode.removeChild(elem);
    return false;
  }

var activity_id = QueryString.id;

if (activity_id == null) {
	loadXMLDoc("activity", function(jsonString) {
		var json = JSON.parse(jsonString);
		var ul = document.getElementById("postList");
		for (var i = 0; i < json.length; i++) {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(json[i].activity_topic));
			li.appendChild(document.createElement("br"));
			li.appendChild(document.createTextNode("Date: " + json[i].formatted_date));
			li.setAttribute("onclick", "showActivity("+json[i].activity_id+")");
			ul.appendChild(li);
		}
	});
}