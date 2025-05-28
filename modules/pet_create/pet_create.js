
import App from "../../controllers/app.js";

class PetCreateModule {
  constructor() {
    this.autoInit = true;
  }

  init() {
    console.log("Module PetCreateModule inicializado");
  }

  routeInto() {
    this.renderCreateForm();
  }

  renderCreateForm() {
    const content = `
      <h2>Cadastro de Pet para Adoção</h2>
      <section>
        <div class="container">
          <form class="form">
            <input type="text" name="name" placeholder="Nome" required />
            
            <label for="age">Idade:</label>
            <select name="age" required>
              <option value="">Selecione</option>
              <option value="filhote">Filhote</option>
              <option value="adulto">Adulto</option>
              <option value="idoso">Idoso</option>
            </select>

            <label for="gender">Sexo:</label>
            <select name="gender" required>
              <option value="">Selecione</option>
              <option value="Male">Macho</option>
              <option value="Female">Fêmea</option>
            </select>

            <input type="text" name="race" placeholder="Raça" required />
            <input type="url" name="image" placeholder="URL da Imagem" required />

            <h3>Endereço</h3>
            <input type="text" name="rua" placeholder="Rua" required />
            <input type="text" name="numero" placeholder="Número" required />
            <input type="text" name="bairro" placeholder="Bairro" required />
            <input type="text" name="cep" placeholder="CEP" required />
            <input type="tel" name="telefone" placeholder="Telefone" required />

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </section>
    `;

    App.render(content);
    this.setupFormHandler();
  }

  setupFormHandler() {
    const form = document.querySelector(".form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {};
      const inputs = form.querySelectorAll("input, select");

      inputs.forEach(input => {
        data[input.name] = input.value;
      });

      // organiza o objeto de endereço
      data.address = {
        rua: data.rua,
        numero: data.numero,
        bairro: data.bairro,
        cep: data.cep,
        telefone: data.telefone,
      };

      delete data.rua;
      delete data.numero;
      delete data.bairro;
      delete data.cep;
      delete data.telefone;

      try {
        const response = await fetch("/api/pet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Erro ao cadastrar pet");

        alert("Pet cadastrado com sucesso!");
        location.hash = "#/home"; // redireciona para a home ou onde preferir
      } catch (err) {
        alert("Erro ao cadastrar: " + err.message);
      }
    });
  }

  routeOut() {
    console.log("Saindo do PetCreateModule");
  }
}

App.registerModule("PetCreateModule", new PetCreateModule());
export default PetCreateModule;
