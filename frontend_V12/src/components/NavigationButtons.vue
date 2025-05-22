<template>
    <div id="navigation-buttons">
      <ion-button
        v-for="(button, index) in buttons"
        :key="index"
        :router-link="button.link"
        :color="button.color"
        expand="block"
        type="submit"
      >
        {{ button.label }}
      </ion-button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { IonButton } from '@ionic/vue';
  
  // Define an array of button data
  const buttons = [
    { label: 'Producto', link: '/menu', color: 'primary' },
    { label: 'Pedido', link: '/order', color: 'primary' },
    { label: 'Historial', link: '/history', color: 'primary' },
  ];
  </script>
  
  <style scoped>
  #navigation-buttons ion-button {
    margin-top: 12px;
  }
  </style>