import commonAPI from "./commonAPI.JS"
import SERVERURL from "./serverURL"

export const saveDraft = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/drafts`, reqBody)
}

export const deleteDraft = async (reqBody) => {
    return await commonAPI("DELETE",`${SERVERURL}/drafts`, reqBody)
}

export const getDrafts = async () => {
    return await commonAPI("GET",`${SERVERURL}/drafts/fetch`,{})
}

export const driveAPI = async (reqBody) => {
    return await commonAPI("POST",`${SERVERURL}/api/drive/create-file`, reqBody)
}

