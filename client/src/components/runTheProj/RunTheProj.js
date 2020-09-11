import React from 'react'
import { IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonLabel, IonItemDivider, IonItem, IonText } from '@ionic/react'
import { withRouter } from 'react-router'
import {serverPath} from '../../pages/Pages'
const RunTheProj = ({dataOfProjectDetails}) => {
    return (
    <iframe style={{height:"100%", width:"100%"}}src={`${serverPath}:${dataOfProjectDetails.port}`}/>
    );
}
export default withRouter(RunTheProj)