<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="clear" @click="goBack">
            <font-awesome-icon :icon="['fas', 'chevron-left']" style="font-size: 24px; color: #fff;" />
          </ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Historial</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="groupedDetallesArray.length">
        <div
          v-for="grupo in groupedDetallesArray"
          :key="grupo.facturaId"
          class="ticket-box"
        >
          <div class="ticket-title">
            Pedido # {{ grupo.facturaId }}
          </div>
          <div class="ticket-date">
            Fecha Factura: {{ getFechaFactura(grupo.detalles[0]) }}
          </div>
          <div class="ticket-section">
            <span class="ticket-section-title">Pedido:</span>
            <div class="ticket-products">
              <div
                class="ticket-product-row"
                v-for="detalle in grupo.detalles"
                :key="detalle.id"
              >
                <span>
                  {{ detalle.cantidad }} x {{ getProductoNombre(detalle) }}
                </span>
                <span>
                  ${{ formatCurrency(detalle.subtotal) }}
                </span>
              </div>
            </div>
            
            <div class="ticket-total-row">
              <span>Total:</span>
              <span class="ticket-total-amount">
                ${{ formatCurrency(getTotalFactura(grupo.detalles)) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No hay detalles de factura en la base de datos.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButton, IonButtons
} from '@ionic/vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faChevronLeft);

import { DetalleFacturaService } from '@/services/DetalleFactura';
import { DetalleFactura } from '@/models/DetalleFactura';

const router = useRouter();

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.replace('/home');
  }
};

const detalles = ref<DetalleFactura[]>([]);

const loadDetalles = async () => {
  const detallesRes = await DetalleFacturaService.getAll();
  detalles.value = Array.isArray(detallesRes.data) ? detallesRes.data : [];
};

// Agrupa los detalles por id de factura
const groupedDetalles = computed(() => {
  const grupos: Record<number, DetalleFactura[]> = {};
  for (const detalle of detalles.value) {
    // Soporta tanto facturaId como factura
    const facturaId = detalle.facturaId?.id || detalle.factura?.id;
    if (!facturaId) continue;
    if (!grupos[facturaId]) grupos[facturaId] = [];
    grupos[facturaId].push(detalle);
  }
  return grupos;
});

// Convierte el objeto agrupado en un array para poder usar .length y v-for correctamente
const groupedDetallesArray = computed(() => {
  return Object.entries(groupedDetalles.value).map(([facturaId, detalles]) => ({
    facturaId: Number(facturaId),
    detalles
  }));
});

function getProductoNombre(detalle: any): string {
  if (detalle.productoNombre) return detalle.productoNombre;
  const productos = detalle.facturaId?.pedidoId?.productoId;
  if (Array.isArray(productos)) {
    if (productos.length === 1) return productos[0].nombreProducto;
    const encontrado = productos.find((p: any) => p.precio === detalle.precioUnitario);
    return encontrado ? encontrado.nombreProducto : '';
  }
  if (productos && typeof productos === 'object') {
    return productos.nombreProducto || '';
  }
  const productos2 = detalle.factura?.pedido?.productos;
  if (Array.isArray(productos2)) {
    if (productos2.length === 1) return productos2[0].nombreProducto;
    const encontrado = productos2.find((p: any) => p.precio === detalle.precioUnitario);
    return encontrado ? encontrado.nombreProducto : '';
  }
  return '';
}

function getFechaFactura(detalle: any): string {
  return (
    detalle.facturaId?.fecha ||
    detalle.factura?.fecha ||
    '-'
  );
}

function getTotalFactura(detallesFactura: DetalleFactura[]): number {
  return detallesFactura.reduce((acc, d) => acc + (d.subtotal || 0), 0);
}

function formatCurrency(value: number) {
  return value?.toLocaleString('es-CO', { minimumFractionDigits: 0 });
}

onMounted(() => {
  loadDetalles();
});
</script>

<style scoped>
.ticket-box {
  background: #e0e0e0;
  border-radius: 14px;
  margin-bottom: 22px;
  padding: 18px 28px 18px 28px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  color: #000;
  border: none;
}

.ticket-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 4px;
}

.ticket-date {
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 14px;
}

.ticket-section-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 6px;
  display: block;
}

.ticket-products {
  margin-bottom: 8px;
}

.ticket-product-row,
.ticket-total-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.15rem;
  margin-bottom: 2px;
}

.ticket-total-row {
  font-weight: bold;
  font-size: 1.25rem;
  margin-top: 10px;
}

.ticket-total-amount {
  color: #000;
}

p {
  text-align: center;
  color: #000;
}

font-awesome-icon {
  font-size: 20px;
  color: #000;
}
</style>
