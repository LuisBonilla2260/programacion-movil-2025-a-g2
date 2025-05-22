<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="clear" @click="goBack">
            <font-awesome-icon :icon="['fas', 'chevron-left']" style="font-size: 24px; color: #fff;" />
          </ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center">{{ isEditing ? "Editar Producto" : "Nuevo Producto" }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding ion-text-center">
      <div class="custom-form ion-margin-auto">
        <font-awesome-icon :icon="['fas', 'burger']" class="burger-icon" />

        <form @submit.prevent="submitForm">
          <ion-list>
            <ion-item class="minimal-item">
              <ion-input v-model="product.nombreProducto" placeholder="Nombre del producto" class="minimal-input"
                required />
            </ion-item>

            <ion-item class="minimal-item">
              <ion-input type="text" v-model="precioInput" placeholder="Precio" class="minimal-input" required
                inputmode="numeric" />
            </ion-item>

            <ion-item class="minimal-item">
              <ion-textarea v-model="product.descripcion" placeholder="Descripción" class="minimal-input" required />
            </ion-item>

            <ion-item class="minimal-item">
              <ion-select v-model="product.categoriaId.id" interface="popover" placeholder="Categoría"
                class="minimal-input" required>
                <ion-select-option v-for="cat in categorias" :key="cat.id" :value="cat.id">
                  {{ cat.nombreCategoria }}
                </ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item lines="none" class="minimal-toggle">
              <ion-label>Activo</ion-label>
              <ion-toggle v-model="product.status" />
            </ion-item>
          </ion-list>
          <ion-button
            v-if="isEditing"
            expand="block"
            class="black-button"
            type="submit"
          >
            Actualizar
          </ion-button>
          <ion-button
            v-else
            expand="block"
            class="black-button"
            type="submit"
            @click="reloadPage"
          >
            Agregar
          </ion-button>
          <ion-button
            v-if="isEditing"
            expand="block"
            class="black-button"
            @click="eliminarProducto"
            type="button"
          >
            Eliminar
          </ion-button>
          <ion-button
            v-else
            expand="block"
            class="black-button"
            @click="cancel"
            type="button"
          >
            Cancelar
          </ion-button>
          <div v-if="errorMessage" style="color:red; margin-top:10px;">{{ errorMessage }}</div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonInput, IonTextarea,
  IonButton, IonButtons, IonSelect, IonSelectOption, IonToggle
} from '@ionic/vue';

import { ProductoService } from '@/services/ProductoService';
import { CategoriaService } from '@/services/CategoriaService';
import { Producto } from '@/models/Producto';
import { Categoria } from '@/models/Categoria';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faPlus, faBurger } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faChevronLeft, faPlus, faBurger);

defineExpose({
  components: {
    FontAwesomeIcon
  }
});

const router = useRouter();
const route = useRoute();
const isEditing = ref(false);

const product = ref<Producto>({
  id: 0,
  nombreProducto: "",
  precio: 0,
  descripcion: "",
  status: true,
  categoriaId: {} as Categoria,
});
const categorias = ref<Categoria[]>([]);
const errorMessage = ref("");

const loadProduct = async (id: number) => {
  try {
    const response = await ProductoService.getById(id);
    product.value = response.data;
  } catch (error) {
    console.error("Error al cargar el producto:", error);
  }
};

const loadCategorias = async () => {
  try {
    const response = await CategoriaService.getAll();
    categorias.value = response.data;
  } catch (error) {
    console.error("Error al cargar las categorías:", error);
  }
};

const submitForm = async () => {
  try {
    if (!product.value.nombreProducto || !product.value.precio || !product.value.categoriaId.id) {
      errorMessage.value = "Por favor, completa todos los campos obligatorios.";
      return;
    }

    const producto = {
      id: product.value.id,
      nombreProducto: product.value.nombreProducto,
      precio: product.value.precio,
      descripcion: product.value.descripcion,
      status: product.value.status,
      categoriaId: {
        id: product.value.categoriaId.id,
        nombreCategoria: product.value.categoriaId.nombreCategoria
      }
    };

    if (isEditing.value) {
      await ProductoService.update(product.value.id, producto);
    } else {
      await ProductoService.create(producto);
    }
    reloadPage();
  } catch (error: any) {
    console.error("Error al guardar el producto:", error);
    errorMessage.value = error.response?.data?.message || "Error interno del servidor.";
  }
};

const precioInput = ref("");
watch(precioInput, (nuevo) => {
  let soloNumeros = nuevo.replace(/\D/g, "");
  soloNumeros = soloNumeros.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  precioInput.value = soloNumeros;

  product.value.precio = Number(soloNumeros.replace(/\./g, ""));

});

onMounted(() => {
  loadCategorias();
  const productId = route.params.id;
  if (productId) {
    isEditing.value = true;
    loadProduct(Number(productId));
  } else {
    isEditing.value = false;
    product.value.id = null;
  }
});

watch(
  () => product.value.precio,
  (nuevo) => {
    if (nuevo) {
      precioInput.value = nuevo
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
);

const cancel = () => {
  router.replace("/menu");
};

const reloadPage = () => {
  router.replace("/menu");
};

const goBack = () => {
  router.replace("/menu");
};

watch(
  () => product.value.nombreProducto,
  (nuevo) => {
    if (nuevo && nuevo !== nuevo.toUpperCase()) {
      product.value.nombreProducto = nuevo.toUpperCase();
    }
  }
);

const eliminarProducto = async () => {
  try {
    if (product.value.id) {
      await ProductoService.remove(product.value.id);
      reloadPage();
    }
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || "Error al eliminar el producto.";
  }
};
</script>

<style scoped>
.custom-form {
  background-color: rgba(255, 255, 255, 0.8); 
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  margin: auto;
  color: #111 !important;
}

.custom-form,
.custom-form * {
  color: #111 !important;
}

.burger-icon {
  font-size: 70px;
  color: #222;
  margin-bottom: 2px;
}

ion-list {
  background: transparent;
}

.minimal-item {
  --background: transparent;
  border-bottom: 1px solid #999;
  margin-bottom: 10px;
  --inner-padding-end: 0;
  --inner-padding-start: 0;
  --padding-start: 0;
  --min-height: 50px;
}

.minimal-input::part(native),
ion-textarea::part(native) {
  border: none;
  background: transparent;
  font-size: 16px;
  color: #111 !important;
  padding: 8px 0;
  width: 100%;
}

ion-select.minimal-input::part(text) {
  background: transparent;
  color: #111 !important;
  font-size: 16px;
  padding: 8px 0;
}

ion-select::part(icon) {
  color: #666;
}

::placeholder {
  color: #666;
}

.minimal-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #999;
  padding: 10px 0;
  --background: transparent !important;
}

led-button {
  margin-top: 18px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  --background: #3880ff;
  --color: white;
}

.styled-button[color="medium"] {
  --background: #ccc;
  --color: #333;
}

.black-button {
  --background: #000 !important;
  --color: #fff !important; 
  color: #fff !important; 
  border-radius: 20px;
  font-weight: bold;
  font-size: 16px;
  margin-top: 16px;
  height: 45px;
  text-transform: none;
}
</style>


