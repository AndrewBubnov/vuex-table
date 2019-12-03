<template>
    <div class="row header">
        <div class="record" v-for="field in filtered" :key="field">
            {{field}}
        </div>
    </div>
</template>


<script>

export default {
  name: 'Header',
    props: ['fields'],
    computed: {
      filtered() {
          return this.fields.map(item => {
              const words = item.split('_');
              words[0] = words[0].charAt(0).toUpperCase() + words[0].substring(1);
              return words.join(' ');
          });
      }
    }
}
</script>


<style scoped>

</style>
