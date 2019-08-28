var webmapids = []
var webmapNames = []
var webmapNameIds = []
$.ajax( {
	url: "./dist/config.json",
	success: function( data ) {
		for ( i = 0; i < data[ "Maps" ].length; i++ ) {
			let safMapId = data[ "Maps" ][ i ][ 'mapId' ]
			let safMapNamesIds = data[ "Maps" ][ i ][ 'domId' ]
			let safMapName = data[ "Maps" ][ i ][ 'name' ]
			webmapids.push( safMapId )
			webmapNames.push( safMapName )
			webmapNameIds.push( safMapNamesIds )
		}
		require( [ "esri/views/MapView", "esri/widgets/Legend", "esri/widgets/Print", "esri/widgets/Expand", "esri/WebMap" ], function( MapView, Legend, Print, Expand, WebMap ) {
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
				center: [ 42, 0 ],
				zoom: 5
			} );
			var legend = new Legend( {
				view: view,
			} );
			let legendExpand = new Expand( {
				view: view,
				expanded: true,
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
			//var list = document.getElementsByTagName('li')
			$( 'li' )
				.on( 'click', function() {
					$( this )
						.addClass( "active" )
						.siblings()
						.removeClass( "active" );
				} );
			var safMapLinks = document.getElementsByClassName( 'saf' );
			let title = safMapLinks.innerText;
			for ( var i = 0; i < safMapLinks.length; i++ ) {
				safMapLinks[ i ].addEventListener( 'click', changeMap );
			}

			function changeMap( e ) {
				var element = e.target.innerText;
				var mapTitle = document.getElementById( 'mapTitle' );
				mapTitle.innerHTML = element
				var mapId = event.target.getAttribute( "data-id" );
				var nameid = event.target.getAttribute( "nameid" );
				if ( mapId ) {
				
					try{
						var webmap = webmaps[mapId];
						view.map = webmap;
						if (webmap === "" || webmap === null ){
							toastr.error(element + ' at the moment has no data!' )
						}
					}

					catch(error){
						console.log("informative error message: ", error.message);
						toastr.error('Error: '+ error.message)
						
					}
				
					document.getElementsByClassName( "btn-switch" )
					var Maps = document.querySelectorAll( ".btn-switch" );
					for ( var idx = 0; idx < Maps.length; idx++ ) {
						var safMap = Maps[ idx ];
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
	},
	error: function( e ) {
		console.log( e );
	}
} );
