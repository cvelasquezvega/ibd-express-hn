// ==================== CONSTANTS ====================
const MAIN_PRICE = 29.90;
const SOFT_COVER_MULTIPLIER = 1;
const HARD_COVER_MULTIPLIER = 1.4;

// ==================== STATE ====================
let state = {
    qty: 1,
    format: 'soft'
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    initHeader();
    initTabs();
    initQuantity();
    initFormatSelector();
    initStickyCart();
    initBundle();
    initFAQ();
    initMobileMenu();
}

// ==================== HEADER & MEGA MENU ====================
function initHeader() {
    const categoriesBtn = document.getElementById('categories-btn');
    const megaMenu = document.getElementById('mega-menu');

    if (categoriesBtn && megaMenu) {
        categoriesBtn.addEventListener('mouseenter', () => {
            megaMenu.classList.remove('hidden');
        });

        megaMenu.addEventListener('mouseleave', () => {
            megaMenu.classList.add('hidden');
        });
    }
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// ==================== TABS ====================
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Hide all tabs
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Remove active from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Show selected tab
            const selectedContent = document.getElementById(`tab-${tabName}`);
            if (selectedContent) {
                selectedContent.classList.add('active');
            }

            // Add active to clicked button
            button.classList.add('active');
        });
    });

    // Set initial active tab
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
        if (tabContents.length > 0) {
            tabContents[0].classList.add('active');
        }
    }
}

// ==================== QUANTITY & PRICING ====================
function initQuantity() {
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');

    if (qtyMinus) {
        qtyMinus.addEventListener('click', () => {
            if (state.qty > 1) {
                state.qty--;
                updateQtyDisplay();
                updatePrices();
            }
        });
    }

    if (qtyPlus) {
        qtyPlus.addEventListener('click', () => {
            state.qty++;
            updateQtyDisplay();
            updatePrices();
        });
    }
}

function updateQtyDisplay() {
    const qtyDisplay = document.getElementById('qty-display');
    if (qtyDisplay) {
        qtyDisplay.textContent = state.qty;
    }
}

function updatePrices() {
    const price = getUnitPrice();
    const subtotal = (price * state.qty).toFixed(2);

    // Update add to cart button
    const addCartText = document.getElementById('add-cart-text');
    if (addCartText) {
        addCartText.textContent = `Añadir — ${subtotal} €`;
    }

    // Update sticky cart
    const stickyPrice = document.getElementById('sticky-price');
    const stickyPriceLarge = document.getElementById('sticky-price-large');
    if (stickyPrice) stickyPrice.textContent = `${subtotal} €`;
    if (stickyPriceLarge) stickyPriceLarge.textContent = `${subtotal} €`;
}

function getUnitPrice() {
    if (state.format === 'hard') {
        return MAIN_PRICE * HARD_COVER_MULTIPLIER;
    }
    return MAIN_PRICE;
}

// ==================== FORMAT SELECTOR ====================
function initFormatSelector() {
    const formatButtons = document.querySelectorAll('.format-btn');

    formatButtons.forEach(button => {
        button.addEventListener('click', () => {
            const format = button.getAttribute('data-format');
            state.format = format;

            // Update UI
            formatButtons.forEach(btn => {
                btn.classList.remove('active', 'border-coral', 'bg-coral-soft/50', 'text-ink');
                btn.classList.add('border-border', 'hover:border-foreground');
            });

            // Add active to selected
            button.classList.remove('border-border', 'hover:border-foreground');
            button.classList.add('active', 'border-coral', 'bg-coral-soft/50', 'text-ink');

            // Update sticky cart format
            const stickyFormat = document.getElementById('sticky-format');
            if (stickyFormat) {
                stickyFormat.textContent = format === 'hard' ? 'Tapa dura' : 'Tapa blanda';
            }

            // Update prices
            updatePrices();
        });
    });
}

// ==================== STICKY CART ====================
function initStickyCart() {
    const stickyCart = document.getElementById('sticky-cart');
    const stickySpacing = document.getElementById('sticky-spacer');

    if (stickyCart && stickySpacing) {
        let lastY = window.scrollY;
        let ticking = false;
        const threshold = 900;

        const update = () => {
            const y = window.scrollY;
            const goingDown = y > lastY + 4;
            const goingUp = y < lastY - 4;
            const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 220;

            if (y < threshold || nearBottom) {
                stickyCart.classList.remove('active');
                stickySpacing.style.height = '0';
            } else if (goingDown) {
                stickyCart.classList.add('active');
                stickySpacing.style.height = window.innerWidth < 640 ? '5rem' : '4rem';
            } else if (goingUp) {
                stickyCart.classList.remove('active');
                stickySpacing.style.height = '0';
            }

            lastY = y;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }
}

// ==================== BUNDLE ====================
function initBundle() {
    const bundleCheckboxes = document.querySelectorAll('.bundle-checkbox');

    bundleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBundleTotal);
    });

    updateBundleTotal();
}

function updateBundleTotal() {
    const checkboxes = document.querySelectorAll('.bundle-checkbox');
    const mainPrice = getUnitPrice();
    let bundleTotal = mainPrice;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const price = parseFloat(checkbox.getAttribute('data-price'));
            bundleTotal += price;
        }
    });

    const bundleSaving = (bundleTotal * 0.1).toFixed(2);
    const bundleFinal = (bundleTotal - bundleSaving).toFixed(2);

    // Update UI
    const bundleTotalEl = document.getElementById('bundle-total');
    const bundleOriginal = document.getElementById('bundle-original');
    const bundleSavings = document.getElementById('bundle-savings');

    if (bundleTotalEl) bundleTotalEl.textContent = `${bundleFinal} €`;
    if (bundleOriginal) bundleOriginal.textContent = `${bundleTotal.toFixed(2)} €`;
    if (bundleSavings) bundleSavings.textContent = `Ahorras ${bundleSaving} €`;
}

// ==================== FAQ ====================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item, index) => {
        if (index === 0) {
            item.setAttribute('open', '');
        }

        item.addEventListener('toggle', (e) => {
            if (e.target.open) {
                faqItems.forEach(other => {
                    if (other !== item) {
                        other.removeAttribute('open');
                    }
                });
            }
        });
    });
}

// ==================== CART ACTIONS ====================
document.addEventListener('DOMContentLoaded', () => {
    const addCartBtn = document.getElementById('add-cart');
    if (addCartBtn) {
        addCartBtn.addEventListener('click', handleAddToCart);
    }

    const stickyAddBtn = document.querySelector('#sticky-cart button');
    if (stickyAddBtn) {
        stickyAddBtn.addEventListener('click', handleAddToCart);
    }
});

function handleAddToCart(e) {
    e.preventDefault();
    const price = getUnitPrice();
    const subtotal = (price * state.qty).toFixed(2);

    console.log('Added to cart:', {
        qty: state.qty,
        format: state.format,
        price: price,
        subtotal: subtotal
    });
}

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const megaMenu = document.getElementById('mega-menu');
        if (megaMenu) {
            megaMenu.classList.add('hidden');
        }
    }
});