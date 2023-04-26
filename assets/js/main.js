/*

Theme Name: Moria Health Tourism Website Template
Theme URL: https://moria.onixes.com/
Author: Obada Qawwas
Author URL: https://www.onyxdev.net
Version: 1.0.0

*/

'use strict';

!(function ($) {
    var ONYX_VERSION = '1.0.0';

    Onyx = {
        version: ONYX_VERSION,

        // Define defaults values
        defaults: {
            debug: true,
            menuOpened: false,
        },

        /**
         * Fire all functions
         */
        init: function () {
            var self = this,
                obj;

            for (obj in self) {
                if (self.hasOwnProperty(obj)) {
                    var _method = self[obj];
                    if (_method.selector !== undefined && _method.init !== undefined) {
                        if ($(_method.selector).length > 0) {
                            _method.init();
                        }
                    }
                }
            }
        },

        /**
         * Function to print results in the console if the above debug is true
         */
        log: function () {
            if (Onyx.defaults.debug === true) {
                var argsArray = [],
                    printOut = 'console.log(args)';

                for (var i = 0; i < arguments.length; i++) {
                    argsArray.push('args[' + i + ']');
                }

                printOut = new Function('args', printOut.replace(/args/, argsArray.join(',')));

                printOut(arguments);
            }
        },

        /**
         * Detect user's platform
         */
        platformDetect: {
            selector: 'html',
            init: function () {
                var base = this,
                    container = $(base.selector);

                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    container.addClass('mobile');
                } else {
                    container.addClass('no-mobile');
                }

                var mozillaTest;
                if (/mozilla/.test(navigator.userAgent)) {
                    mozillaTest = true;
                } else {
                    mozillaTest = false;
                }

                var safariTest;
                if (/safari/.test(navigator.userAgent)) {
                    safariTest = true;
                } else {
                    safariTest = false;
                }

                // Detect touch devices
                if (!('ontouchstart' in document.documentElement)) {
                    document.documentElement.className += ' no-touch';
                }
            },
        },

        /**
         * Change page title on blur
         */
        interactiveTitle: {
            selector: 'html',
            originalTitle: '',
            changingTimer: null,
            windowFocused: false,
            init: function () {
                this.originalTitle = document.title;
                window.onfocus = this.onFocus.bind(this);
                window.onblur = this.onBlur.bind(this);
            },
            onBlur: function () {
                document.title = '👋 Come back soon!';
                clearTimeout(this.changingTimer);
                this.windowFocused = false;
                $('body').addClass('blurred');
            },
            onFocus: function () {
                var self = this;
                document.title = '👊 Welcome!';
                clearTimeout(this.changingTimer);
                this.changingTimer = setTimeout(function () {
                    document.title = self.originalTitle;
                }, 1000);
                this.windowFocused = true;
                $('body').removeClass('blurred');
            },
        },

        /**
         * Helpers functions
         */
        helpers: {
            selector: 'body',
            init: function () {
                // Print current year in footer
                var fullDate = new Date(),
                    fullYear = fullDate.getFullYear();

                // Even if there was a year in the container it will overwrite it
                $('.current-year').html(fullYear);

                /**
                 *	Extend jQuery to add easing function
                 */
                jQuery.extend(jQuery.easing, {
                    easeInOutQuart: function (x, t, b, c, d) {
                        if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
                        return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
                    },
                });
            },
        },

        /**
         * Making our header sticky
         */
        headerFunctions: {
            selector: 'header',
            init: function () {
                var base = this,
                    container = $(base.selector);

                Onyx.headerFunctions.initMobileMenu(container);
            },
            initMobileMenu: function (container) {
                Onyx.defaults.menuOpened = false;

                var menuBtn = $('#mobile-burger');

                $(window).on('click', function (e) {
                    if (0 < !$(e.target).parents('header').length) {
                        Onyx.headerFunctions.closeMobileMenu();
                    }
                });

                menuBtn.on('click', function () {
                    if (Onyx.defaults.menuOpened) {
                        Onyx.headerFunctions.closeMobileMenu(container, menuBtn);
                    } else {
                        Onyx.headerFunctions.openMobileMenu(container, menuBtn);
                    }
                });
            },
            openMobileMenu: function (container, menuBtn) {
                Onyx.defaults.menuOpened = true;
                $('body').addClass('menu-open');
                menuBtn.addClass('open');
                // Prevent scroll on body
                $('html').addClass('overflow-hidden');
            },
            closeMobileMenu: function (container, menuBtn) {
                if (!Onyx.defaults.menuOpened) {
                    return false;
                }
                Onyx.defaults.menuOpened = false;
                $('body').removeClass('menu-open');
                menuBtn.removeClass('open');
                // Prevent scroll on body
                $('html').removeClass('overflow-hidden');
            },
        },

        /**
         * Owl slider
         */
        onyxSlider: {
            selector: '[onyx-slider]',
            init: function () {
                var base = this,
                    container = $(base.selector);

                Onyx.log('Slider gonna run!');

                // Magic for each slider
                container.each(function () {
                    var currentContainer = $(this);

                    currentContainer.owlCarousel({
                        rtl: $('body').hasClass('rtl') ? true : false,
                        loop: currentContainer.attr('data-slider-loop')
                            ? currentContainer.attr('data-slider-loop')
                            : false,
                        autoplay: currentContainer.attr('data-slider-autoplay')
                            ? currentContainer.attr('data-slider-autoplay')
                            : false,
                        timeout: currentContainer.attr('data-slides-timeout')
                            ? parseInt(currentContainer.attr('data-slides-timeout'), 10)
                            : 5000,
                        margin: currentContainer.attr('data-slides-margin')
                            ? parseInt(currentContainer.attr('data-slides-margin'), 10)
                            : 0,
                        nav: true,
                        dots: true,
                        dotsContainer: '.banner-area .slider-dots',
                        navText: [
                            $('body').hasClass('rtl')
                                ? '<i class="icon-arrow-right-tall"></i>'
                                : '<i class="icon-arrow-left"></i>',
                            $('body').hasClass('rtl')
                                ? '<i class="icon-arrow-left"></i>'
                                : '<i class="icon-arrow-right-tall"></i>',
                        ],
                        //loadedClass: 'loaded',
                        responsive: {
                            0: {
                                items: 1,
                            },
                            600: {
                                items: currentContainer.attr('data-slides-per-view-md')
                                    ? parseInt(currentContainer.attr('data-slides-per-view-md'), 10)
                                    : 1,
                            },
                            1000: {
                                items: currentContainer.attr('data-slides-per-view-lg')
                                    ? parseInt(currentContainer.attr('data-slides-per-view-lg'), 10)
                                    : 1,
                            },
                        },
                    });
                });
            },
        },

        /**
         * Design trip functions
         */
        tripDesign: {
            selector: 'form.trip-design-form',
            init: function () {
                var base = this,
                    container = $(base.selector),
                    likeRadio = container.find('.like-radio'),
                    continueBtn = container.find('button[type="submit"]'),
                    msgsContainer = container.find('.warning-msg');

                /**
                 *	Make div's like radio buttons
                 */
                likeRadio.on('click', this.handleRadioClick);

                /**
                 *	Go to next step
                 */
                continueBtn.on('click', this.handleContinueClick);
            },
            completionSteps: function (currentSubmit) {
                var currentCompletionElement = currentSubmit.parents('section').attr('data-completion-elemtent');

                $('.trip-design-completion-step.' + currentCompletionElement).addClass('completed');
                $('.trip-design-completion-step.' + currentCompletionElement)
                    .next()
                    .addClass('active');
            },
            handleRadioClick: function (e) {
                var container = $(Onyx.tripDesign.selector),
                    msgsContainer = container.find('.warning-msg'),
                    elementID,
                    checkedValues = [];

                var stepType = $(this).parents('section').attr('data-step-type');

                /**
                 *	Change completion steps
                 */
                Onyx.tripDesign.completionSteps($(this));

                // Go out for anchor elements
                if (e.target.tagName.toLowerCase() === 'a') return;

                // Hide warning msg if exist
                if (msgsContainer.hasClass('visible')) {
                    msgsContainer
                        .removeClass('has-error')
                        .html('')
                        .stop(0, 0)
                        .slideUp(500, function () {
                            $(this).removeClass('visible');
                        });
                }

                if (!$(this).parents('section').hasClass('allow-multiple')) {
                    $(this).parents('.trip-design-step').find('.like-radio.selected').removeClass('selected');
                }

                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    $(this).addClass('selected');
                }

                elementID = $(this).attr('data-' + stepType + '-id');

                // Set selection values
                $(this)
                    .parents('section')
                    .find('input[name="' + stepType + '_id"]')
                    .val(elementID)
                    .addClass('has-value');
                if (!$(this).parents('section').hasClass('allow-multiple')) {
                    $(this)
                        .parents('section')
                        .find('input[name="' + stepType + '_id"]')
                        .attr('value', elementID);
                } else {
                    if ($(this).hasClass('selected')) {
                        checkedValues.push(elementID);
                    } else {
                        checkedValues.splice($.inArray(elementID, checkedValues), 1);
                    }
                    $(this)
                        .parents('section')
                        .find('input[name="' + stepType + '_id"]')
                        .attr('value', checkedValues.join(','));
                }
            },
            handleContinueClick: function (e) {
                var container = $(Onyx.tripDesign.selector),
                    msgsContainer = container.find('.warning-msg');

                var currentStep = container.find('.trip-design-step.active:not(.completed)');

                e.preventDefault();

                // Is it a steps form or personal information form
                if (currentStep.attr('data-step-type') === 'personal-info') {
                    Onyx.log('Submitting personal information!');
                    return;
                }

                // Check which step is active
                if (
                    currentStep.find('.like-radio.selected').length === 0 &&
                    !currentStep.hasClass('allow-multiple') &&
                    currentStep.next().attr('data-step-type') !== 'final'
                ) {
                    Onyx.log('Showing error message!');
                    msgsContainer
                        .addClass('has-error')
                        .html('You have to make a selection in order to continue!')
                        .stop(0, 0)
                        .slideDown(500, function () {
                            $(this).css('height', 'auto');
                            $(this).addClass('visible');
                        });
                } else if (currentStep.next().attr('data-step-type') !== 'final') {
                    Onyx.log('Opening next step!');
                    currentStep.removeClass('active').addClass('completed');

                    // Scroll to opened section
                    setTimeout(function () {
                        var target = currentStep.next();
                        $('html, body').animate({ scrollTop: $(target).offset().top + 20 }, 300);
                    }, 100);

                    currentStep
                        .next()
                        .stop(0, 0)
                        .slideDown(1000, function () {
                            $(this).css('height', 'auto');
                            $(this).addClass('active');
                        });
                } else {
                    Onyx.log('Submitting!');
                    container.submit();
                    window.location.assign('design-your-trip-2.html');
                }
            },
        },

        /**
         * Rating
         */
        ratingFunctions: {
            selector: '.onyx-rating-holder',
            init: function () {
                var base = this,
                    container = base.selector;

                $(container).each(function () {
                    var ratedAttr = $(this).attr('data-rated');
                    base.setRateValue($(this), ratedAttr);
                });
            },
            setRateValue: function (criteriaHolder, ratedAttr) {
                for (var i = 0; i < ratedAttr; i++) {
                    criteriaHolder.find('.onyx-star').eq(i).addClass('passed');
                }
            },
        },

        /**
         * Form range slider
         */
        rangeSlider: {
            selector: '#range-slider',
            init: function () {
                var slider = document.getElementById('range-slider');

                noUiSlider.create(slider, {
                    start: parseInt(slider.getAttribute('data-start'), 10),
                    direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
                    behaviour: 'snap',
                    connect: [true, false],
                    step: 1,
                    range: {
                        min: 1,
                        max: 365,
                    },
                });

                var rangeSliderValueElement = document.getElementById('nights_count');

                slider.noUiSlider.on('update', function (values, handle) {
                    rangeSliderValueElement.innerHTML = Math.round(values[handle]);
                });
            },
        },

        /**
         *	Forms validation with Ajax
         */
        formsValidationsAjax: {
            selector: '.onyx-validation',
            init: function () {
                var base = this,
                    container = $(base.selector);

                // Start Bootstrap validation
                container.each(function () {
                    var currentForm = $(this);

                    currentForm.bootstrapValidator({
                        feedbackIcons: {},
                        live: 'submitted',
                        onError: function (e) {},
                        onSuccess: function (e) {
                            e.preventDefault();
                            Onyx.log('Submitting!');
                            // Continue here
                        },
                    });
                });
            },
        },

        /**
         *	Tel. field
         */
        telField: {
            selector: '[type="tel"]',
            init: function () {
                var base = this,
                    container = $(base.selector);

                // Make input accepts just numbers
                container.keyup(function () {
                    this.value = this.value.replace(/([^+0-9]+)/gi, '');
                });
            },
        },

        /**
         *	Input float label
         */
        floatLabel: {
            selector: '.float-label',
            init: function () {
                var base = this,
                    container = $(base.selector);

                // Start Bootstrap validation
                container.each(function () {
                    var $this = $(this),
                        floatField = $this.find('input,select,textarea');

                    // Check if the field is not readonly
                    if (!floatField.is('[readonly]')) {
                        // Set active class if it has a value
                        if (
                            floatField.val() &&
                            floatField.val() !== '' &&
                            floatField.val() !== ' ' &&
                            floatField.val() !== undefined
                        ) {
                            $this.addClass('active');
                        }

                        floatField.bind('focus', () => {
                            $this.addClass('active');
                        });

                        floatField.bind('blur', () => {
                            if (floatField.val() === '') {
                                setTimeout(function () {
                                    $this.removeClass('active');
                                }, 50);
                            }
                        });
                    }
                });
            },
        },
    };

    $(document).ready(function () {
        Onyx.init();

        // Global Onyx object
        window.Onyx = Onyx;
    });
})(jQuery);
