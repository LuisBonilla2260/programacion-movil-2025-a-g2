import React from 'react';
import GestionPersonalCard from '../components/GestionPersonalCard';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react';

const Recepcionista: React.FC = () => {
  const savedData = localStorage.getItem('Gestión de Personal Médico - Recepcionista');
  const dataList = savedData ? JSON.parse(savedData) : [];

  return (
    <div>
      <GestionPersonalCard
        title="Gestión de Personal Médico - Recepcionista"
        additionalFields={[
          { label: 'Horario laboral', type: 'text', placeholder: 'Horario laboral' },
          { label: 'Extensión telefónica', type: 'text', placeholder: 'Extensión telefónica' },
        ]}
      />
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Usuarios Agregados</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            {dataList.map((item: any, index: number) => (
              <IonRow key={index} style={{ marginBottom: '16px' }}>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{item.nombre} {item.apellido}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p><strong>Edad:</strong> {item.edad}</p>
                      <p><strong>Correo:</strong> {item.correo}</p>
                      <p><strong>Horario laboral:</strong> {item['Horario laboral']}</p>
                      <p><strong>Extensión telefónica:</strong> {item['Extensión telefónica']}</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default Recepcionista;
