import App from "../../controllers/app.js";

class PetDetailsModule {
  constructor() {
    this.autoInit = true;
  }

  init() {
    console.log("Module petDetails inicializado");
  }

  /**
   * Recebe parâmetros da rota, como o ID do pet
   * Exemplo: #/pet-details/3 => params = { id: "3" }
   */
  routeInto(params) {
    if (!params || !params.id) {
      console.warn("Nenhum ID fornecido para página de detalhes");
      App.render("<p>ID do pet não informado.</p>");
      return;
    }

    console.log(`🔄 Renderizando detalhes do pet ID: ${params.id}`);

    this.renderPetDetails(params.id);
  }

  renderPetDetails(petId) {
    // Simulando dados que você buscaria do backend via fetch
    const petData = this.getPetDataMock(petId);

    let content = `<h2>Detalhes do seu futuro amigo</h2>`;

    content += `
    <section> 
      <div class="container">
        <img src="${petData.image}" alt="Imagem" class="image" />

        <form class="form">

          <input type="text" id="name" name="name" placeholder="Nome" required value="${petData.name}" disabled />

          <label for="idade-pet">Idade do Pet:</label>
          <select id="idade-pet" name="idade_pet" disabled>
            <option value="" disabled ${!petData.age ? "selected" : ""}>Selecione</option>
            <option value="filhote" ${petData.age === "filhote" ? "selected" : ""}>Filhote</option>
            <option value="adulto" ${petData.age === "adulto" ? "selected" : ""}>Adulto</option>
            <option value="idoso" ${petData.age === "idoso" ? "selected" : ""}>Idoso</option>
          </select>

          <label for="sexo">Sexo:</label>
          <select id="sexo" name="gender" disabled>
            <option value="Male" ${petData.gender === "Male" ? "selected" : ""}>Macho</option>
            <option value="Female" ${petData.gender === "Female" ? "selected" : ""}>Fêmea</option>
          </select>

          <input type="text" id="race" name="race" placeholder="Raça" required value="${petData.race}" disabled />

          <h3>Endereço</h3>
          <input type="text" id="rua" name="rua" placeholder="Rua" required value="${petData.address.rua}" disabled />
          <input type="text" id="numero" name="numero" placeholder="Número" required value="${petData.address.numero}" disabled />
          <input type="text" id="bairro" name="bairro" placeholder="Bairro" required value="${petData.address.bairro}" disabled />
          <input type="text" id="cep" name="cep" placeholder="CEP" required value="${petData.address.cep}" disabled />
          <input type="tel" id="telefone" name="telefone" placeholder="Telefone" required value="${petData.address.telefone}" disabled />

          <button type="button" id="edit-btn">Editar</button>
          <button type="submit" id="save-btn" disabled>Salvar</button>

        </form>
      </div>
    </section>
    `;

    App.render(content);

    setTimeout(() => {
      this.setupFormHandlers(petId);
    }, 100);
  }

  setupFormHandlers(petId) {
    const form = document.querySelector(".form");
    const inputs = form.querySelectorAll("input, select");
    const editBtn = document.getElementById("edit-btn");
    const saveBtn = document.getElementById("save-btn");

    editBtn.addEventListener("click", () => {
      inputs.forEach(input => input.disabled = false);
      saveBtn.disabled = false;
      editBtn.disabled = true;
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // coleta dados do formulário
      const data = {};
      inputs.forEach(input => {
        data[input.name || input.id] = input.value;
      });
      data.id = petId; // adiciona o id do pet no objeto

      try {
        const response = await fetch(`/api/pet/${petId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Erro ao salvar");

        alert("Dados salvos com sucesso!");

        // volta ao modo visualização
        inputs.forEach(input => input.disabled = true);
        saveBtn.disabled = true;
        editBtn.disabled = false;

      } catch (err) {
        alert("Erro ao salvar: " + err.message);
      }
    });
  }

getPetDataMock(id) {
  const pets = [
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

  return pets.find(pet => pet.id === id);
}


  routeOut() {
    console.log("Saindo do PetDetailsModule!");
  }
}

App.registerModule("PetDetailsModule", new PetDetailsModule());

export default PetDetailsModule;
