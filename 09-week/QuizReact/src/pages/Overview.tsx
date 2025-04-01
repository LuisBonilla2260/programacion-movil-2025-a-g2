import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';

const Overview: React.FC = () => {
  const entities = [
    {
      title: 'Médico',
      fields: [
        { label: 'Especialidad', value: 'Cardiología' },
        { label: 'Número de licencia médica', value: '12345' },
      ],
    },
    {
      title: 'Enfermero',
      fields: [
        { label: 'Turno asignado', value: 'Nocturno' },
        { label: 'Área de atención', value: 'Urgencias' },
      ],
    },
    {
      title: 'Recepcionista',
      fields: [
        { label: 'Horario laboral', value: '9:00 AM - 5:00 PM' },
        { label: 'Extensión telefónica', value: '101' },
      ],
    },
    {
      title: 'Paciente',
      fields: [
        { label: 'Número de historia clínica', value: 'HC-98765' },
        { label: 'Tipo de afiliación', value: 'EPS' },
      ],
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Vista General</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {entities.map((entity, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>{entity.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {entity.fields.map((field, idx) => (
                  <IonItem key={idx}>
                    <IonLabel>
                      <h2>{field.label}</h2>
                      <p>{field.value}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Overview;
