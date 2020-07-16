import React, { useEffect, useState, useRef } from 'react';
import { IonContent, IonLoading, IonButton, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonCardContent, IonCardHeader, IonCard } from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
import { setProfileData, getProfileData } from '../../services/profileService'


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

    useEffect(() => {
        const getData = async () => {
            const id = localStorage.getItem('id')
            const { dataOfAbout, dataOfContact, dataOfProfileHome } = await getProfileData(id)
            setDataOfContact(dataOfContact)
            setDataOfAbout(dataOfAbout)
            setDataOfProfileHome(dataOfProfileHome)
        }
        getData()
    }, [])
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
                            <IonInput placeholder={value} clearInput onIonChange={(e) => {
                                setField(dataToRead, key, e.detail.value)
                            }} ></IonInput>
                        </IonItem>
                    )
                })}
            </IonList>
        )
    }
    const handleFormSubmit = async () => {
        console.log("submit")
        
        const id = localStorage.getItem('id')
        let file
        const input = await picUploadRef.current.getInputElement()
        if (!picUploadRef || !picUploadRef.current || !input.files) {
            // ask levivot to send default pic
            console.log("submit2")
        }
        else {
            file = input.files[0]
            var reader = new FileReader();
            const fileParts = file.name.split('.');
            const picName = fileParts[0];
            const picType = fileParts[1];
            reader.onload = function (recievedFile) {
                const picData = recievedFile.target.result;
                console.log("picData")
                console.log(picData)
                const profilePic = { picName, picType, picData }
                setProfileData(id, { dataOfAbout, dataOfContact, dataOfProfileHome, profilePic })
            }
            reader.readAsDataURL(file);
        }
    }
    let currComp
    if (dataOfAbout && dataOfContact && dataOfProfileHome) {
        currComp =  <IonCard>
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
                    <IonInput type='file' ref={picUploadRef}>
                    </IonInput>
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
    }
    else{
        currComp = (     
            <IonContent>
                <IonLoading
                    isOpen={true}
                    message={'PortfolYoing...'}
                    duration={Number.MAX_SAFE_INTEGER}
                />
            </IonContent>);
    }
    return currComp;
};
export default UpdateProfileInfo