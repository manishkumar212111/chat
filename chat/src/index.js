import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { validateApiKey } from "./api";
import Chatbot from "./chatApp";

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function Index() {
  const [apiKey , setApiKey] = useState("")
  const [loader , setLoader] = useState(true)
  useEffect(() => { 
    let root = document.getElementById("root")
    const key = root.getAttribute("data-api-key");
    setApiKey(key);
    if(key) {
      validateApiKey(key).then(res => {
        console.log(res);
        const { success = false, userId = "", message = ""} = res;
        if(success){
          localStorage.setItem("chat-data", JSON.stringify(res));

          // create unique chat client id
          let chatId = localStorage.getItem("chat-client-id");
          if(!chatId){
            localStorage.setItem("chat-client-id", makeid(16));
          }
          setLoader(false);
        } else {
          console.log(message);
        }
      })
    }
  }, []);
  
  if(!apiKey){
    console.log("No valid api key is given")
    return null;
  }
  
  if(loader){
    console.log("Validating Api keys")
    return null;
  }

  return (
    <Chatbot />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
