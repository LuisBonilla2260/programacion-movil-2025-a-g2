<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ProductoService } from '@/services/ProductoService';
// ...otros imports...

const route = useRoute();
const productoId = route.params.id ? Number(route.params.id) : null;

const form = ref({
  nombreProducto: '',
  descripcion: '',
  precio: 0,
  // ...otros campos...
});

onMounted(async () => {
  if (productoId) {
    const res = await ProductoService.getById(productoId);
    if (res?.status) {
      form.value = {
        nombreProducto: res.data.nombreProducto,
        descripcion: res.data.descripcion,
        precio: res.data.precio,
        // ...otros campos...
      };
    }
  }
});
</script>

<template>
  <form>
    <input v-model="form.nombreProducto" placeholder="Nombre del producto" />
    <input v-model="form.descripcion" placeholder="Descripción" />
    <input v-model="form.precio" type="number" placeholder="Precio" />
    <!-- ...otros campos... -->
  </form>
</template>
