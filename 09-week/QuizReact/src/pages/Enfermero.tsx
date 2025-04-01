import React from 'react';
import GestionPersonalCard from '../components/GestionPersonalCard';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react';

const Enfermero: React.FC = () => {
  const savedData = localStorage.getItem('Gestión de Personal Médico - Enfermero');
  const dataList = savedData ? JSON.parse(savedData) : [];

  return (
    <div>
      <GestionPersonalCard
        title="Gestión de Personal Médico - Enfermero"
        additionalFields={[
          { label: 'Turno asignado', type: 'text', placeholder: 'Turno' },
          { label: 'Área de atención', type: 'text', placeholder: 'Área de atención' },
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
                      <p><strong>Turno asignado:</strong> {item['Turno asignado']}</p>
                      <p><strong>Área de atención:</strong> {item['Área de atención']}</p>
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

export default Enfermero;
