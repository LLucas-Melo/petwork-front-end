
class Router {
  constructor(appInstance) {
    this.app = appInstance;
    this.routes = {}; 
    this.defaultRoute = null;

    // Lidar com mudanças no histórico do navegador (botão voltar/avançar)
    window.onpopstate = (event) => {
      const path = event.state?.path || "/";
      this.navigateTo(path, false);
    };
  }

  /**
   * Registra uma nova rota associando um caminho a um módulo.
   * @param {string} path - O caminho da URL (ex: "/pets").
   * @param {string} moduleName - O nome do módulo correspondente.
   * @param {boolean} isDefault - Define se essa é a rota padrão.
   */
  registerRoute(path, moduleName, isDefault = false) {
    this.routes[path] = moduleName;
    if (isDefault) {
      this.defaultRoute = path;
    }
  }

  /**
   * Navega para um determinado caminho, carregando o módulo correto.
   * @param {string} path - O caminho da URL (ex: "/pets/123").
   * @param {boolean} addToHistory - Se verdadeiro, adiciona ao histórico do navegador.
   */
  navigateTo(path, addToHistory = true) {
    const cleanPath = path.split("?")[0]; // Remove query params, se houver
    let moduleName = this.routes[cleanPath];
    let params = {};
  
    // Verifica se a rota não foi encontrada e tenta combinar padrões dinâmicos
    if (!moduleName) {
      for (const route in this.routes) {
        const regex = new RegExp("^" + route.replace(/:\w+/g, "(\\w+)") + "$");
        const match = cleanPath.match(regex);
        
        if (match) {
          moduleName = this.routes[route];
          const paramNames = (route.match(/:\w+/g) || []).map(p => p.substring(1)); // Extrai os nomes dos parâmetros
          paramNames.forEach((param, index) => {
            params[param] = match[index + 1]; // Associa os valores capturados aos nomes dos parâmetros
          });
          break;
        }
      }
    }
  
    if (!moduleName) {
      console.warn(`⚠️ Nenhuma rota encontrada para "${path}". Redirecionando para padrão.`);
      return this.navigateTo(this.defaultRoute);
    }
  
    if (addToHistory) {
      history.pushState({ path }, "", path);
    }
  
    this.app.routeTo({ module: moduleName, ...params });
  }

  
  getParamsFromUrl(path) {
    const segments = path.split("/").filter(Boolean); 
    let params = {};

    if (segments.length > 1) {
      params.id = segments[1]; 
    }

    return params;
  }
}


const router = new Router(window.App);

// Registrar rotas
router.registerRoute("/", "HomeModule", true);
router.registerRoute("/pets", "PetsModule");
router.registerRoute("/pets/:id", "PetDetailsModule");
router.registerRoute("/profile", "UserProfileModule");

// Permitir acesso global ao roteador
window.router = router;

export default router;
