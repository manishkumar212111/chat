import React, { useEffect, useRef } from "react";
import BotMessage from "./BotMessage";

export default function Messages({ messages, isLoading }) {
  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });
  return (
    <div className="messages">
      {messages.map(itm => itm.lebel)}
      {isLoading && <BotMessage isLoading={true} /> }
      <div id={"el"} ref={el} />
    </div>
  );
}
