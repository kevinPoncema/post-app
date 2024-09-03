<template>
  <div class="card p-4 mx-auto" style="border: 2px solid black; border-radius: 10px; width: 300px;">
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Título</label>
        <input
          type="text"
          id="title"
          v-model="tituloLocal"
          class="form-control"
          placeholder="Escribe el título"
          required
        />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Contenido</label>
        <textarea
          id="content"
          v-model="contenidoLocal"
          class="form-control"
          rows="3"
          placeholder="Escribe el contenido"
          required
        ></textarea>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-success me-2">Agregar</button>
        <button type="button" @click="onUpdate" class="btn btn-primary me-2">Actualizar</button>
        <button type="button" @click="onClear" class="btn btn-secondary">Limpiar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits, watch } from 'vue';

// Definir props
const props = defineProps({
  titulo: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  myId: {
    type: String,
    required: true,
  }
});

// Definir emisores de eventos
const emit = defineEmits(['submit', 'update']);

// Crear refs para los campos
const tituloLocal = ref(props.titulo);
const contenidoLocal = ref(props.contenido);
const localId = ref(props.myId);

watch(() => props.titulo, (newTitulo) => {
  tituloLocal.value = newTitulo;
});

watch(() => props.contenido, (newContenido) => {
  contenidoLocal.value = newContenido;
});

watch(() => props.myId, (newId) => {
  localId.value = newId;
});

// Manejar el evento de submit
const onSubmit = () => {
  emit('submit', { titulo: tituloLocal.value, contenido: contenidoLocal.value});
  resetForm();
};

// Manejar el evento de update
const onUpdate = () => {
  emit('update', tituloLocal.value, contenidoLocal.value, localId.value);
  resetForm();
};

// Función para reiniciar el formulario
const resetForm = () => {
  tituloLocal.value = '';
  contenidoLocal.value = '';
};

// Función para limpiar el formulario
const onClear = () => {
  resetForm();
};
</script>

<style scoped>
.card {
  border: 2px solid black;
  border-radius: 10px;
  width: 300px; /* Ajuste del ancho del formulario */
}
</style>
