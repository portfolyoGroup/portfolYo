import React, { useEffect, useState, useRef } from 'react';
import { IonModal, IonContent, IonLoading, IonButton, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonCardContent, IonCardHeader, IonCard, IonRow } from '@ionic/react';
import { setProfileData, getProfileData } from '../../services/profileService'
import pages from '../../pages/Pages'
import { createBrowserHistory } from 'history'
import successPic from '../../resources/success.svg'
import sorryPic from '../../resources/sorry.svg'
import waitPic from '../../resources/wait.svg'


const UpdateProfileInfo = () => {
    const picUploadRef = useRef(null)
    const [id, setId] = useState()
    const [dataOfContact, setDataOfContact] = useState()
    const [dataOfAbout, setDataOfAbout] = useState()
    const [dataOfProfileHome, setDataOfProfileHome] = useState()
    const [projectsList, setProjectsList] = useState()
    const [profilePic, setProfilePic] = useState()
    const [picUploaded, setPicUploaded] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [submitStateMsg, setSubmitStateMsg] = useState("'PortfolYoing your new profile...'")
    const [loadingOnSubmit, setLoadingOnSubmit] = useState(true)
    const [disableSubmitGoToProfileBottun, setdisableSubmitGoToProfileBottun] = useState(true)
    const [disableSubmitTnxButton, setDisableSubmitTnxButton] = useState(true)
    const [submitImage, setSubmitImage] = useState(waitPic)
    const history = createBrowserHistory({ forceRefresh: true })

    useEffect(() => {
        const getData = async () => {
            const id = sessionStorage.getItem('id')
            setId(id)
            try {
                const { dataOfAbout, dataOfContact, dataOfProfileHome, profilePic, projectsList } = await getProfileData(id)
                setDataOfContact(dataOfContact)
                setDataOfAbout(dataOfAbout)
                setDataOfProfileHome(dataOfProfileHome)
                setProfilePic(profilePic)
                setProjectsList(projectsList)
            } catch (e) {
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
                    const picType = fileParts[fileParts.length - 1]
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
                            <IonLabel position="floating">{key.replace(/_/g, ' ')}</IonLabel>
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
        setLoadingOnSubmit(true)
        setSubmitImage(waitPic)
        setShowModal(true)
        setSubmitStateMsg("Updating your profile")
        const id = sessionStorage.getItem('id')
        try {
            const response = await setProfileData(id, { dataOfAbout, dataOfContact, dataOfProfileHome, profilePic, projectsList })
            setSubmitImage(successPic)
            setSubmitStateMsg("Sucsses")
            setdisableSubmitGoToProfileBottun(false)
        }
        catch (e) {
            setSubmitStateMsg("Sorry, we failed to update." + e)
            setSubmitImage(sorryPic)
        }
        setLoadingOnSubmit(false);
        setDisableSubmitTnxButton(false);
    }

    let currComp
    if (dataOfAbout && dataOfContact && dataOfProfileHome && profilePic) {
        currComp = <IonCard>
            <IonModal animated={true} isOpen={showModal}>
                <img className="uploadphoto" src={submitImage} />
                <IonTitle>{submitStateMsg}</IonTitle>
                <IonRow>
                    <IonLoading isOpen={loadingOnSubmit} message={"portfolYoing..."} />
                    <IonButton disabled={disableSubmitGoToProfileBottun} onClick={() => history.push(`${pages.profileRoute}/${id}`)} > Go To Profile</IonButton>
                    <IonButton disabled={disableSubmitTnxButton} onClick={() => setShowModal(false)}> ok, tnx</IonButton>
                </IonRow>
            </IonModal>
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
                    <br></br>
                    <img src={profilePic.picData} alt="no pic in server" />
                    <IonInput onIonChange={() => setPicUploaded(true)} type='file' ref={picUploadRef} />
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