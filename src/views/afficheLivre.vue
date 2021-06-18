<template>
  <body class="contain bg-gradient-to-b from-blue-100 to-blue-300 ">
    <center class="">
      <div class="p-8 font-bold">
        <router-link to="/ajout">
          <button class="btn2">
            Ajouter un livre
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 inline-flex"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </router-link>
      </div>
    </center>

    <div
      class="
        px-20
        gap-x-8 gap-y-4
        justify-center
        grid
        md:grid-cols-2
        grid-cols-1
      "
    >
      <div
        v-for="l in livresArray"
        :key="l.id"
        class="
          h-70
          border border-blue-300
          grid grid-cols-3
          mt-8
          rounded-xl
          overflow-hidden
          bg-yellow-50
          shadow-md
          hover:shadow-xl
          relative
        "
      >
        <div class="col-span-1 ">
          <img class="" src="../assets/images/book.png" alt="book" />
          
            <span
              class="
                inline-block
                bg-gray-200
                rounded-full
                px-3
                py-2
                text-sm
                font-semibold
                text-gray-700
                mr-2
                ml-12
                mb-2
              "
              >{{ l.prix }}</span
            >
        </div>
        <div class="col-span-2 space-x-3">
          <br />
          <section class="text-sm font-thin text-orange-400">
            {{ l.date }}
          </section>
          <h3 class="text-2xl font-bold">Titre : {{ l.titre }}</h3>
          <section class="text-xl">Auteur : {{ l.auteur }}</section>
          <br />
          <section class="font-normal text-md text-gray-700">
            Résumé : {{ fragment(l.description) }}
          </section>

          <section class="py-4">
            <router-link :to="'/livre/' + l.id">
              <button class="btn">lire la suite</button>
            </router-link>
            <div class="mx-5 my-2  inline-flex sm:mx-60 ">
              <router-link :to="'/edit/'+l.id" class="mx-2 hover:bg-gray-200 rounded-lg"> 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
            
              </router-link>
              <button @click="deletLivre(l.id)"  class="hover:bg-gray-200 hover: rounded-lg focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
              
            </div>
          </section>
        </div>
      </div>
    </div>
    <!-- <div class="p-24"></div> -->
  </body>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      livresArray: [],
      
      /*livresArray: {
        livres1: {
            id: 1,
          titre: "L Etranger",
          auteur: "Albert Camus",
          description: "description .........",
          prix: "45 DH",
          date: "12/06/2021",
        },
      },*/
    };
  },
  mounted() {
    fetch("http://localhost:3000/livres")
      .then((res) => res.json())
      .then((data) => (this.livresArray = data))
      .catch((err) => console.log(err.message));
  },
  created() {},
  computed:{
    
  },
  methods: {
    fragment(value) {
      return value.slice(0, 80) + "...";
      console.log('run');
    },
     deletLivre(id){
       if(confirm("Voulez vous continuer la suppression")){
         axios.delete('http://localhost:3000/livres/'+id)}
    },
  },
};
</script>
<style scoped>
.contain{
  min-height: 90vh;
}
</style>