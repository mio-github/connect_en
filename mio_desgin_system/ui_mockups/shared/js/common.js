// ConnectEn SaaS - Common JavaScript Functions

class ConnectEnApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
  }

  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initializeModals();
      this.initializeTooltips();
      this.initializeSearchFilters();
    });
  }

  // Modal Management
  initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloses = document.querySelectorAll('[data-modal-close]');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const targetModal = document.getElementById(trigger.dataset.modalTarget);
        this.openModal(targetModal);
      });
    });

    modalCloses.forEach(close => {
      close.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = close.closest('.modal-overlay');
        this.closeModal(modal);
      });
    });

    modalOverlays.forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeModal(overlay);
        }
      });
    });

    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal-overlay.active');
        if (openModal) {
          this.closeModal(openModal);
        }
      }
    });
  }

  openModal(modal) {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus management for accessibility
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }

  closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Form Validation
  validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      this.clearFieldError(field);
      
      if (!field.value.trim()) {
        this.showFieldError(field, 'この項目は必須です');
        isValid = false;
      } else if (field.type === 'email' && !this.isValidEmail(field.value)) {
        this.showFieldError(field, '有効なメールアドレスを入力してください');
        isValid = false;
      } else if (field.type === 'tel' && !this.isValidPhone(field.value)) {
        this.showFieldError(field, '有効な電話番号を入力してください');
        isValid = false;
      }
    });

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }
    
    field.parentNode.appendChild(errorElement);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPhone(phone) {
    return /^[\d\-\(\)\+\s]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }

  // Toast Notifications
  showToast(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} fade-in`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${this.getToastIcon(type)}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    // Add toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    toastContainer.appendChild(toast);

    // Auto-remove toast
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, duration);
  }

  getToastIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[type] || icons.info;
  }

  // Loading States
  showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
  }

  hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
  }

  // Data Table Functions
  initializeDataTable(tableSelector) {
    const table = document.querySelector(tableSelector);
    if (!table) return;

    this.setupTableSorting(table);
    this.setupTablePagination(table);
  }

  setupTableSorting(table) {
    const headers = table.querySelectorAll('th[data-sortable]');
    
    headers.forEach(header => {
      header.style.cursor = 'pointer';
      header.addEventListener('click', () => {
        const column = header.dataset.sortable;
        const currentDirection = header.dataset.sortDirection || 'asc';
        const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
        
        // Reset all headers
        headers.forEach(h => {
          h.dataset.sortDirection = '';
          h.classList.remove('sort-asc', 'sort-desc');
        });
        
        // Set current header
        header.dataset.sortDirection = newDirection;
        header.classList.add(`sort-${newDirection}`);
        
        this.sortTable(table, column, newDirection);
      });
    });
  }

  sortTable(table, column, direction) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
      const aVal = a.querySelector(`[data-column="${column}"]`)?.textContent || '';
      const bVal = b.querySelector(`[data-column="${column}"]`)?.textContent || '';
      
      if (direction === 'asc') {
        return aVal.localeCompare(bVal, 'ja', { numeric: true });
      } else {
        return bVal.localeCompare(aVal, 'ja', { numeric: true });
      }
    });
    
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
  }

  // Search and Filter Functions
  initializeSearchFilters() {
    const searchInputs = document.querySelectorAll('.search-input');
    const filterSelects = document.querySelectorAll('.filter-select');

    searchInputs.forEach(input => {
      let timeoutId;
      input.addEventListener('input', (e) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          this.performSearch();
        }, 300);
      });
    });

    filterSelects.forEach(select => {
      select.addEventListener('change', () => {
        this.performSearch();
      });
    });
  }

  performSearch() {
    // This would typically make an AJAX call to the server
    // For now, we'll filter the visible table rows
    const searchTerm = document.querySelector('.search-input')?.value.toLowerCase() || '';
    const statusFilter = document.querySelector('[data-filter="status"]')?.value || '';
    const typeFilter = document.querySelector('[data-filter="type"]')?.value || '';

    const rows = document.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const status = row.querySelector('[data-column="status"]')?.textContent || '';
      const type = row.querySelector('[data-column="type"]')?.textContent || '';
      
      let show = true;
      
      if (searchTerm && !text.includes(searchTerm)) {
        show = false;
      }
      
      if (statusFilter && status !== statusFilter) {
        show = false;
      }
      
      if (typeFilter && type !== typeFilter) {
        show = false;
      }
      
      row.style.display = show ? '' : 'none';
    });

    this.updateSearchResults();
  }

  updateSearchResults() {
    const visibleRows = document.querySelectorAll('tbody tr:not([style*="none"])');
    const totalRows = document.querySelectorAll('tbody tr');
    const resultCount = document.querySelector('.result-count');
    
    if (resultCount) {
      resultCount.textContent = `${visibleRows.length} / ${totalRows.length} 件表示`;
    }
  }

  // Utility Functions
  formatDate(date, format = 'YYYY/MM/DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day);
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Initialize components
  initializeComponents() {
    // Initialize tooltips
    this.initializeTooltips();
    
    // Initialize data tables
    document.querySelectorAll('.data-table').forEach(table => {
      this.initializeDataTable(table);
    });
  }

  initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.showTooltip(e.target, e.target.dataset.tooltip);
      });
      
      element.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });
  }

  showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    setTimeout(() => tooltip.classList.add('show'), 10);
  }

  hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }
}

// Initialize the app
const app = new ConnectEnApp();

// Add toast and tooltip styles to document head
const additionalStyles = `
  <style>
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }
    
    .toast {
      background: white;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      margin-bottom: var(--spacing-sm);
      min-width: 300px;
      max-width: 500px;
    }
    
    .toast-content {
      display: flex;
      align-items: center;
      padding: var(--spacing-md);
      gap: var(--spacing-sm);
    }
    
    .toast-success { border-left: 4px solid var(--success-color); }
    .toast-error { border-left: 4px solid var(--error-color); }
    .toast-warning { border-left: 4px solid var(--warning-color); }
    .toast-info { border-left: 4px solid var(--info-color); }
    
    .toast-icon {
      font-size: var(--font-size-lg);
      font-weight: bold;
    }
    
    .toast-success .toast-icon { color: var(--success-color); }
    .toast-error .toast-icon { color: var(--error-color); }
    .toast-warning .toast-icon { color: var(--warning-color); }
    .toast-info .toast-icon { color: var(--info-color); }
    
    .toast-message {
      flex: 1;
    }
    
    .toast-close {
      background: none;
      border: none;
      font-size: var(--font-size-lg);
      cursor: pointer;
      color: var(--gray-400);
      padding: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .toast-close:hover {
      color: var(--gray-600);
    }
    
    .tooltip {
      position: absolute;
      background: var(--gray-900);
      color: white;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-sm);
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
    }
    
    .tooltip.show {
      opacity: 1;
    }
    
    .tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: var(--gray-900);
    }
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-lg);
      backdrop-filter: blur(2px);
    }
    
    .modal-overlay.active {
      display: flex;
      animation: fadeInModal 0.2s ease-out;
    }
    
    .modal {
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
      transform: scale(0.95);
      animation: modalSlideIn 0.2s ease-out forwards;
      position: relative;
    }
    
    @keyframes fadeInModal {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes modalSlideIn {
      from {
        transform: scale(0.95);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    .modal-header {
      padding: var(--spacing-lg);
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .modal-title {
      font-size: var(--font-size-xl);
      font-weight: 600;
      margin: 0;
    }
    
    .modal-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--gray-400);
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
    }
    
    .modal-close:hover {
      background: var(--gray-100);
      color: var(--gray-600);
    }
    
    .modal-body {
      padding: var(--spacing-lg);
    }
    
    .modal-footer {
      padding: var(--spacing-lg);
      border-top: 1px solid var(--gray-200);
      display: flex;
      gap: var(--spacing-md);
      justify-content: flex-end;
    }
  </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);