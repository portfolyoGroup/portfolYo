import React, { useEffect, useState } from 'react';
import { IonButton, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonCardContent, IonCardHeader, IonCard } from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
import {setProfile, setProfileData} from '../../services/profileService'

const dataOfAbout = {
    description: "Tell us about you:",
    programing_languages: 'c, Java, etc...',
    skills: 'react, ',
    experience: 'mention your current and past roles in projects and jobs'
}
const dataOfContact = {
    date_of_birth: "5.5.1875",
    address: 'TLV fashion mall',
    phone: '051113345'
}
const dataOfProfileHome = {
    name: "Israel Israeli",
    title: 'your main occpation, e.g cs student',
    main_description: 'your main occpation, e.g cs student'
}

const UpdateProfileInfo = () => {
    const setField = (dataToRead, key, text) => {
        dataToRead[key] = text
    }
    const MyList = ({ dataToRead }) => {
        return (
            <IonList>
                {Object.entries(dataToRead).map(([key, value], index) => {
                    return (
                        <IonItem key={index}>
                            <IonLabel position="floating">{key}</IonLabel>
                            <IonInput placeholder={value} clearInput onIonChange={(e) =>{
                                setField(dataToRead, key, e.detail.value)}} ></IonInput>
                        </IonItem>
                    )
                })}
            </IonList>
        )
    }
    const handleFormSubmit = () => {
        const id = localStorage.getItem('id')
        setProfileData(id, {dataOfAbout, dataOfContact, dataOfProfileHome})
    }
    return (
        <IonCard>
            <IonCardHeader>
                <IonToolbar>
                    <IonTitle>Update your profile</IonTitle>
                </IonToolbar>
            </IonCardHeader>
            <IonCardContent>
                <IonItemDivider>Main Profile info</IonItemDivider>
                <MyList dataToRead={dataOfProfileHome}></MyList>
                <IonItem class='ion-padding'>
                    <IonLabel position='stacked'> Upload a photo</IonLabel>
                    <IonInput type='file' clearInput></IonInput>
                </IonItem>
                <IonItemDivider>About</IonItemDivider>
                <MyList dataToRead={dataOfAbout}></MyList>
                <IonItemDivider>Contact</IonItemDivider>
                <MyList dataToRead={dataOfContact}></MyList>
            </IonCardContent>
                <IonItem class='centeredItem'>
                    <IonButton onClick={handleFormSubmit} size="large" type="submit">update!</IonButton>
                </IonItem>
        </IonCard>
    );

};
export default UpdateProfileInfo