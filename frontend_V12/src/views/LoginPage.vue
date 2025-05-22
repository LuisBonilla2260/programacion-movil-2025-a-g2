<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="goBack" style="background: none; border: none;">
            <FontAwesomeIcon :icon="['fas', 'chevron-left']" style="font-size: 24px; color: #fff;" />
          </ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="login-bg">
      <div class="login-logo">
      </div>
      <div class="login-form-container">
        <h2 class="login-title">Bienvenido a QuickBite</h2>
        <div class="user-icon">
          <svg width="90" height="90" viewBox="0 0 24 24" fill="#111">
            <circle cx="12" cy="8" r="5" />
            <path d="M12 14c-5 0-8 2.5-8 5v1h16v-1c0-2.5-3-5-8-5z" />
          </svg>
        </div>
        <form id="login-form">
          <ion-item lines="none" class="login-item">
            <ion-input placeholder="Usuario" type="text" required></ion-input>
          </ion-item>
          <ion-item lines="none" class="login-item">
            <ion-input placeholder="Contraseña" type="password" required></ion-input>
          </ion-item>
          <ion-button expand="block" class="login-btn" type="submit">iniciar sesión</ion-button>
          <div class="forgot-link">
            <a href="#" @click.prevent="goToRegister">Registrar Usuario!</a>
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
IonItem, IonInput, IonButton, IonButtons,} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronLeft)

const router = useRouter()

function goBack() {
  router.push({ name: 'Home' });
}

function goToRegister() {
  router.push({ name: 'Register' });
}
</script>
<style scoped>
.login-bg {
  --background: #111 !important;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.login-logo {
  display: flex;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 16px;
}
.logo-img {
  width: 160px;
  max-width: 90vw;
}

.login-form-container {
  background: #d3d3d3;
  border-radius: 32px;
  padding: 32px 24px 24px 24px;
  max-width: 350px;
  margin: 0 auto;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-title {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 18px;
  color: #111;
}

.user-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}

#login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-item {
  background: transparent !important;
  --background: transparent !important;
  border-bottom: 1.5px solid #444;
  margin-bottom: 18px;
  --padding-start: 0;
  --inner-padding-end: 0;
  --inner-padding-start: 0;
  --min-height: 48px;
}

ion-input {
  color: #111 !important;
  font-size: 1rem;
  background: transparent;
}

.login-btn {
  --background: #111 !important;
  --color: #fff !important;
  border-radius: 24px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 18px;
  margin-bottom: 10px;
  height: 48px;
  text-transform: none;
}

.forgot-link {
  text-align: center;
  margin-top: 8px;
  width: 100%;
}
.forgot-link a {
  color: #111;
  font-size: 0.98rem;
  text-decoration: none;
}
</style>
