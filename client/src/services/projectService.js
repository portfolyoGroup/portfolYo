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
        return await fetchFromServer(`project?id=${projectId}`, 'GET')
    }
    else {
        return await allData["5"]
    }
}

export const setProjectData = async (profileId, data) => {

    if (isRealServer) {
        //call the server by id.
            return await fetchFromServer(`project?profileId=${profileId}`, 'POST', data)

    }
    else {
        return await '5'
        // nothing to do its here
    }
}

