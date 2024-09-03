<template>

  <h1>Lista de Post</h1>
  <PostFrom :titulo="titulo" :contenido="contenido" :myId = "idEditable" @submit="createPostLocal" @update="updatePostLocal"/>
  <PostList :statusReload="statusReload" @setEditable="SetEditable" />
</template>

<script lang="ts" setup>

  import { ref } from 'vue';
  import PostList from './components/PostList .vue';
  import PostFrom from './components/PostFrom.vue';
  import {createPost, PostData,updatePost} from "./services/postServices"
  const titulo = ref('');
  const contenido = ref('');
  const idEditable = ref('');
  const statusReload = ref(false)
  const createPostLocal = async (title:string, content:string) => {
    console.log("sendata",title,content)
    await createPost(title,content)
    statusReload.value = true
  }

  const SetEditable = (post:PostData) =>{
    console.log("app",post)
    titulo.value = post.title
    contenido.value = post.content
    idEditable.value = post._id
  }

  const updatePostLocal = async (title: string, content: string, id: string) => {
  console.log("se envio desde formulario", "titulo: " + title, "contenido: " + content, "id: " + id);
  
  await updatePost(title, content, id);
  statusReload.value = true;
};
  

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
