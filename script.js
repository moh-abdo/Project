// تهيئة AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// تأثير شريط التنقل عند التمرير
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// تفعيل/إلغاء تفعيل القائمة المحمولة
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// تحريك العدادات (Counter Animation)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (target === 4.8) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.ceil(current);
                }
                setTimeout(updateCounter, 20);
            } else {
                if (target === 4.8) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = target;
                }
            }
        };
        
        updateCounter();
    });
}

// تشغيل العدادات عند الوصول إلى القسم
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// مراقبة قسم الإحصائيات
const statsSection = document.querySelector('.stats-container');
if (statsSection) {
    observer.observe(statsSection);
}

// وظيفة البحث
function searchServices() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        alert('يرجى إدخال كلمة البحث');
        return;
    }
    
    // البحث في الخدمات
    const serviceCards = document.querySelectorAll('.service-card');
    let found = false;
    
    serviceCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 20px 40px rgba(30, 60, 114, 0.3)';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 2000);
            
            found = true;
            return;
        }
    });
    
    if (!found) {
        alert('لم يتم العثور على خدمة تطابق البحث');
    }
}

// البحث بالاقتراحات
function searchFor(term) {
    document.getElementById('searchInput').value = term;
    searchServices();
}

// تفعيل البحث بالضغط على Enter
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchServices();
    }
});

