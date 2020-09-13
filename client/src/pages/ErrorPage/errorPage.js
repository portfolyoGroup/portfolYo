import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonGrid, IonRow, IonButton, IonCard } from '@ionic/react';
// import allComponents from '../components'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import './errorPage.scss'
import pages from '../Pages'
import pic from '../../resources/Portfolyo.png'

const ErrorPage = () => {

    const history = useHistory()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className='big-title-portfolyo'><img src={pic} ></img></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="primary">
                <IonCard>
                    <IonGrid>
                        <IonRow color="primary" >
                            <IonCol className='colStyle'>
                                <div className='centeredItem'>
                                    <h1>Sorry, it seems like you're asking non existing page...</h1>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
            </IonContent>
        </IonPage >
    );
};
export default ErrorPage