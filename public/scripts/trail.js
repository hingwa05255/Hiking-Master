	var trail_id = QueryString.id;

	if (trail_id == null) {
		document.getElementById('list').style.display = "block";
		loadXMLDoc("trail", function(jsonString) {
			var json = JSON.parse(jsonString);
			var list = document.getElementById('list');
			for (var i = 0; i < json.length; i++) {
				var a = document.createElement('a');
				var br = document.createElement("br");
				var h3 = document.createElement("h3");
				var img = document.createElement("img");
				img.src="images/" + json[i].trail_photo1;
				img.height="180";
				img.width="320";
				a.appendChild(img);
				h3.appendChild(document.createTextNode(json[i].trail_name));
				a.appendChild(h3);
				a.appendChild(document.createTextNode('District: ' + json[i].trail_district));
				a.setAttribute('href', 'route?id=' + json[i].trail_id);
				list.appendChild(a);
			}
		});
	} else {
		var url = "trail?id=" + trail_id;
		document.getElementById('detail').style.display = "block";
		loadXMLDoc(url, function(jsonString) {
			var json = JSON.parse(jsonString);
			var trailNameDiv = document.getElementById('trailName');
			trailNameDiv.appendChild(document.createTextNode(json.trail_name));
			
			var img1 = document.getElementById('img1');
			var img2 = document.getElementById('img2');
			var img3 = document.getElementById('img3');
			img1.src="images/" + json.trail_photo1;
			img2.src="images/" + json.trail_photo2;
			img3.src="images/" + json.trail_photo3;
			
			var name = document.getElementById('name');
			var difficulty = document.getElementById('difficulty');
			var transport = document.getElementById('transport');
			var description = document.getElementById('description');
			
			name.appendChild(document.createTextNode(json.trail_name));
			difficulty.appendChild(document.createTextNode(json.trail_difficulty + "/5"));
			transport.appendChild(document.createTextNode(json.trail_transport));
			description.appendChild(document.createTextNode(json.trail_description));

			var a = document.createElement('a');
			a.appendChild(document.createTextNode(json.lat1));
			description.appendChild(a);
		});
	}