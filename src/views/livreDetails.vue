<template>
  <body class="bg-gradient-to-b from-blue-100 to-blue-300 h-screen">
    <center>
      <div class="py-24 px-64 ">
        <h1 class="text-2xl font-bold"> {{ livre.titre }}</h1>
        <p class="text-xl font-bold" >( {{ livre.auteur }} )</p><br>
        <p class="">Résumé</p>
        <p>{{ livre.description }}</p><br>
        <p>Prix : {{ livre.prix }}</p>
        <p>La date de publication : {{ livre.date }}</p>
      </div>
    </center>

    <!-- <div class="p-24"></div> -->
  </body>
</template>

<script>
export default {
  // props:['id'],
  data() {
    return {
      id: this.$route.params.id,
      livre: {},
    };
  },
  mounted() {
    fetch("http://localhost:3000/livres/" + this.id)
      .then((res) => res.json())
      .then((data) => (this.livre = data))
      .catch((err) => console.log(err.message));
  },
};
</script>

<style>
</style>