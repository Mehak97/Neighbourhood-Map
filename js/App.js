var initialLocations=[
{
	placename:"Kune Falls",
	lat:18.762521,
	lng:73.381389,
	id:"4dfb3dd37d8b56d8ae42f4d9"
},
{
	placename:"Hanging Garden",
	lat:18.956896,
	lng:72.804333,
	id:"4b0587d1f964a520e2a222e3"
},
{
	placename:"Gateway Of India",
	lat: 18.921936,
	lng:72.834573,
	id: "4b0587d1f964a520cea222e3"
},
{
	placename:"Lavasa",
	lat:18.409694,
	lng:73.506604,
	id:"4d552f05cff7721eee91a6f5"
},
{
	placename:"Ajanta Ellora Caves",
	lat:20.55186,
	lng:75.703252,
	id: "56849938498e7d9e04479627"
},
{
	placename:"Shirdi",
	lat:19.766863,
	lng:74.477261,
	id: "4d3785883ffba143c7375356"
}
]

var markers=[];

var VIEWMODEL=function()
{

var defaultMarker = makeMarkerIcon('#FF0000'); //default color of marker is stored in default icon
var highlightedMarker = makeMarkerIcon('FFFF24'); //color when we highlight it

var largeInfowindow= new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();

var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

// This function will loop through the markers array and display them all.
this.showPlaces=function () {
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }

function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } 
        else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }

function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>'+'<br>'+'<div>'+marker.position+'</div>'+'<div>'+marker.image+'</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
     }  

					// creating markers
					for(var i=0;i<initialLocations.length;i++)
					{
						var marker=new google.maps.Marker({
						position:{ lat: initialLocations[i].lat, lng:initialLocations[i].lng},
						animation:google.maps.Animation.DROP,
						title:initialLocations[i].placename,
						id:initialLocations[i].id,
						image:'',
						map:map
						});
						markers.push(marker); // adding to an array
					
					marker.addListener('click',function(){
						 populateInfoWindow(this, largeInfowindow);
					});	

					marker.addListener('dblclick',toggleBounce);
						  // to add bouncing effect on click of a marker
		

					/*marker.addListener('mouseover',function(){
							this.setIcon(highlightedMarker);
					});

					marker.addListener('mouseout',function(){
							this.setIcon(defaultMarker);
					})*/

					}	

function foresquare_info(marker){
		$.ajax({ //ajax request for foursquare api
            method: 'GET',
            dataType: "json",
            url: "https://api.foursquare.com/v2/venues/" +marker.id+ "?client_id=DMICGIQMEV3KHJ5M4TKF53UNKZNHKS3RVD42QNGYEEFG0M4Y&client_secret=D4W10ZAZVTURK02MYC1W1S2EF4O1MMDW54NT04OCCI05GCPU",
            success: function(data) { //if data is successfully fetch than function will execute
                var photo = data.response.venue;
                var imgurl = photo.prefix+"100x100"+photo.suffix;
                return imgurl;
            }
     }).done(function(){
				populateInfoWindow(marker,largeInfowindow);
			});
    } 



function createMarkersForPlaces(places) {
        //var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < places.length; i++) {
          var place = places[i];
          var icon = {
            size: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
        }
        }  

  function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }

      this.venues=ko.observableArray(markers);

	this.listview=function(){
		console.log("list appeared");
			//foresquare_info();
			// change maker color
			// displays info window of particulr marker
			//return	foresquare_info(marker);
	}(this);

	this.filtering=function(){
		console.log("function calld");
		for(var i=0;i<markers.length;i++)
			{
				markers[i].setMap(null);// hides all marker
			}
		var placesService = new google.maps.places.PlacesService(map);
        placesService.textSearch({
          query: document.getElementById('textbox').value,
          bounds: bounds
        }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
          	console.log("Found");
            createMarkersForPlaces(results);
          }
          else
          {
          	console.log("no place");
          	alert("no such place found");
          }
		});
	}			
}

