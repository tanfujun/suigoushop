<template>
  <div class="dashboard-container">
    <Card></Card>
    <Sale style="margin-top:10px"></Sale>
    <Observe style="margin-top:10px"></Observe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from './Card/index.vue';
import Sale from './sale/index.vue';
import Observe from './observe/index.vue';

export default {
    name: "Dashboard",
    computed: {
        ...mapGetters([
            "name"
        ])
    }, 
    components: { Card, Sale, Observe }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
