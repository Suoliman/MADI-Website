/**
 * Madi Platform - Main JavaScript
 * منصة مادي لحلول التجارة الإلكترونية
 */

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initMobileMenu();
    initAccordion();
    initSmoothScrolling();
    initAnimations();
    initContactForm();
    removeLovableBadge();
});

/**
 * Initialize Navigation
 */
function initNavigation() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize Mobile Menu
 */
function initMobileMenu() {
    const menuButton = document.querySelector('[aria-label="Toggle menu"]');
    const nav = document.querySelector('nav.hidden');

    if (menuButton && nav) {
        let isOpen = false;

        menuButton.addEventListener('click', function () {
            isOpen = !isOpen;

            if (isOpen) {
                // Create mobile menu overlay
                const overlay = document.createElement('div');
                overlay.id = 'mobile-menu-overlay';
                overlay.className = 'fixed inset-0 z-40 bg-black/50 lg:hidden';
                overlay.addEventListener('click', closeMobileMenu);
                document.body.appendChild(overlay);

                // Create mobile menu
                const mobileNav = document.createElement('div');
                mobileNav.id = 'mobile-menu';
                mobileNav.className = 'fixed top-0 left-0 z-50 h-full w-72 bg-card shadow-2xl transform transition-transform duration-300 lg:hidden';
                mobileNav.innerHTML = `
                    <div class="p-6 space-y-4">
                        <div class="flex items-center justify-between mb-8">
                            <div class="flex items-center gap-2">
<img src="./images/logo.png" alt="منصة مادي" class="w-10 h-10 rounded-lg object-contain">
                                <span class="font-bold text-lg">منصة مادي</span>
                            </div>
                            <button id="close-mobile-menu" class="p-2" aria-label="Close menu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="18" x2="6" y1="6" y2="18"></line>
                                    <line x1="6" x2="18" y1="6" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <nav class="space-y-4">
                            <a href="#home" class="block py-2 text-foreground hover:text-primary transition-colors font-medium">الرئيسية</a>
                            <a href="#features" class="block py-2 text-foreground hover:text-primary transition-colors font-medium">المميزات</a>
                            <a href="#how-it-works" class="block py-2 text-foreground hover:text-primary transition-colors font-medium">كيف يعمل</a>
                            <a href="#pricing" class="block py-2 text-foreground hover:text-primary transition-colors font-medium">الأسعار</a>
                            <a href="#faq" class="block py-2 text-foreground hover:text-primary transition-colors font-medium">الأسئلة الشائعة</a>
                            <a href="#contact" class="block py-2 text-foreground hover:text-primary transition-colors font-medium">تواصل معنا</a>
                        </nav>
                        <button class="w-full mt-6 py-3 px-6 gradient-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                            ابدأ تجربتك المجانية
                        </button>
                    </div>
                `;
                document.body.appendChild(mobileNav);

                // Close button handler
                document.getElementById('close-mobile-menu').addEventListener('click', closeMobileMenu);

                // Close on link click
                mobileNav.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', closeMobileMenu);
                });

                // Prevent body scroll
                document.body.style.overflow = 'hidden';
            }
        });
    }

    function closeMobileMenu() {
        const overlay = document.getElementById('mobile-menu-overlay');
        const mobileNav = document.getElementById('mobile-menu');

        if (overlay) overlay.remove();
        if (mobileNav) mobileNav.remove();

        document.body.style.overflow = '';
    }
}

/**
 * Initialize Accordion (FAQ Section)
 */
