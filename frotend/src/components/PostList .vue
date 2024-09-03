<template>
  <div class="container mt-4">
    <div class="row">
      <div v-if="loading" class="col-12">
        <p>Loading...</p>
      </div>
      <div v-if="!loading && data.length === 0" class="col-12">
        <p>No posts available.</p>
      </div>
      <div v-for="post in data" :key="post._id" class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.content }}</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-danger btn-sm" @click="deletePost(post._id)">Borrar</button>
            <button class="btn btn-primary btn-sm" @click="editPost(post)">Editar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PostData, getPost, deletePostById } from "../services/postServices";
import { ref, onMounted, defineEmits, defineProps, watch } from 'vue';

const data = ref<PostData[]>([]);
const loading = ref(true);

const fetchPosts = async () => {
  try {
    data.value = await getPost();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  } finally {
    loading.value = false;
  }
};

// Definir props
const props = defineProps({
  statusReload: {
    type: Boolean,
    required: true,
  }
});

// Definir los emits
const emit = defineEmits(['setEditable']);

// Watch para recargar los datos cuando 'statusReload' cambie
watch(() => props.statusReload, (newVal) => {
  if (newVal) {
    fetchPosts();
  }
});

const editPost = (post: PostData) => {
  emit("setEditable", post);  // Emitir el evento con el post
  // Aquí puedes manejar la lógica de edición, como navegar a un formulario de edición o abrir un modal
};

const deletePost = async (id: string) => {
  try {
    await deletePostById(id);
    fetchPosts();  // Refrescar la lista de posts
  } catch (error) {
    console.error('Failed to delete post:', error);
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.card-title {
  font-weight: bold;
}

.card-text {
  font-size: 14px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
