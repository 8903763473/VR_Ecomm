import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import Swiper from 'swiper';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  sliderInit3: any;

  constructor(private renderer: Renderer2) {}

  
  ngAfterViewInit() {
    // this.initializeSwiper();
    this.loadScripts()
  }



  loadScripts() {
    const scripts = [
      'assets/js/jquery-3.7.1.min.js',
      'assets/js/bootstrap.min.js',
      'assets/js/swiper-bundle.min.js',
      'assets/js/jquery.counterup.min.js',
      // 'assets/js/wow.min.js',
      // 'assets/js/magnific-popup.min.js',
      'assets/js/nice-select.min.js',
      'assets/js/pace.min.js',
      'assets/js/isotope.pkgd.min.js',
      // 'assets/js/jquery.waypoints.js',
      'assets/js/script.js'
    ];

    for (const script of scripts) {
      this.loadScript(script);
    }
  }

  loadScript(src: string) {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }
  // initializeSwiper(): void { 
  //   var swiper = new Swiper('.gallery__slider', {
  //     slidesPerView: 'auto',
  //     spaceBetween: 30,
  //     loop: true, // Loop the slides
  //     autoplay: {
  //       delay: 0, // Auto scroll with no delay
  //       disableOnInteraction: false,
  //     },
  //     speed: 20000, // Adjust the speed of the scrolling
  //   });
    
    
  //   var swiper = new Swiper(".gallery__slider", {
  //     spaceBetween: 30,
  //     speed: 300,
  //     loop: true,
  //     centeredSlides: true,
  //     autoplay: {
  //       delay: 5000,
  //       disableOnInteraction: false,
  //     },
  //     breakpoints: {
  //       1300: {
  //         slidesPerView: 4,
  //       },
  //       991: {
  //         slidesPerView: 3,
  //       },
  //       768: {
  //         slidesPerView: 2,
  //       },
  //     },
  //   });

  //   var swiper = new Swiper(".category__slider", {
  //     spaceBetween: 30,
  //     speed: 500,
  //     loop: true,
  //     autoplay: {
  //       delay: 3000,
  //       disableOnInteraction: false,
  //     },
  //     breakpoints: {
  //       1440: {
  //         slidesPerView: 6,
  //       },
  //       1300: {
  //         slidesPerView: 5,
  //       },
  //       991: {
  //         slidesPerView: 4,
  //       },
  //       768: {
  //         slidesPerView: 3,
  //       },
  //       500: {
  //         slidesPerView: 2,
  //       },
  //     },
  //   });

  //   var swiper = new Swiper(".brand__slider", {
  //     spaceBetween: 30,
  //     speed: 300,
  //     loop: true,
  //     autoplay: {
  //       delay: 3000,
  //       disableOnInteraction: false,
  //     },
  //     breakpoints: {
  //       1440: {
  //         slidesPerView: 6,
  //       },
  //       1300: {
  //         slidesPerView: 5,
  //       },
  //       991: {
  //         slidesPerView: 4,
  //       },
  //       768: {
  //         slidesPerView: 3,
  //       },
  //       500: {
  //         slidesPerView: 2,
  //       },
  //     },
  //   });

  //   var swiper = new Swiper(".get__slider", {
  //     loop: true,
  //     spaceBetween: 10,
  //     speed: 300,
  //     autoplay: {
  //       delay: 4000,
  //       disableOnInteraction: false,
  //     },
  //     navigation: {
  //       nextEl: ".get-now__arry-right",
  //       prevEl: ".get-now__arry-left",
  //     },
  //   });

  //   var sliderActive3 = ".banner-two__slider";
	// const sliderInit3 = new Swiper('.banner-two__slider', {
	// 	loop: true,
	// 	slidesPerView: 1,
	// 	effect: "fade",
	// 	speed: 3000,
	// 	autoplay: {
	// 	  delay: 7000,
	// 	  disableOnInteraction: false,
	// 	},
	// 	navigation: {
	// 	  nextEl: ".banner-two__arry-next",
	// 	  prevEl: ".banner-two__arry-prev",
	// 	},
	   
		
	//   });
  //   function animated_swiper(selector: string, init: Swiper) {
  //     var animated = function animated() {
  //       $(selector + " [data-animation]").each(function () {
  //         var anim = $(this).data("animation");
  //         var delay = $(this).data("delay");
  //         var duration = $(this).data("duration");
  //         $(this)
  //           .removeClass("anim" + anim)
  //           .addClass(anim + " animated")
  //           .css({
  //             webkitAnimationDelay: delay,
  //             animationDelay: delay,
  //             webkitAnimationDuration: duration,
  //             animationDuration: duration,
  //           })
  //           .one("animationend", function () {
  //             $(this).removeClass(anim + " animated");
  //           });
  //       });
  //     };
  //     animated();
  //     init.on("slideChange", function () {
  //       $(sliderActive3 + " [data-animation]").removeClass("animated");
  //     });
  //     init.on("slideChange", animated);
  //   }
  //   animated_swiper(sliderActive3, sliderInit3);


    
  //   var targetDate = new Date("2023-12-01 00:00:00").getTime();
	// // fix you date here
	// var countdownInterval = setInterval(function () {
	// 	var currentDate = new Date().getTime();
	// 	var remainingTime = targetDate - currentDate;

	// 	var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
	// 	var hours = Math.floor(
	// 		(remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	// 	);
	// 	var minutes = Math.floor(
	// 		(remainingTime % (1000 * 60 * 60)) / (1000 * 60)
	// 	);
	// 	var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

	// 	// Pad single-digit values with leading zeros
	// 	$("#day").text(days.toString().padStart(2, "0"));
	// 	$("#hour").text(hours.toString().padStart(2, "0"));
	// 	$("#min").text(minutes.toString().padStart(2, "0"));
	// 	$("#sec").text(seconds.toString().padStart(2, "0"));

	// 	if (remainingTime <= 0) {
	// 		clearInterval(countdownInterval);
	// 		// You can add a message or perform any action when the countdown timer reaches zero
	// 	}
	// }, 1000);
  // }
}
