(function ($) {
    // USE STRICT
    "use strict";

    $(function() {
      /*Preloader animsition*/
      $(window).on('load', function () {
          $('.page-loader').fadeOut('slow', function () {
              $(this).remove();
          });
      });

      // Button search
      $('.ic-search').on('click', function(e) {
          $('.search').toggle(500);
      })

      // Change icon menu dropdown
      $('.ic-dropdown').on('click', function(e) {
        if ($(this).parent().hasClass('open')){
          $(this).parent().removeClass('open');
          $(this).removeClass('rotate-180');
        }
        else {
          $('.dropdown').removeClass('open');
          $(this).parent().toggleClass('open');
          $('.ic-dropdown').removeClass('rotate-180');
          $(this).toggleClass('rotate-180');  
        }
          
      });

      // Slider Project Homepage 01
      $('.slider-project').owlCarousel({
          loop: true,
          nav: true,
          autoplay: true,
          responsive: {
              0: {
                  items: 1
              },
              768: {
                  items: 2
              },
              992: {
                  items: 3
              }
          }
      })
      $(".slider .owl-prev").html('<i class="fa fa-caret-left" style = "font-size:20px;"></i>');
      $(".slider .owl-next").html('<i class="fa fa-caret-right" style = "font-size:20px;"></i>');

      // Slider Project Homepage 02
      $('.slider-project-home-2').owlCarousel({
          loop: true,
          margin: 30,
          nav: true,
          autoplay: true,
          responsive: {
              0: {
                  items: 1
              },
              768: {
                  items: 2
              },
              992: {
                  items: 3
              }
          }
      })
      $(".slider-project-home-2 .owl-prev").html('<i class="fa fa-caret-left" style = "font-size:20px;"></i>');
      $(".slider-project-home-2 .owl-next").html('<i class="fa fa-caret-right" style = "font-size:20px;"></i>');

      // RANGE FILTER
      $("#slider-range").slider({
          range: true,
          min: 2,
          max: 50,
          values: [2, 50],
          slide: function(event, ui) {
              $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
          }
      });
      $("#amount").val("$" + $("#slider-range").slider("values", 0) +
          " - $" + $("#slider-range").slider("values", 1));

      // PRODUCT DETAIL ACCORDION
      $('.collapse').on('shown.bs.collapse', function() {
          $(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
      }).on('hidden.bs.collapse', function() {
          $(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
      });

      // Fancybox
      $('.fancybox').fancybox({
          padding: 0,
          helpers: {
              title: {
                  type: 'over'
              }
          },
          beforeShow: function() {
              this.title = (this.title ? '' + this.title + '' : '') + 'Image ' + (this.index + 1) + ' of ' + this.group.length;
          }
      });
      $(".fancybox-services-detail").fancybox({
          padding: 0,
          helpers: {
              title: {
                  type: 'over'
              }
          },
          beforeShow: function() {
              this.title = (this.title ? '' + this.title + '' : '') + 'Image ' + (this.index + 1) + ' of ' + this.group.length;
          }
      });
      $('.sidebar-product a').on('click', function(e) {
          $('.sidebar-product .active').removeClass('active');
          $(this).addClass('active');
      });

      $('.sidebar-project-list a').on('click', function(e) {
          $('.sidebar-project-list .active').removeClass('active');
          $(this).addClass('active');
      });

    });


    /*********************
 *	Helpers Code
 ********************/
/**
 *  @function   DOMReady
 *
 *  @param callback
 *  @param element
 *  @param listener
 *  @returns {*}
 *  @constructor
 */
const DOMReady = ((
    callback  = () => {},
    element   = document,
    listener  = 'addEventListener'
  ) => {
    return (element[listener]) ? element[listener]('DOMContentLoaded', callback) : window.attachEvent('onload', callback);
  });
  
  /**
   *  @function   ProjectAPI
   *
   *  @type {{hasClass, addClass, removeClass}}
   */
  const ProjectAPI = (() => {
    let hasClass,
        addClass,
        removeClass;
  
    hasClass = ((el, className) => {
      if (el === null) {
        return;
      }
  
      if (el.classList) {
        return el.classList.contains(className);
      }
      else {
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
      }
    });
  
    addClass = ((el, className) => {
      if (el === null) {
        return;
      }
  
      if (el.classList) {
        el.classList.add(className);
      }
      else if (!hasClass(el, className)) {
        el.className += ' ' + className
      }
    });
  
    removeClass = ((el, className) => {
      if (el === null) {
        return;
      }
  
      if (el.classList) {
        el.classList.remove(className);
      }
      else if (hasClass(el, className)) {
        let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
  
        el.className = el.className.replace(reg, ' ');
      }
    });
  
    return {
      hasClass:     hasClass,
      addClass:     addClass,
      removeClass:  removeClass
    };
  })();
  
  
  /*********************
   *	Application Code
   ********************/
  /**
   *  @function   readyFunction
   *
   *  @type {Function}
   */
  const readyFunction = (() => {
  
    const KEY_UP    = 38;
    const KEY_DOWN  = 40;
  
    let scrollingClass          = 'js-scrolling',
        scrollingActiveClass    = scrollingClass + '--active',
        scrollingInactiveClass  = scrollingClass + '--inactive',
  
        scrollingTime           = 1350,
        scrollingIsActive       = false,
  
        currentPage             = 1,
        countOfPages            = document.querySelectorAll('.' + scrollingClass + '__page').length,
  
        prefixPage              = '.' + scrollingClass + '__page-',
  
        _switchPages,
        _scrollingUp,
        _scrollingDown,
  
        _mouseWheelEvent,
        _keyDownEvent,
  
        init;
  
    /**
     *  @function _switchPages
     *
     *  @private
     */
    _switchPages = () => {
  
      let _getPageDomEl;
  
        /**
       *  @function _getPageDomEl
       *
       *  @param page
       *  @returns {Element}
       *  @private
         */
      _getPageDomEl      = (page = currentPage) => {
        return document.querySelector(prefixPage + page);
      };
  
      scrollingIsActive  = true;
  
  
      ProjectAPI.removeClass(
        _getPageDomEl(),
        scrollingInactiveClass
      );
      ProjectAPI.addClass(
        _getPageDomEl(),
        scrollingActiveClass
      );
  
      ProjectAPI.addClass(
        _getPageDomEl(currentPage - 1),
        scrollingInactiveClass
      );
  
      ProjectAPI.removeClass(
        _getPageDomEl(currentPage + 1),
        scrollingActiveClass
      );
  
  
      setTimeout(
        () => {
          return scrollingIsActive = false;
        },
        scrollingTime
      );
    };
      /**
     *  @function _scrollingUp
     *
     *  @private
     */
    _scrollingUp = () => {
      if (currentPage === 1) {
        return;
      }
  
      currentPage--;
  
      _switchPages();
    };
      /**
     *  @function _scrollingDown
     *
     *  @private
     */
    _scrollingDown = () => {
      if (currentPage === countOfPages) {
        return;
      }
  
      currentPage++;
  
      _switchPages();
    };
      /**
     *  @function _mouseWheelEvent
     *
     *  @param e
     *  @private
     */
    _mouseWheelEvent = (e) => {
      if (scrollingIsActive) {
        return;
      }
  
      if (e.wheelDelta > 0 || e.detail < 0) {
        _scrollingUp();
      }
      else if (e.wheelDelta < 0 || e.detail > 0) {
        _scrollingDown();
      }
    };
      /**
     *  @function _keyDownEvent
     *
     *  @param e
     *  @private
     */
    _keyDownEvent = (e) => {
      if (scrollingIsActive) {
        return;
      }
  
      let keyCode = e.keyCode || e.which;
  
      if (keyCode === KEY_UP) {
        _scrollingUp();
      }
      else if (keyCode === KEY_DOWN) {
        _scrollingDown();
      }
    };
  
    /**
     *  @function init
     *
     *  @note     auto-launch
     */
    init = (() => {
      document.addEventListener(
        'mousewheel',
        _mouseWheelEvent,
        false
      );
      document.addEventListener(
        'DOMMouseScroll',
        _mouseWheelEvent,
        false
      );
  
      document.addEventListener(
        'keydown',
        _keyDownEvent,
        false
      );
    })();
  
  });
  
  
  /**
   *  Launcher
   */
  DOMReady(readyFunction);

  
  

})(jQuery);  


