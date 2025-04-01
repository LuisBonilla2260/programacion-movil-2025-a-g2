import React from 'react';
import GestionPersonalCard from '../components/GestionPersonalCard';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react';

const Medico: React.FC = () => {
  const savedData = localStorage.getItem('Gestión de Personal Médico - Médico');
  const dataList = savedData ? JSON.parse(savedData) : [];

  return (
    <div>
      <GestionPersonalCard
        title="Gestión de Personal Médico - Médico"
        additionalFields={[
          { label: 'Especialidad', type: 'text', placeholder: 'Especialidad' },
          { label: 'Número de licencia médica', type: 'text', placeholder: 'Licencia médica' },
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
                      <p><strong>Especialidad:</strong> {item['Especialidad']}</p>
                      <p><strong>Número de licencia médica:</strong> {item['Número de licencia médica']}</p>
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

export default Medico;
