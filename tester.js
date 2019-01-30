new Vue({
  el: '#app',
  data: () => ({
    drawer: true,
    redLabel: "Display Red Line",
    removeRedLabel: 'Remove Red Line Stations',
    yellowLabel: "Display Yellow Line",    
    removeYellowLabel: 'Remove Yellow Line Stations',
    blueLabel: "Display Blue Line",
    removeBlueLabel: 'Remove Blue Line Stations',
    orangeLabel: "Display Orange Line",
    removeOrangeLabel: 'Remove Orange Line Stations',
    greenLabel: "Display Green Line",
    removeGreenLabel: 'Remove Green Line Stations',
    silverLabel: "Display Silver Line",
    removeSilverLabel: 'Remove Silver Line Stations',
    blueSilverLayerLabel: 'Show me taht layer!!',
    redNotDisplayed: true,
    yellowNotDisplayed: true,
    blueNotDisplayed: true,
    greenNotDisplayed: true,
    orangeNotDisplayed: true,
    silverNotDisplayed: true,
    wasTitleClicked: false,
    redMarkers: [],
    yellowMarkers: [],
    blueMarkers: [],
    greenMarkers: [],
    orangeMarkers: [],
    silverMarkers: [],
    redLine: '',
    greenLine: '',
    blueLine: '',
    orangeLine: '',
    yellowLine: '',
    silverLine: ''      
  }),

  methods:{
    showButtons: function(){
        this.wasTitleClicked = !this.wasTitleClicked;
        return this.wasTitleClicked;
    },

    showBlueSilverLayer: function(){
      blueSilverLayer.addTo(mymap);
    },

    displayMetroLineStations: function(line){
      let coordinates = getMetroStationLocations(line);
        coordinates.forEach(element => {
          let newMarker = L.marker([element.lat, element.lng]);          
          if (line === 'RD') {
              this.redMarkers.push(newMarker);
          } else if (line === 'YL') {
              this.yellowMarkers.push(newMarker);
          } else if (line === 'BL') {
              this.blueMarkers.push(newMarker);
          } else if (line === 'GR') {
              this.greenMarkers.push(newMarker);
          } else if (line === 'OR') {
              this.orangeMarkers.push(newMarker);
          } else if (line === 'SV') {
              this.silverMarkers.push(newMarker);
          } 
                    
          blueSilverLayer = L.layerGroup([this.blueMarkers, this.silverMarkers]);                      
          blueSilverLayer.addTo(mymap);                           
       })

       if (line === 'RD') {
         this.redNotDisplayed = false;
         this.redLine = L.polyline(coordinates, {color: 'red'}).addTo(mymap);
         map.fitBounds(this.redLine.getBounds());
       } else if (line === 'YL') {
         this.yellowNotDisplayed = false;
         this.yellowLine = L.polyline(coordinates, {color: 'yellow'}).addTo(mymap);
         map.fitBounds(this.yellowLine.getBounds());
       } else if (line === 'BL') {
           this.blueNotDisplayed = false;
           this.blueLine = L.polyline(coordinates, {color: 'blue'}).addTo(mymap);
           map.fitBounds(this.blueLine.getBounds());
       } else if (line === 'OR') {
           this.orangeNotDisplayed = false;
           this.orangeLine = L.polyline(coordinates, {color: 'orange'}).addTo(mymap);
           map.fitBounds(this.orangeLine.getBounds());
       } else if (line === 'GR') {
           this.greenNotDisplayed = false;
           this.greenLine = L.polyline(coordinates, {color: 'green'}).addTo(mymap);
           map.fitBounds(this.greenLine.getBounds());
       } else if (line === 'SV') {
           this.silverNotDisplayed = false;
           this.silverLine = L.polyline(coordinates, {color: '#949191'}).addTo(mymap);
           map.fitBounds(this.silverLine.getBounds());
       }      
    },
    
    removeMetroStations: function(line){      
      if (line === 'RD') {
        this.redMarkers.forEach(marker => {
          marker.removeFrom(mymap);
        })
        this.redLine.removeFrom(mymap);
        this.redNotDisplayed = true;
      } else if (line === 'YL') {
        this.yellowMarkers.forEach(marker => {
          marker.removeFrom(mymap);
        })
        this.yellowLine.removeFrom(mymap);
        this.yellowNotDisplayed = true;
      } else if (line === 'BL') {
        this.blueMarkers.forEach(marker => {
          marker.removeFrom(mymap);
        })
        this.blueLine.removeFrom(mymap);
        this.blueNotDisplayed = true;
      } 
      else if (line === 'OR') {
        this.orangeMarkers.forEach(marker => {
          marker.removeFrom(mymap);
        })
        this.orangeLine.removeFrom(mymap);
        this.orangeNotDisplayed = true;
      } 
      else if (line === 'GR') {
        this.greenMarkers.forEach(marker => {
          marker.removeFrom(mymap);
        })
        this.greenLine.removeFrom(mymap);
        this.greenNotDisplayed = true;
      } 
      else if (line === 'SV') {
        this.silverMarkers.forEach(marker => {
          marker.removeFrom(mymap);
        })
        this.silverLine.removeFrom(mymap);
        this.silverNotDisplayed = true;
      } 
    }
  },

   props: {
    source: String
  }
});

let metroStationUrl = "https://api.wmata.com/Rail.svc/json/jStations";
let predictionUrl = "https://api.wmata.com/StationPrediction.svc/json/GetPrediction";

let busFinderUrl = "https://api.wmata.com/Bus.svc/json/jBusPositions";

//let apiKey = "api_key=e13626d03d8e4c03ac07f95541b3091b";  //this is a demo key!
let apiKey = "api_key=48396b63ad9b42138a847ca304c5ca3d";

let metroCenterStationCode = 'A01';

let blueSilverLayer;

let stationCoords = [];
let stationUrl = metroStationUrl + "?" + apiKey;
let nextTrainUrl = predictionUrl + "/" + metroCenterStationCode + "?" + apiKey;

/**
 * Create a global marker to test out with Vue.
 */
let stationData, metroCenterData;

/**
 * Create the map.
 */
let mymap = L.map('mapid');

//VIEW OF DC
mymap.setView([38.889931, -77.009003], 11);

/**
 * Create the layer data to display to on map.
 */
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2FydGVyc2kiLCJhIjoiY2puNTQycnp4MDNlbDNybzB2cDcwa21pbSJ9.9FgcPGcWUvOOt4VyUUvL2w', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

/**
 * 
 * @param {String} line = the given metro line to find stations for
 * @returns array of station lats and lons 
 */
let getMetroStationLocations = (line) => {
    let stationMap = new Map();
        
    stationData.Stations.forEach(element => {          
        let keys = Object.keys(element),
            values = Object.values(element);
        
        for (let i = 0; i < keys.length; i++){
          if (keys[i].includes('LineCode') && values[i] === line){
            stationMap.set(element.Name, L.latLng(element.Lat, element.Lon));    
          }          
        }
    });             

  return MetroOrder.orderMetroStations(stationMap, line);    
  };
  
  /**
   * Retrieve the data for all the metro lines.
   */
  (function(){
    fetch(stationUrl)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        stationData = data;        
      })
      .catch(function(error){
        console.log('Not cool = ' + error);
      })
  })();

