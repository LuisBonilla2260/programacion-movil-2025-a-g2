import React, { useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
} from '@ionic/react';
import { TextFieldTypes } from '@ionic/core';
import { useHistory } from 'react-router-dom';
import CardView from './CardView';

interface GestionPersonalCardProps {
  title: string;
  additionalFields?: { label: string; type: string; placeholder: string }[];
}

const GestionPersonalCard: React.FC<GestionPersonalCardProps> = ({ title, additionalFields = [] }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [additionalValues, setAdditionalValues] = useState<{ [key: string]: string }>({});
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [dataList, setDataList] = useState<Array<{ [key: string]: string }>>(() => {
    const savedData = localStorage.getItem(title);
    return savedData ? JSON.parse(savedData) : [];
  });

  const handleInputChange = (key: string, value: string) => {
    setAdditionalValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleAgregar = () => {
    if (!nombre || !apellido || !edad || !correo) {
      setAlertMessage('Por favor, complete todos los campos obligatorios.');
      return;
    }
    const newData = { nombre, apellido, edad, correo, ...additionalValues };
    const updatedDataList = [...dataList, newData];
    setDataList(updatedDataList);
    localStorage.setItem(title, JSON.stringify(updatedDataList)); // Guardar en almacenamiento local
    setAlertMessage('Registro agregado exitosamente.');
    setNombre('');
    setApellido('');
    setEdad('');
    setCorreo('');
    setAdditionalValues({});
  };

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput
              value={nombre}
              placeholder="Nombre"
              onIonChange={(e) => setNombre(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Apellido</IonLabel>
            <IonInput
              value={apellido}
              placeholder="Apellido"
              onIonChange={(e) => setApellido(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Edad</IonLabel>
            <IonInput
              type="number"
              value={edad}
              placeholder="Edad"
              onIonChange={(e) => setEdad(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Correo electrónico</IonLabel>
            <IonInput
              type="email"
              value={correo}
              placeholder="Correo electrónico"
              onIonChange={(e) => setCorreo(e.detail.value!)}
            />
          </IonItem>
          {additionalFields.map((field, index) => (
            <IonItem key={index}>
              <IonLabel position="stacked">{field.label}</IonLabel>
              <IonInput
                type={field.type as TextFieldTypes}
                placeholder={field.placeholder}
                onIonChange={(e) => handleInputChange(field.label, e.detail.value!)}
              />
            </IonItem>
          ))}
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={handleAgregar}>
                  Agregar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
      {alertMessage && (
        <IonAlert
          isOpen={!!alertMessage}
          onDidDismiss={() => setAlertMessage(null)}
          header="Acción realizada"
          message={alertMessage}
          buttons={['OK']}
        />
      )}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Registros de {title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <CardView dataList={dataList} additionalFields={additionalFields} />
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default GestionPersonalCard;
