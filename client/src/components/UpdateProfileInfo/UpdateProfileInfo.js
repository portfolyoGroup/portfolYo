import React, { useEffect, useState, useRef } from 'react';
import { IonContent, IonLoading, IonButton, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonCardContent, IonCardHeader, IonCard } from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
import { setProfileData, getProfileData } from '../../services/profileService'
import pages from '../../pages/Pages'
import { createBrowserHistory } from 'history'

// const dataOfAbout = {
//     description: "Tell us about you:",
//     programing_languages: 'c, Java, etc...',
//     skills: 'react, ',
//     experience: 'mention your current and past roles in projects and jobs'
// }
// const dataOfContact = {
//     date_of_birth: "5.5.1875",
//     address: 'TLV fashion mall',
//     phone: '051113345'
// }
// const dataOfProfileHome = {
//     name: "Israel Israeli",
//     title: 'your main occpation, e.g cs student',
//     main_description: 'your main occpation, e.g cs student',
// }


const UpdateProfileInfo = () => {
    const picUploadRef = useRef(null)
    const [dataOfContact, setDataOfContact] = useState()
    const [dataOfAbout, setDataOfAbout] = useState()
    const [dataOfProfileHome, setDataOfProfileHome] = useState()
    const [projectsList, setProjectsList] = useState()
    const [profilePic, setProfilePic] = useState()
    const [picUploaded, setPicUploaded] = useState(false)
    const history = createBrowserHistory()

    useEffect(() => {
        const getData = async () => {
            const id = localStorage.getItem('id')
            try {
                const { dataOfAbout, dataOfContact, dataOfProfileHome, profilePic, projectsList } = await getProfileData(id)
                setDataOfContact(dataOfContact)
                setDataOfAbout(dataOfAbout)
                setDataOfProfileHome(dataOfProfileHome)
                setProfilePic(profilePic)
                setProjectsList(projectsList)
            } catch(e) {
                history.push(pages.errorRoute)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        (async () => {
            if (picUploaded) {
                setPicUploaded(false);
                if (picUploadRef.current) {
                    var reader = new FileReader();
                    let file
                    const input = await picUploadRef.current.getInputElement()
                    file = input.files[0]
                    const fileParts = file.name.split('.');
                    const picName = fileParts[0];
                    const picType = fileParts[1];
                    reader.onload = async (recievedFile) => {
                        const picData = recievedFile.target.result;
                        const profilePic = { picName, picType, picData }
                        setProfilePic(profilePic)
                    }
                    reader.readAsDataURL(file);
                }
            }
        })()
    }, [picUploadRef.current, picUploaded])

    const setField = (dataToRead, key, text) => {
        dataToRead[key] = text
    }

    const MyList = ({ dataToRead }) => {

        return (
            <IonList>
                {Object.entries(dataToRead).map(([key, value], index) => {
                    return (
                        <IonItem key={index}>
                            <IonLabel position="floating">{key.replaceAll('_', ' ')}</IonLabel>
                            <IonInput size="100%" autoGrow={true} placeholder={value} clearInput onIonChange={(e) => {
                                setField(dataToRead, key, e.detail.value)
                            }} >
                            </IonInput>
                        </IonItem>
                    )
                })}
            </IonList>
        )
    }
    const handleFormSubmit = async () => {
        const id = localStorage.getItem('id')
        const response = await setProfileData(id, { dataOfAbout, dataOfContact, dataOfProfileHome, profilePic, projectsList })
    }

    let currComp
    if (dataOfAbout && dataOfContact && dataOfProfileHome && profilePic) {
        currComp = <IonCard>
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
                    <img src={profilePic.picData} alt="no pic in server"/>
                    <IonInput onIonChange={() => setPicUploaded(true)} type='file' ref={picUploadRef}/>
                </IonItem>
                <IonItemDivider>About</IonItemDivider>
                <MyList dataToRead={dataOfAbout}></MyList>
                <IonItemDivider>Contact</IonItemDivider>
                <MyList dataToRead={dataOfContact}></MyList>
            </IonCardContent>
            <IonItem class='centeredItem'>
                <IonButton onClick={handleFormSubmit} size="large" type="submit">update!</IonButton>
            </IonItem>
            <br />
            <br />
        </IonCard>
    }
    else {
        currComp = (
            <IonContent>
                <IonLoading
                    isOpen={true}
                    message={'PortfolYoing...'}
                />
            </IonContent>);
    }
    return currComp;
};
export default UpdateProfileInfo