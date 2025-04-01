import React from 'react';
import GestionPersonalCard from '../components/GestionPersonalCard';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react';

const Paciente: React.FC = () => {
  const savedData = localStorage.getItem('Gestión de Personal Médico - Paciente');
  const dataList = savedData ? JSON.parse(savedData) : [];

  return (
    <div>
      <GestionPersonalCard
        title="Gestión de Personal Médico - Paciente"
        additionalFields={[
          { label: 'Número de historia clínica', type: 'text', placeholder: 'Historia clínica' },
          { label: 'Tipo de afiliación', type: 'text', placeholder: 'EPS o particular' },
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
                      <p><strong>Número de historia clínica:</strong> {item['Número de historia clínica']}</p>
                      <p><strong>Tipo de afiliación:</strong> {item['Tipo de afiliación']}</p>
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

export default Paciente;
