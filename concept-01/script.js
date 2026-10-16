/* ============================================
   CONCEPT 01 — ПРОМТЕХ
   Скрипты: мобильное меню, валидация формы, плавная прокрутка
   ============================================ */

(function () {
    'use strict';

    // --- Мобильное меню ---
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', function () {
            const isOpen = mobileMenu.classList.toggle('active');
            burger.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Закрытие при клике на ссылку
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Маска телефона (простая заглушка) ---
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                let formatted = '+7';
                if (value.length > 0) formatted += ' (' + value.substring(0, 3);
                if (value.length >= 3) formatted += ') ' + value.substring(3, 6);
                if (value.length >= 6) formatted += '-' + value.substring(6, 8);
                if (value.length >= 8) formatted += '-' + value.substring(8, 10);
                e.target.value = formatted;
            }
        });
    }

    // --- Валидация формы ---
    const form = document.getElementById('repairForm');
    const formSuccess = document.querySelector('.form-success');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;

            // Очистка ошибок
            form.querySelectorAll('.form__error').forEach(function (el) {
                el.textContent = '';
            });
            form.querySelectorAll('input').forEach(function (el) {
                el.classList.remove('error');
            });

            // Проверка имени
            const nameInput = document.getElementById('name');
            if (nameInput && !nameInput.value.trim()) {
                showError(nameInput, 'Укажите ваше имя');
                isValid = false;
            }

            // Проверка телефона
            const phoneInput = document.getElementById('phone');
            if (phoneInput) {
                const digits = phoneInput.value.replace(/\D/g, '');
                if (digits.length < 11) {
                    showError(phoneInput, 'Введите корректный номер телефона');
                    isValid = false;
                }
            }

            if (isValid) {
                // Демо: показываем сообщение об успехе
                form.style.display = 'none';
                document.querySelector('.form-title').style.display = 'none';
                document.querySelector('.form-subtitle').style.display = 'none';
                if (formSuccess) {
                    formSuccess.hidden = false;
                }
            }
        });

        // Убираем ошибку при вводе
        form.querySelectorAll('input').forEach(function (input) {
            input.addEventListener('input', function () {
                input.classList.remove('error');
                const errorEl = input.closest('.form__field').querySelector('.form__error');
                if (errorEl) errorEl.textContent = '';
            });
        });
    }

    function showError(input, message) {
        input.classList.add('error');
        const errorEl = input.closest('.form__field').querySelector('.form__error');
        if (errorEl) errorEl.textContent = message;
    }

    // --- Плавная прокрутка для якорных ссылок ---
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Подсветка активного пункта навигации при скролле ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');

    function highlightNav() {
        const scrollPos = window.pageYOffset + 150;
        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + id) {
                        link.style.color = 'var(--color-accent)';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
})();
