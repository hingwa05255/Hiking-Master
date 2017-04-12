	var trail_name = QueryString.search;
		var url = "search?search=" + trail_name;
		document.getElementById('list').style.display = "block";
		loadXMLDoc(url, function(jsonString) {
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