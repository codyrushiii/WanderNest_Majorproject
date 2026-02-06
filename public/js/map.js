mapboxgl.accessToken = mapToken;
const parsedCoordinates = JSON.parse(coordinates);


const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: parsedCoordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});



const marker1 = new mapboxgl.Marker({color:'red'})
 .setLngLat(parsedCoordinates) //Listing.geometry.coordintes
 .setPopup(new mapboxgl.Popup({offset:25}).setHTML(
  `<h4>${title}</h4> <p> Exact location will be provided after booking</p>`))
 .addTo(map);
