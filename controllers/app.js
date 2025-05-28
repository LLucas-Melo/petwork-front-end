class AppController {
  constructor() {
    this._activeModule = null;
    this._previousModule = null;
    this._container = null;
    this.modules = {};
  }

  init() {
    this._container = document.getElementById("main-content");
    this.loadingOverlay = document.getElementById("loading-overlay");
    if (!this._container) {
      console.error("Erro: Elemento #main-content não localizado");
      return;
    }
    this.initAllModules();
  }

  initAllModules() {
    for (const moduleName in this.modules) {
      const module = this.modules[moduleName];
      if (module && typeof module.init === "function") {
        module.init();
      }
    }
  }

  registerModule(moduleName, moduleInstance) {
    if (!moduleName || !moduleInstance) {
      console.error("❌ Erro: Nome do módulo ou instância inválidos");
      return;
    }

    if (this.modules[moduleName]) {
      console.warn(`⚠️ Aviso: O módulo "${moduleName}" já está registrado.`);
      return;
    }

    this.modules[moduleName] = moduleInstance;
  }

  loadCSS(moduleName) {
    const existingLink = document.getElementById("module-style");

    if (existingLink) {
      existingLink.parentNode.removeChild(existingLink);
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "module-style";
    link.href = `/styles/${moduleName.toLowerCase()}.css`;
    document.head.appendChild(link);
  }

  showLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.add("show");
    }
  }

  hideLoading() {
    if (this.loadingOverlay) {
      setTimeout(() => {
        this.loadingOverlay.classList.remove("show");
      }, 600);
    }
  }

  /**
   * Roteia para um novo módulo usando o router.js
   * @param {object} options - Opções de roteamento.
   * @param {string} options.module - Nome do módulo.
   * @param {string} [options.id] - ID do item, se necessário.
   */
  routeTo({ module: moduleName, ...params }) {
    const nextModule = this.modules[moduleName];

    if (!nextModule) {
      console.error(`❌ Erro: Módulo "${moduleName}" não encontrado.`);
      return;
    }

    console.log(`🔄 Navegando para o módulo: ${moduleName}`);

    this.showLoading();

    setTimeout(() => {
      if (this._activeModule && this._activeModule.routeOut) {
        this._activeModule.routeOut();
      }

      this._previousModule = this._activeModule;
      this._activeModule = nextModule;
      this._activeModule.routeInto(params);

      this.loadCSS(moduleName);

      this.hideLoading();
    }, 700);
  }

  render(content) {
    if (!this._container) return;

    console.log("🔄 Chamando render() no AppController");

    // Evita re-renderização desnecessária
    if (this._container.innerHTML !== content) {
        console.log("✅ Atualizando o conteúdo de #main-content");
        this._container.innerHTML = content;
    } else {
        console.log("⚠️ Nenhuma alteração detectada, evitando re-renderização.");
    }
}


}

// Garante que `App` seja uma única instância
const App = new AppController();
window.App = App;

export default App;
