import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonTabBar, IonTabButton, IonCol, IonInput, IonItem, IonGrid, IonRow, IonButton, IonCard } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { serverRegister } from '../../services/profileService'
import '../LogInPage/LogInPage.scss'
import agada from "../../resources/Portfolyo.png";

const RegisterPage = () => {

    const history = useHistory();
    // const history = createBrowserHistory({ forceRefresh: true }) //maybe??
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const handleRegister = async () => {
        if (isValidForm()) {
            try {
                const id = await serverRegister(email, password)
                navigateToHomePage(id)
            }
            catch (e) {
                alert(e.message)
            }
        }
    }

    const navigateToHomePage = (id) => {
        sessionStorage.setItem('id', `${id}`)
        history.push(`/home/${id}`)
    }

    const isValidForm = () => {// TODO: vaildate form
        return true
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
                <IonCard>
                    <IonGrid>
                        <IonRow color="primary" >
                            <IonCol className='colStyle'>
                                <div className='centeredItem'>
                                    <h1>Register</h1>
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