function initAccordion() {
    const accordionButtons = document.querySelectorAll('[data-state="closed"] button');

    const faqData = [
        {
            question: 'كيف يمكنني ربط جدول Google Sheets؟',
            answer: 'يمكنك ربط جدول Google Sheets الخاص بك بسهولة من خلال لوحة التحكم. ما عليك سوى النقر على "ربط جدول جديد" ومشاركة رابط الجدول معنا. سيتم استيراد البيانات تلقائياً خلال دقائق.'
        },
        {
            question: 'هل هناك فترة تجريبية مجانية؟',
            answer: 'نعم! نقدم تجربة مجانية لمدة 7 أيام كاملة بدون الحاجة لإدخال بيانات بطاقة ائتمان. يمكنك استخدام جميع مميزات الباقة الاحترافية خلال فترة التجربة.'
        },
        {
            question: 'ما هي مراحل الطلبات الثلاث؟',
            answer: 'نظامنا ينظم طلباتك إلى 3 مراحل: "غير مؤكد" للطلبات الجديدة التي تحتاج تأكيد، "قيد التسليم" للطلبات المرسلة مع شركة الشحن، و"تم التسليم" للطلبات المكتملة بنجاح.'
        },
        {
            question: 'هل يمكنني إلغاء اشتراكي في أي وقت؟',
            answer: 'بالطبع! يمكنك إلغاء اشتراكك في أي وقت من لوحة التحكم. لا توجد عقود طويلة الأمد ولا رسوم إلغاء. ستستمر في استخدام الخدمة حتى نهاية فترة الفوترة الحالية.'
        },
        {
            question: 'هل بياناتي آمنة؟',
            answer: 'أمان بياناتك أولويتنا القصوى. نستخدم تشفير SSL/TLS لجميع الاتصالات ونحتفظ بنسخ احتياطية يومية. بياناتك محمية ولا يتم مشاركتها مع أي طرف ثالث.'
        },
        {
            question: 'كيف يمكنني التواصل مع الدعم الفني؟',
            answer: 'يمكنك التواصل معنا عبر الواتساب للحصول على رد فوري، أو من خلال البريد الإلكتروني info@madi-platform.ly. فريق الدعم متاح من الأحد إلى الخميس من 9 صباحاً حتى 6 مساءً.'
        }
    ];

    accordionButtons.forEach((button, index) => {
        if (faqData[index]) {
            button.addEventListener('click', function () {
                const parent = this.closest('[data-state]');
                const contentDiv = parent.querySelector('[role="region"]');
                const isOpen = parent.getAttribute('data-state') === 'open';

                // Close all other accordions
                document.querySelectorAll('[data-orientation="vertical"][data-state="open"]').forEach(item => {
                    if (item !== parent) {
                        item.setAttribute('data-state', 'closed');
                        const content = item.querySelector('[role="region"]');
                        if (content) {
                            content.setAttribute('hidden', '');
                            content.innerHTML = '';
                        }
                        item.querySelector('button').setAttribute('data-state', 'closed');
                        item.querySelector('button').setAttribute('aria-expanded', 'false');
                    }
                });

                if (isOpen) {
                    parent.setAttribute('data-state', 'closed');
                    this.setAttribute('data-state', 'closed');
                    this.setAttribute('aria-expanded', 'false');
                    if (contentDiv) {
                        contentDiv.setAttribute('hidden', '');
                        contentDiv.innerHTML = '';
                    }
                } else {
                    parent.setAttribute('data-state', 'open');
                    this.setAttribute('data-state', 'open');
                    this.setAttribute('aria-expanded', 'true');
                    if (contentDiv) {
                        contentDiv.removeAttribute('hidden');
                        contentDiv.innerHTML = `<div class="pb-6 text-muted-foreground leading-relaxed">${faqData[index].answer}</div>`;
                    }
                }
            });
        }
    });
}

/**
 * Initialize Smooth Scrolling
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize Scroll Animations
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.group.bg-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

/**
 * Initialize Contact Form
 */
function initContactForm() {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = this.querySelector('#name').value;
            const phone = this.querySelector('#phone').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;

            // Validate form
            if (!name || !phone || !email || !message) {
                showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }

            // Show success message
            showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');

            // Reset form
            this.reset();
        });
    }

    // WhatsApp button
    const whatsappButtons = document.querySelectorAll('button:not([type="submit"])');
    whatsappButtons.forEach(button => {
        if (button.textContent.includes('واتساب')) {
            button.addEventListener('click', function () {
                const phone = '+218910000000'; // Replace with actual phone number
                const message = encodeURIComponent('مرحباً، أود الاستفسار عن منصة مادي');
                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
            });
        }
    });
}

/**
 * Show Toast Notification
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-y-10 opacity-0`;

    if (type === 'success') {
        toast.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        toast.classList.add('bg-destructive', 'text-destructive-foreground');
    } else {
        toast.classList.add('bg-primary', 'text-primary-foreground');
    }

    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });

    // Remove after 4 seconds
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/**
 * Remove Lovable Badge
 */
function removeLovableBadge() {
    const badge = document.getElementById('lovable-badge');
    if (badge) {
        badge.remove();
    }
}

/**
 * CTA Button Handlers
 */
document.addEventListener('click', function (e) {
    const target = e.target.closest('button');

    if (target && target.textContent.includes('ابدأ')) {
        e.preventDefault();
        showToast('سيتم توجيهك إلى صفحة التسجيل قريباً!', 'info');
    }

    if (target && target.textContent.includes('شاهد الفيديو')) {
        e.preventDefault();
        // Open video modal or redirect to video
        showToast('الفيديو التوضيحي قادم قريباً!', 'info');
    }
});
