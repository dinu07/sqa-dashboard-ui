<template>
    <p class="text-muted text-right font-italic foot-note">*** Chart generated on {{ new Date()}}</p>
</template>
<script>
export default {
  name: 'chart-footer',
}
</script>
<style scoped>
p {
    margin-top: 0.5rem; 
    margin-bottom: -0.5rem;
    font-size:0.75rem;
}
</style>
