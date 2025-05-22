<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Cart</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/menu">Menu</ion-button>
          <ion-button router-link="/home">Home</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div id="cart-container" v-if="cartItems.length">
        <ion-list>
          <ion-item v-for="item in cartItems" :key="item.id">
            <ion-label>
              <h2>{{ item.name }}</h2>
              <p>Cantidad: {{ item.quantity }}</p>
              <p>Precio: ${{ item.price.toFixed(2) }}</p>
            </ion-label>
            <ion-button slot="end" color="danger" @click="removeFromCart(item.id)">Eliminar</ion-button>
          </ion-item>
        </ion-list>
        <div id="total-price">
          <h3>Total: ${{ totalPrice.toFixed(2) }}</h3>
        </div>
        <ion-button expand="block" color="danger" @click="clearCart">Vaciar Carrito</ion-button>
      </div>

      <div id="empty-cart" v-else>
        <p>Tu carrito está vacío.</p>
        <ion-button expand="block" router-link="/menu">Ir al Menú</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonButton, IonButtons
} from '@ionic/vue';
import { computed, ref, onMounted } from 'vue';
import { useCartStore } from '@/store/cart';
import { ProductoService } from '@/services/ProductoService';
import { Producto } from '@/models/Producto';

const cart = useCartStore();
const productos = ref<Producto[]>([]);

onMounted(async () => {
  const res = await ProductoService.getAll();
  productos.value = res.data;
});

const cartItems = computed(() => {
  return productos.value
    .filter(p => cart.cantidadPorProducto(p.id) > 0)
    .map(p => ({
      id: p.id,
      name: p.nombreProducto,
      quantity: cart.cantidadPorProducto(p.id),
      price: p.precio
    }));
});

const totalPrice = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.quantity * item.price, 0)
);

function removeFromCart(itemId: number) {
  cart.quitar(itemId);
}

function clearCart() {
  cart.limpiarCarrito();
}
</script>

<style scoped>
#cart-container, #empty-cart {
  text-align: center;
  padding: 16px;
}

#cart-container ion-item {
  margin-bottom: 12px;
}

#empty-cart p {
  font-size: 18px;
  color: #8c8c8c;
  margin-bottom: 16px;
}

#total-price {
  margin: 16px 0;
  font-size: 20px;
  font-weight: bold;
}
</style>
