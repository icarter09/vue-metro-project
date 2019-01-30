
/**
 * Create the map.
 */
let mymap = L.map('mapid')

//VIEW OF THE ENTIRE US
//.setView([39.828175, -98.5795], 5);

//VIEW OF DC
mymap.setView([38.889931, -77.009003], 13);

/**
 * Create the layer data to display to on map.
 */


let metroStationUrl = "https://api.wmata.com/Rail.svc/json/jStations";
let predictionUrl = "https://api.wmata.com/StationPrediction.svc/json/GetPrediction";

//let apiKey = "api_key=e13626d03d8e4c03ac07f95541b3091b";  //this is a demo key!


let metroCenterStationCode = 'A01';

let stationCoords = [];
let stationUrl = metroStationUrl + "?" + apiKey;
let nextTrainUrl = predictionUrl + "/" + metroCenterStationCode + "?" + apiKey;

/**
 * Create a global marker to test out with Vue.
 */
let stationData, metroCenterData;

/**
 * Retrieve the data for the Red Line stations and display.
 */
let displayRedStations = new Vue({
    el: '#app',
    data: {
      redLabel: "Display Red Line",
      yellowLabel: "Display Yellow Line",
      removeLabel: 'Remove Red Line Stations',
      redNotDisplayed: true,
      yellowNotDisplayed: true,
      redMarkers: [],
      yellowMarkers: []      
    },
    methods:{
      displayMetroLineStations: function(line){
        let coordinates = getMetroStationLocations(line);
          coordinates.forEach(element => {
            let newMarker = L.marker([element.lat, element.lng]);
            if (line === 'RD') {
              this.redMarkers.push(newMarker);
            } else if (line === 'YL') {
              this.yellowMarkers.push(newMarker);
            }            
            newMarker.addTo(mymap);                           
         })

         if (line === 'RD') {
           this.redNotDisplayed = false;
         } else if (line === 'YL') {
           this.yellowNotDisplayed = false;
         }         
      },
      
      removeMetroStations: function(line){
        if (line === 'RD') {
          this.redMarkers.forEach(marker => {
            marker.removeFrom(mymap);
          })
          this.redNotDisplayed = true;
        } else if (line === 'YL') {
          this.yellowMarkers.forEach(marker => {
            marker.removeFrom(mymap);
          })
          this.yellowNotDisplayed = true;
        }
      }
    }
});

/**
 * 
 * @param {String} line = the given metro line to find stations for
 * @returns array of station lats and lons 
 */
let getMetroStationLocations = (line) => {
  let stationArray = [];
      
  stationData.Stations.forEach(element => {          
      let keys = Object.keys(element),
          values = Object.values(element);
      
      for (let i = 0; i < keys.length; i++){
        if (keys[i].includes('LineCode') && values[i] === line){
          stationArray.push(L.latLng(element.Lat, element.Lon));    
        }
        
      }
  });             

return stationArray;
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

