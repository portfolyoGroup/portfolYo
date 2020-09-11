import React, { useEffect, useState, useRef } from 'react';
import { IonSelectOption, IonSelect, IonContent, IonLoading, IonButton, IonIcon, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonCardContent, IonCardHeader, IonCard, IonRow } from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
import { setProjectData, getProjectData } from '../../services/projectService'
import pages from '../../pages/Pages'
import { download } from 'ionicons/icons'
import { saveAs } from 'file-saver';

const allData = {
    "5": {
        dataOfProjectHeader: {
            title: "Snake ",
            sub_title: "A snake game written in JavaFx",
            description: "This game was a life chenger snaking the snake! This game was a life chenger snaking the snake! This game was a life chenger snaking the snake!"
        },
        dataOfProjectDetails: {
            projectType: "python",//python/node //TODO change to node.js
            port: 1
        },
        encodedProject: {
            encodedProjectName: "name",
            encodedProjectType: ".zip",
            encodedProjectData: "KAKI OF PIGIOYOTO"
        },
        projectPic: {
            picName: "some pic",
            picType: "png",
            picData: 'kaki of yonim'

        }
    }
}

const UpdateProjectInfo = () => {
    const { projectId } = useParams();
    const picUploadRef = useRef(null)
    const encodedProjectUploadRef = useRef(null)
    const [dataOfProjectHeader, setDataOfProjectHeader] = useState()
    const [dataOfProjectDetails, setDataOfProjectDetails] = useState()
    const [projectPic, setProjectPic] = useState()
    const [picUploaded, setPicUploaded] = useState(false)
    const [encodedProject, setEncodedProject] = useState()
    const [encodedProjectUploaded, setEncodedProjectUploaded] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const { dataOfProjectDetails, dataOfProjectHeader, projectPic, encodedProject } = await getProjectData(projectId)
            setDataOfProjectDetails(dataOfProjectDetails);
            setDataOfProjectHeader(dataOfProjectHeader);
            setProjectPic(projectPic);
            setEncodedProject(encodedProject);
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

    useEffect(() => {
        (async () => {
            if (encodedProjectUploaded) {
                setEncodedProjectUploaded(false);
                if (encodedProjectUploadRef.current) {
                    var reader = new FileReader();
                    let file
                    const input = await encodedProjectUploadRef.current.getInputElement()
                    file = input.files[0]
                    const fileParts = file.name.split('.');
                    const encodedProjectName = fileParts[0];
                    const encodedProjectType = fileParts[1];
                    reader.onload = async (recievedFile) => {
                        const encodedProjectData = recievedFile.target.result;
                        const encodedProject = { encodedProjectName, encodedProjectType, encodedProjectData }
                        setEncodedProject(encodedProject)
                    }
                    reader.readAsDataURL(file);
                }
            }
        })()
    }, [encodedProjectUploadRef.current, encodedProjectUploaded])

    const setField = (dataToRead, key, text) => {
        dataToRead[key] = text
    }

    const MyList = ({ dataToRead }) => {
        return (

            <IonList>
                {Object.entries(dataToRead).map(([key, value], index) => {
                    return (
                        <IonItem key={index}>
                            <IonLabel position="stacked">{key.replaceAll('_', ' ')}</IonLabel>
                            <IonInput autoGrow={true} clearOnEdit={false} size="100%" value={value} clearInput onIonChange={(e) => {
                                setField(dataToRead, key, e.detail.value)
                            }} ></IonInput>
                        </IonItem>
                    )
                })}
            </IonList>
        )
    }
    const handleFormSubmit = async () => {

        const response = await setProjectData(projectId, { dataOfProjectDetails, dataOfProjectHeader, projectPic, encodedProjectData })
    }

    const donwloadZipFile = () => {
        // const zip = new JSZip();
        // zip.generateAsync({ type: "blob" }).then(function (content) {
        // });
        if (!encodedProject.encodedProjectName) {
            return;
        }
        saveAs(encodedProject.encodedProjectData, encodedProject.encodedProjectName);
    }

    let currComp
    let value
    if (dataOfProjectDetails && dataOfProjectHeader) {
        currComp = <IonCard>
            <IonCardHeader>
                <IonToolbar>
                    <IonTitle>Update your project</IonTitle>
                    {/* <img src={projectPic.picData} alt="no pic in server"/> */}
                </IonToolbar>
            </IonCardHeader>
            <IonCardContent>
                <IonItem class='ion-padding'>
                    <IonLabel position='stacked'>Upload a photo</IonLabel>
                    <IonInput onIonChange={() => setPicUploaded(true)} type='file' ref={picUploadRef} />
                </IonItem>
                <IonItemDivider>About</IonItemDivider>
                <MyList dataToRead={dataOfProjectHeader}></MyList>
                <IonItemDivider>Project info</IonItemDivider>
            </IonCardContent>
            <IonItem style={{ width: '100%' }}>
                <IonLabel>Project type</IonLabel>
                <IonSelect value={value} placeholder="Select One" onIonChange={(e) => setField(dataOfProjectDetails, "projectType", e.detail.value)}>
                    <IonSelectOption value="python">python</IonSelectOption>
                    <IonSelectOption value="node">node.js</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonItem class='ion-padding'>
                <IonLabel position='stacked'>Upload Project's .zip File</IonLabel>
                <IonInput onIonChange={() => setEncodedProjectUploaded(true)} type='file' ref={encodedProjectUploadRef} />
                <IonIcon onClick={donwloadZipFile} style={{ cursor: 'pointer' }} icon={download} />
            </IonItem>
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
export default UpdateProjectInfo