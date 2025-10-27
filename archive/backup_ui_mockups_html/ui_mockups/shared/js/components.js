// ConnectEn SaaS - Component Loader
class ComponentLoader {
  constructor() {
    this.baseUrl = '../shared/components/';
  }

  // Load HTML component into target element
  async loadComponent(componentName, targetSelector) {
    try {
      const response = await fetch(`${this.baseUrl}${componentName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName}`);
      }
      
      const html = await response.text();
      const targetElement = document.querySelector(targetSelector);
      
      if (targetElement) {
        targetElement.innerHTML = html;
        
        // Execute any inline scripts in the component
        const scripts = targetElement.querySelectorAll('script');
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          newScript.textContent = script.textContent;
          document.head.appendChild(newScript);
        });
        
        // Execute any inline styles in the component
        const styles = targetElement.querySelectorAll('style');
        styles.forEach(style => {
          const newStyle = document.createElement('style');
          newStyle.textContent = style.textContent;
          document.head.appendChild(newStyle);
        });
      }
    } catch (error) {
      console.error('Component loading error:', error);
    }
  }

  // Load multiple components
  async loadComponents(components) {
    const promises = components.map(component => 
      this.loadComponent(component.name, component.target)
    );
    await Promise.all(promises);
  }

  // Initialize common components for all pages
  async initializeLayout() {
    await this.loadComponents([
      { name: 'header', target: '#header-container' },
      { name: 'sidebar', target: '#sidebar-container' },
      { name: 'footer', target: '#footer-container' }
    ]);
  }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  const componentLoader = new ComponentLoader();
  
  // Check if layout containers exist
  const hasLayoutContainers = document.querySelector('#header-container') || 
                              document.querySelector('#sidebar-container') || 
                              document.querySelector('#footer-container');
  
  if (hasLayoutContainers) {
    componentLoader.initializeLayout();
  }
});

// Export for use in other scripts
window.ComponentLoader = ComponentLoader;