// assets/js/language-selector.js
class LanguageSelector {
  constructor() {
    this.config = {
      supportedLanguages: [
        { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
        { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
        { code: 'it', name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
        { code: 'ta', name: 'தமிழ்', flag: '🇮🇳', dir: 'ltr' },
        { code: 'th', name: 'ไทย', flag: '🇹🇭', dir: 'ltr' }
      ],
      pageMappings: {
        'index': { 
          en: 'index.html',
          es: 'index.html',
          it: 'index.html',
          ar: 'index.html',
          ta: 'index.html',
          th: 'index.html'
        },
        'product': {
          en: 'product.html',
          es: 'producto.html',
          it: 'prodotto.html',
          ar: 'منتج.html',
          ta: 'தயாரிப்பு.html',
          th: 'สินค้า.html'
        },
        'about': {
          en: 'about.html',
          es: 'sobre.html',
          it: 'chi-siamo.html',
          ar: 'حول.html',
          ta: 'பற்றி.html',
          th: 'เกี่ยวกับ.html'
        },
        'applications': {
          en: 'applications.html',
          es: 'aplicaciones.html',
          it: 'applicazioni.html',
          ar: 'تطبيقات.html',
          ta: 'பயன்பாடுகள்.html',
          th: 'แอปพลิเคชัน.html'
        },
        'contact': {
          en: 'contact.html',
          es: 'contacto.html',
          it: 'contatto.html',
          ar: 'اتصال.html',
          ta: 'தொடர்பு.html',
          th: 'ติดต่อ.html'
        }
      },
      storageKey: 'pavansut_lang'
    };

    this.currentLanguage = this.detectLanguage();
    this.init();
  }

  // Detect language from browser or storage
  detectLanguage() {
    // 1. Check localStorage
    const storedLang = localStorage.getItem(this.config.storageKey);
    if (storedLang && this.isLanguageSupported(storedLang)) {
      return storedLang;
    }

    // 2. Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (this.isLanguageSupported(browserLang)) {
      return browserLang;
    }

    // 3. Default to English
    return 'en';
  }

  isLanguageSupported(langCode) {
    return this.config.supportedLanguages.some(lang => lang.code === langCode);
  }

  // Apply language settings to the page
  applyLanguageSettings(langCode) {
    // Set HTML attributes
    document.documentElement.lang = langCode;
    
    // Set text direction
    const langData = this.config.supportedLanguages.find(lang => lang.code === langCode);
    document.documentElement.dir = langData?.dir || 'ltr';
    
    // Update UI indicator
    const indicator = document.querySelector('.current-language');
    if (indicator) {
      indicator.textContent = langCode.toUpperCase();
    }
    
    // Store preference
    localStorage.setItem(this.config.storageKey, langCode);
    this.currentLanguage = langCode;
  }

  // Get current page name (without extension)
  getCurrentPageName() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop() || 'index.html';
    return fileName.replace('.html', '');
  }

  // Get translated page path
  getTranslatedPath(targetLang) {
    const currentPage = this.getCurrentPageName();
    const translatedPage = this.config.pageMappings[currentPage]?.[targetLang] || `${currentPage}.html`;
    
    // Handle root index differently
    if (currentPage === 'index' || currentPage === '') {
      return `/${targetLang}/`;
    }
    
    return `/${targetLang}/${translatedPage}`;
  }

  // Create language selector modal
  createModal() {
    const modal = document.createElement('div');
    modal.className = 'lang-modal';
    modal.innerHTML = `
      <div class="lang-modal-content">
        <div class="lang-modal-header">
          <h3>Select Language</h3>
          <span class="lang-modal-close">&times;</span>
        </div>
        <div class="lang-options-container"></div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  // Generate language options
  generateLanguageOptions(container) {
    this.config.supportedLanguages.forEach(lang => {
      const option = document.createElement('div');
      option.className = 'lang-option';
      if (lang.code === this.currentLanguage) {
        option.classList.add('active');
      }
      
      option.innerHTML = `
        <span class="lang-flag">${lang.flag}</span>
        <span class="lang-name">${lang.name}</span>
      `;
      
      option.addEventListener('click', () => {
        this.handleLanguageChange(lang.code);
      });
      
      container.appendChild(option);
    });
  }

  // Handle language change
  handleLanguageChange(targetLang) {
    if (targetLang === this.currentLanguage) {
      this.closeModal();
      return;
    }
    
    this.applyLanguageSettings(targetLang);
    const newPath = this.getTranslatedPath(targetLang);
    
    // Close modal before redirecting
    this.closeModal();
    
    // Redirect to translated page
    window.location.href = newPath;
  }

  // Modal control methods
  openModal() {
    if (!this.modal) {
      this.modal = this.createModal();
      const container = this.modal.querySelector('.lang-options-container');
      this.generateLanguageOptions(container);
      
      // Add close handler
      this.modal.querySelector('.lang-modal-close').addEventListener('click', () => this.closeModal());
      
      // Close when clicking outside
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }
    
    this.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (this.modal) {
      this.modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // Initialize the language selector
  init() {
    // Apply current language settings
    this.applyLanguageSettings(this.currentLanguage);
    
    // Initialize UI elements
    const translateBtn = document.getElementById('translateBtn');
    if (translateBtn) {
      translateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal();
      });
    }
    
    // Add keyboard accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.style.display === 'flex') {
        this.closeModal();
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LanguageSelector();
});