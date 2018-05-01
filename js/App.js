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

function initMap() {


        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:18.940288, lng:72.835295},
          zoom: 7
        });


var defaultMarker = makeMarkerIcon('#FF0000'); //default color of marker is stored in default icon
var highlightedMarker = makeMarkerIcon('FFFF24'); //color when we highlight it

var largeInfowindow= new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();

var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

// This function will loop through the markers array and display them all.


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
         console.log("Meh toh chal gaya")      
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

     var MainViewModelInstance = new VIEWMODEL();
          ko.applyBindings(MainViewModelInstance);
}

 function VIEWMODEL(){

      this.venues=ko.observableArray(markers);
      this.createMarkersForPlaces = initMap.createMarkersForPlaces;
      this.foresquare_info=initMap.foresquare_info;
      this.toggleBounce=initMap.toggleBounce;
      this.populateInfoWindow=initMap.populateInfoWindow;
      this.searchText = ko.observable("");

var largeInfowindow=new google.maps.InfoWindow();

// this function differentiates the clicked place marker from rest markers 
	this.listview=function(data){
    console.log("chl ja yr");
    console.log(this.title);
    for(var i=0;i<markers.length;i++)
      {
        if(this.title === markers[i].title)
        {
          //markers[i].setIcon(highlightedMarker);
          this.populateInfoWindow(markers[i],largeInfowindow);
        }
    }

			//foresquare_info();
			// change maker color
			// displays info window of particulr marker
			//return	foresquare_info(marker);
	};

// this function places the marker for place searched on click of button
	this.filtering=function(){
    console.log(this.searchText());
		console.log("function calld");
		for(var i=0;i<markers.length;i++)
			{
				markers[i].setMap(null);// hides all marker
			}
		// if searchText empty 
    if(this.searchText() === ''){
          console.log("khali hai");
          alert("Enter the location please...");
        }

          //compare with marker title and show corresponding marker
    for(var i=0;i<markers.length;i++)
        {
          console.log(markers[i].title);
          if(markers[i].title === this.searchText())
          {
              console.log("marker aa gaya");
              markers[i].setMap(map);
          }
        }
	}		

// This function will loop through the markers array and display them all.
this.showPlaces=function () {
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }

}

