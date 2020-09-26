import React from 'react'
import { serverPath } from '../../pages/Pages'

const RunTheProj = ({ runResponse }) => {
    return runResponse ? <iframe id="runningProj" style={{ height: "100%", width: "100%" }} src={`http://${serverPath}:${runResponse.port}/`} /> : null
}
export default RunTheProj