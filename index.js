import angular from 'angular'
import $ from 'jquery'
import one from './data/one'
import two from './data/two'
import three from './data/three'
import four from './data/four'
import five from './data/five'
import six from './data/six'
import ten from './data/ten'

!function(a,b,c){a.ripple=function(d,e){var f=this,g=f.log=function(){f.defaults.debug&&console&&console.log&&console.log.apply(console,arguments)};f.selector=d,f.defaults={debug:!1,on:"mousedown",opacity:.4,color:"auto",multi:!1,duration:.7,rate:function(a){return a},easing:"linear"},f.defaults=a.extend({},f.defaults,e);var h=function(b){var d,e,h=a(this);if(h.addClass("has-ripple"),e=a.extend({},f.defaults,h.data()),e.multi||!e.multi&&0===h.find(".ripple").length){if(d=a("<span></span>").addClass("ripple"),d.appendTo(h),g("Create: Ripple"),!d.height()&&!d.width()){var i=c.max(h.outerWidth(),h.outerHeight());d.css({height:i,width:i}),g("Set: Ripple size")}if(e.rate&&"function"==typeof e.rate){var j=c.round(d.width()/e.duration),k=e.rate(j),l=d.width()/k;e.duration.toFixed(2)!==l.toFixed(2)&&(g("Update: Ripple Duration",{from:e.duration,to:l}),e.duration=l)}var m="auto"==e.color?h.css("color"):e.color,n={animationDuration:e.duration.toString()+"s",animationTimingFunction:e.easing,background:m,opacity:e.opacity};g("Set: Ripple CSS",n),d.css(n)}e.multi||(g("Set: Ripple Element"),d=h.find(".ripple")),g("Destroy: Ripple Animation"),d.removeClass("ripple-animate");var o=b.pageX-h.offset().left-d.width()/2,p=b.pageY-h.offset().top-d.height()/2;e.multi&&(g("Set: Ripple animationend event"),d.one("animationend webkitAnimationEnd oanimationend MSAnimationEnd",function(){g("Note: Ripple animation ended"),g("Destroy: Ripple"),a(this).remove()})),g("Set: Ripple location"),g("Set: Ripple animation"),d.css({top:p+"px",left:o+"px"}).addClass("ripple-animate")};a(b).on(f.defaults.on,f.selector,h)}}($,document,Math);$.ripple.version = "1.2.1";

window.addEventListener('load', () => {
    document.body.addEventListener('touchstart', function(){});
});
var app = angular.module('app', []);
app.controller('controller', ['$scope', function ($scope) {
	$scope.open = false;
	$scope.nav = [
		one, 
		two,
		three,
		four,
		five,
		six,
		ten,
	];
	$scope.hash = function () {
		var hash = window.location.hash.split('@')[0];
		if( !hash ) return $scope.nav[0].hash;
		var findHash = $scope.nav.every(function (el) { return el.hash !== hash });
		if( findHash ) return $scope.nav[0].hash;
		return hash;
	}();
	$scope.hashButton = function (hash) {
		$scope.hash = hash;
	};
	$scope.openButton = function () {
		$scope.open = !$scope.open;
		$('.nav-open').slideToggle(200);
	};

	$(function () {
		var hashLocation = function () {
			var hash = window.location.hash.split('@')[0];
			if( !hash ) return;
			var el = $(hash);
			if( el.length === 0 ) {
				$('body,html').animate({
					scrollTop: 0
				}, 300);
				return;
			}
			var offsetTop = el.offset().top;
			if( offsetTop <= 10 ) return;
			$('body,html').animate({
				scrollTop: offsetTop + 'px'
			}, 300);
		}();
		
		var elTop = $('.scroll-top');
		elTop.on('click', function () {
			$('body,html').animate({
				scrollTop: 0
			}, 300);
		});
		var topArr = [];
		$scope.nav.forEach(el => {
			topArr.push({
				hash: el.hash,
				top: $(el.hash).offset().top,
			});
		});
		$(window).on('scroll', function () {
			var scrollTop = $(window).scrollTop();
			if( scrollTop > 300 ) {
				elTop.fadeIn();
			} else {
				elTop.fadeOut();
			}
			topArr.forEach(el => {
				if( (el.top - scrollTop <= 150) && (el.top - scrollTop >= -150) ) {
					window.location.hash = `${el.hash.slice(1)}@scroll`;
					$scope.$apply(() => {
						$scope.hash = el.hash;
					});
				}
			});
		});
		$.ripple('.nav-title a', {
			multi: true
		});
	});
}]);
