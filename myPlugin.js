(function($){

	jQuery.fn.myPlugin = function (userParams)
	{
		var defaultParams = {
			display: 'none',
			speed: 'slow'
		};

		var parameters = $.extend(defaultParams, userParams);

		var player = $('video')[0];
		var current_volume = 1;
		var duration = player.duration;    // Durée totale
    	var time     = player.currentTime; // Temps écoulé

    	// Play / Pause
		$('.video-play, video').click(function() {
			if (player.paused) {
			    player.play();
			    $('.video-play i').removeClass('fa-play').addClass('fa-pause');
			} else if(duration <= time+0.0001) {
				$('.video-play i').removeClass('fa-repeat').addClass('fa-pause');
			} else {
			    player.pause();
			    $('.video-play i').removeClass('fa-pause').addClass('fa-play');
			}
		});

		// Volume
		$('.video-volume').on('click', function() {
			if (player.volume != 0) {
				console.log('stop');
			    player.volume = 0;
			    if (current_volume > 7) {
			    	$('.video-volume i').removeClass('fa-volume-down').addClass('fa-volume-off');
			    } else {
			    	$('.video-volume i').removeClass('fa-volume-up').addClass('fa-volume-off');
			    };
			} else {
			    player.volume = current_volume;
			    if (current_volume > 7) {
			    	$('.video-volume i').removeClass('fa-volume-off').addClass('fa-volume-down');
			    } else {
			    	$('.video-volume i').removeClass('fa-volume-off').addClass('fa-volume-up');
			    };
			}
		});

		// Time
		player.addEventListener("timeupdate", function() {
			console.log('test');

		    var duration = player.duration;    // Durée totale
		    var time     = player.currentTime; // Temps écoulé
		    var fraction = time / duration;
		    var percent  = Math.ceil(fraction * 100);

		    var progress = $('.progressBar');

		    progress.width(percent + '%');
		    $('.video-time span').text(formatTime(time)+' / '+duration);
		    
		    //<i class="fa fa-repeat"></i>

		    console.log(duration);
		    console.log(time);

		    if (duration <= time+0.0001) {
		    	$('.video-play i').removeClass('fa-pause').addClass('fa-repeat');
		    };
		});

		function formatTime(time) {
		    var hours = Math.floor(time / 3600);
		    var mins  = Math.floor((time % 3600) / 60);
		    var secs  = Math.floor(time % 60);
			
		    if (secs < 10) {
		        secs = "0" + secs;
		    }
			
		    if (hours) {
		        if (mins < 10 & hours == 0) {
		            mins = "0" + mins;
		        }
				
		        return hours + ":" + mins + ":" + secs; // hh:mm:ss
		    } else {
		        return mins + ":" + secs; // mm:ss
		    }
		}

	};

})(jQuery);
