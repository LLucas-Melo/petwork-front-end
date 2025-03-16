import App from "../../controllers/app.js";

class HomeModule {
  constructor() {
    this._autoInit = true;
  }

  init() {
    console.log("HomeModule Iniciado");
  }

  routeInto() { // ✅ Nome corrigido (antes estava "RouteInto")
    console.log("Entrando no HomeModule");
    this.renderPets();
  }

  renderPets() {
    let content = `<section><h2> 🐾 Pets para Adoção</h2>`;

    content +=  `
    
      <div class="parent">
          <div class="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw" class="image"/>
            <div class="content">
              <p>Pet Name </p>
              <p>Male <span><img src="../assets/male.svg" class="gender"/><span></p>
            </div>
            <p class ="adress"> 
               Rua Paulo Holtz <span>241 </span>
              </p>
            <div class="footer-content">
              <button>Adotar</button>
            </div>
          </div>
                  <div class="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw" class="image"/>
            <div class="content">
              <p>Pet Name </p>
              <p>Male <span><img src="../assets/male.svg" class="gender"/><span></p>
            </div>
            <p class ="adress"> 
               Rua Paulo Holtz <span>241 </span>
              </p>
            <div class="footer-content">
              <button>Adotar</button>
            </div>
          </div>
                  <div class="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw" class="image"/>
            <div class="content">
              <p>Pet Name </p>
              <p>Male <span><img src="../assets/male.svg" class="gender"/><span></p>
            </div>
            <p class ="adress"> 
               Rua Paulo Holtz <span>241 </span>
              </p>
            <div class="footer-content">
              <button>Adotar</button>
            </div>
          </div>
                  <div class="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw" class="image"/>
            <div class="content">
              <p>Pet Name </p>
              <p>Male <span><img src="../assets/male.svg" class="gender"/><span></p>
            </div>
            <p class ="adress"> 
               Rua Paulo Holtz <span>241 </span>
              </p>
            <div class="footer-content">
              <button>Adotar</button>
            </div>
          </div>
                  <div class="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw" class="image"/>
            <div class="content">
              <p>Pet Name </p>
              <p>Male <span><img src="../assets/male.svg" class="gender"/><span></p>
            </div>
            <p class ="adress"> 
               Rua Paulo Holtz <span>241 </span>
              </p>
            <div class="footer-content">
              <button>Adotar</button>
            </div>
          </div>
                  <div class="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw" class="image"/>
            <div class="content">
              <p>Pet Name </p>
              <p>Male <span><img src="../assets/male.svg" class="gender"/><span></p>
            </div>
            <p class ="adress"> 
               Rua Paulo Holtz <span>241 </span>
              </p>
            <div class="footer-content">
              <button>Adotar</button>
            </div>
          </div>
                  <div class="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw" class="image"/>
            <div class="content">
              <p>Pet Name </p>
              <p>Male <span><img src="../assets/male.svg" class="gender"/><span></p>
            </div>
            <p class ="adress"> 
               Rua Paulo Holtz <span>241 </span>
              </p>
            <div class="footer-content">
              <button>Adotar</button>
            </div>
          </div>
                  <div class="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw" class="image"/>
            <div class="content">
              <p>Pet Name </p>
              <p>Male <span><img src="../assets/male.svg" class="gender"/><span></p>
            </div>
            <p class ="adress"> 
               Rua Paulo Holtz <span>241 </span>
              </p>
            <div class="footer-content">
              <button>Adotar</button>
            </div>
          </div>
      </div>
      
    
    
    </section>`
  

    

    App.render(content);
  }
  routeOut() {
    console.log("Saindo da HomeModule!");
  }
}

App.registerModule("HomeModule", new HomeModule());
export default HomeModule;
