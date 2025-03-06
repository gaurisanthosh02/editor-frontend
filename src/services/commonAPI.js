import axios from "axios"

const commonAPI = async (httpMethod, url ,ReqBody, reqHeader) => {
    const reqConfig = {
        method: httpMethod,
        url,
        data: ReqBody,
        headers: reqHeader? reqHeader : {"Content-type":"application/json"}
    }
    return await axios(reqConfig).then(res=>{
        return res
    }).catch(err=>{
        throw err
    })
}

export default commonAPI
