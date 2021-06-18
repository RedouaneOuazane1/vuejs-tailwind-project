<template>
  <body class="bg-gradient-to-b from-blue-100 to-blue-300">
    <div class="grid grid-row-2">
      <div class="row-start-1">
        <center>
          <img
            class="mt-40 max-w-sm h-50"
            src="../assets/images/book.png"
            alt="book"
          />
        </center>
      </div>
      <div class="row-start-1 mr-24">
        <center>
          <div class="text-yellow-600 py-8 text-2xl font-extrabold">
            <span v-if="etatAjout()">Ajouter un nouveau livre</span>
            <span v-if="!etatAjout()">Modifier le livre "{{ titre }}" </span>
          </div>
          <div class="w-full max-w-lg py-1">
            <form
              action="#"
              class="bg-gray-200 shadow-2xl rounded px-8 pt-6 pb-8 mb-4"
            >
              <div class="errors-list">
                <div class="text-red-500" v-for="e in listError" :key="e.index">
                  {{ e }}
                </div>

                <label class="label" for="">Titre </label>
                <input
                  name="titre"
                  class="input hover:border-blue-900"
                  type="text"
                  v-model="titre"
                  placeholder=" Titre"
                />
              </div>
              <div>
                <label class="label" for="">Auteur </label>
                <input
                  name="auteur"
                  class="input hover:border-blue-900"
                  type="text"
                  v-model="auteur"
                  placeholder=" Auteur"
                />
              </div>
              <div>
                <label class="label" for="">Description</label>
                <textarea
                  name="description"
                  class="input scroll hover:border-blue-900"
                  v-model="description"
                  cols="20"
                  rows="5"
                ></textarea>
              </div>
              <div>
                <label class="label" for="">date</label>
                <input
                  name="date"
                  class="input hover:border-blue-900"
                  v-model="date"
                  type="date"
                />
              </div>
              <div>
                <label class="label" for="">Prix</label>
                <input
                  name="prix"
                  class="input hover:border-blue-900"
                  type="text"
                  v-model="prix"
                  placeholder=" DH"
                />
              </div>
              <center>
                <!-- Cas où la modification d'un livre -->
                <div v-if="!etatAjout()">
                  <button @click.prevent="editLivre" class="btn mt-6">
                    Modifier
                  </button>
                </div>
                <!-- Cas où l'ajout d'un nouveau livre -->
                <div v-if="etatAjout()">
                  <button @click.prevent="addLivre" class="btn mt-6">
                    Enregistrer
                  </button>
                </div>
              </center>
            </form>
            <div v-if="enregistrer">
              <h3>L'ajout est succès</h3>
            </div>
            <div v-if="modifier">
              <h3>la modification est succèes</h3>
            </div>
          </div>
        </center>
      </div>
    </div>
    <div class="p-24"></div>
  </body>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      livres: [],
      titre: "",
      auteur: "",
      description: "",
      date: "",
      prix: "",
      enregistrer: false,
      modifier: false,
      listError: [],
      id: this.$route.params.id,
    };
  },

  mounted() {
    fetch("http://localhost:3000/livres/" + this.id)
      .then((res) => res.json())
      .then(
        (data) => (
          (this.titre = data.titre),
          (this.auteur = data.auteur),
          (this.description = data.description),
          (this.date = data.date),
          (this.prix = data.prix),
          (this.modifier = false)
        )
      )
      .catch((err) => console.log(err.message));
  },

  methods: {
    async addlivre() {
      this.listError = [];
      if (
        !this.titre ||
        !this.auteur ||
        !this.description ||
        !this.date ||
        !this.prix
      ) {
        this.listError.push("Erreur !! Remplir tous les champs");
      } else {
        const result = await axios.post("http://localhost:3000/livres", {
          titre: this.titre,
          auteur: this.auteur,
          description: this.description,
          date: this.date,
          prix: this.prix,
        });
        this.livres = [...this.livres, result.data];
        this.enregistrer = true;
        (this.titre = ""),
          (this.auteur = ""),
          (this.description = ""),
          (this.date = ""),
          (this.prix = "");
      }
    },
    editLivre() {
      if (confirm("Voulez vous continuer la modification")) {
        axios.put("http://localhost:3000/livres/" + this.id, {
          titre: this.titre,
          auteur: this.auteur,
          description: this.description,
          date: this.date,
          prix: this.prix,
        }).then(
          this.$router.push('/')
        )
        this.modifier=true
      }
    },
    etatAjout() {
      if (!this.id) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
</style>