import React, { useEffect, useState, useRef } from 'react';
import { IonSelectOption, IonSelect, IonModal, IonContent, IonLoading, IonButton, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonCardContent, IonCardHeader, IonCard, IonRow, IonText } from '@ionic/react';
import { useParams } from 'react-router-dom'
import { setProjectData, getProjectData } from '../../services/projectService'
import pages from '../../pages/Pages'
import successPic from '../../resources/success.svg'
import sorryPic from '../../resources/sorry.svg'
import waitPic from '../../resources/wait.svg'
import { createBrowserHistory } from 'history'

const UpdateProjectInfo = () => {
    const history = createBrowserHistory({ forceRefresh: true })
    const { projectId } = useParams();
    const picUploadRef = useRef(null)
    const encodedProjectUploadRef = useRef(null)
    const [dataOfProjectHeader, setDataOfProjectHeader] = useState()
    const [dataOfProjectDetails, setDataOfProjectDetails] = useState()
    const [projectPic, setProjectPic] = useState()
    const [picUploaded, setPicUploaded] = useState(false)
    const [encodedProject, setEncodedProject] = useState()
    const [encodedProjectUploaded, setEncodedProjectUploaded] = useState(false)
    const projectTypeSelectRef = useRef(null)
    const [showExplainModal, setShowExplainModal] = useState(false)

    const [showSubmitModal, setShowSubmitModal] = useState(false)
    const [submitStateMsg, setSubmitStateMsg] = useState("'PortfolYoing your project... this might take a few minutes'")
    const [loadingOnSubmit, setLoadingOnSubmit] = useState(true)
    const [disableSubmitGoToProjectBottun, setDisableSubmitGoToProjectBottun] = useState(true)
    const [disableSubmitTnxButton, setDisableSubmitTnxButton] = useState(true)
    const [submitImage, setSubmitImage] = useState(waitPic)

    const [loadMessage, setLoadMessage] = useState('portfolYoing ...')

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
                    const fileParts = file?.name.split('.');
                    const picName = fileParts[0];
                    const picType = fileParts[fileParts.length - 1];
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

    // useEffect(() => {
    //     if(projectTypeSelectRef && projectTypeSelectRef.current) {
    //         console.log(projectTypeSelectRef.current)
    //     }
    // }, [projectTypeSelectRef, projectTypeSelectRef.current])

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
                    const encodedProjectFormat = fileParts[fileParts.length - 1];
                    reader.onload = async (recievedFile) => {
                        const encodedProjectData = recievedFile.target.result;
                        const encodedProject = { encodedProjectName, encodedProjectFormat, encodedProjectData }
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
                    let disable = false
                    if (key === 'title') {
                        disable = true
                    }
                    return (
                        <IonItem key={index}>
                            <IonLabel position="stacked">{key.replace(/_/g, ' ')}</IonLabel>
                            <IonInput disabled={disable} autoGrow={true} clearOnEdit={false} size="100%" value={value} clearInput onIonChange={(e) => {
                                setField(dataToRead, key, e.detail.value)
                            }} ></IonInput>
                        </IonItem>
                    )
                })}
            </IonList>
        )
    }
    const handleFormSubmit = async () => {
        if (!projectTypeSelectRef?.current?.value
            ||
            (dataOfProjectDetails.projectType !== 'python' && dataOfProjectDetails.projectType !== 'node')) {
            alert("please specify project type")
            return
        }
        setDisableSubmitTnxButton(true)
        setDisableSubmitGoToProjectBottun(true)
        setShowSubmitModal(true)
        setLoadingOnSubmit(true)
        setSubmitImage(waitPic)
        setSubmitStateMsg("PortfolYoing your project this mighht take a few minutes ...")
        setTimeout(() => {
            setLoadMessage("Installing your project's dependencies ... ")
        }, 4000);
        setTimeout(() => {
            setLoadMessage("Setting up a virtual environment ... ")
        }, 4000);
        if (projectTypeSelectRef.current.value) {
            dataOfProjectDetails.projectType = projectTypeSelectRef.current.value
        }
        else {
            dataOfProjectDetails.projectType = projectTypeSelectRef.current.defaultValue
        }
        encodedProject.encodedProjectData = encodedProject.encodedProjectData.replace('data:application/zip;base64,', '')

        const profileId = sessionStorage.getItem('id');


        try {
            const response = await setProjectData(profileId, { dataOfProjectDetails, dataOfProjectHeader, projectPic, encodedProject })
            setSubmitImage(successPic)
            setSubmitStateMsg("Project was sucssefully updated in your portfolYo!")
            setDisableSubmitGoToProjectBottun(false)

        }
        catch (e) {
            setSubmitImage(sorryPic)
            setSubmitStateMsg(`We are deeply sorry :( something went wrong ` + e)
            console.log("exeption of project update from server on the log below:")
            console.log(e)
        }
        finally {
            setDisableSubmitTnxButton(false)
            setLoadingOnSubmit(false)
        }

    }
    let currComp
    let value
    if (dataOfProjectDetails && dataOfProjectHeader && projectPic) {
        currComp = <IonCard>
            <IonModal animated={true} isOpen={showSubmitModal}>
                <img className="uploadphoto" src={submitImage} />
                <IonTitle>{submitStateMsg}</IonTitle>
                <IonRow>
                    <IonLoading isOpen={loadingOnSubmit} message={loadMessage} />
                    <IonButton disabled={disableSubmitGoToProjectBottun} onClick={() => history.push(`${pages.projectRoute}/${projectId}`)} > Go To Project </IonButton>
                    <IonButton disabled={disableSubmitTnxButton} onClick={() => setShowSubmitModal(false)}> ok, tnx</IonButton>
                </IonRow>
            </IonModal>

            <IonModal animated={true} isOpen={showExplainModal}>

                <IonText>
                    <br></br>
                    <IonTitle> What do we need to run your project?</IonTitle>
                    <br></br>
                    <IonItemDivider>Common instructions:</IonItemDivider>

                    <p>    1. make sure the root of your project has the same name as your project zip.</p>
                    <p>    2. make sure you have a make file at the root of your project that installs all of your project requirements and dependencies and set the environment variables.</p>
                    <p>    3. make sure to set the host of your project to be 0.0.0.0</p>

                    <IonItemDivider>Python project description:</IonItemDivider>
                    <p>    1. use Python version smaller then 3.7</p>
                    <p>    2. name the project entry point "app.py" and place it at the root of your project.</p>

                    <IonItemDivider>nodeJS instructions:</IonItemDivider>
                    <p>    1. edit your package.json to run the project on "npm run dev"</p>
                </IonText>
                <IonButton onClick={() => setShowExplainModal(false)}>Got it, tnx</IonButton>
            </IonModal>
            <IonCardHeader>
                <IonToolbar>
                    <IonTitle style={{ fontSize: '32px' }}  >Update your project</IonTitle>
                    <img src={projectPic.picData} alt="no pic in server" />
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
            <IonItem class='ion-padding'>
                <IonLabel position='stacked'>Port</IonLabel>
                <IonInput value={5000} onIonChange={e => setField(dataOfProjectDetails, 'port', e.detail.value)} type='number' />
            </IonItem>
            <IonItem style={{ width: '100%' }}>
                <IonLabel position="stacked">Project type</IonLabel>
                <IonSelect value={value} defaultChecked={true} defaultValue={dataOfProjectDetails.projectType} placeholder="Select One" ref={projectTypeSelectRef} onIonChange={(e) => setField(dataOfProjectDetails, "projectType", e.detail.value)}>
                    <IonSelectOption value="python">Python</IonSelectOption>
                    <IonSelectOption value="node">Node.js</IonSelectOption>
                    <IonSelectOption value="c">C</IonSelectOption>
                    <IonSelectOption value="java-maven">Java</IonSelectOption>
                </IonSelect>
            </IonItem>
            <br></br>
            <IonItemDivider>Upload Project</IonItemDivider>
            <IonItem class='ion-padding'>
                <IonLabel position='stacked'>Upload Project's .zip File</IonLabel>
                <p></p>
                <IonInput onIonChange={() => setEncodedProjectUploaded(true)} type='file' ref={encodedProjectUploadRef} />
            </IonItem>
            <IonLabel style={{ cursor: "pointer" }} onClick={() => setShowExplainModal(true)} color="red" position='stacked'> * what do I need to upload?</IonLabel>
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
                    message={"portfolYoing ..."}
                />
            </IonContent>);
    }
    return currComp;
};
export default UpdateProjectInfo