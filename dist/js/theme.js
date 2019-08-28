$.ajax( {
    url: "./dist/config.json",
    success: function( data ) {
       // alert("chei! We made it")
       var saf = data[ "Theme" ]
       
       // Update color theme

       $('.skin-black,.skin-black .main-sidebar,.skin-black .left-side, .logo, .navbar, .skin-black .sidebar-menu .treeview-menu>li , .saf').css({
            'background-color': '#030708 !important',
      
        });


    },
    error: function( e ) {
        console.log( e );
    }

} )