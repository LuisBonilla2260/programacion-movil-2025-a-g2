<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="clear" @click="goBack">
            <font-awesome-icon :icon="['fas', 'chevron-left']" style="font-size: 24px; color: #fff;" />
          </ion-button>
        </ion-buttons>

        <ion-title class="ion-text-center">Resumen del Pedido</ion-title>

        <ion-buttons slot="end">
          <ion-button fill="clear" @click="goToMenu">
            <font-awesome-icon :icon="['fas', 'plus']" style="font-size: 24px; color: #fff;" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item v-for="producto in productosEnCarrito" :key="producto.id" class="pedido-item">
          <ion-label>
            <h2 class="producto-nombre">{{ producto.nombreProducto }}</h2>
            <p class="pedido-info" style="color: #111; opacity: 1;">Precio: ${{ producto.precio }}</p>
            <p class="pedido-info" style="color: #111; opacity: 1;">Cantidad: {{ cart.cantidadPorProducto(producto.id)
              }}</p>
            <p class="pedido-info" style="color: #111; opacity: 1;">Fecha: {{ new Date().toLocaleDateString() }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <div v-if="productosEnCarrito.length === 0" class="ion-text-center ion-padding">
        <p>No hay productos en el carrito.</p>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar class="ion-text-center">
        <ion-button class="hacer-pedido-btn" @click="hacerPedido" :disabled="productosEnCarrito.length === 0">
          Hacer Pedido
        </ion-button>
      </ion-toolbar>
    </ion-footer>
    
    <ion-toast :is-open="toastVisible" :message="toastMessage" :color="toastColor" duration="2000" position="bottom"
      @didDismiss="toastVisible = false" />
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonLabel, IonButtons, IonButton
} from '@ionic/vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/cart';
import { ProductoService } from '@/services/ProductoService';
import { Producto } from '@/models/Producto';
import { PedidoService } from '@/services/PedidoService'; 
import { FacturasService } from '@/services/FacturaService';
import { DetalleFacturaService } from '@/services/DetalleFactura';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Pedido } from '@/models/Pedido';
library.add(faChevronLeft, faPlus);

const productos = ref<Producto[]>([]);
const cart = useCartStore();
const router = useRouter();
const loading = ref(false);
const toastVisible = ref(false);
const toastMessage = ref('');
const toastColor = ref('success');


onMounted(async () => {
  const res = await ProductoService.getAll();
  productos.value = res.data;
});

const productosEnCarrito = computed(() => {
  return productos.value.filter(p => cart.cantidadPorProducto(p.id) > 0);
});

const totalPedido = computed(() =>
  productosEnCarrito.value.reduce(
    (acc, item) => acc + cart.cantidadPorProducto(item.id) * item.precio,
    0
  )
);

const crearPedido = (): Pedido => {
  return {
    id: null,
    fecha: new Date().toISOString(),
    estado: true,
    administradorId: null, // O asigna el administrador si lo tienes
    empleadoId: null,      // O asigna el empleado si lo tienes
    productos: productosEnCarrito.value.map(producto => ({ id: producto.id }))
  } as any;
};

// const hacerPedido = async () => {
//   if (productosEnCarrito.value.length === 0) {
//     console.log("El carrito está vacío.");
//     return;
//   }

//   const pedido = crearPedido();
//   loading.value = true;

// try {
//   await PedidoService.create(pedido);
//   toastMessage.value = '¡Pedido realizado con éxito!';
//   toastColor.value = 'success';
//   toastVisible.value = true;
//   cart.limpiarCarrito?.();
//   router.push({ path: '/' });
// } catch (error: any) {
//   toastMessage.value = 'Error al realizar el pedido.';
//   toastColor.value = 'danger';
//   toastVisible.value = true;
//   console.error(error);
// }
// };

const hacerPedido = async () => {
  if (productosEnCarrito.value.length === 0) {
    console.log("El carrito está vacío.");
    return;
  }

  const pedido = crearPedido();
  loading.value = true;

  try {
    // 1. Crear el pedido y esperar la respuesta con el ID real
    const pedidoRes = await PedidoService.create(pedido);
    const pedidoCreado = pedidoRes.data;

    // 2. Calcular el total de la factura y preparar detalles
    const detallesFactura = productosEnCarrito.value.map(producto => {
      const cantidad = cart.cantidadPorProducto(producto.id);
      const precioUnitario = producto.precio;
      const subtotal = cantidad * precioUnitario;
      return {
        status: true,
        factura: null, // Se asignará después de crear la factura
        cantidad,
        precioUnitario,
        subtotal,
        productoNombre: producto.nombreProducto
      };
    });
    const totalFactura = detallesFactura.reduce((acc, d) => acc + d.subtotal, 0);

    // 3. Crear la factura usando el ID del pedido creado
    const facturaPayload = {
      status: true,
      fecha: new Date().toISOString().slice(0, 10),
      total: totalFactura,
      pedido: {
        id: pedidoCreado.id
      }
    };
    const facturaRes = await FacturasService.create(facturaPayload);
    const facturaCreada = facturaRes.data;

    // 4. Crear los detalles de factura en la base de datos
    for (const detalle of detallesFactura) {
      await DetalleFacturaService.create({
        id: null,
        status: true,
        factura: { id: facturaCreada.id },
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precioUnitario,
        subtotal: detalle.subtotal
      });
    }

    alert("¡Pedido, factura y detalles creados con éxito!");
    if (typeof cart.limpiarCarrito === 'function') {
      cart.limpiarCarrito();
    }
    router.push({ path: '/' });
  } catch (error: any) {
    let msg = "Hubo un error al realizar el pedido/factura. Por favor, inténtalo de nuevo.";
    if (error?.response?.data?.message) {
      msg += "\n" + error.response.data.message;
    }
    console.error("Error al realizar el pedido/factura:", error);
    alert(msg);
  } finally {
    loading.value = false;
  }
};

function goBack() {
  router.back();
}

function goToMenu() {
  router.push({ path: '/menu' });
}

function reloadPage() {
  router.replace("/home"); 
}
</script>

<style scoped>
ion-content {
  --background: #111 !important;
}

ion-list {
  background: transparent;
  padding: 0;
}

.pedido-item {
  --background: rgba(255, 255, 255, 0.7) !important; 
  --color: #111 !important;
  border-radius: 0 !important;
  margin-bottom: 8px;
  box-shadow: none;
  border: none;
  color: #111 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.pedido-label {
  color: #111 !important;
  text-align: center;
  width: 100%;
}

.producto-nombre {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #111 !important;
}

.pedido-info {
  font-size: 0.95rem;
  margin: 0;
  color: #111 !important;
  font-weight: normal;
  opacity: 1 !important;
}

.hacer-pedido-btn {
  --background: rgba(255, 255, 255, 0.7) !important;
  --color: #000;
  font-weight: bold !important;
  border: 2px;
  border-radius: 10px;
  padding: 0 18px;
  min-width: unset;
  width: auto;
}

font-awesome-icon {
  font-size: 20px;
  color: #000;
}
</style>