// وظيفة طلب الخدمة
function orderService(serviceType) {
    const serviceNames = {
        'projects': 'المشاريع والتكاليف',
        'assignments': 'الواجبات الجامعية',
        'labs': 'حل اللابات',
        'mindmaps': 'الخرائط الذهنية',
        'cv': 'السير الذاتية',
        'training_reports': 'تقارير التدريب',
        'graduation_research': 'بحوث التخرج',
        'academic_research': 'البحوث الأكاديمية'
    };
    
    const serviceName = serviceNames[serviceType] || 'خدمة غير محددة';
    const message = `السلام عليكم، أريد طلب خدمة: ${serviceName}`;
    const whatsappUrl = `https://wa.me/966549225740?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// وظيفة عرض تفاصيل الخدمة
function showServiceDetails(serviceType) {
    const serviceDetails = {
        'projects': {
            title: 'المشاريع والتكاليف',
            description: 'نقدم خدمة شاملة لإعداد وكتابة جميع أنواع المشاريع الجامعية والتكاليف لكافة التخصصات.',
            features: [
                'مشاريع التخرج الكاملة',
                'التكاليف الأسبوعية والشهرية',
                'البحوث والدراسات',
                'العروض التقديمية',
                'التحليل والتقييم'
            ],
            price: 'من 80 ريال',
            duration: '3-7 أيام'
        },
        'assignments': {
            title: 'الواجبات الجامعية',
            description: 'حل شامل لجميع أنواع الواجبات الجامعية مع شرح مفصل وضمان الجودة.',
            features: [
                'حل الواجبات النظرية',
                'الواجبات العملية',
                'الأسئلة والتمارين',
                'شرح مفصل للحلول',
                'مراجعة وتدقيق'
            ],
            price: 'من 30 ريال',
            duration: '1-3 أيام'
        },
        'labs': {
            title: 'حل اللابات',
            description: 'حل المختبرات العملية والتطبيقية لجميع التخصصات مع التقارير المطلوبة.',
            features: [
                'لابات البرمجة',
                'لابات الشبكات',
                'لابات قواعد البيانات',
                'التقارير المعملية',
                'الكود والتوثيق'
            ],
            price: 'من 50 ريال',
            duration: '2-4 أيام'
        },
        'mindmaps': {
            title: 'الخرائط الذهنية',
            description: 'تصميم خرائط ذهنية احترافية ومنظمة لتسهيل فهم وحفظ المعلومات.',
            features: [
                'تصميم احترافي',
                'ألوان وأشكال جذابة',
                'تنظيم المعلومات',
                'سهولة الفهم والحفظ',
                'تنسيقات متعددة'
            ],
            price: 'من 40 ريال',
            duration: '1-2 يوم'
        },
        'cv': {
            title: 'السير الذاتية',
            description: 'إعداد وتصميم سير ذاتية احترافية تساعدك في الحصول على الوظيفة المناسبة.',
            features: [
                'تصميم احترافي',
                'محتوى مميز',
                'تنسيق جذاب',
                'مراجعة لغوية',
                'نصائح للتطوير'
            ],
            price: 'من 50 ريال',
            duration: '1-2 يوم'
        },
        'training_reports': {
            title: 'تقارير التدريب',
            description: 'كتابة وإعداد تقارير التدريب العملي والميداني بشكل احترافي ومفصل.',
            features: [
                'تقارير التدريب التعاوني',
                'تقارير التدريب الميداني',
                'التحليل والتقييم',
                'التوصيات والمقترحات',
                'التنسيق الأكاديمي'
            ],
            price: 'من 70 ريال',
            duration: '3-5 أيام'
        },
        'graduation_research': {
            title: 'بحوث التخرج',
            description: 'مساعدة شاملة في إعداد وكتابة بحوث ومشاريع التخرج لجميع التخصصات.',
            features: [
                'اختيار الموضوع',
                'الإطار النظري',
                'الدراسة التطبيقية',
                'التحليل الإحصائي',
                'النتائج والتوصيات'
            ],
            price: 'من 100 ريال',
            duration: '7-14 يوم'
        },
        'academic_research': {
            title: 'البحوث الأكاديمية',
            description: 'إعداد وكتابة البحوث الأكاديمية المتخصصة وفقاً للمعايير العلمية.',
            features: [
                'البحوث العلمية',
                'الدراسات النظرية',
                'مراجعة الأدبيات',
                'المنهجية العلمية',
                'التوثيق الأكاديمي'
            ],
            price: 'من 90 ريال',
            duration: '5-10 أيام'
        }
    };
    
    const service = serviceDetails[serviceType];
    if (!service) return;
    
    const modalContent = `
        <h2 style="color: var(--primary-color); margin-bottom: 1rem;">${service.title}</h2>
        <p style="margin-bottom: 1.5rem; line-height: 1.6;">${service.description}</p>
        
        <h3 style="color: var(--primary-color); margin-bottom: 1rem;">المميزات:</h3>
        <ul style="margin-bottom: 1.5rem; padding-right: 1rem;">
            ${service.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
        </ul>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <div style="background: var(--light-bg); padding: 1rem; border-radius: 10px; flex: 1; min-width: 150px;">
                <strong>السعر:</strong> ${service.price}
            </div>
            <div style="background: var(--light-bg); padding: 1rem; border-radius: 10px; flex: 1; min-width: 150px;">
                <strong>مدة التسليم:</strong> ${service.duration}
            </div>
        </div>
        
        <div style="text-align: center;">
            <button onclick="orderService('${serviceType}')" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; border: none; padding: 15px 30px; border-radius: 25px; cursor: pointer; font-weight: 600; margin-left: 1rem;">
                <i class="fas fa-shopping-cart"></i> اطلب الآن
            </button>
            <button onclick="closeModal()" style="background: transparent; color: var(--primary-color); border: 2px solid var(--primary-color); padding: 15px 30px; border-radius: 25px; cursor: pointer; font-weight: 600;">
                إغلاق
            </button>
        </div>
    `;
    
    document.getElementById('modalContent').innerHTML = modalContent;
    document.getElementById('serviceModal').style.display = 'block';
}

// إغلاق النافذة المنبثقة
function closeModal() {
    document.getElementById('serviceModal').style.display = 'none';
}

// إغلاق النافذة عند النقر خارجها
window.onclick = function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// وظيفة عرض خدمات الكلية
function showCollegeServices(collegeType) {
    const collegeServices = {
        'business': [
            'مشاريع إدارة الأعمال',
            'تحليل مالي ومحاسبي',
            'خطط التسويق',
            'دراسات الجدوى',
            'تقارير الموارد البشرية'
        ],
        'computer': [
            'مشاريع البرمجة',
            'تطبيقات الويب والموبايل',
            'قواعد البيانات',
            'أمن المعلومات',
            'الشبكات والأنظمة'
        ],
        'others': [
            'البحوث الهندسية',
            'الدراسات الطبية',
            'البحوث العلمية',
            'الدراسات الأدبية',
            'البحوث التربوية'
        ]
    };
    
    const services = collegeServices[collegeType] || [];
    const servicesList = services.map(service => `<li>${service}</li>`).join('');
    
    const modalContent = `
        <h2 style="color: var(--primary-color); margin-bottom: 1rem;">خدمات ${collegeType === 'business' ? 'كلية الأعمال' : collegeType === 'computer' ? 'كلية الحاسوب' : 'الكليات الأخرى'}</h2>
        <p style="margin-bottom: 1.5rem;">نقدم خدمات متخصصة لهذه الكلية تشمل:</p>
        <ul style="margin-bottom: 2rem; padding-right: 1rem;">
            ${servicesList}
        </ul>
        <div style="text-align: center;">
            <button onclick="openWhatsApp()" style="background: linear-gradient(135deg, var(--accent-color), #128c7e); color: white; border: none; padding: 15px 30px; border-radius: 25px; cursor: pointer; font-weight: 600; margin-left: 1rem;">
                <i class="fab fa-whatsapp"></i> تواصل معنا
            </button>
            <button onclick="closeModal()" style="background: transparent; color: var(--primary-color); border: 2px solid var(--primary-color); padding: 15px 30px; border-radius: 25px; cursor: pointer; font-weight: 600;">
                إغلاق
            </button>
        </div>
    `;
    
    document.getElementById('modalContent').innerHTML = modalContent;
    document.getElementById('serviceModal').style.display = 'block';
}

// فلترة أعمالنا
function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // إزالة الفئة النشطة من جميع الأزرار
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // إضافة الفئة النشطة للزر المحدد
    event.target.classList.add('active');
    
    // إظهار/إخفاء العناصر
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            item.style.display = 'none';
        }
    });
}

// عرض المشروع
function viewProject(projectId) {
    const projectDetails = {
        'business-plan': {
            title: 'خطة عمل مقهى',
            description: 'خطة عمل شاملة لمشروع مقهى تتضمن دراسة السوق والتحليل المالي',
            category: 'مشروع تخرج - إدارة أعمال'
        },
        'library-app': {
            title: 'تطبيق إدارة مكتبة',
            description: 'تطبيق Java لإدارة المكتبات مع واجهة مستخدم تفاعلية',
            category: 'مشروع برمجة - Java'
        },
        'financial-analysis': {
            title: 'تحليل مالي شركة',
            description: 'تحليل مالي شامل لشركة مع التوصيات والمقترحات',
            category: 'تكليف محاسبة'
        },
        'restaurant-website': {
            title: 'موقع ويب مطعم',
            description: 'موقع ويب متجاوب لمطعم مع نظام حجز الطاولات',
            category: 'مشروع تصميم ويب'
        },
        'marketing-plan': {
            title: 'خطة تسويقية منتج',
            description: 'خطة تسويقية شاملة لإطلاق منتج جديد في السوق',
            category: 'مشروع تسويق'
        },
        'scientific-research': {
            title: 'بحث علمي متخصص',
            description: 'بحث علمي في مجال الهندسة مع دراسة تطبيقية',
            category: 'مشروع تخرج - هندسة'
        }
    };
    
    const project = projectDetails[projectId];
    if (!project) return;
    
    const modalContent = `
        <h2 style="color: var(--primary-color); margin-bottom: 1rem;">${project.title}</h2>
        <p style="color: #666; margin-bottom: 1rem; font-style: italic;">${project.category}</p>
        <p style="margin-bottom: 2rem; line-height: 1.6;">${project.description}</p>
        
        <div style="background: var(--light-bg); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
            <h4 style="color: var(--primary-color); margin-bottom: 1rem;">للحصول على مشروع مماثل:</h4>
            <p style="margin-bottom: 1rem;">تواصل معنا عبر الواتساب وسنقوم بإعداد مشروع مماثل خصيصاً لك</p>
        </div>
        
        <div style="text-align: center;">
            <button onclick="orderService('projects')" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; border: none; padding: 15px 30px; border-radius: 25px; cursor: pointer; font-weight: 600; margin-left: 1rem;">
                <i class="fas fa-shopping-cart"></i> اطلب مشروع مماثل
            </button>
            <button onclick="closeModal()" style="background: transparent; color: var(--primary-color); border: 2px solid var(--primary-color); padding: 15px 30px; border-radius: 25px; cursor: pointer; font-weight: 600;">
                إغلاق
            </button>
        </div>
    `;
    
    document.getElementById('modalContent').innerHTML = modalContent;
    document.getElementById('serviceModal').style.display = 'block';
}

// فتح الواتساب
function openWhatsApp() {
    const message = 'السلام عليكم، أريد الاستفسار عن خدماتكم';
    const whatsappUrl = `https://wa.me/966549225740?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// معالجة نموذج الاتصال
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const specialty = contactForm.querySelectorAll('input[type="text"]')[1].value;
            const service = contactForm.querySelector('select').value;
            const details = contactForm.querySelector('textarea').value;
            
            const message = `السلام عليكم، اسمي ${name}
تخصصي: ${specialty}
نوع الخدمة: ${service}
تفاصيل الطلب: ${details}`;
            
            const whatsappUrl = `https://wa.me/966549225740?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // إعادة تعيين النموذج
            contactForm.reset();
            
            // إظهار رسالة نجاح
            alert('تم إرسال استفسارك بنجاح! سيتم التواصل معك قريباً.');
        });
    }
});

// تأثيرات إضافية للتفاعل
document.addEventListener('DOMContentLoaded', function() {
    // تأثير المؤشر المخصص للأزرار
    const buttons = document.querySelectorAll('button, .btn, .service-btn, .college-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
    
    // تأثير التمرير السلس للروابط الداخلية
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // مراعاة ارتفاع شريط التنقل
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تأثير الكتابة التدريجية للعنوان الرئيسي
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// تحسين الأداء - تحميل الصور بشكل تدريجي
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// إضافة تأثيرات صوتية (اختيارية)
function playClickSound() {
    // يمكن إضافة ملف صوتي للنقرات
    // const audio = new Audio('click-sound.mp3');
    // audio.play();
}

// تتبع التفاعل مع الصفحة (Analytics)
function trackEvent(eventName, eventData) {
    // يمكن إضافة كود تتبع Google Analytics هنا
    console.log(`Event: ${eventName}`, eventData);
}

// تحسين تجربة المستخدم - حفظ تفضيلات المستخدم
function saveUserPreference(key, value) {
    localStorage.setItem(key, value);
}

function getUserPreference(key) {
    return localStorage.getItem(key);
}

// تطبيق الوضع الليلي (اختياري)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    saveUserPreference('darkMode', isDarkMode);
}

// تحميل تفضيلات المستخدم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const darkMode = getUserPreference('darkMode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
});

