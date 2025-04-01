import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import './Home.css';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();

  const navigateTo = (path: string) => {
    history.push(path); // Navegación dinámica sin recarga
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestión de Personal Médico</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Gestión de Personal Médico</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <h1>Bienvenido a la Gestión de Personal Médico</h1>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={() => navigateTo('/medico')}>
                  Ir a Médico
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" onClick={() => navigateTo('/enfermero')}>
                  Ir a Enfermero
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={() => navigateTo('/recepcionista')}>
                  Ir a Recepcionista
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" onClick={() => navigateTo('/paciente')}>
                  Ir a Paciente
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={() => navigateTo('/overview')}>
                  Ver Vista General
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
