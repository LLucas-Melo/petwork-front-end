import App from "../../controllers/app.js";

class HomeModule {
  constructor() {
    this._autoInit = true;
    this.counter = 0;
  }

  init() {
    console.log("HomeModule Iniciado");
  }

  async routeInto() {
    console.log("Entrando no HomeModule");
    await this.renderPets();
  }

  async renderPets() {
    const pets = await this.fetchPets();
    let content = `<section><h2> 🐾 Pets para Adoção</h2><div class="parent">`;

    pets.forEach(pet => {
      content += this.createPetCard(pet);
    });

    content += `</div></section>`;
    App.render(content);

    const container = document.querySelector(".parent");
    container.addEventListener("click", (event) => {
      const card = event.target.closest(".card");
      if (card) {
        const petId = card.dataset.id;
        console.log(`🟢 Card clicado, redirecionando para detalhes do pet ID: ${petId}`);
        App.routeTo({ module: "PetDetailsModule", id: petId });
      }
    });
  }

  createPetCard(pet) {
    const genderIcon = pet.gender === "Male" ? "male.svg" : "female.svg";
    const telefone = pet.address?.telefone?.replace(/\D/g, "") || "";
    const whatsappURL = `https://wa.me/55${telefone}?text=Olá! Tenho interesse em adotar o pet ${pet.name}.`;

    return `
      <div class="card" data-id="${pet.id}">
        <img src="${pet.image}" class="image"/>
        <div class="content">
          <p>Pet Name ${pet.name}</p>
          <p>${pet.gender} <span><img src="../assets/${genderIcon}" class="gender"/></span></p>
          <p>${pet.age}</p>
        </div>
        <p class="adress">Rua Paulo Holtz <span>241</span></p>
        <div class="footer-content">
        <a href="${whatsappURL}" target="_blank">
          <button>Adotar</button>
        </a>
        </div>
      </div>
    `;
  }

    async fetchPets() {
    return [
      {
        id: "1",
        name: "Toby",
        age: "filhote",
        gender: "Male",
        race: "Vira-lata",
        image: "https://place-puppy.com/200x200",
        address: {
          rua: "Rua das Flores",
          numero: "123",
          bairro: "Centro",
          cep: "12345-678",
          telefone: "11999999999"
        }
      },
      {
        id: "2",
        name: "Luna",
        age: "adulto",
        gender: "Female",
        race: "Labrador",
        image: "https://place-puppy.com/201x201",
        address: {
          rua: "Av. Brasil",
          numero: "456",
          bairro: "Jardim América",
          cep: "23456-789",
          telefone: "21988888888"
        }
      },
      {
        id: "3",
        name: "Rex",
        age: "idoso",
        gender: "Male",
        race: "Pastor Alemão",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw",
        address: {
          rua: "Rua da Paz",
          numero: "789",
          bairro: "Vila Nova",
          cep: "34567-890",
          telefone: "31977777777"
        }
      }
    ];
  }

  routeOut() {
    console.log("Saindo do HomeModule!");
  }
}

App.registerModule("HomeModule", new HomeModule());
export default HomeModule;
