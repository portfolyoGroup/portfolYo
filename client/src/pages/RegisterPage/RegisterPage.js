import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonInput, IonItem, IonGrid, IonRow, IonButton, IonCard } from '@ionic/react';
// import allComponents from '../components'
import { useHistory, Router } from "react-router-dom";
import { useRegister } from '../../services/profileService'
import '../LogInPage/LogInPage.scss'
import { Link } from "react-router-dom";
import { Route, Redirect, useParams } from 'react-router-dom'

const RegisterPage = () => {

    const history = useHistory();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const handleRegister = async () => {
        if (isValidForm()) {
            const { id } = await useRegister(email, password)
            navigateToHomePage(id)
        }
    }

    const navigateToHomePage = (id) => {
        localStorage.setItem('id', `${id}`)
        history.push(`/home/${id}`)
    }

    const isValidForm = () => {// TODO: vaildate form
        return true
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className='big-title-portfolyo'>PortfolYo!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="primary">
                <IonCard>
                    <IonGrid>
                        <IonRow color="primary" >
                            <IonCol className='colStyle'>
                                <div className='centeredItem'>
                                    <h1>Register</h1>
                                </div>
                                <div className='centeredItem'>
                                    <IonItem class='centeredItem'>
                                        <IonInput className='robricStyle' name="email" type="email" placeholder="your@email.com" onIonChange={(e) =>{
                                setEmail(e.detail.value)}}></IonInput>
                                    </IonItem>
                                    <IonItem class='centeredItem' >
                                        <IonInput name="password" type="password" placeholder="Password" onIonChange={(e) =>{
                                setPassword(dataToRead, key, e.detail.value)}}/>
                                    </IonItem>

                                </div>
                                <div>
                                    <IonItem class='centeredItem'>
                                        <IonButton onClick={handleRegister} size="large" type="submit">Register</IonButton>
                                    </IonItem>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
            </IonContent>
        </IonPage >
    );
};
export default RegisterPage