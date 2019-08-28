var parentCategory = []
var parentId = []
var child = []
var childId = []
var replica = []

var childLevelTwo = []
var childIdLevelTwo = []


try{
	$.ajax( {
		url: "./dist/config.json",
		success: function( data ) {
			var abort = false;
			var saf = data[ "Maps" ]
			//console.log("cow " + data["safaricomMaps"].length)
			for ( var i = 0; i < saf.length && !abort; i++ ) {
				safParent = saf[ i ][ 'parentName' ]
				safParentid = saf[ i ][ 'parentId' ]
				safChild = saf[ i ][ 'name' ]
				safChildId = saf[ i ][ 'domId' ]
				safChildLevelTwo = saf[i]['levelTwoChild']
				//safChildLevelTwoId = saf[i]['levelTwoChild']
				objectReplica = { safParent, safParentid, safChild, safChildId , safChildLevelTwo}
				replica.push( objectReplica )
			}
			// Removing duplicates from the populated arrays
			//
			var newReplicaArray = replica.filter( function( elem, index, self ) {
				return index === self.indexOf( elem );
			} );
			console.log(newReplicaArray)
			
			// Creating tabs
	

			for ( var iii = 0; iii < newReplicaArray.length; iii++ ) {
				
				var concatinatedArray = []
				var mainParentId = newReplicaArray[ iii ][ 'safParentid' ]
				var mainParentName = ( newReplicaArray[ iii ][ 'safParent' ] )
					.trim()
				var childrenObjects = ( newReplicaArray[ iii ][ 'safChild' ] )
					.trim()
				var childrenObjectsId = ( newReplicaArray[ iii ][ 'safChildId' ] )
					.trim()
				joinedParentChild = { mainParentId, childrenObjects, childrenObjectsId }
				concatinatedArray.push( joinedParentChild )
				// Checking if the parent DOM element has  already been created, if not, it creates
				if ( $( '#' + mainParentId )
					.length === 0 ) {
					if ( mainParentId && mainParentName && childrenObjects ) {
						$( '#mainList' )
							.append( '<li id="' + mainParentId + '"class="treeview"><a><i class="fa fa-map-marker"></i>&nbsp;&nbsp;&nbsp;<span>' + mainParentName + '</span> <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a><ul class=" children treeview-menu"></ul></li>' )
						$( '#mainList li:first' )
							.addClass( 'active' );
					}
				}
				
				// Creating an array for the child items
				newConcatinatedArray = concatinatedArray.filter( function( elem, index, self ) {
					return index === self.indexOf( elem );
				} );
				for ( vii = 0; vii < newConcatinatedArray.length; vii++ ) {
					
					newMainParentId = newConcatinatedArray[ vii ][ 'mainParentId' ]
					if ( parseInt( mainParentId ) === parseInt(newMainParentId) ) {
						childList = $( '#' + mainParentId + ' ul' )

						childId =  newConcatinatedArray[ vii ][ 'childrenObjectsId' ]
						childNames =  newConcatinatedArray[ vii ][ 'childrenObjects' ]
						childList.append('<li><a class=" saf btn-switch safMaps" data-id="'+childId+'">&nbsp;&nbsp; <i class="fa fa-cogs"></i>&nbsp;&nbsp;&nbsp;'+childNames+'</a></li>')
						//('#' + mainParentId + ' ul li:first').addClass('active')
						if (parseInt( mainParentId )=== 0){
							$('#' + mainParentId + ' ul li:first').addClass('active')
						}

						// Get Second Level Child
					}
				}
			}
		},
		error: function( e ) {
			console.log( e );
		}
	} );
}

catch(e){
	console.log(e instanceof TypeError);
	console.log(e.message);             
	console.log(e.name);                 
	console.log(e.fileName);            
	console.log(e.lineNumber);           
	console.log(e.columnNumber);         
	console.log(e.stack);                
}