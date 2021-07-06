

(function ($) {
    // USE STRICT
    "use strict";

    $(document).ready(function () {
        /* initialize the slider based on the Slider's ID attribute from the wrapper above */
        $('#rev_slider').show().revolution({
            /* options are 'auto', 'fullwidth' or 'fullscreen' */
            responsiveLevels: [1920, 1600, 768, 320],
            gridwidth:[1240, 1024, 768, 300],
            sliderType:"standard",
            dottedOverlay:"none",
            sliderLayout: 'auto',
            gridheight:[800,800,500,400],
            delay: 15000,
            spinner: 'spinner2',
            /* basic navigation arrows and bullets */
            navigation: {
                onHoverStop: "off",
                arrows: {
                    enable: true,
                    style: 'uranus',
                    hide_onleave: true
                },

                bullets: {
                    enable: false,
                    style: 'hermes',
                    hide_onleave: false,
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 20,
                    space: 5
                }
            }
        });
        
    });

   

    
})(jQuery);

