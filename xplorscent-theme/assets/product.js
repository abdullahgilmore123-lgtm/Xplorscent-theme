/* ==========================================================================
   XplorScent — product.js
   Loaded only by the main-product section.
   ========================================================================== */

(function () {
  'use strict';

  /* Variant picker ----------------------------------------------------------- */

  class VariantPicker extends HTMLElement {
    connectedCallback() {
      this.section = this.closest('.shopify-section');
      const dataScript = this.querySelector('[data-variant-json]');
      if (!dataScript) return;
      this.variants = JSON.parse(dataScript.textContent);
      this.addEventListener('change', this.onChange.bind(this));
    }

    get selectedOptions() {
      return Array.from(this.querySelectorAll('fieldset')).map(
        (fieldset) => fieldset.querySelector('input:checked')?.value
      );
    }

    onChange() {
      const options = this.selectedOptions;
      const variant = this.variants.find((candidate) =>
        candidate.options.every((option, index) => option === options[index])
      );
      this.updateLabels();
      this.updateVariant(variant);
    }

    updateLabels() {
      this.querySelectorAll('fieldset').forEach((fieldset) => {
        const value = fieldset.querySelector('input:checked')?.value;
        const label = fieldset.querySelector('legend span');
        if (label && value) label.textContent = value;
      });
    }

    updateVariant(variant) {
      const idInput = this.section.querySelector('form[data-type="add-to-cart-form"] input[name="id"]');
      const buttons = this.section.querySelectorAll('[data-add-button]');
      const priceEl = this.section.querySelector('[data-product-price]');
      const compareEl = this.section.querySelector('[data-product-compare-price]');

      if (!variant) {
        buttons.forEach((button) => {
          button.setAttribute('aria-disabled', 'true');
          button.querySelector('span').textContent = window.theme.strings.unavailable;
        });
        return;
      }

      if (idInput) idInput.value = variant.id;

      const url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url.toString());

      buttons.forEach((button) => {
        if (variant.available) {
          button.removeAttribute('aria-disabled');
          button.querySelector('span').textContent = window.theme.strings.addToCart;
        } else {
          button.setAttribute('aria-disabled', 'true');
          button.querySelector('span').textContent = window.theme.strings.soldOut;
        }
      });

      if (priceEl) {
        priceEl.textContent = window.themeUtils.formatMoney(variant.price);
        const priceWrap = priceEl.closest('.price') || priceEl;
        priceWrap.classList.remove('price-flash');
        void priceWrap.offsetWidth; /* restart the flash */
        priceWrap.classList.add('price-flash');
      }
      if (compareEl) {
        if (variant.compare_at_price && variant.compare_at_price > variant.price) {
          compareEl.textContent = window.themeUtils.formatMoney(variant.compare_at_price);
          compareEl.removeAttribute('hidden');
        } else {
          compareEl.setAttribute('hidden', '');
        }
      }

      if (variant.featured_media) {
        const gallery = this.section.querySelector('product-gallery');
        if (gallery) gallery.showMedia(variant.featured_media.id);
      }

      this.section.dispatchEvent(new CustomEvent('variant:change', { detail: { variant } }));
    }
  }

  customElements.define('variant-picker', VariantPicker);

  /* Gallery -------------------------------------------------------------------- */

  class ProductGallery extends HTMLElement {
    connectedCallback() {
      this.list = this.querySelector('.product__media-list');
      this.thumbnails = Array.from(this.querySelectorAll('.product__thumbnail'));
      this.thumbnails.forEach((thumb) => {
        thumb.addEventListener('click', () => this.showMedia(thumb.dataset.mediaId));
      });

      if (this.list && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) this.setActiveThumbnail(entry.target.dataset.mediaId);
            });
          },
          { root: this.list, threshold: 0.6 }
        );
        this.querySelectorAll('.product__media-item').forEach((item) => observer.observe(item));
      }
    }

    showMedia(mediaId) {
      const target = this.querySelector(`.product__media-item[data-media-id="${mediaId}"]`);
      if (!target || !this.list) return;
      this.list.scrollTo({ left: target.offsetLeft - this.list.offsetLeft, behavior: 'smooth' });
      this.setActiveThumbnail(mediaId);
    }

    setActiveThumbnail(mediaId) {
      this.thumbnails.forEach((thumb) => {
        thumb.setAttribute('aria-current', thumb.dataset.mediaId === String(mediaId) ? 'true' : 'false');
      });
    }
  }

  customElements.define('product-gallery', ProductGallery);

  /* Sticky add-to-cart ------------------------------------------------------------ */

  class StickyAtc extends HTMLElement {
    connectedCallback() {
      const anchor = document.querySelector('[data-sticky-anchor]');
      const button = this.querySelector('button');
      if (!anchor || !button) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
          this.classList.toggle('is-visible', visible);
          this.setAttribute('aria-hidden', visible ? 'false' : 'true');
          button.tabIndex = visible ? 0 : -1;
        },
        { threshold: 0 }
      );
      observer.observe(anchor);

      button.addEventListener('click', () => {
        const mainButton = document.querySelector('[data-add-button]');
        if (mainButton && mainButton.getAttribute('aria-disabled') !== 'true') mainButton.click();
      });

      const section = this.closest('.shopify-section');
      section.addEventListener('variant:change', (event) => {
        const variant = event.detail.variant;
        const price = this.querySelector('[data-sticky-price]');
        if (price) price.textContent = window.themeUtils.formatMoney(variant.price);
        if (variant.available) {
          button.removeAttribute('aria-disabled');
          button.querySelector('span').textContent = window.theme.strings.addToCart;
        } else {
          button.setAttribute('aria-disabled', 'true');
          button.querySelector('span').textContent = window.theme.strings.soldOut;
        }
      });
    }
  }

  customElements.define('sticky-atc', StickyAtc);

  /* Complementary products ("pairs well with") -------------------------------------- */

  class ComplementaryProducts extends HTMLElement {
    async connectedCallback() {
      const url = `${window.theme.routes.root}recommendations/products.json?product_id=${this.dataset.productId}&limit=${this.dataset.limit || 2}&intent=complementary`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.status);
        const { products } = await response.json();
        if (!products || !products.length) {
          this.setAttribute('hidden', '');
          return;
        }
        this.querySelector('[data-complementary-list]').innerHTML = products
          .map((product) => {
            const image = product.featured_image
              ? `<img src="${window.themeUtils.imageUrl(product.featured_image, 160)}" loading="lazy" alt="">`
              : '';
            return `
              <div class="complementary__item">
                <div class="complementary__media">${image}</div>
                <div class="complementary__info">
                  <a href="${product.url}">${product.title}</a>
                  <div class="price"><span class="price__regular">${window.themeUtils.formatMoney(product.price)}</span></div>
                </div>
                <a href="${product.url}" class="button button--secondary button--small">${window.theme.strings.view}</a>
              </div>`;
          })
          .join('');
        this.removeAttribute('hidden');
      } catch (error) {
        this.setAttribute('hidden', '');
      }
    }
  }

  customElements.define('complementary-products', ComplementaryProducts);

  /* Quantity: keep the visible stepper and the form's hidden quantity in sync ---------- */

  document.querySelectorAll('[name="quantity-display"]').forEach((display) => {
    display.addEventListener('change', () => {
      const hidden = display
        .closest('.product__buy-row')
        ?.querySelector('[data-main-quantity]');
      if (hidden) hidden.value = Math.max(1, parseInt(display.value, 10) || 1);
    });
  });

  /* Record recently viewed ------------------------------------------------------------ */

  const main = document.querySelector('[data-product-handle]');
  if (main) {
    const handle = main.dataset.productHandle;
    try {
      const key = 'xs:recently-viewed';
      const handles = JSON.parse(window.localStorage.getItem(key) || '[]').filter((entry) => entry !== handle);
      handles.unshift(handle);
      window.localStorage.setItem(key, JSON.stringify(handles.slice(0, 9)));
    } catch (error) {
      /* storage unavailable — non-critical */
    }
  }
})();
