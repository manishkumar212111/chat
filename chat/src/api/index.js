import axios from 'axios';

const BASE_URL = "http://localhost:5000/v1/"

export const validateApiKey = async (apiKey = "") => {
    const result = await axios.get(BASE_URL+"common/user/validate/"+apiKey);
    return result.data;
};

export const getQuestionByUser = async (next) => {
    const dta = JSON.parse(localStorage.getItem("chat-data") || {});
    if(!dta?.userId){
        console.log("No user found");
        return {};
    }
    const result = await axios.get(BASE_URL+"common/user/message/"+dta?.userId + (next ? "?questionId="+next : ""));
    return result.data;

}

export const addChatBotResponse = async (obj) => {
    const dta = JSON.parse(localStorage.getItem("chat-data") || {});

    const clientId = localStorage.getItem("chat-client-id");
    obj.userId = dta?.userId;
    obj.clientId = clientId;
    return await axios.post(BASE_URL+"common/user/response/"+clientId , obj);
};