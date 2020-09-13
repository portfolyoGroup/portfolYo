import { fetchFromServer } from './service'
// import dummyPicData from './dummyProfileData'
import { object } from 'prop-types';


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

const isRealServer = true;
export const getProjectData = async (projectId) => {
    if (isRealServer) {
        //call the server by id.
        const data = await fetchFromServer(`project?id=${projectId}`, 'GET')
        data.dataOfProjectHeader.title = data.dataOfProjectHeader.title.replace(/_/g, ' ')
        return data
    }
    else {
        return await allData["5"]
    }
}

export const setProjectData = async (profileId, data) => {

    if (isRealServer) {
        //call the server by id.
        data.dataOfProjectHeader.title = data.dataOfProjectHeader.title.replace(/ /g, '_')
        return await fetchFromServer(`project?profileId=${profileId}`, 'POST', data)

    }
    else {
        return await '5'
        // nothing to do its here
    }
}
export const serverRunProject = async (projectId) => {
    let res
    try{
        res = await fetchFromServer(`project/run?projectId=${projectId}`, 'GET')
    }
    catch (e){
        serverTerminateProject(projectId);
        res = await serverRunProject(projectId)
    }
    finally{
        return res
    }
}

export const serverTerminateProject = async () => {
    const projId = sessionStorage.getItem('runningProjectId')
    const res = await fetchFromServer(`project/terminate?projectId=${projId}`, 'GET')
    sessionStorage.setItem('isRunning', 'false')
    return res;
}


