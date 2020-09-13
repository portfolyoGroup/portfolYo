import React, { useEffect, useState } from 'react'
import { IonLoading, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonLabel, IonItemDivider, IonItem, IonText } from '@ionic/react'
import { withRouter } from 'react-router'
import { serverPath } from '../../pages/Pages'
import { createBrowserHistory } from 'history'
import pages from '../../pages/Pages'
import { useHistory } from 'react-router-dom'

const RunTheProj = ({ runResponse }) => {
    return runResponse ? <iframe id="runningProj" style={{ height: "100%", width: "100%" }} src={`http://${serverPath}:${runResponse.port}/`} /> : null
}
export default RunTheProj