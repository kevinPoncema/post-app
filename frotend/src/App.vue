<template>

  <h1>Lista de Post</h1>
  <PostFrom :titulo="titulo" :contenido="contenido" @submit="createPostLocal"/>
  <PostList :statusReload="statusReload" />
</template>

<script lang="ts" setup>

  import { ref } from 'vue';
  import PostList from './components/PostList .vue';
  import PostFrom from './components/PostFrom.vue';
  import {createPost} from "./services/postServices"
  const titulo = ref('');
  const contenido = ref('');
  const statusReload = ref(false)
  const createPostLocal = async (title:string, content:string) => {
    console.log("sendata",title,content)
    await createPost(title,content)
    statusReload.value = true
  }
  

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
