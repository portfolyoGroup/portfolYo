import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonGrid, IonRow, IonButton, IonCard } from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
// import allComponents from '../components'
import './LogInPage.scss'

const LogIn = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className='big-title-portfolyo'>PortfolYo!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="primary" padding>
                <IonCard>
                <IonGrid>
                    <IonRow color="primary" >
                        <IonCol className='colStyle'>
                            <div className='centeredItem'>
                                <h1>Login</h1>
                            </div>
                            <div className='centeredItem' padding>
                                <IonItem class='centeredItem'>
                                    <IonInput className='robricStyle' name="email" type="email" placeholder="your@email.com" ></IonInput>
                                </IonItem>
                                <IonItem class='centeredItem' >
                                    <IonInput name="password" type="password" placeholder="Password" />
                                </IonItem>
                            </div>
                            <div padding>
                                <IonItem class='centeredItem'>
                                <IonButton onClick={()=> alert('you are loged in, I am proud of you.')}size="large" type="submit">Login</IonButton>
                                </IonItem>
                                <IonItem class='centeredItem'>
                                <u> not a member? fuck off!</u>
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