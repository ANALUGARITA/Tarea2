// Mapa Leaflet
    var mapa = L.map('mapid').setView([9.65, -83.95], 10);

// Conjunto de capas base
	var osm = L.tileLayer(
	  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
	  {
	    maxZoom: 19,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	  } 
	).addTo(mapa);	
	    
    var esri = L.tileLayer(
	  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
	  {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	  }
	).addTo(mapa);	 

    var OpenTopoMap = L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', 
      {
             maxZoom: 17,
             attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }
    ).addTo(mapa);    
	    
    var Stamen_Terrain = L.tileLayer(
        'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', 
        {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd', minZoom: 1, maxZoom: 17, ext: 'png'
        }
    ).addTo(mapa);         
        
// Conjunto de capas base
	var mapasBase = {
	    "ESRI": esri,		
	    "OSM": osm, 
        "Topo": OpenTopoMap,
        "Terrain": Stamen_Terrain
	};	    
	    
// Control de capas
    control_capas = L.control.layers(mapasBase).addTo(mapa);	
// Control de escala
    L.control.scale({ position: 'topright', imperial: false }).addTo(mapa);       




// Capa vectorial en formato GeoJSON
$.getJSON("https://raw.githubusercontent.com/ANALUGARITA/Tarea2/main/capas/fincascafe.geojson", function(geodata) {
  var capa_fincascafe = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "red", 'weight': 1.5, 'fillOpacity': 0.0}
    },   
    onEachFeature: function(feature, layer) {
        var popupText = "<strong>Finca</strong>: " + feature.properties.Nombre + "<br>" + "<strong>Tipo de Café</strong>: " + feature.properties.TipoCafe;
        layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_fincascafe, 'Fincas de Café');
 });

$.getJSON("https://raw.githubusercontent.com/ANALUGARITA/Tarea2/main/capas/viascafe.geojson", function(geodata) {
  var capa_viascafe = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "red", 'weight': 1.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Vías a Fincas</strong>: " + feature.properties.RUTA;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_viascafe, 'Vías a Fincas'); 
});

$.getJSON("https://raw.githubusercontent.com/ANALUGARITA/Tarea2/main/capas/cantonescafe.geojson", function(geodata) {
  var capa_cantones = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "black", 'weight': 1.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Cantón</strong>: " + feature.properties.canton;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_cantones, 'Cantones'); 
});


