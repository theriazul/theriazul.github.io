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
            imJs.themeToggle();
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
            imJs.certificatesViewer();
            imJs.academicSkillsViewer();
            imJs.aboutMeStats();
            imJs.contactForm();
            imJs.projectDetailsModal();
            imJs.resumeTimelineActivation();
            imJs.wowActive();
            imJs.awsActivation();
            imJs.demoActive();
            imJs.activePopupDemo();
            
        },

        themeToggle: function () {
            var button = document.querySelector('.theme-toggle');
            var root = document.documentElement;

            if (!button) {
                return;
            }

            function updateButton() {
                button.setAttribute('aria-pressed', String(root.classList.contains('white-version')));
            }

            updateButton();
            button.addEventListener('click', function () {
                var isLightTheme = root.classList.toggle('white-version');

                updateButton();

                try {
                    window.localStorage.setItem('portfolio-theme', isLightTheme ? 'light' : 'dark');
                } catch (error) {
                    console.error('Unable to save the theme preference:', error);
                }
            });
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
            if ($container.data('photosGalleryInitialized')) {
                return;
            }

            // Add each photo's title, description, and date in this editable list.
            var photoData = [
                { fileName: 'photo1.jpg', title: 'Photo 1', description: '', date: '' },
                { fileName: 'photo2.jpg', title: 'Photo 2', description: '', date: '' },
                { fileName: 'photo3.jpg', title: 'Photo 3', description: '', date: '' },
                { fileName: 'photo4.jpg', title: 'Photo 4', description: '', date: '' },
                { fileName: 'photo5.jpg', title: 'Photo 5', description: '', date: '' }
            ];

            var cardsMarkup = photoData.concat(photoData).map(function (photo, index) {
                var photoIndex = index % photoData.length;
                var title = photo.title || photo.fileName.replace(/\.[^.]+$/, '');
                var safeTitle = title.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return '<div class="photos-card" role="button" tabindex="0" data-photo-index="' + photoIndex + '" aria-label="Open ' + safeTitle + '"><img src="assets/photos/' + photo.fileName + '" alt="' + safeTitle + '" loading="lazy" decoding="async"></div>';
            }).join('');

            $container.html('<div class="photos-gallery-track">' + cardsMarkup + '</div>');

            var lightbox = document.getElementById('photos-lightbox');
            if (!lightbox) {
                lightbox = document.createElement('dialog');
                lightbox.id = 'photos-lightbox';
                lightbox.className = 'photos-lightbox';
                lightbox.setAttribute('aria-labelledby', 'photos-lightbox-title');
                lightbox.setAttribute('aria-modal', 'true');
                lightbox.innerHTML = [
                    '<div class="photos-lightbox-panel">',
                    '  <button class="photos-lightbox-close" type="button" aria-label="Close photo">×</button>',
                    '  <div class="photos-lightbox-image-wrap">',
                    '    <img class="photos-lightbox-image" alt="">',
                    '    <button class="photos-lightbox-nav photos-lightbox-previous" type="button" aria-label="Previous photo">',
                    '      <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>',
                    '    </button>',
                    '    <button class="photos-lightbox-nav photos-lightbox-next" type="button" aria-label="Next photo">',
                    '      <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>',
                    '    </button>',
                    '  </div>',
                    '  <div class="photos-lightbox-details">',
                    '    <h3 class="photos-lightbox-title" id="photos-lightbox-title"></h3>',
                    '    <p class="photos-lightbox-description"></p>',
                    '    <p class="photos-lightbox-date"></p>',
                    '  </div>',
                    '</div>'
                ].join('');
                document.body.appendChild(lightbox);
            }

            var lightboxImage = lightbox.querySelector('.photos-lightbox-image');
            var lightboxTitle = lightbox.querySelector('.photos-lightbox-title');
            var lightboxDescription = lightbox.querySelector('.photos-lightbox-description');
            var lightboxDate = lightbox.querySelector('.photos-lightbox-date');
            var previousButton = lightbox.querySelector('.photos-lightbox-previous');
            var nextButton = lightbox.querySelector('.photos-lightbox-next');
            var closeButton = lightbox.querySelector('.photos-lightbox-close');
            var currentPhotoIndex = 0;
            var previouslyFocusedElement = null;
            var originalBodyOverflow = '';
            var originalBodyPaddingRight = '';

            function renderPhoto(index) {
                var photo = photoData[index];
                var title = photo.title || photo.fileName.replace(/\.[^.]+$/, '');
                lightboxImage.src = 'assets/photos/' + photo.fileName;
                lightboxImage.alt = title;
                lightboxTitle.textContent = title;
                lightboxDescription.textContent = photo.description || '';
                lightboxDescription.hidden = !photo.description;
                lightboxDate.textContent = photo.date || '';
                lightboxDate.hidden = !photo.date;
            }

            function showPhoto(index) {
                currentPhotoIndex = (index + photoData.length) % photoData.length;
                renderPhoto(currentPhotoIndex);
            }

            function openLightbox(index, trigger) {
                if (lightbox.open) {
                    return;
                }
                previouslyFocusedElement = trigger;
                originalBodyOverflow = document.body.style.overflow;
                originalBodyPaddingRight = document.body.style.paddingRight;
                var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                if (scrollbarWidth > 0) {
                    document.body.style.paddingRight = (parseFloat(window.getComputedStyle(document.body).paddingRight) + scrollbarWidth) + 'px';
                }
                document.body.style.overflow = 'hidden';
                showPhoto(index);
                lightbox.showModal();
                closeButton.focus();
            }

            lightbox.addEventListener('close', function () {
                document.body.style.overflow = originalBodyOverflow;
                document.body.style.paddingRight = originalBodyPaddingRight;
                if (previouslyFocusedElement && previouslyFocusedElement.isConnected) {
                    previouslyFocusedElement.focus({ preventScroll: true });
                }
            });

            lightbox.addEventListener('click', function (event) {
                if (event.target === lightbox) {
                    lightbox.close();
                }
            });

            lightbox.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    lightbox.close();
                } else if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    showPhoto(currentPhotoIndex - 1);
                } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    showPhoto(currentPhotoIndex + 1);
                }
            });

            closeButton.addEventListener('click', function () {
                lightbox.close();
            });
            previousButton.addEventListener('click', function () {
                showPhoto(currentPhotoIndex - 1);
            });
            nextButton.addEventListener('click', function () {
                showPhoto(currentPhotoIndex + 1);
            });

            $container.off('.photosLightbox')
                .on('click.photosLightbox', '.photos-card', function () {
                    openLightbox(Number(this.getAttribute('data-photo-index')), this);
                })
                .on('keydown.photosLightbox', '.photos-card', function (event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openLightbox(Number(this.getAttribute('data-photo-index')), this);
                    }
                });
            $container.data('photosGalleryInitialized', true);
        },

        certificatesViewer: function () {
            var section = document.getElementById('certifications');
            var trigger = section && section.querySelector('[data-certificate-viewer-trigger]');
            if (!section || !trigger || section.dataset.certificatesViewerInitialized === 'true') {
                return;
            }

            // =========================================================
            // CERTIFICATE DETAILS — EDIT THIS SECTION
            //
            // Edit the quoted values below; do not change the field names.
            // title: certificate name; issuer: organization that issued it.
            // issueDate: date received; credentialId: ID, if one is available.
            // description: write your certificate description between the quotes.
            // credentialUrl: verification link, if available.
            // image: exact image path under assets/certificates/.
            // Leave optional values as '' if you do not have that information.
            // To add a certificate, copy one complete object and update its values.
            // =========================================================
            var certificates = [
                {
                    title: 'Yelp website screenshot — credential details unverified',
                    issuer: '',
                    issueDate: '',
                    credentialId: '',
                    description: 'This image shows a Yelp webpage with a red header and a home-search interface. It does not visibly show a certificate; verify the intended credential and its details before presenting it as one.',
                    credentialUrl: '',
                    image: 'assets/certificates/01.jpg'
                },
                {
                    title: 'Alibaba.com website screenshot — credential details unverified',
                    issuer: '',
                    issueDate: '',
                    credentialId: '',
                    description: 'This image shows an Alibaba.com page open in Safari, including the site header and shopping navigation. It does not visibly show a certificate; verify the intended credential and its details before presenting it as one.',
                    credentialUrl: '',
                    image: 'assets/certificates/02.jpg'
                },
                {
                    title: 'Amazon.com website screenshot — credential details unverified',
                    issuer: '',
                    issueDate: '',
                    credentialId: '',
                    description: 'This image shows an Amazon.com shopping page with the Amazon logo and search controls. It does not visibly show a certificate; verify the intended credential and its details before presenting it as one.',
                    credentialUrl: '',
                    image: 'assets/certificates/03.jpg'
                },
                {
                    title: 'Walmart website screenshot — credential details unverified',
                    issuer: '',
                    issueDate: '',
                    credentialId: '',
                    description: 'This image shows a Walmart webpage with its blue site header and shopping interface. It does not visibly show a certificate; verify the intended credential and its details before presenting it as one.',
                    credentialUrl: '',
                    image: 'assets/certificates/04.jpg'
                },
                {
                    title: 'YP Yellow Pages logo image — credential details unverified',
                    issuer: '',
                    issueDate: '',
                    credentialId: '',
                    description: 'This image shows the YP Yellow Pages logo on a white background. It does not visibly show a certificate; verify the intended credential and its details before presenting it as one.',
                    credentialUrl: '',
                    image: 'assets/certificates/05.jpg'
                }
            ];
            var viewer = document.createElement('dialog');
            viewer.id = 'certificate-viewer';
            viewer.className = 'certificate-viewer';
            viewer.setAttribute('aria-labelledby', 'certificate-viewer-title');
            viewer.setAttribute('aria-modal', 'true');
            viewer.innerHTML = [
                '<div class="certificate-viewer-panel">',
                '  <button class="certificate-viewer-close" type="button" aria-label="Close certificates">×</button>',
                '  <header class="certificate-viewer-header">',
                '    <p class="certificate-viewer-eyebrow">Credentials</p>',
                '    <h2 id="certificate-viewer-title">Certifications</h2>',
                '  </header>',
                '  <div class="certificate-gallery" aria-live="polite"></div>',
                '</div>'
            ].join('');
            document.body.appendChild(viewer);

            var preview = document.createElement('dialog');
            preview.className = 'certificate-image-preview';
            preview.setAttribute('aria-labelledby', 'certificate-preview-title');
            preview.setAttribute('aria-modal', 'true');
            preview.innerHTML = [
                '<div class="certificate-preview-panel">',
                '  <button class="certificate-preview-close" type="button" aria-label="Close certificate preview">×</button>',
                '  <h2 class="certificate-preview-title" id="certificate-preview-title"></h2>',
                '  <div class="certificate-preview-image-frame">',
                '    <img class="certificate-preview-image" alt="">',
                '  </div>',
                '  <div class="certificate-preview-details">',
                '    <ul class="certificate-card-metadata"></ul>',
                '    <p class="certificate-card-description"></p>',
                '  </div>',
                '</div>'
            ].join('');
            document.body.appendChild(preview);

            var gallery = viewer.querySelector('.certificate-gallery');
            var closeViewer = viewer.querySelector('.certificate-viewer-close');
            var closePreview = preview.querySelector('.certificate-preview-close');
            var previewTitle = preview.querySelector('.certificate-preview-title');
            var previewImage = preview.querySelector('.certificate-preview-image');
            var previewMetadata = preview.querySelector('.certificate-card-metadata');
            var previewDescription = preview.querySelector('.certificate-card-description');
            var activeTrigger = null;
            var activePreviewTrigger = null;
            var originalBodyOverflow = '';
            var originalBodyPaddingRight = '';
            var closeTimers = {
                viewer: null,
                preview: null
            };
            var pendingCertificates = certificates.length;
            var validCertificates = 0;
            var emptyState = document.createElement('p');
            emptyState.className = 'certificate-gallery-empty';
            emptyState.setAttribute('role', 'status');
            emptyState.textContent = certificates.length ?
                'Loading certificates…' :
                'No certificates are configured yet. Add certificate image paths and verified details in the certificates list in assets/js/main.js.';
            gallery.appendChild(emptyState);

            function addDetail(list, label, value) {
                if (!value) {
                    return;
                }
                var item = document.createElement('li');
                var heading = document.createElement('span');
                var detail = document.createElement('span');
                heading.className = 'certificate-detail-label';
                heading.textContent = label;
                detail.textContent = value;
                item.appendChild(heading);
                item.appendChild(detail);
                list.appendChild(item);
            }

            function addCredentialLink(list, value) {
                if (!value) {
                    return;
                }
                var parsedUrl;
                try {
                    parsedUrl = new URL(value, window.location.href);
                } catch (error) {
                    console.error('Invalid certificate verification URL:', value, error);
                    return;
                }
                if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
                    console.error('Certificate verification URL must use HTTP or HTTPS:', value);
                    return;
                }
                var item = document.createElement('li');
                var link = document.createElement('a');
                item.className = 'certificate-verification-item';
                link.className = 'certificate-credential-link';
                link.href = parsedUrl.href;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = 'Verify credential';
                item.appendChild(link);
                list.appendChild(item);
            }

            function openPreview(certificate, button) {
                activePreviewTrigger = button;
                preview.classList.remove('is-closing');
                previewTitle.textContent = certificate.title;
                previewImage.style.setProperty('--certificate-natural-width', '0px');
                previewImage.style.setProperty('--certificate-natural-height', '0px');
                previewImage.src = certificate.image;
                previewImage.alt = certificate.title;
                previewMetadata.replaceChildren();
                addDetail(previewMetadata, 'Issuer', certificate.issuer);
                addDetail(previewMetadata, 'Issued', certificate.issueDate);
                addDetail(previewMetadata, 'Credential ID', certificate.credentialId);
                addCredentialLink(previewMetadata, certificate.credentialUrl);
                previewMetadata.hidden = !previewMetadata.childElementCount;
                previewDescription.textContent = certificate.description || '';
                previewDescription.hidden = !certificate.description;
                preview.showModal();
                closePreview.focus();
            }

            previewImage.addEventListener('load', function () {
                previewImage.style.setProperty('--certificate-natural-width', previewImage.naturalWidth + 'px');
                previewImage.style.setProperty('--certificate-natural-height', previewImage.naturalHeight + 'px');
            });

            function closeDialogWithAnimation(dialog, timerKey) {
                if (!dialog.open || closeTimers[timerKey]) {
                    return;
                }
                dialog.classList.add('is-closing');
                closeTimers[timerKey] = window.setTimeout(function () {
                    dialog.classList.remove('is-closing');
                    if (dialog.open) {
                        dialog.close();
                    }
                    closeTimers[timerKey] = null;
                    if (timerKey === 'viewer') {
                        restoreViewerScroll();
                    }
                }, 180);
            }

            function restoreViewerScroll() {
                document.body.style.overflow = originalBodyOverflow;
                document.body.style.paddingRight = originalBodyPaddingRight;
            }

            if (certificates.length) {
                certificates.forEach(function (certificate) {
                    var imageProbe = new Image();
                    var card = document.createElement('article');
                    var imageButton = document.createElement('button');
                    var image = document.createElement('img');
                    var details = document.createElement('div');
                    var title = document.createElement('h3');
                    var metadata = document.createElement('ul');
                    var description = document.createElement('p');

                    card.className = 'certificate-card';
                    card.hidden = true;
                    imageButton.className = 'certificate-card-image-button';
                    imageButton.type = 'button';
                    imageButton.setAttribute('aria-label', 'Preview ' + certificate.title);
                    image.src = certificate.image;
                    image.alt = certificate.title;
                    image.loading = 'lazy';
                    image.decoding = 'async';
                    imageButton.appendChild(image);
                    details.className = 'certificate-card-details';
                    title.textContent = certificate.title;
                    metadata.className = 'certificate-card-metadata';
                    description.className = 'certificate-card-description';
                    description.textContent = certificate.description || '';
                    description.hidden = !certificate.description;
                    addDetail(metadata, 'Issuer', certificate.issuer);
                    addDetail(metadata, 'Issued', certificate.issueDate);
                    addDetail(metadata, 'Credential ID', certificate.credentialId);
                    addCredentialLink(metadata, certificate.credentialUrl);
                    details.appendChild(title);
                    details.appendChild(metadata);
                    metadata.hidden = !metadata.childElementCount;
                    if (certificate.description) {
                        details.appendChild(description);
                    }
                    card.appendChild(imageButton);
                    card.appendChild(details);
                    gallery.appendChild(card);
                    imageButton.addEventListener('click', function () {
                        openPreview(certificate, imageButton);
                    });

                    function finishImageCheck(isValid) {
                        pendingCertificates -= 1;
                        if (isValid) {
                            validCertificates += 1;
                            card.hidden = false;
                        } else {
                            console.error('Unable to load certificate image: ' + certificate.image);
                            card.remove();
                        }
                        if (pendingCertificates === 0) {
                            if (validCertificates > 0) {
                                emptyState.remove();
                            } else {
                                emptyState.textContent = 'No certificate images could be loaded. Check that the files exist in assets/certificates/ and that their filenames match the certificates list in assets/js/main.js.';
                            }
                        }
                    }

                    imageProbe.onload = function () {
                        finishImageCheck(true);
                    };
                    imageProbe.onerror = function () {
                        finishImageCheck(false);
                    };
                    imageProbe.src = certificate.image;
                });
            }

            trigger.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (viewer.open) {
                    return;
                }
                activeTrigger = trigger;
                originalBodyOverflow = document.body.style.overflow;
                originalBodyPaddingRight = document.body.style.paddingRight;
                var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                if (scrollbarWidth > 0) {
                    document.body.style.paddingRight = (parseFloat(window.getComputedStyle(document.body).paddingRight) + scrollbarWidth) + 'px';
                }
                document.body.style.overflow = 'hidden';
                viewer.classList.remove('is-closing');
                viewer.showModal();
                closeViewer.focus();
            });

            trigger.addEventListener('keydown', function (event) {
                if (event.key === ' ') {
                    event.preventDefault();
                    trigger.click();
                }
            });

            viewer.addEventListener('click', function (event) {
                if (event.target === viewer) {
                    closeDialogWithAnimation(viewer, 'viewer');
                }
            });
            viewer.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeDialogWithAnimation(viewer, 'viewer');
                }
            });
            viewer.addEventListener('cancel', function (event) {
                event.preventDefault();
                closeDialogWithAnimation(viewer, 'viewer');
            });
            preview.addEventListener('click', function (event) {
                if (event.target === preview) {
                    closeDialogWithAnimation(preview, 'preview');
                }
            });
            preview.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeDialogWithAnimation(preview, 'preview');
                }
            });
            preview.addEventListener('cancel', function (event) {
                event.preventDefault();
                closeDialogWithAnimation(preview, 'preview');
            });
            viewer.addEventListener('close', function () {
                window.clearTimeout(closeTimers.viewer);
                closeTimers.viewer = null;
                viewer.classList.remove('is-closing');
                restoreViewerScroll();
                if (activeTrigger && activeTrigger.isConnected) {
                    activeTrigger.focus({ preventScroll: true });
                }
            });
            preview.addEventListener('close', function () {
                window.clearTimeout(closeTimers.preview);
                closeTimers.preview = null;
                preview.classList.remove('is-closing');
                if (activePreviewTrigger && activePreviewTrigger.isConnected && viewer.open) {
                    activePreviewTrigger.focus({ preventScroll: true });
                }
            });
            closeViewer.addEventListener('click', function () {
                closeDialogWithAnimation(viewer, 'viewer');
            });
            closePreview.addEventListener('click', function () {
                closeDialogWithAnimation(preview, 'preview');
            });

            section.dataset.certificatesViewerInitialized = 'true';
        },

        academicSkillsViewer: function () {
            var section = document.getElementById('certifications');
            var trigger = section && section.querySelector('[data-academic-skills-trigger]');
            if (!section || !trigger || section.dataset.academicSkillsViewerInitialized === 'true') {
                return;
            }

            // =========================================================
            // CONTRIBUTION GRAPH SKILLS — EDIT THIS ARRAY
            // Add, remove, or rename skills to update the graph cell labels.
            // =========================================================
            var academicSkills = [
                'AI',
                'Machine Learning',
                'Data Science',
                'HTML',
                'CSS',
                'C',
                'C++',
                'Python',
                'Java',
                'JavaScript',
                'TypeScript',
                'Node.js',
                'React',
                'MongoDB',
                'SQL',
                'Git',
                'GitHub',
                'Deep Learning',
                'NLP',
                'Computer Vision',
                'Algorithms',
                'Data Structures',
                'Express.js',
                'PostgreSQL',
                'MySQL',
                'REST APIs',
                'JSON',
                'Linux',
                'Bash',
                'Statistics',
                'Pandas',
                'NumPy',
                'Scikit-learn',
                'TensorFlow',
                'PyTorch',
                'Explainable AI',
                'Predictive Analytics',
                'Data Visualization',
                'Object-Oriented Programming',
                'Web Development',
                'Software Engineering',
                'Problem Solving'
            ];
            var animationSettings = {
                travelDurationMs: 700,
                eatDurationMs: 460,
                pauseDurationMs: 280,
                dragonSizePx: 140
            };
            var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
            var dialog = document.createElement('dialog');
            dialog.id = 'academic-skills-dialog';
            dialog.className = 'academic-skills-dialog';
            dialog.setAttribute('aria-labelledby', 'academic-skills-title');
            dialog.setAttribute('aria-modal', 'true');
            dialog.innerHTML = [
                '<div class="academic-skills-panel">',
                '  <button class="academic-skills-close" type="button" aria-label="Close skills visualization">×</button>',
                '  <header class="academic-skills-header">',
                '    <p class="academic-skills-eyebrow">Dragon skill feast</p>',
                '    <h2 id="academic-skills-title">The Dragon Eats Its Way Through Code</h2>',
                '    <p class="academic-skills-note">Watch the dragon explore the contributions graph and consume CSE skills one by one.</p>',
                '  </header>',
                '  <div class="academic-skills-controls">',
                '    <button class="academic-skills-control academic-skills-replay" type="button">Replay animation</button>',
                '    <button class="academic-skills-control academic-skills-pause" type="button" aria-pressed="false">Pause dragon</button>',
                '  </div>',
                '  <section class="academic-skills-graph" aria-label="Annual CSE contributions graph">',
                '    <div class="academic-skills-graph-scroll" tabindex="0" aria-label="Scrollable annual contributions graph">',
                '      <div class="academic-skills-graph-canvas">',
                '        <div class="academic-skills-months" aria-hidden="true"></div>',
                '        <div class="academic-skills-calendar">',
                '          <div class="academic-skills-weekdays" aria-hidden="true"><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span><span></span></div>',
                '          <div class="academic-skills-feast" role="group" aria-label="CSE skills by contribution day"></div>',
                '        </div>',
                '      </div>',
                '    </div>',
                '    <div class="academic-skills-legend" aria-label="Contribution activity legend">',
                '      <span>Less</span><i class="contribution-level-1" aria-hidden="true"></i><i class="contribution-level-2" aria-hidden="true"></i><i class="contribution-level-3" aria-hidden="true"></i><i class="contribution-level-4" aria-hidden="true"></i><span>More</span>',
                '    </div>',
                '  </section>',
                '  <p class="academic-skills-status" aria-live="polite"></p>',
                '</div>'
            ].join('');
            document.body.appendChild(dialog);

            var closeButton = dialog.querySelector('.academic-skills-close');
            var replayButton = dialog.querySelector('.academic-skills-replay');
            var pauseButton = dialog.querySelector('.academic-skills-pause');
            var chart = dialog.querySelector('.academic-skills-feast');
            var months = dialog.querySelector('.academic-skills-months');
            var status = dialog.querySelector('.academic-skills-status');
            var skillItems = [];
            var dragonFrame = 0;
            var dragon = null;
            var animationPaused = false;
            var routeIndex = 0;
            var routePhase = 'travel';
            var phaseElapsed = 0;
            var routeFrom = { x: 0, y: 0 };
            var routeTo = { x: 0, y: 0 };
            var routeControlStart = { x: 0, y: 0 };
            var routeControlEnd = { x: 0, y: 0 };
            var currentTravelDuration = 700;
            var dragonPosition = { x: 0, y: 0 };
            var lastFrameTime = 0;
            var activeTrigger = null;
            var originalBodyOverflow = '';
            var originalBodyPaddingRight = '';
            var closeTimer = null;

            var graphYear = new Date().getFullYear();
            var yearStart = new Date(graphYear, 0, 1);
            var yearEnd = new Date(graphYear, 11, 31);
            var graphStart = new Date(yearStart);
            graphStart.setDate(graphStart.getDate() - ((graphStart.getDay() + 6) % 7));
            var graphEnd = new Date(yearEnd);
            graphEnd.setDate(graphEnd.getDate() + ((7 - graphEnd.getDay()) % 7));
            var graphStartUtc = Date.UTC(graphStart.getFullYear(), graphStart.getMonth(), graphStart.getDate());
            var weekCount = Math.round((
                Date.UTC(graphEnd.getFullYear(), graphEnd.getMonth(), graphEnd.getDate()) - graphStartUtc
            ) / (7 * 24 * 60 * 60 * 1000)) + 1;
            var graphDayIndex = 0;
            var activityLabels = ['', 'Light', 'Moderate', 'High', 'Very high'];
            var dateFormatter = new Intl.DateTimeFormat('en', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });

            chart.style.setProperty('--week-count', weekCount);
            months.style.setProperty('--week-count', weekCount);
            for (var monthIndex = 0; monthIndex < 12; monthIndex += 1) {
                var monthDate = new Date(graphYear, monthIndex, 1);
                var monthLabel = document.createElement('span');
                var monthWeek = Math.floor((
                    Date.UTC(monthDate.getFullYear(), monthDate.getMonth(), monthDate.getDate()) - graphStartUtc
                ) / (7 * 24 * 60 * 60 * 1000));
                monthLabel.className = 'academic-skills-month';
                monthLabel.textContent = monthDate.toLocaleString('en', { month: 'long' });
                monthLabel.style.left = (monthWeek * 14) + 'px';
                months.appendChild(monthLabel);
            }

            for (var week = 0; week < weekCount; week += 1) {
                for (var weekday = 0; weekday < 7; weekday += 1) {
                    var date = new Date(graphStart);
                    date.setDate(graphStart.getDate() + week * 7 + weekday);
                    if (date.getFullYear() !== graphYear) {
                        var emptyCell = document.createElement('span');
                        emptyCell.className = 'academic-skill-box is-empty';
                        emptyCell.setAttribute('aria-hidden', 'true');
                        chart.appendChild(emptyCell);
                        continue;
                    }

                    if (!academicSkills.length) {
                        var missingSkillCell = document.createElement('span');
                        missingSkillCell.className = 'academic-skill-box is-empty';
                        missingSkillCell.setAttribute('aria-hidden', 'true');
                        chart.appendChild(missingSkillCell);
                        continue;
                    }

                    var skill = academicSkills[graphDayIndex % academicSkills.length];
                    var activity = 1 + ((graphDayIndex * 7 + week * 3 + skill.length) % 4);
                    var item = document.createElement('button');
                    var accessibleLabel = skill + ' — ' + activityLabels[activity] +
                        ' contribution activity on ' + dateFormatter.format(date);
                    item.type = 'button';
                    item.className = 'academic-skill-box contribution-cell level-' + activity;
                    item.setAttribute('aria-label', accessibleLabel);
                    item.setAttribute('title', accessibleLabel);
                    item.dataset.tooltip = skill + ' · ' + activityLabels[activity] +
                        ' · ' + dateFormatter.format(date);
                    item.dataset.skill = skill;
                    item.dataset.activity = activity;
                    item.dataset.intensity = activity;
                    item.dataset.date = dateFormatter.format(date);
                    chart.appendChild(item);
                    skillItems.push({ item: item });
                    graphDayIndex += 1;
                }
            }

            chart.addEventListener('click', function (event) {
                var selectedCell = event.target.closest('.contribution-cell');
                if (!selectedCell || !chart.contains(selectedCell)) {
                    return;
                }
                var previousSelection = chart.querySelector('.contribution-cell.is-selected');
                if (previousSelection) {
                    previousSelection.classList.remove('is-selected');
                }
                selectedCell.classList.add('is-selected');
                status.textContent = selectedCell.dataset.tooltip;
            });

            var dragonWrap = document.createElement('div');
            dragonWrap.className = 'academic-skills-dragon';
            dragonWrap.setAttribute('aria-hidden', 'true');
            dragonWrap.innerHTML = [
                '<svg class="dragon-redesign" viewBox="0 0 720 420" role="presentation" focusable="false" aria-hidden="true">',
                '  <defs><pattern id="dragon-redesign-scales" width="18" height="14" patternUnits="userSpaceOnUse"><path d="M-2 1 Q7 12 16 1 M7 8 Q16 19 25 8" fill="none" stroke="currentColor" stroke-opacity=".42" stroke-width="1.8"/></pattern></defs>',
                '  <g class="dragon-redesign-wing dragon-redesign-wing-far">',
                '    <path class="dragon-redesign-wing-membrane" d="M425 245 Q393 219 383 183 L323 99 Q354 100 382 125 L367 53 Q399 76 416 128 L435 33 Q461 75 448 130 L501 83 Q498 125 465 166 Q460 207 442 247 Z"/>',
                '    <path class="dragon-redesign-wing-rib dragon-redesign-wing-rib-a" d="M425 245 Q405 197 323 99"/>',
                '    <path class="dragon-redesign-wing-rib dragon-redesign-wing-rib-b" d="M420 232 Q405 175 367 53"/>',
                '    <path class="dragon-redesign-wing-rib dragon-redesign-wing-rib-c" d="M425 235 Q426 177 435 33"/>',
                '    <path class="dragon-redesign-wing-rib dragon-redesign-wing-rib-d" d="M432 237 Q455 186 501 83"/>',
                '    <path class="dragon-redesign-wing-edge" d="M323 99 Q354 100 382 125 M367 53 Q399 76 416 128 M435 33 Q461 75 448 130 M501 83 Q498 125 465 166"/>',
                '    <path class="dragon-redesign-wing-knuckles" d="M382 125 Q398 137 416 128 Q432 139 448 130 M383 183 Q408 194 432 183 Q451 185 465 166"/>',
                '  </g>',
                '  <g class="dragon-redesign-limb dragon-redesign-leg-far dragon-redesign-hind-leg">',
                '    <path class="dragon-redesign-leg-bone" d="M290 254 Q270 271 268 290"/>',
                '    <circle class="dragon-redesign-joint" cx="268" cy="290" r="6"/>',
                '    <path class="dragon-redesign-leg-shin" d="M268 290 Q274 306 267 326"/>',
                '    <path class="dragon-redesign-claws" d="M267 326 Q251 330 243 322l-6 7 15-1 4 6 5-3 7 3 5-7"/>',
                '  </g>',
                '  <g class="dragon-redesign-limb dragon-redesign-leg-far dragon-redesign-fore-leg">',
                '    <path class="dragon-redesign-leg-bone" d="M458 238 Q444 255 450 276"/>',
                '    <circle class="dragon-redesign-joint" cx="450" cy="276" r="6"/>',
                '    <path class="dragon-redesign-leg-shin" d="M450 276 Q463 293 457 315"/>',
                '    <path class="dragon-redesign-claws" d="M457 315 Q443 321 434 314l-5 7 15-1 4 6 5-3 7 2 5-6"/>',
                '  </g>',
                '  <g class="dragon-redesign-body">',
                '    <g class="dragon-redesign-tail">',
                '      <path class="dragon-redesign-tail-fill" d="M275 260 C246 279 220 302 183 312 C132 328 70 321 16 288 C57 301 103 301 148 290 C199 278 238 253 266 241 Z"/>',
                '      <path class="dragon-redesign-tail-scales" d="M275 260 C246 279 220 302 183 312 C132 328 70 321 16 288 C57 301 103 301 148 290 C199 278 238 253 266 241 Z"/>',
                '      <path class="dragon-redesign-tail-spikes" d="M23 291 Q28 284 29 280 Q35 286 37 293 Z M39 294 Q45 284 46 279 Q52 286 55 295 Z M57 297 Q64 285 65 280 Q72 288 76 299 Z M79 298 Q87 285 88 279 Q96 287 99 299 Z M102 296 Q111 282 112 276 Q120 284 124 296 Z M127 291 Q137 277 138 271 Q146 280 150 291 Z M153 284 Q163 270 164 263 Q172 273 176 284 Z M179 276 Q190 261 191 254 Q199 264 203 276 Z M205 267 Q217 251 218 244 Q226 255 230 267 Z M231 257 Q244 241 245 234 Q253 245 257 257 Z M258 249 Q270 233 271 226 Q279 238 282 249 Z"/>',
                '      <path class="dragon-redesign-tail-ridge" d="M29 291 Q91 308 150 293 T270 253"/>',
                '    </g>',
                '    <path class="dragon-redesign-body-outline" d="M258 258 C298 278 324 258 356 239 C389 219 414 238 444 251 C477 265 502 238 526 216 Q543 198 551 174"/>',
                '    <path class="dragon-redesign-body-main" d="M258 258 C298 278 324 258 356 239 C389 219 414 238 444 251 C477 265 502 238 526 216 Q543 198 551 174"/>',
                '    <path class="dragon-redesign-body-scales" d="M258 258 C298 278 324 258 356 239 C389 219 414 238 444 251 C477 265 502 238 526 216 Q543 198 551 174"/>',
                '    <path class="dragon-redesign-belly" d="M273 268 Q310 279 344 253 T400 235 Q423 238 446 260 Q482 277 515 238"/>',
                '    <path class="dragon-redesign-spines" d="M270 258 Q277 248 278 242 Q285 250 288 262 Z M292 262 Q300 249 301 243 Q309 252 312 265 Z M317 259 Q325 245 326 239 Q334 249 338 261 Z M342 251 Q350 237 351 231 Q359 241 363 253 Z M367 241 Q376 227 377 220 Q385 232 389 245 Z M393 234 Q402 220 403 213 Q411 225 414 238 Z M419 239 Q429 225 430 218 Q438 230 441 244 Z M445 250 Q455 236 456 229 Q465 241 467 255 Z M472 250 Q482 237 483 230 Q491 242 492 254 Z M498 233 Q508 221 509 214 Q517 224 518 238 Z M520 212 Q531 200 532 192 Q540 202 541 216 Z"/>',
                '    <path class="dragon-redesign-scale-ridges" d="m295 260 10 5m12-6 10 5m13-10 10 5m15-13 10 5m13-9 9 6m12-1 7 8m12 2 5 9m14 4 2 10m16-3-2 10m17-5-5 9m17-14-5 10"/>',
                '    <g class="dragon-redesign-wing dragon-redesign-wing-near">',
                '      <path class="dragon-redesign-wing-membrane" d="M432 246 Q399 217 398 178 L350 86 Q383 95 405 125 L397 54 Q431 80 441 130 L463 35 Q486 76 472 130 L526 77 Q523 121 488 163 Q482 207 450 249 Z"/>',
                '      <path class="dragon-redesign-wing-rib dragon-redesign-wing-rib-a" d="M432 246 Q414 198 350 86"/>',
                '      <path class="dragon-redesign-wing-rib dragon-redesign-wing-rib-b" d="M429 232 Q420 174 397 54"/>',
                '      <path class="dragon-redesign-wing-rib dragon-redesign-wing-rib-c" d="M435 236 Q448 173 463 35"/>',
                '      <path class="dragon-redesign-wing-rib dragon-redesign-wing-rib-d" d="M440 239 Q475 185 526 77"/>',
                '      <path class="dragon-redesign-wing-edge" d="M350 86 Q383 95 405 125 M397 54 Q431 80 441 130 M463 35 Q486 76 472 130 M526 77 Q523 121 488 163"/>',
                '      <path class="dragon-redesign-wing-knuckles" d="M405 125 Q423 137 441 130 Q458 141 472 130 M398 178 Q426 194 454 180 Q473 184 488 163"/>',
                '    </g>',
                '  </g>',
                '  <g class="dragon-redesign-neck">',
                '    <path class="dragon-redesign-neck-fill" d="M518 226 Q545 205 549 178 Q550 151 576 139 Q592 133 610 140 L611 166 Q585 158 575 174 Q564 193 552 222 Q539 238 518 239 Z"/>',
                '    <path class="dragon-redesign-neck-scales" d="M518 226 Q545 205 549 178 Q550 151 576 139 Q592 133 610 140 L611 166 Q585 158 575 174 Q564 193 552 222 Q539 238 518 239 Z"/>',
                '    <path class="dragon-redesign-neck-plates" d="m534 222 15 4m-3-20 15 5m-10-23 16 6m-7-24 17 6m-4-24 17 6m8-19 14 8m-31 73 13 7"/>',
                '    <path class="dragon-redesign-neck-spikes" d="m532 219-13-16 21 8m-8-22-15-17 24 8m-3-22-9-20 25 12m1-22-2-22 21 18m4-17 8-19 12 23"/>',
                '  </g>',
                '  <g class="dragon-redesign-head">',
                '    <path class="dragon-redesign-mane" d="M588 145 Q563 125 550 105 Q552 132 577 155 M600 141 Q584 119 582 99 Q602 115 610 137 M615 143 Q617 119 632 101 Q637 124 627 145"/>',
                '    <path class="dragon-redesign-horn" d="M589 140 Q571 111 548 101 Q566 101 582 109 Q566 83 572 65 Q593 83 604 125 Z"/>',
                '    <path class="dragon-redesign-horn" d="M611 136 Q617 108 643 89 Q637 111 637 124 Q656 108 677 108 Q662 128 638 145 Z"/>',
                '    <path class="dragon-redesign-skull" d="M585 143 Q598 126 624 130 L653 136 Q668 140 679 153 L710 164 Q718 169 708 177 L679 183 Q664 196 642 188 L624 180 L607 188 L590 176 L580 167 Z"/>',
                '    <path class="dragon-redesign-brow" d="m618 145 18-8 17 8-17 3z"/>',
                '    <path class="dragon-redesign-eye" d="M620 151 Q634 140 647 150 Q639 160 624 157 Z"/>',
                '    <circle class="dragon-redesign-pupil" cx="636" cy="151" r="3.2"/>',
                '    <path class="dragon-redesign-nostril" d="m686 165 7 2m-13 4 6 2"/>',
                '    <path class="dragon-redesign-whisker" d="M630 178 Q607 188 587 207 Q612 197 628 190 M650 181 Q643 204 653 218 Q660 201 660 187 M603 164 Q579 159 561 171 M680 175 Q704 186 717 203 Q697 197 681 186"/>',
                '    <g class="dragon-redesign-jaw">',
                '      <path d="M611 177 Q642 184 678 177 L704 174 Q691 191 665 198 L637 195 L615 187 Z"/>',
                '      <path class="dragon-redesign-teeth" d="m650 184 5 10 5-9m10-3 4 9 5-11"/>',
                '    </g>',
                '    <path class="dragon-redesign-mouth" d="M615 177 Q655 184 700 175"/>',
                '  </g>',
                '  <g class="dragon-redesign-limb dragon-redesign-leg-near dragon-redesign-hind-leg">',
                '    <path class="dragon-redesign-leg-bone" d="M291 260 Q278 278 291 299"/>',
                '    <circle class="dragon-redesign-joint" cx="291" cy="299" r="6"/>',
                '    <path class="dragon-redesign-leg-shin" d="M291 299 Q300 314 287 336"/>',
                '    <path class="dragon-redesign-claws" d="M287 336 Q272 341 264 333l-6 7 15-1 4 6 5-3 7 3 5-7"/>',
                '  </g>',
                '  <g class="dragon-redesign-limb dragon-redesign-leg-near dragon-redesign-fore-leg">',
                '    <path class="dragon-redesign-leg-bone" d="M460 247 Q476 267 477 290"/>',
                '    <circle class="dragon-redesign-joint" cx="477" cy="290" r="6"/>',
                '    <path class="dragon-redesign-leg-shin" d="M477 290 Q469 311 479 333"/>',
                '    <path class="dragon-redesign-claws" d="M479 333 Q464 338 455 330l-6 7 15-1 4 6 5-3 7 3 5-7"/>',
                '  </g>',
                '</svg>'
            ].join('');
            chart.appendChild(dragonWrap);
            dragon = dragonWrap;
            dragon.style.setProperty('--dragon-size', animationSettings.dragonSizePx + 'px');

            function setDragonPosition(position, bank, depth) {
                dragonPosition = position;
                var flightBank = bank || 0;
                dragon.style.setProperty('--flight-bank', flightBank.toFixed(2) + 'deg');
                dragon.style.setProperty('--head-bank', (flightBank * 0.72).toFixed(2) + 'deg');
                dragon.style.setProperty('--neck-bank', (flightBank * 0.48).toFixed(2) + 'deg');
                dragon.style.setProperty('--tail-bank', (flightBank * -0.56).toFixed(2) + 'deg');
                dragon.style.transform = 'translate3d(' + position.x + 'px, ' + position.y +
                    'px, 0) translate(-50%, -50%) rotate(' + flightBank + 'deg) scale(' + (depth || 1) + ')';
            }

            function targetPosition(index) {
                var chartRect = chart.getBoundingClientRect();
                var itemRect = skillItems[index].item.getBoundingClientRect();
                var dragonWidth = dragon.getBoundingClientRect().width;
                var dragonHeight = dragon.getBoundingClientRect().height;
                skillItems[index].item.scrollIntoView({
                    block: 'nearest',
                    inline: 'nearest',
                    behavior: 'auto'
                });
                itemRect = skillItems[index].item.getBoundingClientRect();
                chartRect = chart.getBoundingClientRect();
                var targetLeft = itemRect.left - chartRect.left;
                var targetRight = itemRect.right - chartRect.left;
                var targetCenterY = itemRect.top + itemRect.height / 2 - chartRect.top;
                var targetCenterX = targetLeft + itemRect.width / 2;
                var facingLeft = dragonPosition.x > targetCenterX;
                var x = facingLeft ?
                    targetRight + dragonWidth * 0.49 :
                    targetLeft - dragonWidth * 0.49;
                x = Math.max(dragonWidth * 0.5, Math.min(chart.clientWidth - dragonWidth * 0.5, x));
                return {
                    x: x,
                    y: targetCenterY + dragonHeight * 0.08,
                    facingLeft: facingLeft
                };
            }

            function targetIntensity(index) {
                var intensity = Number(skillItems[index].item.dataset.intensity);
                return Number.isFinite(intensity) ? intensity : 0;
            }

            function selectNextTarget() {
                var highestIntensity = -1;
                var nextIndex = -1;
                var nearestDistance = Infinity;
                var chartRect = chart.getBoundingClientRect();

                skillItems.forEach(function (entry, index) {
                    var item = entry.item;
                    if (item.classList.contains('is-eaten') || item.classList.contains('is-being-eaten')) {
                        return;
                    }

                    var intensity = targetIntensity(index);
                    if (intensity > highestIntensity) {
                        highestIntensity = intensity;
                        nextIndex = -1;
                        nearestDistance = Infinity;
                    }
                    if (intensity !== highestIntensity) {
                        return;
                    }

                    var rect = item.getBoundingClientRect();
                    var centerX = rect.left - chartRect.left + rect.width / 2;
                    var centerY = rect.top - chartRect.top + rect.height / 2;
                    var distanceX = centerX - dragonPosition.x;
                    var distanceY = centerY - dragonPosition.y;
                    var distance = distanceX * distanceX + distanceY * distanceY;
                    if (distance < nearestDistance) {
                        nearestDistance = distance;
                        nextIndex = index;
                    }
                });

                return nextIndex;
            }

            function prepareFlight(index, resetElapsed) {
                routeFrom = dragonPosition;
                routeTo = targetPosition(index);
                var distanceX = routeTo.x - routeFrom.x;
                var distanceY = routeTo.y - routeFrom.y;
                var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                var arc = Math.min(chart.clientHeight * 0.42, Math.max(18, distance * 0.2));
                var arcDirection = index % 2 === 0 ? -1 : 1;
                var controlMinY = dragon.offsetHeight * 0.36;
                var controlMaxY = Math.max(controlMinY, chart.clientHeight - dragon.offsetHeight * 0.36);
                routeControlStart = {
                    x: routeFrom.x + distanceX * 0.28,
                    y: Math.max(controlMinY, Math.min(controlMaxY, routeFrom.y + distanceY * 0.28 + arcDirection * arc))
                };
                routeControlEnd = {
                    x: routeFrom.x + distanceX * 0.72,
                    y: Math.max(controlMinY, Math.min(controlMaxY, routeFrom.y + distanceY * 0.72 + arcDirection * arc * 0.62))
                };
                currentTravelDuration = animationSettings.travelDurationMs +
                    Math.min(600, Math.max(0, distance - dragon.offsetWidth) * 1.3);

                var wasFacingLeft = dragon.classList.contains('is-facing-left');
                dragon.classList.toggle('is-facing-left', routeTo.facingLeft);
                setDragonDirection(routeTo.facingLeft);
                setFlightBank(routeFrom, routeTo);
                dragon.classList.remove('is-approaching', 'is-gliding', 'is-climbing', 'is-descending');
                dragon.classList.toggle('is-climbing', routeTo.y < routeFrom.y - 8);
                dragon.classList.toggle('is-descending', routeTo.y > routeFrom.y + 8);
                dragon.classList.add('is-traveling');
                dragon.classList.toggle('is-turning', wasFacingLeft !== routeTo.facingLeft);

                if (resetElapsed !== false) {
                    phaseElapsed = 0;
                    lastFrameTime = 0;
                }
            }

            function describeApproach(index) {
                var intensity = targetIntensity(index);
                return 'Dragon approaching ' + skillItems[index].item.dataset.skill +
                    ' · ' + (activityLabels[intensity] || 'Unrated') + ' contribution activity';
            }

            function setDragonDirection(facingLeft) {
                dragon.style.setProperty('--dragon-direction', facingLeft ? '-1' : '1');
            }

            function setFlightBank(from, to) {
                var horizontalDistance = Math.max(Math.abs(to.x - from.x), dragon.offsetWidth * 0.35);
                var verticalAngle = Math.atan2(to.y - from.y, horizontalDistance) * 180 / Math.PI;
                var facingMultiplier = to.facingLeft ? -1 : 1;
                var bank = Math.max(-16, Math.min(16, verticalAngle * 0.72 * facingMultiplier));
                dragon.style.setProperty('--flight-bank', bank.toFixed(2) + 'deg');
                dragon.style.setProperty('--head-bank', (bank * 0.62).toFixed(2) + 'deg');
                dragon.style.setProperty('--neck-bank', (bank * 0.42).toFixed(2) + 'deg');
                dragon.style.setProperty('--tail-bank', (bank * -0.48).toFixed(2) + 'deg');
            }

            function createFlameBurst(index) {
                var chartRect = chart.getBoundingClientRect();
                var dragonRect = dragon.getBoundingClientRect();
                var burst = document.createElement('span');
                burst.className = 'academic-dragon-flame-burst';
                burst.setAttribute('aria-hidden', 'true');
                burst.style.left = (dragonRect.left + dragonRect.width * (dragon.classList.contains('is-facing-left') ? 0.04 : 0.96) - chartRect.left) + 'px';
                burst.style.top = (dragonRect.top + dragonRect.height * 0.47 - chartRect.top) + 'px';
                burst.innerHTML = '<i></i><i></i><i></i><i></i><i></i>';
                chart.appendChild(burst);
                skillItems[index].burst = burst;
            }

            function setBiteTarget(index) {
                var box = skillItems[index].item;
                var boxRect = box.getBoundingClientRect();
                var dragonRect = dragon.getBoundingClientRect();
                var mouthX = dragonRect.left + dragonRect.width * (dragon.classList.contains('is-facing-left') ? 0.03 : 0.97);
                var mouthY = dragonRect.top + dragonRect.height * 0.42;
                box.style.setProperty('--bite-x', (mouthX - boxRect.left - boxRect.width / 2) + 'px');
                box.style.setProperty('--bite-y', (mouthY - boxRect.top - boxRect.height / 2) + 'px');
                box.style.setProperty('--bite-duration', animationSettings.eatDurationMs + 'ms');
            }

            function stopDragon() {
                if (dragonFrame) {
                    window.cancelAnimationFrame(dragonFrame);
                    dragonFrame = 0;
                }
                skillItems.forEach(function (entry) {
                    entry.item.classList.remove('is-being-eaten');
                    if (entry.burst) {
                        entry.burst.remove();
                        entry.burst = null;
                    }
                });
                dragon.classList.remove(
                    'is-eating',
                    'is-facing-left',
                    'is-traveling',
                    'is-turning',
                    'is-approaching',
                    'is-gliding',
                    'is-climbing',
                    'is-descending'
                );
                dragon.classList.add('is-stopped');
                dragon.style.removeProperty('--flight-bank');
                dragon.style.removeProperty('--head-bank');
                dragon.style.removeProperty('--neck-bank');
                dragon.style.removeProperty('--tail-bank');
                chart.classList.remove('is-animating', 'is-paused');
            }

            function animateDragon(timestamp) {
                if (!dialog.open || animationPaused || reduceMotion.matches) {
                    dragonFrame = 0;
                    return;
                }
                var delta = lastFrameTime ? Math.min(timestamp - lastFrameTime, 50) : 0;
                lastFrameTime = timestamp;

                if (routePhase === 'travel') {
                    phaseElapsed += delta;
                    var progress = Math.min(phaseElapsed / currentTravelDuration, 1);
                    var eased = progress * progress * (3 - 2 * progress);
                    var inverseProgress = 1 - eased;
                    var inverseSquared = inverseProgress * inverseProgress;
                    var easedSquared = eased * eased;
                    var position = {
                        x: inverseSquared * inverseProgress * routeFrom.x +
                            3 * inverseSquared * eased * routeControlStart.x +
                            3 * inverseProgress * easedSquared * routeControlEnd.x +
                            easedSquared * eased * routeTo.x,
                        y: inverseSquared * inverseProgress * routeFrom.y +
                            3 * inverseSquared * eased * routeControlStart.y +
                            3 * inverseProgress * easedSquared * routeControlEnd.y +
                            easedSquared * eased * routeTo.y
                    };
                    var tangentX = 3 * inverseSquared * (routeControlStart.x - routeFrom.x) +
                        6 * inverseProgress * eased * (routeControlEnd.x - routeControlStart.x) +
                        3 * easedSquared * (routeTo.x - routeControlEnd.x);
                    var tangentY = 3 * inverseSquared * (routeControlStart.y - routeFrom.y) +
                        6 * inverseProgress * eased * (routeControlEnd.y - routeControlStart.y) +
                        3 * easedSquared * (routeTo.y - routeControlEnd.y);
                    var bank = Math.atan2(tangentY, Math.max(Math.abs(tangentX), 1)) *
                        180 / Math.PI * (routeTo.facingLeft ? -1 : 1) * Math.sin(Math.PI * progress);
                    var depth = 1 + Math.sin(Math.PI * progress) * 0.025;
                    setDragonPosition(position, bank, depth);
                    if (progress === 1) {
                        routePhase = 'approach';
                        phaseElapsed = 0;
                        dragon.classList.remove('is-traveling', 'is-turning');
                        dragon.classList.add('is-approaching');
                        setDragonPosition(routeTo, 0, 1);
                        status.textContent = 'Dragon hovering beside ' + skillItems[routeIndex].item.dataset.skill;
                    }
                } else if (routePhase === 'approach') {
                    phaseElapsed += delta;
                    if (phaseElapsed >= 180) {
                        routePhase = 'eat';
                        phaseElapsed = 0;
                        setBiteTarget(routeIndex);
                        skillItems[routeIndex].item.classList.add('is-being-eaten');
                        dragon.classList.add('is-eating');
                        createFlameBurst(routeIndex);
                        status.textContent = 'Dragon is eating ' + skillItems[routeIndex].item.dataset.skill;
                    }
                } else if (routePhase === 'eat') {
                    phaseElapsed += delta;
                    if (phaseElapsed >= animationSettings.eatDurationMs) {
                        skillItems[routeIndex].item.classList.remove('is-being-eaten');
                        skillItems[routeIndex].item.classList.add('is-eaten');
                        if (skillItems[routeIndex].burst) {
                            skillItems[routeIndex].burst.remove();
                            skillItems[routeIndex].burst = null;
                        }
                        dragon.classList.remove('is-eating');
                        dragon.classList.remove('is-approaching');
                        dragon.classList.add('is-gliding');
                        routePhase = 'pause';
                        phaseElapsed = 0;
                    }
                } else if (routePhase === 'pause') {
                    phaseElapsed += delta;
                    if (phaseElapsed >= animationSettings.pauseDurationMs) {
                        var previousIntensity = targetIntensity(routeIndex);
                        routeIndex = selectNextTarget();
                        if (routeIndex < 0) {
                            dragonFrame = 0;
                            chart.classList.remove('is-animating', 'is-paused');
                            dragon.classList.add('is-stopped');
                            pauseButton.disabled = true;
                            status.textContent = 'Graph complete — the dragon ate every CSE skill cell.';
                            return;
                        }
                        routePhase = 'travel';
                        prepareFlight(routeIndex);
                        var nextIntensity = targetIntensity(routeIndex);
                        status.textContent = nextIntensity < previousIntensity ?
                            'Intensity ' + (activityLabels[previousIntensity] || 'Unrated') +
                                ' complete. Moving to ' + (activityLabels[nextIntensity] || 'unrated') + ' cells.' :
                            describeApproach(routeIndex);
                    }
                }
                dragonFrame = window.requestAnimationFrame(animateDragon);
            }

            function startDragon(replay) {
                stopDragon();
                skillItems.forEach(function (entry) {
                    entry.item.classList.remove('is-eaten');
                    entry.item.style.removeProperty('--bite-x');
                    entry.item.style.removeProperty('--bite-y');
                });
                if (reduceMotion.matches) {
                    chart.classList.remove('is-animating');
                    chart.classList.add('is-static');
                    dragon.hidden = true;
                    return;
                }
                if (!skillItems.length) {
                    chart.classList.remove('is-animating');
                    chart.classList.add('is-static');
                    dragon.hidden = true;
                    pauseButton.disabled = true;
                    replayButton.disabled = true;
                    status.textContent = 'Add at least one skill to the editable list to start the animation.';
                    return;
                }
                dragon.classList.remove('is-stopped');
                dragon.hidden = false;
                chart.classList.remove('is-static');
                animationPaused = false;
                pauseButton.disabled = false;
                pauseButton.textContent = 'Pause dragon';
                pauseButton.setAttribute('aria-pressed', 'false');
                routePhase = 'travel';
                phaseElapsed = 0;
                lastFrameTime = 0;
                if (replay) {
                    chart.classList.remove('is-animating');
                    void chart.offsetWidth;
                }
                chart.classList.add('is-animating');
                routeFrom = {
                    x: Math.min(chart.clientWidth - dragon.offsetWidth / 2, dragon.offsetWidth),
                    y: Math.max(24, dragon.offsetHeight * 0.43)
                };
                setDragonPosition(routeFrom);
                routeIndex = selectNextTarget();
                if (routeIndex < 0) {
                    dragon.hidden = true;
                    pauseButton.disabled = true;
                    status.textContent = 'No contribution cells are available to eat.';
                    return;
                }
                prepareFlight(routeIndex);
                status.textContent = describeApproach(routeIndex);
                dragonFrame = window.requestAnimationFrame(animateDragon);
            }

            function repositionDragonForResize() {
                if (!dialog.open || routePhase !== 'travel' || animationPaused || reduceMotion.matches || !dragonFrame) {
                    return;
                }
                prepareFlight(routeIndex);
            }

            function updateMotionPreference() {
                if (reduceMotion.matches) {
                    stopDragon();
                    dragon.hidden = true;
                    skillItems.forEach(function (entry) {
                        entry.item.classList.remove('is-eaten');
                    });
                    chart.classList.remove('is-animating');
                    chart.classList.add('is-static');
                    pauseButton.disabled = true;
                    replayButton.disabled = true;
                    status.textContent = 'Animation is disabled by your reduced-motion setting.';
                } else {
                    pauseButton.disabled = false;
                    replayButton.disabled = false;
                    chart.classList.remove('is-static');
                    if (dialog.open) {
                        startDragon(true);
                    }
                }
            }

            function closeDialog() {
                if (!dialog.open || closeTimer) {
                    return;
                }
                dialog.classList.add('is-closing');
                stopDragon();
                closeTimer = window.setTimeout(function () {
                    closeTimer = null;
                    if (dialog.open) {
                        dialog.close();
                    }
                }, 180);
            }

            trigger.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (dialog.open) {
                    return;
                }
                activeTrigger = trigger;
                originalBodyOverflow = document.body.style.overflow;
                originalBodyPaddingRight = document.body.style.paddingRight;
                var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                if (scrollbarWidth > 0) {
                    document.body.style.paddingRight =
                        (parseFloat(window.getComputedStyle(document.body).paddingRight) + scrollbarWidth) + 'px';
                }
                document.body.style.overflow = 'hidden';
                dialog.showModal();
                closeButton.focus();
                updateMotionPreference();
            });

            closeButton.addEventListener('click', function () {
                closeDialog();
            });
            replayButton.addEventListener('click', function () {
                startDragon(true);
            });
            pauseButton.addEventListener('click', function () {
                animationPaused = !animationPaused;
                pauseButton.textContent = animationPaused ? 'Resume dragon' : 'Pause dragon';
                pauseButton.setAttribute('aria-pressed', String(animationPaused));
                status.textContent = animationPaused ? 'Dragon animation paused.' : 'Dragon animation resumed.';
                if (animationPaused && dragonFrame) {
                    window.cancelAnimationFrame(dragonFrame);
                    dragonFrame = 0;
                    chart.classList.add('is-paused');
                } else if (!animationPaused && dialog.open) {
                    chart.classList.remove('is-paused');
                    lastFrameTime = 0;
                    dragonFrame = window.requestAnimationFrame(animateDragon);
                }
            });
            dialog.addEventListener('click', function (event) {
                if (event.target === dialog) {
                    closeDialog();
                }
            });
            dialog.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeDialog();
                }
            });
            dialog.addEventListener('cancel', function (event) {
                event.preventDefault();
                closeDialog();
            });
            dialog.addEventListener('close', function () {
                window.clearTimeout(closeTimer);
                closeTimer = null;
                dialog.classList.remove('is-closing');
                stopDragon();
                chart.classList.remove('is-animating');
                document.body.style.overflow = originalBodyOverflow;
                document.body.style.paddingRight = originalBodyPaddingRight;
                if (activeTrigger && activeTrigger.isConnected) {
                    activeTrigger.focus({ preventScroll: true });
                }
            });
            reduceMotion.addEventListener('change', updateMotionPreference);
            window.addEventListener('resize', repositionDragonForResize);
            section.dataset.academicSkillsViewerInitialized = 'true';
        },

        aboutMeStats: function () {
            var section = document.querySelector('.rn-about-me-area');
            if (!section) {
                return;
            }

            var counters = section.querySelectorAll('.about-me-number');
            var stats = section.querySelector('.about-me-stats');
            var hasAnimated = false;

            function animateCounter(counter) {
                var targetText = counter.getAttribute('data-target') || '0';
                var target = parseInt(targetText, 10);
                var suffixMatch = targetText.match(/[^\d.-]+$/);
                var suffix = suffixMatch ? suffixMatch[0] : '';
                var minimumDigits = parseInt(counter.getAttribute('data-min-digits'), 10) || 1;
                var start = 0;
                var duration = 1800;
                var startTime = null;

                function formatValue(value) {
                    return String(value).padStart(minimumDigits, '0') + suffix;
                }

                function update(timestamp) {
                    if (!startTime) {
                        startTime = timestamp;
                    }
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    var value = Math.floor(progress * target);
                    counter.textContent = formatValue(value);
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = formatValue(target);
                    }
                }

                requestAnimationFrame(update);
            }

            function runAnimation() {
                counters.forEach(function (counter) {
                    var minimumDigits = parseInt(counter.getAttribute('data-min-digits'), 10) || 1;
                    counter.textContent = String(0).padStart(minimumDigits, '0');
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

                observer.observe(stats || section);
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

            function configuredLinksFor(card) {
                var configuration = Array.prototype.find.call(
                    portfolio.querySelectorAll('.project-link-config'),
                    function (item) {
                        return item.dataset.projectId === card.dataset.projectId;
                    }
                );
                var repositoryLink = configuration &&
                    configuration.querySelector('.repo-url');
                var demoLink = configuration &&
                    configuration.querySelector('.live-demo-url');

                function readUrl(element) {
                    return element ?
                        (element.getAttribute('href') || element.textContent).trim() :
                        '';
                }

                return {
                    repoUrl: readUrl(repositoryLink),
                    liveDemoUrl: readUrl(demoLink)
                };
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

                var repositoryUrl = validExternalUrl(configuredLinksFor(card).repoUrl, true);
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
                var links = configuredLinksFor(card);
                var repositoryUrl = validExternalUrl(links.repoUrl, true);
                var demoUrl = validExternalUrl(links.liveDemoUrl, false);
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
                demoLink.removeAttribute('hidden');
                demoLink.style.display = 'inline-flex';
                demoLink.style.visibility = 'visible';
                demoLink.style.opacity = '1';
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

        resumeTimelineActivation: function () {
            var resumeCards = document.querySelectorAll(
                '.rn-resume-area .experience-list .resume-single-list'
            );
            if (!resumeCards.length) {
                return;
            }

            resumeCards.forEach(function (card) {
                var section = card.closest('.content');
                var sectionTitle = section && section.querySelector('.maintitle');
                var title = sectionTitle ? sectionTitle.textContent.toLowerCase() : '';
                var iconName = title.indexOf('education') !== -1 ? 'book-open' :
                    title.indexOf('job') !== -1 ? 'briefcase' :
                    title.indexOf('tool') !== -1 ? 'code' : 'activity';
                var icon = document.createElement('span');
                var featherIcon = document.createElement('i');

                card.classList.add('resume-timeline-card');
                featherIcon.setAttribute('data-feather', iconName);
                featherIcon.setAttribute('aria-hidden', 'true');
                icon.className = 'resume-timeline-icon';
                icon.setAttribute('aria-hidden', 'true');
                icon.appendChild(featherIcon);
                card.insertBefore(icon, card.firstChild);
            });

            if (window.feather) {
                window.feather.replace();
            }

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
                !('IntersectionObserver' in window)) {
                resumeCards.forEach(function (card) {
                    card.classList.add('is-revealed');
                });
                return;
            }

            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -24px 0px'
            });

            resumeCards.forEach(function (card) {
                card.classList.add('resume-reveal-ready');
                observer.observe(card);
            });
        },


        backToTopInit: function () {
            var scrollTop = document.querySelector('.backto-top');
            var homeSection = document.querySelector('#home');

            if (!scrollTop || !homeSection) {
                return;
            }

            var header = document.querySelector('.rn-header');
            var updateVisibility = function () {
                var headerBottom = header ? header.getBoundingClientRect().bottom : 0;
                var homeBottom = homeSection.getBoundingClientRect().bottom;

                scrollTop.classList.toggle('is-visible', homeBottom <= headerBottom);
            };

            window.addEventListener('scroll', updateVisibility, { passive: true });
            window.addEventListener('resize', updateVisibility, false);
            updateVisibility();
            
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
