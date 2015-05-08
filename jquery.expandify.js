(function ($) {
 
    $.fn.expandify = function( options ) {
		
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            btnWidth: '50px',
			btnHeight: '50px',
			expandWidth: '350px'
        }, arguments[0] || {});
 
		var toggleWidth = '0px';
		var toggleTimer = null;
		var item = null;
		
		$.fn.expandify.selectedItem = function() {
			return $(item);
		}
		
		function toggleMenu(ele) {
			toggleWidth = (toggleWidth == "0px" ? settings.expandWidth : '0px');
			$(ele).find('.expando-btn-content').fadeIn('slow', function () {
				$(this).animate({width: toggleWidth}, 400);
			});
			if (toggleWidth == "0px")
				clearTimeout(toggleTimer); 
		}
		
		$('.expando-btn').on('click', function(e) {
			x = e.pageX - $(this).offset().left;
			w = $(this).find('.expando-btn-target').width();
			
			if (x < w) { // clicked within main btn rect
				toggleMenu($(this).parent());
				if (toggleWidth != "0px") {
					toggleTimer = setTimeout(function(self) { 
						//if (toggleWidth != "0px") {
							toggleMenu(self);
						//}
					}, 5000, $(this).parent());
				}		
			}
		})
	
		$('.expando-btn-content a').on('click', function() {
			item = $(this).find('img');
			//console.debug( $(item).attr('alt') );
			
			// set new src and alt tag in button from selected item
			img = $(this).parent().parent().find('.expando-btn-target').find('img');
			$(img).attr('src', $(item).attr('src') );
			$(img).attr('alt', $(item).attr('alt') );
			toggleMenu($(this).parent().parent());
			
			selectedItem = $(item);
		})

				
		// init
		$('.expando-btn-target').css({ 'width': settings.btnWidth, 'height': settings.btnHeight });
		$('.expando-btn-content').animate({width: toggleWidth});
		
		return this;
    };
 
}(jQuery));