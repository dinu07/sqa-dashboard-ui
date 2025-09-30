<template>
  <section v-if="descriptionHeader">
      <div class="card bg-white mb-3">
          <div class="card-header">
              <h5 class="text-left"><strong>{{descriptionHeader}}</strong></h5>
          </div>
          <div class="card-body">
              <p class="card-text" v-html="descriptionContent"/>
          </div>
      </div>
  </section>
</template>
<script>
export default {
    name: "IssueDescription",
    props: {
        descriptionHeader: String, 
        descriptionContent: String
    }
}
</script>
<style scoped>
  .card {
    margin-top: 2rem;
  }

  .card-text {
    text-align: left;
  }
</style>