(function ($) {
    'use strict';

    var imJs = {
        m: function (e) {
            imJs.d();
            imJs.methods();
        },
        d: function (e) {
            this._window = $(window),
            this._document = $(document),
            this._body = $('body'),
            this._html = $('html')

        },

        methods: function (e) {
            imJs.featherAtcivation();
            imJs.backToTopInit();
            imJs.mobileMenuActive();
            imJs.vedioActivation();
            imJs.stickyHeader();
            imJs.smothScroll();
            imJs.smothScroll_Two();
            imJs.stickyAdjust();
            imJs.skillsMarquee();
            imJs.sliderActivation();
            imJs.photosGallery();
            imJs.aboutMeStats();
            imJs.contactForm();
            imJs.projectDetailsModal();
            imJs.wowActive();
            imJs.awsActivation();
            imJs.demoActive();
            imJs.activePopupDemo();
            
        },

        
        activePopupDemo: function (e) {
            $('.popuptab-area li a.demo-dark').on('click', function (e) {
                $('.demo-modal-area').addClass('dark-version');
                $('.demo-modal-area').removeClass('white-version');
            });

            $('.popuptab-area li a.demo-light').on('click', function (e) {
                $('.demo-modal-area').removeClass('dark-version');
                $('.demo-modal-area').addClass('white-version');
            })
        },

        demoActive: function (e) {
            $('.rn-right-demo').on('click', function (e) {
                $('.demo-modal-area').addClass('open');
            })
            $('.demo-close-btn').on('click', function (e) {
                $('.demo-modal-area').removeClass('open');
            })
        },

        contactForm: function () {
            $('#contact-form').on('submit', function (e) {
                e.preventDefault();

                var $form = $(this);
                var $responseBox = $('#form-response');
                var $submitButton = $form.find('button[type="submit"]');

                // Use the browser's built-in validation before sending the request.
                if (!$form[0].checkValidity()) {
                    $form[0].reportValidity();
                    return;
                }

                $submitButton.prop('disabled', true);
                $responseBox.removeClass('success-msg error-msg').html('');

                // Submit the form directly to Web3Forms without reloading the page.
                var formData = new FormData(this);

                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(function (data) {
                    if (data.success) {
                        $responseBox.removeClass('error-msg').addClass('success-msg').html('<p>Message sent successfully. I will get back to you soon.</p>');
                        $responseBox.css('opacity', '1');
                        $responseBox.css('transition', 'opacity 0.3s ease-in-out');
                        clearTimeout(window.contactPopupTimer);

                        window.contactPopupTimer = setTimeout(function () {
                            $responseBox.removeClass('success-msg').addClass('success-msg is-hiding');
                            $responseBox.css('opacity', '0');
                        }, 4000);

                        $form[0].reset();
                    } else {
                        throw new Error(data.message || 'Unable to send your message right now.');
                    }
                })
                .catch(function (error) {
                    clearTimeout(window.contactPopupTimer);
                    $responseBox.removeClass('success-msg is-hiding').css('opacity', '1').addClass('error-msg').html('<p>Sorry, your message could not be sent. Please try again later.</p>');
                    console.error('Web3Forms submission failed:', error);
                })
                .finally(function () {
                    $submitButton.prop('disabled', false);
                    if (window.feather) {
                        window.feather.replace();
                    }
                });
            });
        },

        
        
        wowActive: function () {
            new WOW().init();
        },

        smothScroll: function () {
            $(document).on('click', '.smoth-animation', function (event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 50
                }, 300);
            });
        },
        // two scroll spy
        smothScroll_Two: function () {
            $(document).on('click', '.smoth-animation-two', function (event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 0
                }, 300);
            });
        },


        stickyAdjust: function (e) {
            // Sticky Top Adjust..,
            $('.rbt-sticky-top-adjust').css({
                top: 120
            });

            $('.rbt-sticky-top-adjust-two').css({
                top: 200
            });
            $('.rbt-sticky-top-adjust-three').css({
                top: 25
            });
        },

        skillsMarquee: function () {
            var $container = $('#skills-marquee-content');
            if (!$container.length) {
                return;
            }

            // Keep the existing skills marquee rows intact.
            var webDevelopmentSkills = [
                { name: 'HTML5', icon: 'html' },
                { name: 'CSS3', icon: 'css' },
                { name: 'JavaScript', icon: 'js' },
                { name: 'TypeScript', icon: 'ts' },
                { name: 'React', icon: 'react' },
                { name: 'Next.js', icon: 'next' },
                { name: 'Node.js', icon: 'node' },
                { name: 'Express.js', icon: 'express' },
                { name: 'MongoDB', icon: 'mongo' },
                { name: 'MySQL', icon: 'mysql' },
                { name: 'Firebase', icon: 'firebase' },
                { name: 'Tailwind CSS', icon: 'tailwind' },
                { name: 'Bootstrap', icon: 'bootstrap' },
                { name: 'Git', icon: 'git' },
                { name: 'GitHub', icon: 'github' },
                { name: 'REST API', icon: 'api' },
                { name: 'GraphQL', icon: 'graphql' },
                { name: 'Redux', icon: 'redux' },
                { name: 'Docker', icon: 'docker' },
                { name: 'AWS', icon: 'aws' },
                { name: 'Figma', icon: 'figma' },
                { name: 'UI/UX', icon: 'ux' },
                { name: 'Python', icon: 'python' },
                { name: 'C++', icon: 'cpp' },
                { name: 'Java', icon: 'java' }
            ];

            var digitalMarketingSkills = [
                { name: 'Digital Marketing', icon: 'digital' },
                { name: 'Lead Generation', icon: 'lead' },
                { name: 'SEO', icon: 'seo' },
                { name: 'Social Media Marketing', icon: 'social' },
                { name: 'Email Marketing', icon: 'email' },
                { name: 'Copy-Paste', icon: 'copy' },
                { name: 'Data Entry', icon: 'data' },
                { name: 'E-commerce Lead Generation', icon: 'ecommerce' },
                { name: 'Web Scraping', icon: 'scrape' },
                { name: 'Data Mining', icon: 'mining' }
            ];

            var cyberSecuritySkills = [
                { name: 'Network Security', icon: 'network' },
                { name: 'Ethical Hacking', icon: 'hacking' },
                { name: 'Vulnerability Assessment', icon: 'vuln' },
                { name: 'Penetration Testing', icon: 'pentest' },
                { name: 'Web Application Security', icon: 'websec' },
                { name: 'Information Security', icon: 'infosec' },
                { name: 'Security Auditing', icon: 'audit' },
                { name: 'Threat Analysis', icon: 'threat' },
                { name: 'Incident Response', icon: 'incident' },
                { name: 'Risk Assessment', icon: 'risk' },
                { name: 'Security Monitoring', icon: 'monitor' }
            ];

            var firstRow = webDevelopmentSkills.slice(0, Math.ceil(webDevelopmentSkills.length / 2));
            var secondRow = webDevelopmentSkills.slice(Math.ceil(webDevelopmentSkills.length / 2));
            var thirdRow = digitalMarketingSkills;
            var fourthRow = cyberSecuritySkills;

            function getIconMarkup(icon) {
                var svgMap = {
                    html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3l1.5 17L12 22l6.5-2L20 3z"></path><path d="M7 7h10"></path><path d="M8 12h8"></path><path d="M8 16h5"></path></svg>',
                    css: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3h16l-1.5 15L12 22l-6.5-4L4 3z"></path><path d="M7 7h10"></path><path d="M8 11h8"></path><path d="M8 15h5"></path></svg>',
                    js: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M8 8h8"></path><path d="M8 12h8"></path><path d="M8 16h5"></path></svg>',
                    ts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M8 8h4"></path><path d="M8 12h8"></path><path d="M8 16h5"></path></svg>',
                    react: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"></circle><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"></path></svg>',
                    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"></path><path d="M7 5v14"></path><path d="M17 5v14"></path><path d="M7 19l10-14"></path></svg>',
                    node: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"></path><path d="M12 8v8"></path><path d="M8 10l8 4"></path></svg>',
                    express: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"></path><path d="M7 7v10"></path><path d="M17 7v10"></path><path d="M7 17h10"></path></svg>',
                    mongo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c2 2 5 4 5 8a5 5 0 0 1-10 0c0-4 3-6 5-8z"></path><path d="M12 11v10"></path></svg>',
                    mysql: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14"></path><path d="M5 12h14"></path><path d="M5 17h14"></path><path d="M9 5v14"></path></svg>',
                    firebase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8l6-5 6 5-6 13-6-13z"></path><path d="M12 9v10"></path></svg>',
                    tailwind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c3-8 5-12 8-12 2 0 3 2 3 4 0 5-4 8-8 8-2 0-3-1-3-1z"></path></svg>',
                    bootstrap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M8 8h8"></path><path d="M8 12h8"></path><path d="M8 16h5"></path></svg>',
                    git: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="2"></circle><circle cx="17" cy="7" r="2"></circle><circle cx="12" cy="17" r="2"></circle><path d="M7 9v4"></path><path d="M17 9v4"></path><path d="M9 11l3 3"></path></svg>',
                    github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4 1.2-4-2-6-2"></path><path d="M15 21v-3a3 3 0 0 0-1-2.3c3-.4 6-1.5 6-6.8a5.3 5.3 0 0 0-1.4-3.7 4.9 4.9 0 0 0-.1-3.7s-1.2-.4-3.8 1.5a13.3 13.3 0 0 0-7 0C5.2 3 4 3.4 4 3.4a4.9 4.9 0 0 0-.1 3.7A5.3 5.3 0 0 0 2.5 10.8c0 5.3 3 6.4 6 6.8A3 3 0 0 0 7 18v3"></path></svg>',
                    api: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M7 7v10"></path><path d="M17 7v10"></path></svg>',
                    graphql: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>',
                    redux: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8c2-2 4-3 6-3 3 0 5 2 5 5 0 3-2 5-5 5-2 0-3-1-3-2"></path><path d="M7 16h5"></path></svg>',
                    docker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="2"></rect><path d="M7 7V5"></path><path d="M11 7V5"></path><path d="M15 7V5"></path><path d="M7 17v2"></path><path d="M11 17v2"></path></svg>',
                    aws: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8l6-4 6 4v8l-6 4-6-4z"></path><path d="M12 8v8"></path></svg>',
                    figma: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="3"></circle><circle cx="16" cy="8" r="3"></circle><circle cx="8" cy="16" r="3"></circle><circle cx="16" cy="16" r="3"></circle></svg>',
                    ux: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14"></path><path d="M8 12h8"></path><path d="M10 17h4"></path></svg>',
                    python: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c-2 0-3 1-3 3v2h6V7c0-2-1-3-3-3z"></path><path d="M9 9v6c0 2 1 3 3 3s3-1 3-3V9"></path></svg>',
                    cpp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12"></path><path d="M6 16h12"></path><path d="M8 8v8"></path><path d="M16 8v8"></path></svg>',
                    java: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6c0-2 2-3 4-3s4 1 4 3"></path><path d="M8 18c0 2 2 3 4 3s4-1 4-3"></path><path d="M10 8h4"></path><path d="M10 16h4"></path></svg>',
                    digital: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18"></path><path d="M12 3v18"></path><path d="M6 6l12 12"></path><path d="M18 6L6 18"></path></svg>',
                    lead: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M17 8v6"></path><path d="M20 11h-6"></path></svg>',
                    seo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path><path d="M11 8v6"></path><path d="M8 11h6"></path></svg>',
                    social: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10"></path><path d="M7 12h10"></path><path d="M7 17h6"></path></svg>',
                    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v14H4z"></path><path d="m4 7 8 6 8-6"></path></svg>',
                    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
                    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="7" ry="2"></ellipse><path d="M5 5v14c0 1.1 3.1 2 7 2s7-.9 7-2V5"></path><path d="M5 12c0 1.1 3.1 2 7 2s7-.9 7-2"></path></svg>',
                    ecommerce: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1"></circle><circle cx="19" cy="20" r="1"></circle><path d="M1 1h4l2.5 11h11"></path><path d="M7 7h13"></path></svg>',
                    scrape: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8"></path><path d="M6 8h8"></path><path d="M6 12h4"></path><path d="M14 12h4"></path><path d="M10 16h8"></path></svg>',
                    mining: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12"></path><path d="M7 4v6l5 4 5-4V4"></path><path d="M7 16h10"></path></svg>',
                    network: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M8 8h8v8H8z"></path><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>',
                    hacking: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"></path><path d="M7 7V5h10v2"></path><path d="M8 7v10"></path><path d="M16 7v10"></path><path d="M8 17h8"></path></svg>',
                    vuln: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"></path><path d="M12 8v5"></path><path d="M12 15h.01"></path></svg>',
                    pentest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16"></path><path d="M7 8V5h10v3"></path><path d="M9 8v8"></path><path d="M15 8v8"></path><path d="M7 16h10"></path></svg>',
                    websec: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"></path><path d="M6 7V5h12v2"></path><path d="M7 7v10"></path><path d="M17 7v10"></path></svg>',
                    infosec: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="9" width="14" height="10" rx="2"></rect><path d="M9 9V7a3 3 0 0 1 6 0v2"></path></svg>',
                    audit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7h10"></path><path d="M9 12h10"></path><path d="M9 17h10"></path><path d="M5 7h.01"></path><path d="M5 12h.01"></path><path d="M5 17h.01"></path></svg>',
                    threat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"></circle><path d="M12 6v6l4 2"></path></svg>',
                    incident: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"></path><path d="M12 8v5"></path><path d="M12 15h.01"></path></svg>',
                    risk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"></path><path d="M12 8v5"></path><path d="M12 15h.01"></path></svg>',
                    monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M12 2v4"></path><path d="M12 18v4"></path><circle cx="12" cy="12" r="4"></circle></svg>',
                };
                return svgMap[icon] || svgMap.js;
            }

            function renderSkill(item) {
                return '<div class="skill-pill"><span class="skill-icon" aria-hidden="true">' + getIconMarkup(item.icon) + '</span><span>' + item.name + '</span></div>';
            }

            function renderTrack(items, directionClass) {
                var content = items.map(renderSkill).join('');
                return '<div class="skills-marquee-track ' + directionClass + '">' +
                    '<div class="skills-marquee-group">' + content + '</div>' +
                    '<div class="skills-marquee-group" aria-hidden="true">' + content + '</div>' +
                '</div>';
            }

            $container.html(
                '<div class="skills-marquee-row">' + renderTrack(firstRow, 'left') + '</div>' +
                '<div class="skills-marquee-row">' + renderTrack(secondRow, 'right') + '</div>' +
                '<div class="skills-marquee-row">' + renderTrack(thirdRow, 'left') + '</div>' +
                '<div class="skills-marquee-row">' + renderTrack(fourthRow, 'right') + '</div>'
            );

            if ('IntersectionObserver' in window) {
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            $container.addClass('is-visible');
                            observer.disconnect();
                        }
                    });
                }, { threshold: 0.15 });
                observer.observe($container[0]);
            } else {
                $container.addClass('is-visible');
            }
        },

        photosGallery: function () {
            var $container = $('#photos-gallery-shell');
            if (!$container.length) {
                return;
            }

            var photoFiles = [
                'photo1.jpg',
                'photo2.jpg',
                'photo3.jpg',
                'photo4.jpg',
                'photo5.jpg'
            ];

            var cardsMarkup = photoFiles.concat(photoFiles).map(function (fileName) {
                var altText = fileName.replace(/\.[^.]+$/, '');
                return '<div class="photos-card"><img src="assets/photos/' + fileName + '" alt="' + altText + '" loading="lazy" decoding="async"></div>';
            }).join('');

            $container.html('<div class="photos-gallery-track">' + cardsMarkup + '</div>');
        },

        aboutMeStats: function () {
            var section = document.querySelector('.rn-about-me-area');
            if (!section) {
                return;
            }

            var counters = section.querySelectorAll('.about-me-number');
            var hasAnimated = false;

            function animateCounter(counter) {
                var targetText = counter.getAttribute('data-target') || '0';
                var target = parseInt(targetText, 10);
                var suffixMatch = targetText.match(/[^\d.-]+$/);
                var suffix = suffixMatch ? suffixMatch[0] : '';
                var start = 0;
                var duration = 1800;
                var startTime = null;

                function update(timestamp) {
                    if (!startTime) {
                        startTime = timestamp;
                    }
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    var value = Math.floor(progress * target);
                    counter.textContent = value + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target + suffix;
                    }
                }

                requestAnimationFrame(update);
            }

            function runAnimation() {
                counters.forEach(function (counter) {
                    counter.textContent = '0';
                    animateCounter(counter);
                });
            }

            if ('IntersectionObserver' in window) {
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            if (!hasAnimated) {
                                runAnimation();
                                hasAnimated = true;
                            }
                        } else {
                            hasAnimated = false;
                        }
                    });
                }, { threshold: 0.35 });

                observer.observe(section);
            } else {
                runAnimation();
            }
        },

        sliderActivation: function () {
            $('.portfolio-slick-activation').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                cssEase: 'linear',
                adaptiveHeight: true,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
                responsive: [{
                        breakpoint: 1124,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 868,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true,
                            arrows: false,
                        }
                    }
                ]
            });


            $('.blog-slick-activation').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                cssEase: 'linear',
                adaptiveHeight: true,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
                responsive: [{
                        breakpoint: 1124,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 868,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true,
                            arrows: false,
                        }
                    }
                ]
            });

            $('.brand-activation-item-5').slick({
                arrows: true,
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 1,
                adaptiveHeight: true,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-chevron-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-chevron-right"></i></button>',
                responsive: [{
                        breakpoint: 1124,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 868,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

        },

        featherAtcivation: function () {
            feather.replace()
        },

        projectDetailsModal: function () {
            var modal = document.getElementById('project-details-modal');
            var portfolio = document.getElementById('projects') ||
                document.getElementById('portfolio');
            if (!modal || !portfolio) {
                return;
            }

            var dialog = modal.querySelector('.project-details-dialog');
            var closeButton = modal.querySelector('.project-details-close');
            var image = modal.querySelector('.project-details-image');
            var category = modal.querySelector('.project-details-category');
            var title = modal.querySelector('#project-details-title');
            var description = modal.querySelector('.project-details-description');
            var technologies = modal.querySelector('.project-details-technologies');
            var technologyList = technologies.querySelector('ul');
            var actionRow = modal.querySelector('.project-details-actions');
            var repositoryLink = modal.querySelector('.project-details-github');
            var demoLink = modal.querySelector('.project-details-demo');
            var projectLink = modal.querySelector('.project-details-link');
            var activeCard = null;
            var originalBodyOverflow = '';
            var closeTimer;

            function updateLikeButton(button, title, count, liked) {
                var countLabel = button.querySelector('.project-like-count');
                button.setAttribute('aria-pressed', liked ? 'true' : 'false');
                button.setAttribute('aria-label', (liked ? 'Unlike ' : 'Like ') + title);
                button.classList.toggle('is-liked', liked);
                countLabel.textContent = String(count);
            }

            function initializeLikes(card, cardTitle) {
                var button = card.querySelector('[data-project-like]');
                var countLabel = button.querySelector('.project-like-count');
                var projectId = card.dataset.projectId;
                var configuredInitial = Number.parseInt(card.dataset.initialLikes, 10);
                var initialCount = Number.isFinite(configuredInitial) && configuredInitial >= 0 ?
                    configuredInitial : 0;
                var countKey = 'portfolio-like-count:' + projectId;
                var likedKey = 'portfolio-liked:' + projectId;
                var count = initialCount;
                var liked = false;

                try {
                    var storedCount = window.localStorage.getItem(countKey);
                    var storedLiked = window.localStorage.getItem(likedKey);
                    if (storedCount !== null && /^\d+$/.test(storedCount)) {
                        count = Number.parseInt(storedCount, 10);
                    } else {
                        window.localStorage.setItem(countKey, String(initialCount));
                    }
                    if (storedLiked !== null) {
                        liked = storedLiked === 'true';
                    } else {
                        window.localStorage.setItem(likedKey, 'false');
                    }
                } catch (error) {
                    console.error('Unable to restore project likes from localStorage.', error);
                }

                updateLikeButton(button, cardTitle, count, liked);
                button.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    liked = !liked;
                    count = Math.max(0, count + (liked ? 1 : -1));
                    updateLikeButton(button, cardTitle, count, liked);

                    button.classList.remove('is-animating');
                    button.offsetWidth;
                    if (liked) {
                        button.classList.add('is-animating');
                        window.setTimeout(function () {
                            button.classList.remove('is-animating');
                        }, 360);
                    }

                    try {
                        window.localStorage.setItem(countKey, String(count));
                        window.localStorage.setItem(likedKey, liked ? 'true' : 'false');
                    } catch (error) {
                        console.error('Unable to save project likes to localStorage.', error);
                    }
                });
            }

            function validExternalUrl(value, githubOnly) {
                if (!value || /^ADD_[A-Z_]+$/.test(value)) {
                    return null;
                }

                var url;
                try {
                    url = new URL(value);
                } catch (error) {
                    return null;
                }

                if ((url.protocol !== 'https:' && url.protocol !== 'http:') ||
                    url.username || url.password ||
                    (githubOnly && (url.protocol !== 'https:' ||
                        url.hostname !== 'github.com' ||
                        url.pathname.split('/').filter(Boolean).length !== 2 ||
                        url.search || url.hash))) {
                    return null;
                }

                return url.href;
            }

            function configureCardRepository(card, cardTitle) {
                var repositoryLink = card.querySelector('[data-project-repository]');
                if (!repositoryLink) {
                    repositoryLink = document.createElement('a');
                    repositoryLink.className = 'project-card-github';
                    repositoryLink.setAttribute('data-project-repository', '');
                    repositoryLink.setAttribute('target', '_blank');
                    repositoryLink.setAttribute('rel', 'noopener noreferrer');

                    var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    icon.setAttribute('viewBox', '0 0 24 24');
                    icon.setAttribute('aria-hidden', 'true');
                    icon.setAttribute('focusable', 'false');
                    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('fill', 'currentColor');
                    path.setAttribute('d', 'M12 .297a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .297z');
                    icon.appendChild(path);
                    repositoryLink.appendChild(icon);
                    card.appendChild(repositoryLink);
                    repositoryLink.addEventListener('click', function (event) {
                        event.stopPropagation();
                        if (!repositoryLink.getAttribute('href')) {
                            event.preventDefault();
                        }
                    });
                }

                var repositoryUrl = validExternalUrl(card.dataset.githubUrl, true);
                if (repositoryUrl) {
                    repositoryLink.href = repositoryUrl;
                    repositoryLink.removeAttribute('aria-disabled');
                    repositoryLink.removeAttribute('tabindex');
                    repositoryLink.setAttribute('aria-label', 'View GitHub repository for ' + cardTitle);
                    repositoryLink.title = 'View repository on GitHub';
                    repositoryLink.classList.remove('is-unavailable');
                } else {
                    repositoryLink.removeAttribute('href');
                    repositoryLink.setAttribute('aria-disabled', 'true');
                    repositoryLink.setAttribute('tabindex', '-1');
                    repositoryLink.setAttribute('aria-label', 'Repository not available for ' + cardTitle);
                    repositoryLink.title = 'Repository not available';
                    repositoryLink.classList.add('is-unavailable');
                }
            }

            function open(card) {
                var cardTitle = card.querySelector('.content .title');
                var cardCategory = card.querySelector('.category-list');
                var cardImage = card.querySelector('.thumbnail img');
                var repositoryUrl = validExternalUrl(card.dataset.githubUrl, true);
                var demoUrl = validExternalUrl(card.dataset.liveDemoUrl, false);
                var externalProjectUrl = validExternalUrl(card.dataset.projectUrl, false);
                var tools = (card.dataset.projectTechnologies || '')
                    .split(',')
                    .map(function (tool) { return tool.trim(); })
                    .filter(Boolean);

                activeCard = card;
                window.clearTimeout(closeTimer);
                title.textContent = cardTitle ? cardTitle.textContent.trim() : 'Project details';
                configureCardRepository(card, title.textContent);
                category.textContent = cardCategory ? cardCategory.textContent.trim() : '';
                description.textContent = card.dataset.projectDescription &&
                    card.dataset.projectDescription !== 'ADD_PROJECT_DESCRIPTION' ?
                    card.dataset.projectDescription :
                    'A project description has not been provided yet.';

                image.src = cardImage ? cardImage.currentSrc || cardImage.src : '';
                image.alt = title.textContent;

                technologyList.textContent = '';
                technologies.hidden = tools.length === 0;
                tools.forEach(function (tool) {
                    var item = document.createElement('li');
                    item.textContent = tool;
                    technologyList.appendChild(item);
                });

                repositoryLink.classList.toggle('is-unavailable', !repositoryUrl);
                if (repositoryUrl) {
                    repositoryLink.href = repositoryUrl;
                    repositoryLink.removeAttribute('aria-disabled');
                    repositoryLink.removeAttribute('tabindex');
                    repositoryLink.setAttribute('aria-label', 'View repository on GitHub: ' + title.textContent);
                    repositoryLink.title = 'Open GitHub repository';
                } else {
                    repositoryLink.removeAttribute('href');
                    repositoryLink.setAttribute('aria-disabled', 'true');
                    repositoryLink.setAttribute('tabindex', '-1');
                    repositoryLink.setAttribute('aria-label', 'Repository not available for ' + title.textContent);
                    repositoryLink.title = 'Repository not available';
                }

                demoLink.hidden = false;
                demoLink.classList.toggle('is-unavailable', !demoUrl);
                if (demoUrl) {
                    demoLink.href = demoUrl;
                    demoLink.removeAttribute('aria-disabled');
                    demoLink.removeAttribute('tabindex');
                    demoLink.setAttribute('aria-label', 'Open live demo for ' + title.textContent);
                    demoLink.title = 'Open live demo';
                } else {
                    demoLink.removeAttribute('href');
                    demoLink.setAttribute('aria-disabled', 'true');
                    demoLink.setAttribute('tabindex', '-1');
                    demoLink.setAttribute('aria-label', 'Live demo not available for ' + title.textContent);
                    demoLink.title = 'Live demo not available';
                }

                projectLink.hidden = !externalProjectUrl;
                if (externalProjectUrl) {
                    projectLink.href = externalProjectUrl;
                } else {
                    projectLink.removeAttribute('href');
                }
                actionRow.hidden = false;

                originalBodyOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
                modal.hidden = false;
                modal.setAttribute('aria-hidden', 'false');
                modal.offsetHeight;
                modal.classList.remove('is-closing');
                modal.classList.add('is-open');
                closeButton.focus();
            }

            function close() {
                if (modal.hidden) {
                    return;
                }

                modal.classList.remove('is-open');
                modal.classList.add('is-closing');
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = originalBodyOverflow;
                window.clearTimeout(closeTimer);
                closeTimer = window.setTimeout(function () {
                    modal.hidden = true;
                    modal.classList.remove('is-closing');
                    if (activeCard) {
                        activeCard.focus();
                    }
                }, 220);
            }

            portfolio.querySelectorAll('.rn-portfolio').forEach(function (card) {
                var heading = card.querySelector('.content .title');
                var cardTitle = heading ? heading.textContent.trim() : 'project';
                initializeLikes(card, cardTitle);
                configureCardRepository(card, cardTitle);
                card.setAttribute('role', 'button');
                card.setAttribute('tabindex', '0');
                card.setAttribute('aria-haspopup', 'dialog');
                card.setAttribute('aria-controls', modal.id);
                card.setAttribute('aria-label', 'View project details: ' +
                    (heading ? heading.textContent.trim() : 'project'));
                card.querySelectorAll('a').forEach(function (link) {
                    if (link.hasAttribute('data-project-repository')) {
                        return;
                    }
                    link.setAttribute('tabindex', '-1');
                    link.setAttribute('aria-hidden', 'true');
                    link.setAttribute('role', 'presentation');
                    link.removeAttribute('href');
                });

                card.addEventListener('click', function (event) {
                    if (event.target.closest('[data-project-like], [data-project-repository]')) {
                        return;
                    }
                    if (event.target.closest('a')) {
                        event.preventDefault();
                    }
                    open(card);
                });

                card.addEventListener('keydown', function (event) {
                    if (event.target !== card || (event.key !== 'Enter' && event.key !== ' ')) {
                        return;
                    }
                    event.preventDefault();
                    open(card);
                });
            });

            closeButton.addEventListener('click', close);
            modal.addEventListener('click', function (event) {
                if (event.target === modal) {
                    close();
                }
            });

            [repositoryLink, demoLink, projectLink].forEach(function (link) {
                link.addEventListener('click', function (event) {
                    event.stopPropagation();
                    if (link.getAttribute('aria-disabled') === 'true') {
                        event.preventDefault();
                    }
                });
            });

            document.addEventListener('keydown', function (event) {
                if (modal.hidden) {
                    return;
                }

                if (event.key === 'Escape') {
                    event.preventDefault();
                    close();
                    return;
                }

                if (event.key !== 'Tab') {
                    return;
                }

                var focusable = Array.prototype.slice.call(dialog.querySelectorAll(
                    'button:not([disabled]):not([hidden]), a[href]:not([hidden])'
                ));
                if (!focusable.length) {
                    event.preventDefault();
                    dialog.focus();
                    return;
                }

                var first = focusable[0];
                var last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            });
        },


        backToTopInit: function () {
            // declare variable
            var scrollTop = $('.backto-top');
            $(window).scroll(function () {
                // declare variable
                var topPos = $(this).scrollTop();
                // if user scrolls down - show scroll to top button
                if (topPos > 100) {
                    $(scrollTop).css('opacity', '1');

                } else {
                    $(scrollTop).css('opacity', '0');
                }
            });
            
            //Click event to scroll to top
            $(scrollTop).on('click', function () {
                $('html, body').animate({
                    scrollTop: 0,
                    easingType: 'linear',
                }, 500);
                return false;
            });

        },

        stickyHeader: function (e) {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 250) {
                    $('.header--sticky').addClass('sticky')
                } else {
                    $('.header--sticky').removeClass('sticky')
                }
            })
        },

        vedioActivation: function (e) {
            $('#play-video').on('click', function (e) {
                e.preventDefault();
                $('#video-overlay').addClass('open');
                $("#video-overlay").append('<iframe width="80%" height="80%" src="https://www.youtube.com/embed/7e90gBu4pas" frameborder="0" allowfullscreen></iframe>');
            });

            $('.video-overlay, .video-overlay-close').on('click', function (e) {
                e.preventDefault();
                close_video();
            });

            $(document).keyup(function (e) {
                if (e.keyCode === 27) {
                    close_video();
                }
            });

            function close_video() {
                $('.video-overlay.open').removeClass('open').find('iframe').remove();
            };
        },

        mobileMenuActive: function (e) {
            $('.humberger-menu').on('click', function (e) {
                e.preventDefault();
                $('.popup-mobile-menu').addClass('menu-open');
                imJs._html.css({
                    overflow: 'hidden'
                })
            });

            $('.close-menu-activation, .popup-mobile-menu .primary-menu .nav-item a').on('click', function (e) {
                e.preventDefault();
                $('.popup-mobile-menu').removeClass('menu-open');
                $('.has-droupdown > a').removeClass('open').siblings('.submenu').removeClass('active').slideUp('400');
                imJs._html.css({
                    overflow: ''
                })
            });

            $('.popup-mobile-menu').on('click', function (e) {
                e.target === this && $('.popup-mobile-menu').removeClass('menu-open');
                imJs._html.css({
                    overflow: ''
                })
            });


            $('.has-droupdown > a').on('click', function (e) {
                e.preventDefault();
                $(this).siblings('.submenu').toggleClass('active').slideToggle('400');
                $(this).toggleClass('open');
                imJs._html.css({
                    overflow: ''
                })
            });


            $('.nav-pills .nav-link').on('click', function (e) {
                $('.rn-popup-mobile-menu').removeClass('menu-open');
                imJs._html.css({
                    overflow: ''
                })
            })


        },

        awsActivation:function(e){
            AOS.init();
        },

    }
    imJs.m();


})(jQuery, window)
