<template>
  <div class="container mt-4">
    <div class="row">
      <div v-if="loading" class="col-12">
        <p>Loading...</p>
      </div>
      <div v-if="!loading && data.length === 0" class="col-12">
        <p>No posts available.</p>
      </div>
      <div v-for="post in data" :key="post.postId" class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ post.postTitle }}</h5>
            <p class="card-text">{{ post.postContent }}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Post ID: {{ post.postId }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PostData, getPost } from "../services/postServices";
import { ref, onMounted } from 'vue';

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
</style>
