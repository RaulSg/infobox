function main() {
	// Creamos el mapa
	cartodb.createVis('map', 'https://157.cartodb.com/api/v2_1/viz/e07ed7a8-0cff-11e5-ba36-0e0c41326911/viz.json')
		
	
	  .done(function(vis, layers) {
		// Permitimos al usuario interactuar con la capa de datos
		// (capa 0 es la base, capa 1 es nuestra capa de información)
		layers[1].setInteraction(true);
		
		// Cuando hacemos click en un punto...
		layers[1].on('featureClick', function(e, latlng, pos, data, layerNumber) {
			// Imprime info del punto en la consola
			cartodb.log.log(e, latlng, pos, data, layerNumber);
			
			// Se guarda la ID del objeto en la variable point_id
			var point_id = data.cartodb_id;
			
			// Muestra la ID del objeto en la consola
			console.log(data.cartodb_id);
			
			//***Se declara variable para guardar la petición sql
			var sql = new cartodb.SQL({ user: '157' });
			var sql_query = "SELECT * FROM example_table WHERE cartodb_id = " + point_id;
			sql.execute(sql_query)
			.done(function(data) {
				console.log(data.rows[0]);
				
				var name = "<h2>Name:</h2>" + "<p>" + data.rows[0].name + "</p>";
				var description = "<h3>Description:</h3><p>" + data.rows[0].description + "</p>";
				var textinfo = name + description;
				
				// Muestra la ID del objeto en el cuadro de información externo
				document.getElementById("info").innerHTML= "<p>ID: " + point_id + "</p>" + textinfo;	
			})
			.error(function(errors) {
			//***errors contains a list of errors
			console.log("errors:" + errors);
			})
	  });
  });
  
}

window.onload = main;
