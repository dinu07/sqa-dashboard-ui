<template>

    <div class="row">
      <div class="col-12 alert alert-secondary h4">
          {{msg}}
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.h4 {
  margin: 1rem;
  padding: 5px;
  background-color: hsl(202, 100%, 38%);
  color: hsl(202, 100%, 95%);
}
</style>
