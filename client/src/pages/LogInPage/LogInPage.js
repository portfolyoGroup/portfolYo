import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonGrid, IonRow, IonButton, IonCard } from '@ionic/react';
// import allComponents from '../components'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import './LogInPage.scss'
import pages from '../Pages'

const LogIn = () => {

    const history = useHistory()

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
                                    <h1>Login</h1>
                                </div>
                                <div className='centeredItem'>
                                    <IonItem class='centeredItem'>
                                        <IonInput className='robricStyle' name="email" type="email" placeholder="your@email.com" ></IonInput>
                                    </IonItem>
                                    <IonItem class='centeredItem' >
                                        <IonInput name="password" type="password" placeholder="Password" />
                                    </IonItem>
                                </div>
                                <div>
                                    <IonItem class='centeredItem'>
                                        <IonButton onClick={() => alert('you are loged in, I am proud of you.')} size="large" type="submit">Login</IonButton>
                                    </IonItem>
                                    <IonItem class='centeredItem'>
                                        <IonLabel onClick={() => history.push(pages.registerRoute)} style={{ cursor: 'pointer' }}>not a member ? sign in</IonLabel>
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