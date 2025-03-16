import App from "../../controllers/app.js";
class PetDetailsModule{
  constructor(){
    this.autoInit = true;
  }

  init(){
    console.log("Module petDetails inicializado");
  }

  routeInto(){

    // if(!params || params.id){
    //   console.warn("Nenhum ID fornecido para pagina de detalhes");
    // }

    this.renderPetDetails();
  }

  renderPetDetails(){
    let content = `<h2> Detalhes do seu futuro amigo</h2>`
    






    App.render(content);
  }
  routeOut() {
    console.log("Saindo da HomeModule!");
  }
}

App.registerModule("PetDetailsModule",new PetDetailsModule());
export default PetDetailsModule;