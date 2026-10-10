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
            // DRAGON SKILLS — EDIT THIS SECTION
            // Skill names are eaten in this exact order; add, remove, or reorder strings here.
            // Adjust travelDurationMs, eatDurationMs, pauseDurationMs, and dragonSizePx
            // to change the movement, bite, pause, and large dragon size.
            // =========================================================
            var academicSkills = [
                'C',
                'C++',
                'Python',
                'Java',
                'JavaScript',
                'HTML',
                'CSS',
                'AI',
                'ML',
                'Data Science',
                'Node.js',
                'React',
                'MongoDB',
                'SQL',
                'Data Structures & Algorithms'
            ];
            var animationSettings = {
                travelDurationMs: 1050,
                eatDurationMs: 760,
                pauseDurationMs: 350,
                dragonSizePx: 270
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
                '    <h2 id="academic-skills-title">The Dragon Eats Its Way Through Tech</h2>',
                '    <p class="academic-skills-note">Watch the dragon approach and eat each skill box in order.</p>',
                '  </header>',
                '  <div class="academic-skills-controls">',
                '    <button class="academic-skills-control academic-skills-replay" type="button">Replay animation</button>',
                '    <button class="academic-skills-control academic-skills-pause" type="button" aria-pressed="false">Pause dragon</button>',
                '  </div>',
                '  <div class="academic-skills-feast" role="list" aria-label="Skills waiting for the dragon"></div>',
                '  <p class="academic-skills-status" aria-live="polite"></p>',
                '</div>'
            ].join('');
            document.body.appendChild(dialog);

            var closeButton = dialog.querySelector('.academic-skills-close');
            var replayButton = dialog.querySelector('.academic-skills-replay');
            var pauseButton = dialog.querySelector('.academic-skills-pause');
            var chart = dialog.querySelector('.academic-skills-feast');
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
            var dragonPosition = { x: 0, y: 0 };
            var lastFrameTime = 0;
            var activeTrigger = null;
            var originalBodyOverflow = '';
            var originalBodyPaddingRight = '';
            var closeTimer = null;

            academicSkills.forEach(function (skill, index) {
                var item = document.createElement('div');
                var label = document.createElement('span');
                var accent = document.createElement('span');
                item.className = 'academic-skill-box';
                item.setAttribute('role', 'listitem');
                item.style.setProperty('--skill-index', index);
                item.dataset.skillIndex = index;
                label.className = 'academic-skill-box-label';
                label.textContent = skill;
                accent.className = 'academic-skill-box-accent';
                accent.setAttribute('aria-hidden', 'true');
                item.appendChild(label);
                item.appendChild(accent);
                chart.appendChild(item);
                skillItems.push({ item: item });
            });

            var dragonWrap = document.createElement('div');
            dragonWrap.className = 'academic-skills-dragon';
            dragonWrap.setAttribute('aria-hidden', 'true');
            dragonWrap.innerHTML = [
                '<svg viewBox="0 0 360 230" focusable="false">',
                '  <defs>',
                '    <linearGradient id="feast-dragon-scales" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffc08a"/><stop offset=".2" stop-color="#de7549"/><stop offset=".62" stop-color="#a74330"/><stop offset="1" stop-color="#4e201d"/></linearGradient>',
                '    <linearGradient id="feast-dragon-wing-far" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a44a3b"/><stop offset=".5" stop-color="#65302a"/><stop offset="1" stop-color="#291719"/></linearGradient>',
                '    <linearGradient id="feast-dragon-wing-near" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3a16b"/><stop offset=".38" stop-color="#bd5839"/><stop offset=".76" stop-color="#783127"/><stop offset="1" stop-color="#3a1b1c"/></linearGradient>',
                '    <linearGradient id="feast-dragon-tail" x1=".2" y1="0" x2=".75" y2="1"><stop offset="0" stop-color="#e48958"/><stop offset=".35" stop-color="#b94d34"/><stop offset=".76" stop-color="#803329"/><stop offset="1" stop-color="#421d1b"/></linearGradient>',
                '    <linearGradient id="feast-dragon-tail-highlight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd09a" stop-opacity=".68"/><stop offset="1" stop-color="#f0a06c" stop-opacity=".04"/></linearGradient>',
                '    <pattern id="feast-dragon-scales-pattern" width="18" height="14" patternUnits="userSpaceOnUse"><path d="M1 2q8 11 16 0M-8 9q8 11 16 0M10 9q8 11 16 0" fill="none" stroke="#ffd09a" stroke-opacity=".28" stroke-width="1"/></pattern>',
                '  </defs>',
                '  <g class="dragon-wing-far">',
                '    <path class="dragon-wing-membrane dragon-wing-membrane-far" d="M159 119Q148 94 125 66L65 19Q89 66 91 103L35 55Q64 111 111 143L164 151Z"/>',
                '    <path class="dragon-wing-bone dragon-wing-bone-far" d="M159 127 125 66 65 19M125 66 91 103 35 55M125 66 145 134M91 103 117 143"/>',
                '    <path class="dragon-wing-knuckle" d="m65 19-9-14m9 14 13-8M35 55 18 49"/>',
                '  </g>',
                '  <g class="dragon-tail">',
                '    <path class="dragon-tail-main" d="M154 137C128 136 102 143 72 157 38 173 1 185-45 177c16 15 39 21 67 17 44-6 83-30 121-39l20-10z"/>',
                '    <path class="dragon-tail-spade" d="M-45 177c-20-7-39-22-54-43 3 24 10 39 22 48-14 9-23 21-29 37 22-7 43-19 61-35z"/>',
                '    <path class="dragon-tail-highlight" d="M145 140c-38 3-63 19-96 33-28 12-53 16-77 9"/>',
                '    <path class="dragon-tail-ridge" d="M140 150c-33 13-57 30-91 39-22 6-39 7-54 3"/>',
                '    <path class="dragon-tail-scales" d="m125 145-8 11m-5-13-9 13m-3-16-9 15m-4-18-10 17m-3-19-11 19m-5-17-10 19m-5-14-10 19m-5-14-10 18m-5-12-10 16m-6-10-10 13m-6-9-10 10"/>',
                '    <path class="dragon-tail-armor" d="m132 141-6-13 16 9 9-13 8 18m-38 2-8-12 15 7 7-14 8 16m-41 2-8-11 15 7 7-12 7 14"/>',
                '    <g class="dragon-tail-tip">',
                '      <path class="dragon-tail-tip-plate" d="M-57 179q-17-8-31-25l3 22q5 12 15 16l-18 19q18-7 34-21l13-12z"/>',
                '      <path class="dragon-tail-tip-edge" d="m-87 155 13 17m-14 36 19-15"/>',
                '    </g>',
                '  </g>',
                '  <g class="dragon-hind-leg-far dragon-limb">',
                '    <path class="dragon-limb-shadow dragon-thigh-shadow" d="M158 139q-17 3-27 18l-12 21q-4 9 4 14l11 2q12-5 19-18l17-17q11-9 6-17-6-7-18-3z"/>',
                '    <path class="dragon-thigh" d="M157 142q-14 4-21 18l-10 19q-3 6 3 9l7 2q9-6 14-16l17-17q7-7 2-12-4-5-12-3z"/>',
                '    <path class="dragon-hip-plate" d="m157 143 9-2 7 5-7 8-11-2z"/>',
                '    <path class="dragon-muscle-highlight" d="M148 150q-9 6-13 17m18-15q-7 10-10 18"/>',
                '    <path class="dragon-shin-shadow" d="m128 180-12 15q-4 5 0 10l8 5 12-5 12-17"/>',
                '    <path class="dragon-shin" d="m128 180-10 14q-3 4 1 7l6 4 10-5 11-16"/>',
                '    <circle class="dragon-joint dragon-knee" cx="128" cy="181" r="6"/>',
                '    <path class="dragon-ankle-guard" d="m119 194 10 5m-13-1 9 5"/>',
                '    <path class="dragon-foot" d="m124 196q-8 5-13 11l-5 8q8 3 17-2l10-8 5-7-5-6z"/>',
                '    <path class="dragon-foot-plate" d="m117 198 9 4-6 8-9 3 4-8z"/>',
                '    <g class="dragon-toes dragon-toes-far">',
                '      <path class="dragon-toe" d="m116 208q-8 1-13 7l-3 5q7 2 14-2l7-5"/>',
                '      <path class="dragon-toe" d="m123 210q-5 5-6 11l1 4q6-2 9-8l3-6"/>',
                '      <path class="dragon-toe" d="m130 207q-2 6 1 11l3 3q4-5 2-11l-1-5"/>',
                '      <path class="dragon-digit-crease" d="m109 215 5-1m6 1 5-1m7-2 4-1"/>',
                '      <circle class="dragon-digit-joint" cx="115" cy="213" r="1.5"/><circle class="dragon-digit-joint" cx="126" cy="214" r="1.5"/><circle class="dragon-digit-joint" cx="136" cy="210" r="1.5"/>',
                '      <path class="dragon-claw" d="m101 220q-5 5-2 7 7-1 12-6m5-1q-2 6 2 7 6-3 7-8m7-2q1 5 6 6 4-4 1-9"/>',
                '    </g>',
                '    <path class="dragon-joint-highlight" d="m124 179 5-3m-13 29 5-2"/>',
                '  </g>',
                '  <g class="dragon-flight-body">',
                '    <path class="dragon-back-spines" d="m110 114 9-21 13 16 12-22 13 21 15-20 13 20 14-15 10 17"/>',
                '    <path class="dragon-torso" d="M78 139c5-35 33-60 72-63 34-3 64 12 81 37l30 6 16 17-21 15-26-6-27 22-44-3-31 12-26-13-28 1-16-12z"/>',
                '    <path class="dragon-torso-scales" d="M78 139c5-35 33-60 72-63 34-3 64 12 81 37l30 6 16 17-21 15-26-6-27 22-44-3-31 12-26-13-28 1-16-12z"/>',
                '    <path class="dragon-belly" d="M126 147q35 14 69 2l34 9-28 27-45-3-32 11-20-9z"/>',
                '    <path class="dragon-scale-ridges" d="m112 111 9 6m7-15 8 7m9-13 8 8m9-9 8 9m10-6 8 10m8-5 8 10m9-3 8 10m-91 13 9 6m11-4 9 6m13-7 9 6m12-7 9 6m-61 18 10 4m15-4 10 4m15-4 10 4"/>',
                '    <path class="dragon-neck" d="M216 119q10-36 41-48l28 5 25 20-20 13-15-2-15 34-24 17-26-13z"/>',
                '    <path class="dragon-neck-plates" d="m244 94 12 6m-6-16 12 7m4-4 10 8m-25 16 13 7m-22 4 13 7m-23 5 13 6"/>',
                '    <g class="dragon-head">',
                '    <path class="dragon-skull" d="M263 82q21-20 47-10l16 10 25 8 5 10-27 9-14-2-12 14-19-6-14-13-15 1-9-10z"/>',
                '    <path class="dragon-brow" d="m302 83 17-3 12 9-20-2z"/>',
                '    <path class="dragon-horn" d="m292 78-5-23 16 15m10-4 13-19 1 27"/>',
                '    <path class="dragon-jaw" d="m302 105 19 5 32-5-10 15-27 7-19-10z"/>',
                '    <path class="dragon-teeth" d="m320 108 4 9 4-10m9 0 3 7 4-9"/>',
                '    <ellipse class="dragon-eye-socket" cx="314" cy="88" rx="10" ry="7"/>',
                '    <ellipse class="dragon-eye" cx="317" cy="88" rx="5" ry="4"/>',
                '    <circle class="dragon-pupil" cx="319" cy="88" r="1.8"/>',
                '    <path class="dragon-nostril" d="m340 94 5-1m-11 4 4-1"/>',
                '    <path class="dragon-mouth" d="m305 104 44 1"/>',
                '    </g>',
                '  </g>',
                '  <g class="dragon-wing-near">',
                '    <path class="dragon-wing-membrane dragon-wing-membrane-near" d="M163 126Q154 96 137 63L114 23Q139 43 161 62L183 7Q187 43 188 70L222 25Q216 67 210 93L244 64Q229 105 196 143L159 154Z"/>',
                '    <path class="dragon-wing-bone dragon-wing-bone-near" d="M163 132 137 63 114 23M137 63 161 62 183 7M161 62 188 70 222 25M188 70 210 93 244 64M188 70 194 137"/>',
                '    <path class="dragon-wing-knuckle" d="m114 23-7-14m7 14 16-4m53-26-1-13m40 31 8-11m14 50 13-5"/>',
                '  </g>',
                '  <g class="dragon-front-arm-far dragon-limb">',
                '    <path class="dragon-limb-shadow dragon-arm-silhouette" d="M207 124q-12 1-17 11l-8 11-18 4q-8 2-9 10l-2 12 6 9 11-2 7-10 17-4q10-4 16-14l12-17z"/>',
                '    <path class="dragon-arm-upper" d="M205 127q-9 2-13 10l-8 12q-3 5 2 8l7 2q8-6 12-14l11-10z"/>',
                '    <path class="dragon-shoulder-plate" d="m203 125 10 1 6 8-8 8-10-4-4-7z"/>',
                '    <path class="dragon-arm-muscle" d="M197 132q-7 5-9 13l7-1 8-10z"/>',
                '    <path class="dragon-muscle-highlight" d="m198 132-7 11m12-5-6 9"/>',
                '    <path class="dragon-arm-fore" d="m185 151-17 5q-6 2-7 8l-2 8q-1 5 4 7l6-2 7-9 14-5q7-3 10-10l-5-6z"/>',
                '    <circle class="dragon-joint dragon-elbow" cx="184" cy="151" r="5"/>',
                '    <path class="dragon-joint-highlight" d="m181 149 4-2m-18 22 4-2"/>',
                '    <path class="dragon-wrist" d="m164 169-8 2-3 7 6 6 10-3 4-7z"/>',
                '    <path class="dragon-palm" d="m163 173q-7 0-9 5l2 7 8 4 8-5-1-8z"/>',
                '    <g class="dragon-fingers dragon-fingers-far">',
                '      <path class="dragon-finger" d="m160 183q-7 3-10 9-1 3 2 4l7-3 5-6"/>',
                '      <path class="dragon-finger" d="m165 185q-5 5-5 11 1 3 4 2l5-8 1-5"/>',
                '      <path class="dragon-finger" d="m170 184q-2 6 1 10 2 2 4-1l2-8-2-4"/>',
                '      <path class="dragon-finger-thumb" d="m157 178q-7-3-11 0-2 2 1 5l9 3"/>',
                '      <path class="dragon-digit-crease" d="m153 190 4-2m7-1 4-1m4-2 3-1m-18-6 4 1"/>',
                '      <circle class="dragon-digit-joint" cx="157" cy="188" r="1.6"/><circle class="dragon-digit-joint" cx="166" cy="188" r="1.6"/><circle class="dragon-digit-joint" cx="173" cy="184" r="1.6"/>',
                '      <path class="dragon-claw" d="m150 194q-4 6-1 8 5-2 9-8m4 2q-2 6 1 7 5-3 7-9m5-3q1 5 4 5 4-4 2-9m-27-6q-7 1-10 4 3 4 10 4"/>',
                '    </g>',
                '  </g>',
                '  <g class="dragon-hind-leg-near dragon-limb">',
                '    <path class="dragon-limb-shadow dragon-thigh-shadow" d="M177 147q13-9 25-1 9 6 7 17l-8 16q-3 7-12 9l-13-5-9-12q-4-10 3-18z"/>',
                '    <path class="dragon-thigh" d="M177 150q12-7 21 0 7 5 4 13l-7 15q-3 6-10 7l-11-6-6-10q-2-10 4-15z"/>',
                '    <path class="dragon-hip-plate" d="m176 150 9-5 9 3-1 9-10 5-8-5z"/>',
                '    <path class="dragon-muscle-highlight" d="M177 155q9-8 17-2m-18 8q7-6 14-4m-7 15 9-7"/>',
                '    <circle class="dragon-joint dragon-knee" cx="194" cy="180" r="7"/>',
                '    <path class="dragon-shin-shadow" d="m194 183q12 1 18 11l9 12q4 6-1 12l-7 7-12-6-7-13-14-11"/>',
                '    <path class="dragon-shin" d="m194 183q9 2 14 10l9 13q3 4-1 9l-5 5-9-6-7-12-13-10"/>',
                '    <path class="dragon-joint-highlight" d="m191 180 6-3m10 19 5 3"/>',
                '    <path class="dragon-ankle-guard" d="m207 207 9 3m-8 2 8 4"/>',
                '    <path class="dragon-foot" d="m210 215q9-7 19-5l15 4q6 2 7 8-9 5-20 3l-17-2-9-4z"/>',
                '    <path class="dragon-foot-plate" d="m216 214 11 1 5 8-12-1z"/>',
                '    <g class="dragon-toes dragon-toes-near">',
                '      <path class="dragon-toe" d="m222 215q-2 4 2 8l10 2q4-2 0-6l-7-5"/>',
                '      <path class="dragon-toe" d="m230 214q-1 5 4 8l10 1q4-3-1-6l-8-4"/>',
                '      <path class="dragon-toe" d="m238 212q1 5 7 7l8-1q3-4-3-6l-8-3"/>',
                '      <path class="dragon-digit-crease" d="m229 220 5 1m8 0 5 1m3-6 5 1"/>',
                '      <circle class="dragon-digit-joint" cx="231" cy="219" r="1.6"/><circle class="dragon-digit-joint" cx="242" cy="218" r="1.6"/><circle class="dragon-digit-joint" cx="250" cy="215" r="1.6"/>',
                '      <path class="dragon-claw" d="m233 222q2 6 7 5 3-4 0-8m5 0q4 5 8 2 1-5-4-8m8-1q5 4 8 0-1-5-7-6"/>',
                '    </g>',
                '  </g>',
                '  <g class="dragon-front-arm-near dragon-limb">',
                '    <path class="dragon-limb-shadow dragon-arm-silhouette" d="M225 121q-12 2-16 12l-8 10-12 3q-8 3-9 11l-2 12 7 8 11-2 6-9 12-4q11-4 17-14l11-16z"/>',
                '    <path class="dragon-arm-upper" d="M223 125q-8 2-12 10l-7 10q-3 5 1 8l8 2q7-5 11-13l10-9z"/>',
                '    <path class="dragon-shoulder-plate" d="m222 122 10 2 5 8-8 8-10-4-3-7z"/>',
                '    <path class="dragon-arm-muscle" d="M215 131q-6 4-8 12l7-1 7-9z"/>',
                '    <path class="dragon-muscle-highlight" d="m215 132-6 10m11-4-6 9"/>',
                '    <circle class="dragon-joint dragon-elbow" cx="207" cy="146" r="6"/>',
                '    <path class="dragon-arm-fore" d="m205 146q-7 0-12 7l-7 11q-3 5 2 8l7-1 7-9 12-6q7-4 8-11l-7-5z"/>',
                '    <path class="dragon-joint-highlight" d="m204 143 5-1m-18 19 5-2"/>',
                '    <path class="dragon-wrist" d="m192 162-8 4-2 8 7 5 9-4 3-7z"/>',
                '    <path class="dragon-palm" d="m190 166q-7 1-8 7l4 7 9 1 6-7-3-7z"/>',
                '    <g class="dragon-fingers dragon-fingers-near">',
                '      <path class="dragon-finger" d="m187 178q-6 4-7 10 1 3 4 2l6-7 2-5"/>',
                '      <path class="dragon-finger" d="m192 180q-4 6-2 11 2 2 4 0l4-9-1-4"/>',
                '      <path class="dragon-finger" d="m197 177q-1 6 3 9 3 1 4-3l-1-7-3-3"/>',
                '      <path class="dragon-finger-thumb" d="m186 170q-7-2-10 2-1 3 3 5l8 1"/>',
                '      <path class="dragon-digit-crease" d="m182 185 4-2m8-1 4-1m5-2 3-2m-19-6 4 1"/>',
                '      <circle class="dragon-digit-joint" cx="185" cy="184" r="1.6"/><circle class="dragon-digit-joint" cx="195" cy="184" r="1.6"/><circle class="dragon-digit-joint" cx="202" cy="178" r="1.6"/>',
                '      <path class="dragon-claw" d="m180 188q-3 6 1 8 5-3 8-8m3 2q-1 6 3 7 4-4 5-9m5-1q2 4 5 3 3-5 0-9m-26-8q-7 2-9 5 3 4 9 3"/>',
                '    </g>',
                '  </g>',
                '  <path class="dragon-flight-flame" d="M349 101q16-8 4 2 16-1 3 5 12 7-4 5"/>',
                '</svg>'
            ].join('');
            chart.appendChild(dragonWrap);
            dragon = dragonWrap;
            dragon.style.setProperty('--dragon-size', animationSettings.dragonSizePx + 'px');

            function setDragonPosition(position) {
                dragonPosition = position;
                dragon.style.transform = 'translate3d(' + position.x + 'px, ' + position.y + 'px, 0) translate(-50%, -50%)';
            }

            function targetPosition(index) {
                var chartRect = chart.getBoundingClientRect();
                var itemRect = skillItems[index].item.getBoundingClientRect();
                var dragonWidth = dragon.getBoundingClientRect().width;
                var dragonHeight = dragon.getBoundingClientRect().height;
                skillItems[index].item.scrollIntoView({
                    block: 'nearest',
                    inline: 'nearest',
                    behavior: reduceMotion.matches ? 'auto' : 'smooth'
                });
                itemRect = skillItems[index].item.getBoundingClientRect();
                chartRect = chart.getBoundingClientRect();
                var targetLeft = itemRect.left - chartRect.left;
                var targetRight = itemRect.right - chartRect.left;
                var targetCenterY = itemRect.top + itemRect.height / 2 - chartRect.top;
                var targetCenterX = targetLeft + itemRect.width / 2;
                var isNarrowLayout = window.matchMedia('(max-width: 600px)').matches;
                var facingLeft = dragonPosition.x > targetCenterX;
                var x = isNarrowLayout ?
                    targetCenterX + (facingLeft ? dragonWidth * 0.49 : -dragonWidth * 0.49) :
                    (facingLeft ? targetRight + dragonWidth * 0.49 : targetLeft - dragonWidth * 0.49);
                x = Math.max(dragonWidth * 0.5, Math.min(chart.clientWidth - dragonWidth * 0.5, x));
                return {
                    x: x,
                    y: targetCenterY + dragonHeight * 0.04,
                    facingLeft: facingLeft
                };
            }

            function setDragonDirection(facingLeft) {
                dragon.style.setProperty('--dragon-direction', facingLeft ? '-1' : '1');
            }

            function setFlightBank(from, to) {
                var horizontalDistance = Math.max(Math.abs(to.x - from.x), dragon.offsetWidth * 0.35);
                var verticalAngle = Math.atan2(to.y - from.y, horizontalDistance) * 180 / Math.PI;
                var facingMultiplier = to.facingLeft ? -1 : 1;
                var bank = Math.max(-8, Math.min(8, verticalAngle * 0.45 * facingMultiplier));
                dragon.style.setProperty('--flight-bank', bank.toFixed(2) + 'deg');
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
                var mouthX = dragonRect.left + dragonRect.width * (dragon.classList.contains('is-facing-left') ? 0.02 : 0.98);
                var mouthY = dragonRect.top + dragonRect.height * 0.47;
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
                dragon.classList.remove('is-eating', 'is-facing-left', 'is-traveling', 'is-turning', 'is-approaching');
                dragon.style.removeProperty('--flight-bank');
                chart.classList.remove('is-paused');
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
                    var progress = Math.min(phaseElapsed / animationSettings.travelDurationMs, 1);
                    var eased = progress * progress * (3 - 2 * progress);
                    setDragonPosition({
                        x: routeFrom.x + (routeTo.x - routeFrom.x) * eased,
                        y: routeFrom.y + (routeTo.y - routeFrom.y) * eased
                    });
                    if (progress === 1) {
                        routePhase = 'eat';
                        phaseElapsed = 0;
                        dragon.classList.remove('is-traveling', 'is-turning');
                        dragon.classList.add('is-approaching');
                        setBiteTarget(routeIndex);
                        skillItems[routeIndex].item.classList.add('is-being-eaten');
                        dragon.classList.add('is-eating');
                        createFlameBurst(routeIndex);
                        status.textContent = 'Dragon is eating ' + academicSkills[routeIndex];
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
                        dragon.classList.add('is-approaching');
                        routePhase = 'pause';
                        phaseElapsed = 0;
                    }
                } else if (routePhase === 'pause') {
                    phaseElapsed += delta;
                    if (phaseElapsed >= animationSettings.pauseDurationMs) {
                        routeIndex += 1;
                        if (routeIndex >= skillItems.length) {
                            dragonFrame = 0;
                            chart.classList.remove('is-animating', 'is-paused');
                            pauseButton.disabled = true;
                            status.textContent = 'Feast complete — the dragon ate every skill box.';
                            return;
                        }
                        routePhase = 'travel';
                        phaseElapsed = 0;
                        routeFrom = dragonPosition;
                        routeTo = targetPosition(routeIndex);
                        var wasFacingLeft = dragon.classList.contains('is-facing-left');
                        dragon.classList.toggle('is-facing-left', routeTo.facingLeft);
                        setDragonDirection(routeTo.facingLeft);
                        setFlightBank(routeFrom, routeTo);
                        dragon.classList.remove('is-approaching');
                        dragon.classList.add('is-traveling');
                        dragon.classList.toggle('is-turning', wasFacingLeft !== routeTo.facingLeft);
                        status.textContent = 'Dragon approaching ' + academicSkills[routeIndex];
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
                if (reduceMotion.matches || !skillItems.length) {
                    chart.classList.remove('is-animating');
                    chart.classList.add('is-static');
                    dragon.hidden = true;
                    return;
                }
                dragon.hidden = false;
                chart.classList.remove('is-static');
                animationPaused = false;
                pauseButton.disabled = false;
                pauseButton.textContent = 'Pause dragon';
                pauseButton.setAttribute('aria-pressed', 'false');
                routeIndex = 0;
                routePhase = 'travel';
                phaseElapsed = 0;
                lastFrameTime = 0;
                if (replay) {
                    chart.classList.remove('is-animating');
                    void chart.offsetWidth;
                }
                chart.classList.add('is-animating');
                routeFrom = {
                    x: chart.clientWidth / 2,
                    y: Math.max(24, dragon.offsetHeight * 0.43)
                };
                setDragonPosition(routeFrom);
                routeTo = targetPosition(routeIndex);
                dragon.classList.toggle('is-facing-left', routeTo.facingLeft);
                setDragonDirection(routeTo.facingLeft);
                setFlightBank(routeFrom, routeTo);
                dragon.classList.add('is-traveling');
                status.textContent = 'Dragon approaching ' + academicSkills[routeIndex];
                dragonFrame = window.requestAnimationFrame(animateDragon);
            }

            function repositionDragonForResize() {
                if (!dialog.open || routePhase !== 'travel' || animationPaused || reduceMotion.matches || !dragonFrame) {
                    return;
                }
                routeFrom = dragonPosition;
                routeTo = targetPosition(routeIndex);
                setFlightBank(routeFrom, routeTo);
                dragon.classList.toggle('is-facing-left', routeTo.facingLeft);
                setDragonDirection(routeTo.facingLeft);
                phaseElapsed = 0;
                lastFrameTime = 0;
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
