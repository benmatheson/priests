
    mapboxgl.accessToken =
	"pk.eyJ1IjoiYmVubWF0aGVzb24iLCJhIjoiY2lmZDhyZXVxNTI5eHNtbHgyOTYwbHJtMyJ9.Ch8JQXvunpUrv6tGpeJMCA";

console.log(priests)


    var popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true
        // className: "popBox",
        // anchor: "bottom",
        // offset: 10

    });

    // var priests = "data/priestGatherGeo.json";
    var locations = "data/locations.geojson";


    var map1 = new mapboxgl.Map({
        container: "map1",
        // style: "mapbox://styles/mapbox/dark-v9",
        // style: "mapbox://styles/mapbox/satellite-v9",
        // style: "mapbox://styles/mapbox/streets-v9",
        style: "mapbox://styles/mapbox/light-v9",

        // style:  "mapbox://styles/benmatheson/cjo060m9v05hx2rp2yd4d3yiw",       // style: "mapbox://styles/mapbox/basic-v9",

        pitch: 0,
    
        transition: {
            duration: 100,
            delay: 0
        },
        // style: 'mapbox://styles/benmatheson/cjh2yaf301jjm2sru7r1uz7n7',
    
        center: [-152, 64.4],
        minzoom: 6,
        zoom: 3.2, 
        maxzoom: 12
    });

    map1.scrollZoom.disable();
    // map1.touchZoomRotate.disable();
    map1.addControl(new mapboxgl.NavigationControl());

    map1.on("load", function() {

	


  map1.addSource("locations", {
            type: "geojson",
            data: locations,
            buffer:30,
            // 'generateId': true // this ensure that all features have unique ids

        });  //add source


        map1.addLayer({
            id: "ct",
            type: "circle",
            source: "locations",
            paint: {
                'circle-radius': {
                    // 'base': 7,
                    'stops': [[5, 5], [12, 8]]
                },

                'circle-color':
                   'rgba(0,0,0,.7)'
              
//        "fill-opacity": .99,
//        "fill-outline-color": "rgba(255,255,255,.3)",
// "fill-color": "rgba(255,255,255,.9)"
     
            
            } //paint


     



        }, "road-primary"); //add layer






    let hoveredStateId = null;

    map1.on('mousemove', 'ct', function(e) {
        // Change the cursor style as a UI indicator.
        map1.getCanvas().style.cursor = 'pointer';

        console.log("e.features")
        console.log(e.features)  

        // map1.setPaintProperty("ct", 'line-width', 1);




var cityName =  e.features[0].properties["location_simple"];
var priestsList = priests.filter(d=> d.location_simple == cityName );

var notes = priestsList.filter(d=>d.loc =="NOTES")

console.log(priestsList)
console.log(notes.length)

    //   var walker =   e.features[0].properties["Walker/Mallott"];
    //   var dunleavy =   e.features[0].properties["Dunleavy/Meyer"];
    //   var begich =   e.features[0].properties["Begich/Call"];

    //   var begichPercent = e.features[0].properties["begichPercent"]
    //   var dunleavyPercent = e.features[0].properties["dunleavyPercent"]
    //   var walkerPercent = e.features[0].properties["walkerPercent"]


    //   console.log(walker)

    // priestsDetails = priestsList.map((d,i)=>  )


const popTable =  `
<p class="popPre">${cityName}</p>

${priestsList.map((d,i)=>`<p class="popName">${d.priests}</p>`  ).join('')}
`




      popup.setLngLat(e.lngLat)
      .setHTML(popTable)
      .addTo(map1);






      map1.getCanvas().style.cursor = 'pointer';















    })


    map1.on('mouseout', 'ct', function(e) {
       popup.remove();

    })












//////for the mobile




// map1.on('click', 'ct', function(e) {
//     // Change the cursor style as a UI indicator.
// e.preventDefault();
//     console.log('CLICKING')
//     console.log(e.lngLat)

//     map1.getCanvas().style.cursor = 'pointer';
// console.log('e.features[0]')
//     console.log(e.features[0])

//     var coordinates = e.features[0].geometry.coordinates[0][0];
//     console.log(coordinates)


// var preName =  e.features[0].properties["precinctName"];

//   var walker =   e.features[0].properties["Walker/Mallott"];
//   var dunleavy =   e.features[0].properties["Dunleavy/Meyer"];
//   var begich =   e.features[0].properties["Begich/Call"];

//   var begichPercent = e.features[0].properties["begichPercent"]
//   var dunleavyPercent = e.features[0].properties["dunleavyPercent"]
//   var walkerPercent = e.features[0].properties["walkerPercent"]


//   console.log(walker)


// const popTable =  `




// <table width="100%">
// <tr class="popPre"><td>${preName}</td></tr>
// <tr>
// <th class="thead">Candidate</th>
// <th class="thead">Votes</th> 
// <th class="thead">Pct.</th>
// </tr>


// <tr>
// <td><span class="popName">Mark Begich </span> </td>
// <td><span class="popValue"> ${begich.toLocaleString()}  </span></td>
// <td><span class="popPercent">${(begichPercent*100).toFixed(1)}%</span> </td>

// </tr>

// <tr>
// <td><span class="popName">Mike Dunleavy </span> </td>
// <td><span class="popValue"> ${dunleavy.toLocaleString()}  </span></td>
// <td><span class="popPercent">${(dunleavyPercent*100).toFixed(1)}%</span> </td>

// </tr>
// <tr>
// <td><span class="popName">Bill Walker </span> </td>
// <td><span class="popValue"> ${walker.toLocaleString()}  </span></td>
// <td><span class="popPercent">${(walkerPercent*100).toFixed(1)}%</span> </td>

// </tr>


// </table>`

// console.log('PUPUPS')
// console.log(popup)



//   popup.setLngLat(e.lngLat)
//   .setHTML(popTable)
//   .addTo(map1);


// })
















    }) //onload







    




    // road-primary


//python -m SimpleHTTPServer 1337

    
        // var expression = ["match", ["get", "DISTRICT"]];

        // // Calculate color for each state based on the unemployment rate
        // data.forEach(function(row) {

        //     var r = row.rMargin;
        //     console.log(r)
        //     // expression.push(row["DISTRICT"], r);
        //     console.log(expression)
        // });



// })