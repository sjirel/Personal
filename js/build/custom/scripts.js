
$(document).ready(function () {
    var Scrollbar = window.Scrollbar;
    Scrollbar.initAll();

});

$(window).on('load', function () {
    /**
     * Global controller for scrollmagic scenes
    */
    let controller = new ScrollMagic.Controller()

    /**
     * Remove "loading" class
     */
    setTimeout(function () { $('body').removeClass('loading') }, 500);
    ;


    /**
     * Portrait animation
     */
    let portrait = {
        paths: $('.svg-animate .st0'),
        draw: function () {
            this.paths.each(function () {
                pathlength = this.getTotalLength();
                $(this).css('stroke-dasharray', pathlength);
                $(this).css('stroke-dashoffset', pathlength);
            });
        }
    };
    portrait.draw();





    /*animate #Layer_1 */
    let tlPathAnimate = new TimelineMax({ repeat: -1, delay: 13 })
    paths = $('#Layer_1 .animate-path');
    ;
    function shuffle(o) {
        for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    shuffle(paths).each(function () {
        let pathlength = this.getTotalLength();
        $(this).css('stroke-dasharray', pathlength);
        $(this).css('stroke-dashoffset', pathlength);

        tlPathAnimate
            .to(this, 8, { strokeDashoffset: -pathlength, ease: Power2.easeOut }, '-=6')
            ;
    });

    /*animate #Layer_2 */
    let tlPathAnimate1 = new TimelineMax({ repeat: -1, delay: 18 })
    paths1 = $('#Layer_2 .animate-path');
    ;
    function shuffle1(o) {
        for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    shuffle1(paths1).each(function () {
        let pathlength1 = this.getTotalLength();
        $(this).css('stroke-dasharray', pathlength1);
        $(this).css('stroke-dashoffset', pathlength1);

        tlPathAnimate1
            .to(this, 8, { strokeDashoffset: -pathlength1, ease: Power2.easeOut }, '-=6')
            ;
    });

    /**
     * Banner intro animation
    */
    // ,
    //     splitIntro = new SplitText($('.banner-layer-3 .split-text'), { type: 'lines,chars', linesClass: "line line++" }),
    //     tlIntroAnimate = new TimelineMax({ delay: 3 })
    //     ;

    // tlIntroAnimate.staggerFromTo(splitIntro.lines, 2.5, { autoAlpha: '0', y: 30 }, { autoAlpha: '1', y: 0, ease: Power4.easeIn }, 0.2);


    /**
     * Explore works animation
    */
    let promptElem = $('.feat-works-prompt .txt-wrap'),
        tlPrompt = new TimelineMax();

    tlPrompt.to(promptElem, 1, { autoAlpha: 0, y: 60, ease: Power4.easeOut });

    new ScrollMagic.Scene({
        triggerElement: '.hero',
        triggerHook: 0.01,
        duration: '100%'
    })
        .setTween(tlPrompt)
        .addTo(controller);

    /**
     * Portfolio animation
     */
    $('.portfolio-item').each(function () {

        let scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.7
        })
            .setClassToggle(this, 'in')
            .addTo(controller)
            ;
    })

});



