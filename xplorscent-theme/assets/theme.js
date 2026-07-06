/* ==========================================================================
   XplorScent — theme.js
   Global, dependency-free interactivity. Product-page specific logic lives
   in product.js (loaded only by the main-product section).
   ========================================================================== */

(function () {
  'use strict';

  /* Helpers ---------------------------------------------------------------- */

  const trapFocus = (container) => {
    const focusable = container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea, select, summary, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return () => {};
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const onKeydown = (event) => {
      if (event.key !== 'Tab') return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    container.addEventListener('keydown', onKeydown);
    return () => container.removeEventListener('keydown', onKeydown);
  };

  window.themeUtils = {
    formatMoney(cents, format) {
      const moneyFormat = format || window.theme.moneyFormat || '${{amount}}';
      const value = (cents / 100).toFixed(2);
      const [units, decimals] = value.split('.');
      const withThousands = units.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return moneyFormat
        .replace(/\{\{\s*amount\s*\}\}/, `${withThousands}.${decimals}`)
        .replace(/\{\{\s*amount_no_decimals\s*\}\}/, withThousands)
        .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/, `${units.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${decimals}`);
    },
    imageUrl(src, width) {
      if (!src) return '';
      return src + (src.includes('?') ? '&' : '?') + 'width=' + width;
    }
  };

  const updateCartCount = (count) => {
    document.querySelectorAll('[data-cart-count-bubble]').forEach((bubble) => {
      bubble.textContent = count > 0 ? (count > 99 ? '99+' : count) : '';
      bubble.classList.toggle('visually-hidden', count === 0);
    });
  };

  /* Generic drawers (menu, search) ------------------------------------------ */

  class ThemeDrawer {
    constructor(root) {
      this.root = root;
      this.releaseFocus = null;
      this.opener = null;

      document.querySelectorAll(`[data-drawer-open="${root.id}"]`).forEach((btn) => {
        btn.addEventListener('click', () => this.open(btn));
      });
      root.querySelectorAll('[data-drawer-close], .drawer__overlay').forEach((el) => {
        el.addEventListener('click', () => this.close());
      });
      root.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') this.close();
      });
    }

    open(opener) {
      this.opener = opener || null;
      this.root.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (this.opener) this.opener.setAttribute('aria-expanded', 'true');
      const panel = this.root.querySelector('.drawer__panel, .search-drawer__panel');
      this.releaseFocus = trapFocus(this.root);
      const autofocus = this.root.querySelector('[data-drawer-autofocus]');
      window.setTimeout(() => (autofocus || panel).focus(), 150);
    }

    close() {
      this.root.classList.remove('is-open');
      document.body.style.overflow = '';
      if (this.releaseFocus) this.releaseFocus();
      if (this.opener) {
        this.opener.setAttribute('aria-expanded', 'false');
        this.opener.focus();
      }
    }
  }

  document.querySelectorAll('.js-drawer').forEach((el) => new ThemeDrawer(el));

  /* Cart drawer -------------------------------------------------------------- */

  class CartDrawer extends HTMLElement {
    constructor() {
      super();
      this.releaseFocus = null;
      this.opener = null;
      this.bind();

      document.querySelectorAll('[data-cart-drawer-open]').forEach((btn) => {
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          this.open(btn);
        });
      });
      this.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') this.close();
      });
    }

    bind() {
      this.querySelectorAll('[data-cart-drawer-close]').forEach((el) => {
        el.addEventListener('click', () => this.close());
      });
      this.querySelectorAll('quantity-input .quantity__input').forEach((input) => {
        input.addEventListener('change', (event) => {
          this.updateLine(event.target.dataset.index, parseInt(event.target.value, 10));
        });
      });
      this.querySelectorAll('[data-cart-remove]').forEach((btn) => {
        btn.addEventListener('click', () => this.updateLine(btn.dataset.index, 0));
      });
      const note = this.querySelector('[data-cart-note]');
      if (note) {
        note.addEventListener('change', () => {
          fetch(window.theme.routes.cartUpdate, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note: note.value })
          });
        });
      }
    }

    open(opener) {
      this.opener = opener || null;
      this.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      this.releaseFocus = trapFocus(this);
      const panel = this.querySelector('.cart-drawer__panel');
      if (panel) window.setTimeout(() => panel.focus(), 150);
    }

    close() {
      this.classList.remove('is-open');
      document.body.style.overflow = '';
      if (this.releaseFocus) this.releaseFocus();
      if (this.opener) this.opener.focus();
    }

    async updateLine(line, quantity) {
      if (!line) return;
      this.classList.add('is-loading');
      try {
        const response = await fetch(window.theme.routes.cartChange, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ line, quantity, sections: ['cart-drawer'] })
        });
        const cart = await response.json();
        if (cart.errors || cart.status) throw new Error(cart.errors || cart.message);
        this.renderFromHTML(cart.sections['cart-drawer']);
        updateCartCount(cart.item_count);
      } catch (error) {
        window.alert(window.theme.strings.quantityError);
      } finally {
        this.classList.remove('is-loading');
      }
    }

    renderFromHTML(html) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const fresh = doc.querySelector('cart-drawer');
      if (!fresh) return;
      this.innerHTML = fresh.innerHTML;
      this.className = fresh.className + (this.classList.contains('is-open') ? ' is-open' : '');
      this.dataset.cartCount = fresh.dataset.cartCount;
      updateCartCount(parseInt(fresh.dataset.cartCount, 10) || 0);
      this.bind();
      if (this.classList.contains('is-open')) {
        if (this.releaseFocus) this.releaseFocus();
        this.releaseFocus = trapFocus(this);
      }
    }

    async refresh(sectionHTML, openDrawer) {
      if (sectionHTML) {
        this.renderFromHTML(sectionHTML);
      }
      if (openDrawer) this.open(document.querySelector('[data-cart-drawer-open]'));
    }
  }

  customElements.define('cart-drawer', CartDrawer);

  /* Quantity input ----------------------------------------------------------- */

  class QuantityInput extends HTMLElement {
    connectedCallback() {
      this.input = this.querySelector('input');
      this.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          const previous = this.input.value;
          if (button.name === 'plus') this.input.stepUp();
          else this.input.stepDown();
          if (previous !== this.input.value) {
            this.input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      });
    }
  }

  customElements.define('quantity-input', QuantityInput);

  /* Product form (AJAX add to cart) ------------------------------------------ */

  class ProductForm extends HTMLElement {
    connectedCallback() {
      this.form = this.querySelector('form');
      if (!this.form) return;
      this.button = this.form.querySelector('[name="add"]');
      this.form.addEventListener('submit', this.onSubmit.bind(this));
    }

    async onSubmit(event) {
      event.preventDefault();
      if (this.button.getAttribute('aria-disabled') === 'true') return;

      this.button.classList.add('button--loading');
      this.button.setAttribute('aria-busy', 'true');

      const formData = new FormData(this.form);
      formData.append('sections', 'cart-drawer');
      formData.append('sections_url', window.location.pathname);

      try {
        const response = await fetch(window.theme.routes.cartAdd + '.js', {
          method: 'POST',
          headers: { Accept: 'application/javascript', 'X-Requested-With': 'XMLHttpRequest' },
          body: formData
        });
        const result = await response.json();
        if (result.status) throw new Error(result.description);

        const drawer = document.querySelector('cart-drawer');
        if (drawer && result.sections) {
          drawer.refresh(result.sections['cart-drawer'], true);
        } else {
          window.location.href = window.theme.routes.cart;
        }
        this.showError('');
      } catch (error) {
        this.showError(error.message || window.theme.strings.cartError);
      } finally {
        this.button.classList.remove('button--loading');
        this.button.removeAttribute('aria-busy');
      }
    }

    showError(message) {
      let errorEl = this.querySelector('.product-form__error');
      if (!message) {
        if (errorEl) errorEl.remove();
        return;
      }
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'product-form__error form__message form__message--error';
        errorEl.setAttribute('role', 'alert');
        this.append(errorEl);
      }
      errorEl.textContent = message;
    }
  }

  customElements.define('product-form', ProductForm);

  /* Header: hide on scroll down ---------------------------------------------- */

  const headerWrapper = document.querySelector('.header-wrapper[data-sticky-behavior="scroll-up"]');
  if (headerWrapper) {
    let lastScroll = 0;
    window.addEventListener(
      'scroll',
      () => {
        const current = window.scrollY;
        if (current > lastScroll && current > 200) {
          headerWrapper.classList.add('header-wrapper--hidden');
        } else {
          headerWrapper.classList.remove('header-wrapper--hidden');
        }
        lastScroll = current;
      },
      { passive: true }
    );
  }

  /* Facets: auto-submit filters ----------------------------------------------- */

  document.querySelectorAll('[data-facets-form]').forEach((form) => {
    form.addEventListener('change', (event) => {
      if (event.target.matches('select, input[type="checkbox"]')) form.submit();
    });
  });

  /* Scroll reveal --------------------------------------------------------------- */

  if ('IntersectionObserver' in window && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-revealed'));
  }

  /* Subtle parallax ---------------------------------------------------------------- */

  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.transform = `translateY(${(-progress * speed * 100).toFixed(2)}px)`;
      });
      ticking = false;
    };
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* Scroll scene (fragrance story) --------------------------------------------------- */

  class ScrollScene extends HTMLElement {
    connectedCallback() {
      this.chapters = Array.from(this.querySelectorAll('[data-scene-chapter]'));
      this.media = Array.from(this.querySelectorAll('[data-scene-media]'));
      if (!this.chapters.length) return;
      this.activate(0);
      if (!('IntersectionObserver' in window)) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) this.activate(parseInt(entry.target.dataset.sceneChapter, 10));
          });
        },
        { rootMargin: '-42% 0px -42% 0px' }
      );
      this.chapters.forEach((chapter) => observer.observe(chapter));
    }

    activate(index) {
      this.chapters.forEach((chapter, i) => chapter.classList.toggle('is-active', i === index));
      this.media.forEach((img, i) => img.classList.toggle('is-active', i === index));
    }
  }

  customElements.define('scroll-scene', ScrollScene);

  /* Signatures index hover reveals ------------------------------------------------------ */

  class SignaturesIndex extends HTMLElement {
    connectedCallback() {
      const rows = this.querySelectorAll('[data-signature-row]');
      const images = this.querySelectorAll('[data-signature-media]');
      if (!images.length) return;
      const activate = (index) => {
        images.forEach((img, i) => img.classList.toggle('is-active', i === index));
      };
      rows.forEach((row, index) => {
        row.addEventListener('mouseenter', () => activate(index));
        row.addEventListener('focusin', () => activate(index));
      });
      activate(0);
    }
  }

  customElements.define('signatures-index', SignaturesIndex);

  /* Predictive search ------------------------------------------------------------ */

  class PredictiveSearch extends HTMLElement {
    connectedCallback() {
      this.input = this.querySelector('[data-predictive-input]');
      this.results = this.querySelector('[data-predictive-results]');
      if (!this.input || !this.results) return;
      this.abortController = null;
      this.debounce = null;
      this.input.addEventListener('input', () => {
        window.clearTimeout(this.debounce);
        this.debounce = window.setTimeout(() => this.search(), 250);
      });
    }

    async search() {
      const query = this.input.value.trim();
      if (this.abortController) this.abortController.abort();
      if (query.length < 2) {
        this.results.innerHTML = '';
        return;
      }
      this.abortController = new AbortController();
      const url =
        `${window.theme.routes.predictiveSearch}?q=${encodeURIComponent(query)}` +
        '&resources[type]=product,collection,page&resources[limit]=6&section_id=predictive-search';
      try {
        const response = await fetch(url, { signal: this.abortController.signal });
        if (!response.ok) throw new Error(response.status);
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const fresh = doc.querySelector('#predictive-search-results');
        this.results.innerHTML = fresh ? fresh.outerHTML : '';
      } catch (error) {
        if (error.name !== 'AbortError') this.results.innerHTML = '';
      }
    }
  }

  customElements.define('predictive-search', PredictiveSearch);

  /* Recently viewed ------------------------------------------------------------- */

  class RecentlyViewed extends HTMLElement {
    async connectedCallback() {
      let handles = [];
      try {
        handles = JSON.parse(window.localStorage.getItem('xs:recently-viewed') || '[]');
      } catch (error) {
        return;
      }
      const exclude = this.dataset.exclude;
      handles = handles.filter((handle) => handle !== exclude).slice(0, parseInt(this.dataset.limit || '4', 10));
      if (!handles.length) return;

      const products = await Promise.all(
        handles.map((handle) =>
          fetch(`${window.theme.routes.root}products/${handle}.js`)
            .then((res) => (res.ok ? res.json() : null))
            .catch(() => null)
        )
      );

      const grid = this.querySelector('[data-recently-viewed-grid]');
      const items = products.filter(Boolean);
      if (!items.length || !grid) return;

      grid.innerHTML = items
        .map((product) => {
          const image = product.featured_image
            ? `<img src="${window.themeUtils.imageUrl(product.featured_image, 540)}" srcset="${window.themeUtils.imageUrl(product.featured_image, 360)} 360w, ${window.themeUtils.imageUrl(product.featured_image, 540)} 540w" sizes="(min-width: 990px) 25vw, 50vw" loading="lazy" alt="">`
            : '';
          return `
            <article class="product-card">
              <a href="${window.theme.routes.root}products/${product.handle}" class="product-card__link" tabindex="-1" aria-hidden="true">
                <div class="product-card__media media media--portrait">${image}</div>
              </a>
              <div class="product-card__info">
                <h3 class="product-card__title"><a href="${window.theme.routes.root}products/${product.handle}">${product.title}</a></h3>
                <div class="price"><span class="price__regular">${window.themeUtils.formatMoney(product.price)}</span></div>
              </div>
            </article>`;
        })
        .join('');
      const wrapper = this.closest('[data-recently-viewed-section]');
      if (wrapper) wrapper.removeAttribute('hidden');
    }
  }

  customElements.define('recently-viewed', RecentlyViewed);

  /* Related products (Shopify recommendations API) -------------------------------- */

  class RelatedProducts extends HTMLElement {
    connectedCallback() {
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          observer.disconnect();
          this.load();
        },
        { rootMargin: '0px 0px 400px 0px' }
      );
      observer.observe(this);
    }

    async load() {
      try {
        const response = await fetch(this.dataset.url);
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const fresh = doc.querySelector('related-products');
        if (fresh && fresh.innerHTML.trim().length) {
          this.innerHTML = fresh.innerHTML;
        } else {
          this.hideSection();
        }
      } catch (error) {
        this.hideSection();
      }
    }

    hideSection() {
      const wrapper = this.closest('.shopify-section') || this.closest('section');
      if (wrapper) wrapper.setAttribute('hidden', '');
    }
  }

  customElements.define('related-products', RelatedProducts);
})();
