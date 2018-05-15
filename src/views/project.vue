<template>
    <div class="project">
        <h1>
            项目简介{{auth}}
        </h1>
        <div v-for="(project, index) in projects">
            <span>id:{{project.id}}</span>
            <span>name:{{project.name}}</span>
        </div>
        <Button type="ghost" @click="setStateProjects">设置vuex</Button>
        <router-link to="/">到首页</router-link>
    </div>
</template>
<style>

</style>
<script>
export default {
  data() {
    return {

    };
  },
  computed: {
      auth:function(){
          return "胡志辉"
      },
      projects:function(){
          return this.$store.state.projects
      }
  },
  methods:{
      setStateProjects(){
        this.$store.dispatch('increment')
      }
  }
};
</script>
