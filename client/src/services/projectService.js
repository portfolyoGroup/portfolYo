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
        dataOfCodeRunner: {
            todo: "todo this field"
        }
    }
}

const isRealServer = false;
export const getProjectData = async (projectId) => {
    if (isRealServer) {
        //call the server by id.
        return await fetchFromServer(`profile?id=${projectId}`, 'GET')
    }
    else {
        return await allData["5"]
    }
}

export const setProjectData = async (projectId, data) => {

    if (isRealServer) {
        //call the server by id.
        try {
            return await fetchFromServer(`project?id=${projectId}`, 'PUT', data)
        }
        catch (err) {
            // todo : handle catch
        }
    }
    else {
        return await '5'
        // nothing to do its here
    }
}

