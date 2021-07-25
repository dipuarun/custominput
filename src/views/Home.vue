<template>
  <div class="home">
    <Mainpage />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Mainpage from '@/components/Mainpage.vue'; // @ is an alias to /src

@Options({
  components: {
    Mainpage,
  },
})
export default class Home extends Vue {}
</script>
