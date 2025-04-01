import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';

interface CardViewProps {
  dataList: Array<{ [key: string]: string }>;
  additionalFields?: { label: string }[];
}

const CardView: React.FC<CardViewProps> = ({ dataList, additionalFields = [] }) => {
  return (
    <IonGrid>
      {dataList.map((item, index) => (
        <IonRow key={index} style={{ marginBottom: '16px' }}>
          <IonCol>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{item.nombre} {item.apellido}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p><strong>Edad:</strong> {item.edad}</p>
                <p><strong>Correo:</strong> {item.correo}</p>
                {additionalFields.map((field) => (
                  <p key={field.label}>
                    <strong>{field.label}:</strong> {item[field.label] || 'N/A'}
                  </p>
                ))}
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default CardView;
