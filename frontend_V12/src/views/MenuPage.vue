<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="clear" @click="goBack">
            <font-awesome-icon :icon="['fas', 'chevron-left']" style="font-size: 24px; color: #fff;" />
          </ion-button>
        </ion-buttons>
        <ion-title class="centered-title">Menu</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" @click="goToCreateProduct">
            <font-awesome-icon :icon="['fas', 'plus']" style="font-size: 24px; color: #fff;" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-searchbar v-model="busqueda" placeholder="Buscar producto..." show-clear-button="always" />
    </ion-header>

    <ion-content :fullscreen="false" class="ion-padding">
      <div class="categoria-tabs">
        <ion-segment v-model="categoriaSeleccionadaId" scrollable>
          <ion-segment-button v-for="cat in categorias" :key="cat.id" :value="String(cat.id)">
            {{ cat.nombreCategoria }}
          </ion-segment-button>
        </ion-segment>
      </div>

      <ion-list v-if="productosFiltrados.length">

        <div v-for="producto in productosFiltrados" :key="producto.id" class="producto-card">
          <div class="producto-header">
            <strong>{{ producto.nombreProducto }}</strong>
            <font-awesome-icon
              :icon="['fas', 'pen-to-square']"
              class="edit-icon"
              @click="goToEditProduct(producto.id)"
            />
          </div>
          <p>{{ producto.descripcion }}</p>
          <p class="precio">${{ formatPrecio(producto.precio) }}</p>

          <div class="cantidad-controls">
            <ion-button size="small" fill="outline" @click="decrementCantidad(producto.id)">-</ion-button>
            <span class="cantidad-text">{{ cart.cantidadPorProducto(producto.id) }}</span>
            <ion-button size="small" fill="outline" @click="incrementCantidad(producto.id)">+</ion-button>
          </div>
        </div>
      </ion-list>

      <div v-else class="no-result">
        <ion-label class="ion-text-center">
          <p>No se encontraron productos.</p>
        </ion-label>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonButton, IonButtons,
  IonItemDivider, IonSegment, IonSegmentButton, IonSearchbar
} from '@ionic/vue';
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCartStore } from '@/store/cart';
import { ProductoService } from '@/services/ProductoService';
import { CategoriaService } from '@/services/CategoriaService';
import { Producto } from '@/models/Producto';
import { Categoria } from '@/models/Categoria';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
library.add(faChevronLeft, faPlus, faPenToSquare);

const productos = ref<Producto[]>([]);
const categorias = ref<Categoria[]>([]);
const categoriaSeleccionadaId = ref<string>('');
const busqueda = ref<string>('');
const cart = useCartStore();

const productosPorCategoria = computed(() => {
  const map: Record<number, Producto[]> = {};
  for (const producto of productos.value) {
    const catId = producto.categoriaId?.id;
    if (!catId) continue;
    if (!map[catId]) map[catId] = [];
    map[catId].push(producto);
  }
  return map;
});

const productosFiltrados = computed(() => {
  const texto = busqueda.value.trim().toLowerCase();
  // Solo productos con status true
  const productosCat = (productosPorCategoria.value[Number(categoriaSeleccionadaId.value)] || []).filter(p => p.status === true);
  if (!texto) return productosCat;
  return productosCat.filter(p =>
    p.nombreProducto.toLowerCase().includes(texto) ||
    p.descripcion.toLowerCase().includes(texto)
  );
});

const fetchCategorias = async () => {
  try {
    const catRes = await CategoriaService.getAll();
    if (catRes?.status) {
      categorias.value = catRes.data.map((cat: any) =>
        new Categoria(cat.id, cat.nombreCategoria)
      );
      if (categorias.value.length > 0) {
        categoriaSeleccionadaId.value = String(categorias.value[0].id);
      }
    }
  } catch {
    categorias.value = [];
  }
};

const fetchProductos = async () => {
  try {
    const prodRes = await ProductoService.getAll();
    if (prodRes?.status) {
      productos.value = prodRes.data.map((product: any) => {
        const categoria = new Categoria(
          product.categoriaId.id,
          product.categoriaId.nombreCategoria
        );
        return new Producto(
          product.id,
          product.nombreProducto,
          product.precio,
          product.descripcion,
          product.status,
          categoria
        );
      });
    }
  } catch {
    productos.value = [];
  }
};

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  await fetchCategorias();
  await fetchProductos();
});

// --- NUEVO: Recargar productos cuando la ruta sea /menu ---
watch(
  () => route.fullPath,
  async (newPath) => {
    if (newPath === '/menu') {
      await fetchProductos();
    }
  }
);

function goToCreateProduct() {
  router.push('/productos/crear');
}

function incrementCantidad(productoId: number) {
  cart.agregar(productoId);
}

function decrementCantidad(productoId: number) {
  cart.quitar(productoId);
}

function goBack() {
  router.push('/home');
}

function goToEditProduct(productoId: number) {
  router.push(`/productos/editar/${productoId}`);
}

function formatPrecio(valor: number) {
  return valor.toLocaleString('es-CO'); 
}
</script>

<style scoped>
.fab-round {
  --border-radius: 50%;
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #222 !important;
  color: #fff !important;
  border: none;
}
.fab-round .fa-icon {
  font-size: 20px;
  color: #fff;
}
.back-fab {
  --border-radius: 50%;
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #222 !important;
  color: #fff !important;
  border: none;
}
.back-icon {
  font-size: 20px;
  color: #fff;
}
.categoria-tabs {
  margin-bottom: 16px;
  margin-top: 8px;
}
ion-item {
  margin-bottom: 12px;
}
.cantidad-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}
.cantidad-text {
  min-width: 20px;
  text-align: center;
}
.no-result {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  color: #888;
  text-align: center;
}
.centered-title {
  text-align: center;
  width: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
  position: absolute;
  pointer-events: none;
}
.producto-card {
  background: rgba(255, 255, 255, 0.7);
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #000;
  text-align: center; 
}
.producto-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-bottom: 4px;
}
.edit-icon {
  cursor: pointer;
  font-size: 18px;
  color: #000;
}
.precio {
  font-weight: bold;
  margin: 5px 0;
}
.producto-header strong {
  flex: 1;
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
}
.cantidad-controls ion-button {
  --background: transparent;
  --background-hover: transparent;
  --background-activated: transparent;
  --background-focused: transparent;
  --border-color: transparent;
  --box-shadow: none;
  color: #000;
  --color: #000;
  border: none;
  min-width: 32px;
  min-height: 32px;
  font-size: 1.3rem;
  padding: 0 8px;
}
ion-segment-button {
  --color-checked: white;
  --indicator-color: white;
  color: #fff;
}
ion-segment-button.ion-activated {
  color: white; 
}
</style>
