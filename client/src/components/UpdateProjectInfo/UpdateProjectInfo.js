import React, { useEffect, useState, useRef } from 'react';
import { IonContent, IonLoading, IonButton, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonCardContent, IonCardHeader, IonCard } from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
import { setProjectData, getProjectData } from '../../services/projectService'
import pages from '../../pages/Pages'

const allData = {
    "5": {
        dataOfProjectHeader: {
            title: "Snake ",
            sub_title: "A snake game written in JavaFx",
            description: "This game was a life chenger snaking the snake! This game was a life chenger snaking the snake! This game was a life chenger snaking the snake!"
        },
        dataOfProjectDetails: {
            projectName: "flask-test",
            projectType: "python",
        },
        encodedProject: "",
        projectPic: {
            picName: "some pic",
            picType: "png",
            picData: 'kaki of yonim'
        },
        
    }
}

const UpdateProjectInfo = () => {
    const {projectId}  = useParams();
    const picUploadRef = useRef(null)
    const [dataOfProjectHeader, setDataOfProjectHeader] = useState()
    const [dataOfProjectDetails, setDataOfProjectDetails] = useState()
    const [projectPic, setProjectPic] = useState()
    const [picUploaded, setPicUploaded] = useState(false)
    const [encodedProject, setEncodedProject] = useState()
    const [encodedProjectUploaded, setEncodedProjectUploaded] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const id = localStorage.getItem('id')
            const { dataOfProjectDetails, dataOfProjectHeader, projectPic, encodedProject } = await getProjectData(id)
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
                        const projectPic = { picName, picType, picData }
                        setProjectPic(projectPic)
                    }
                    reader.readAsDataURL(file);
                }
            }
        })()
    }, [picUploadRef.current, picUploaded])

    // const setField = (dataToRead, key, text) => {
    //     dataToRead[key] = text
    // }

    // const MyList = ({ dataToRead }) => {
        console.log(projectId)
        return (
            <div>
                hello diz {projectId}
            </div>
                )
    //         <IonList>
    //             {Object.entries(dataToRead).map(([key, value], index) => {
    //                 return (
    //                     <IonItem key={index}>
    //                         <IonLabel position="floating">{key}</IonLabel>
    //                         <IonInput placeholder={value} clearInput onIonChange={(e) => {
    //                             setField(dataToRead, key, e.detail.value)
    //                         }} ></IonInput>
    //                     </IonItem>
    //                 )
    //             })}
    //         </IonList>
    //     )
    // }
    // const handleFormSubmit = async () => {
    //     const id = localStorage.getItem('id')
    //     const response = await setProjectData(id, { dataOfAbout, dataOfContact, dataOfProjectHome, projectPic })
    // }

    // let currComp
    // if (dataOfAbout && dataOfContact && dataOfProjectHome && projectPic) {
    //     currComp = <IonCard>
    //         <IonCardHeader>
    //             <IonToolbar>
    //                 <IonTitle>Update your project</IonTitle>
    //             </IonToolbar>
    //         </IonCardHeader>
    //         <IonCardContent>
    //             <IonItemDivider>Main Project info</IonItemDivider>
    //             <MyList dataToRead={dataOfProjectHome}></MyList>
    //             <IonItem class='ion-padding'>
    //                 <IonLabel position='stacked'> Upload a photo</IonLabel>
    //                 <img src={projectPic.picData} alt="no pic in server"/>
    //                 <IonInput onIonChange={() => setPicUploaded(true)} type='file' ref={picUploadRef}/>
    //             </IonItem>
    //             <IonItemDivider>About</IonItemDivider>
    //             <MyList dataToRead={dataOfAbout}></MyList>
    //             <IonItemDivider>Contact</IonItemDivider>
    //             <MyList dataToRead={dataOfContact}></MyList>
    //         </IonCardContent>
    //         <IonItem class='centeredItem'>
    //             <IonButton onClick={handleFormSubmit} size="large" type="submit">update!</IonButton>
    //         </IonItem>
    //         <br />
    //         <br />
    //     </IonCard>
    // }
    // else {
    //     currComp = (
    //         <IonContent>
    //             <IonLoading
    //                 isOpen={true}
    //                 message={'PortfolYoing...'}
    //             />
    //         </IonContent>);
    // }
    // return currComp;
};
export default UpdateProjectInfo