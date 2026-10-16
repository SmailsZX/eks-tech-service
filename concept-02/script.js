/* ============================================
   CONCEPT-02 — СЕРВИСПРО
   ============================================ */
(function () {
    'use strict';
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (burger && mobileMenu) {
        burger.addEventListener('click', function () {
            const isOpen = mobileMenu.classList.toggle('active');
            burger.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') { value = value.substring(1); }
                let formatted = '+7';
                if (value.length > 0) formatted += ' (' + value.substring(0, 3);
                if (value.length >= 3) formatted += ') ' + value.substring(3, 6);
                if (value.length >= 6) formatted += '-' + value.substring(6, 8);
                if (value.length >= 8) formatted += '-' + value.substring(8, 10);
                e.target.value = formatted;
            }
        });
    }
    const form = document.getElementById('repairForm');
    const formSuccess = document.getElementById('formSuccess');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;
            form.querySelectorAll('.form__error').forEach(function (el) { el.textContent = ''; });
            form.querySelectorAll('input').forEach(function (el) { el.classList.remove('error'); });
            const nameInput = document.getElementById('name');
            if (nameInput && !nameInput.value.trim()) { showError(nameInput, 'Укажите ваше имя'); isValid = false; }
            const phoneInput = document.getElementById('phone');
            if (phoneInput) {
                const digits = phoneInput.value.replace(/\D/g, '');
                if (digits.length < 11) { showError(phoneInput, 'Введите корректный номер'); isValid = false; }
            }
            if (isValid) {
                form.style.display = 'none';
                if (formSuccess) formSuccess.classList.add('visible');
            }
        });
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
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
})();