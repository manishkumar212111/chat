import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";
import Messages from "./components/Messages";
import Input from "./components/Input";

import API from "./api/ChatbotAPI";

import "./styles.css";
import Header from "./components/Header";
import { addChatBotResponse, getQuestionByUser } from "./api";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(true);
  const getNextQuestion = (questionId = "") => {
    setLoader(true);
    getQuestionByUser(questionId).then((res) => {
      if(res?.id){
        const newMessages = messages.concat({
          ...res,
          from: "bot",
          lebel : res.question.map((item,index) => (<BotMessage
            key={index}
            text={item}
          />))
        });
        setMessages(newMessages);
      } else {
        
        const newMessages = messages.concat({
          ...res,
          from: "bot",
          lebel : <BotMessage
            key="087978"
            text={{content: "Thanks for using chat bot", type: "text"}}
          />})
        setMessages(newMessages);
        console.log("No Data available");
      }
      setLoader(false);
    });
  }
  useEffect(() => {
    async function loadWelcomeMessage() {
      getNextQuestion();
    }
    loadWelcomeMessage();
  }, []);

  const send = async text => {
    const last = messages[messages.length - 1];;
    await addChatBotResponse({
      question: last.id,
      response: text
    });
    let newMessages = messages;
    newMessages.push({
      from: "user",
      lebel: <UserMessage key={messages.length + 1} text={text} />,
    });
    setMessages(newMessages);
    setTimeout(() => {
      getNextQuestion(last.next);
    }, 100)
  };
  const lastMsg = messages[messages.length - 1];

  return (
    <div className="chatbot">
      <Header />
      <Messages messages={messages} isLoading={loader} />
      {lastMsg?.next !== null && <>
        {
          (lastMsg?.type === "text" || lastMsg?.type === "date" || lastMsg?.type === "time" )  && <Input type={lastMsg?.type} onSend={send} />
        }
        {
          lastMsg?.type === "option" && <div class="btn-group">
            {lastMsg.answer.map(itm => <button onClick={() => send(itm.value)}>{itm.label}</button>)}
          </div>
        }
      </>}
    </div>
  );
}

export default Chatbot;