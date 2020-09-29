import React, { useState } from 'react';
import { IonTabButton, IonContent, IonHeader, IonPage, IonTitle, IonTabBar, IonCol, IonInput, IonItem, IonLabel, IonGrid, IonRow, IonButton, IonCard } from '@ionic/react';
// import allComponents from '../components'
import { useHistory } from "react-router-dom";
import './LogInPage.scss'
import pages from '../Pages'
import { serverLogin } from '../../services/profileService';
import "../../components/sharedStyles.scss"
import agada from '../../resources/Portfolyo.png'

const LogIn = () => {

    const history = useHistory()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const handleLogin = async () => {
        try {
            const id = await serverLogin(email, password)
            navigateToHomePage(id)
        }
        catch (e) {
            alert(e.message || "try again")
        }
    }

    const navigateToHomePage = (id) => {
        sessionStorage.setItem('id', `${id}`)
        history.push(`/home/${id}`)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonTabBar>
                    <IonTabButton tab="" className='title-portfolyo' href={`/`}>
                        <IonTitle size="large">
                            <img src={agada} />
                        </IonTitle>
                    </IonTabButton>
                </IonTabBar>
            </IonHeader>
            <IonContent color="primary">
                <IonCard >
                    <IonGrid>
                        <IonRow color="primary" >
                            <IonCol className='colStyle'>
                                <div className='centeredItem'>
                                    <h1>Login</h1>
                                </div>
                                <div className='centeredItem'>
                                    <IonItem class='centeredItem'>
                                        <IonInput className='robricStyle' name="email" type="email" placeholder="your@email.com" onIonChange={(e) => {
                                            setEmail(e.detail.value)
                                        }}></IonInput>
                                    </IonItem>
                                    <IonItem class='centeredItem' >
                                        <IonInput name="password" type="password" placeholder="Password" onIonChange={(e) => {
                                            setPassword(e.detail.value)
                                        }} />
                                    </IonItem>
                                </div>
                                <div>
                                    <IonItem class='centeredItem'>
                                        <IonButton onClick={handleLogin} size="large" type="submit">Login</IonButton>
                                    </IonItem>
                                    <IonItem class='centeredItem'>
                                        <IonLabel onClick={() => history.push(pages.registerRoute)} style={{ cursor: 'pointer' }}>not a member ? sign up</IonLabel>
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
export default LogIn