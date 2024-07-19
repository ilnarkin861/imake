$(document).ready(function(){

	let slider = $('#main-slider');

	slider.slick({
		fade: true,
		nextArrow: document.getElementById('main-slider-next'),
		prevArrow: document.getElementById('main-slider-prev'),
	});

	$('#menu a').on('click', function(e){
		e.preventDefault();
		let slideId = $(this).data('slide-id');
		slider.slick('slickGoTo', slideId);
	});
});
