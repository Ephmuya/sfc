
require( [ "esri/views/MapView", "esri/widgets/Legend", "esri/widgets/Print", "esri/widgets/Expand", "esri/WebMap" ], function( MapView,
	Legend, Print, Expand, WebMap ) {
	var webmapids = [
"67e7285222b44d7c902ac21d2d4e7a56", //1 SFC Maps
"4255f25ea47f485e9829680965559299", //2 Active Sites (2G and 3G)
"b324df3d857b4c64b581f837e7570d73", //3 2G and 3G vs Planned LTE
"e552153941ce4c44af7c1024c5652007", //4 Competitor Sites
"2ebd169b4bea43da84773ea4a535c137", //5 Consolidated Smart Nominals
"ca0a8a96db8f4fc59c6ff67dc7d7cb05", //6 Fiber Sites
"42d83c71f51446a1868212631b20cb5f", //7 Planned LTE Sites (and Density)
"b324df3d857b4c64b581f837e7570d73"
];
	var webmaps = webmapids.map( function( webmapid ) {
		return new WebMap( {
			portalItem: {
				id: webmapid
			}
		} );
	} );
	var view = new MapView( {
		map: webmaps[ 0 ],
		container: "viewDiv",
		center: [ 37, 0 ],
		zoom: 5
	} );
	
var legend = new Legend( {
		view: view,

		
	} );
		
	let legendExpand = new Expand( {
		view: view,
		content: legend
	} );


	let print = new Print( {
		view: view,
		printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
		container: document.createElement( "div" )
	} );
	let printExpand = new Expand( {
		view: view,
		content: print
	} );
	
	view.ui.add( printExpand, "top-left" );
	view.ui.add( legendExpand, "bottom-right" );
	var list = document.getElementsByTagName( 'li' )
	$( 'li' )
		.on( 'click', function() {
			//$(this).parent().addClass('active').siblings().removeClass('active');
			$( this )
				.addClass( "active" )
				.siblings()
				.removeClass( "active" );
		} );
	var safMapLinks = document.getElementsByClassName( 'saf' );
	let title = safMapLinks.innerText;
	for ( var i = 0; i < safMapLinks.length; i++ ) {
		
		safMapLinks[i].addEventListener( 'click', changeMap );
	}

	function changeMap(e) {
		//console.log( "Clicked " + this.id );
		var element = e.target.innerText;
		console.log(element);
		var mapTitle = document.getElementById( 'mapTitle' );
		//$('#mapTitle').html(element)
		mapTitle.innerHTML =element
		
		
		
		var mapId = event.target.getAttribute( "data-id" );
			if ( mapId === 'undefined') {
					toastr.error(element + ' at the moment has no data!')
					
				}
		if ( mapId ) {
			var webmap = webmaps[mapId];
			view.map = webmap;
			document.getElementsByClassName( "btn-switch" )
			var safMaps = document.querySelectorAll( ".btn-switch" );
			for ( var idx = 0; idx < safMaps.length; idx++ ) {
				var safMap = safMaps[ idx ];
				var mapIndex = safMap.getAttribute( "data-id" );
				if ( mapIndex === mapId ) {
					safMap.classList.add( "active-map" );
				} else {
					safMap.classList.remove( "active-map" );
				}
			
				
			}
				
		}
	}

} );