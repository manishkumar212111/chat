import React, { useState, useEffect } from "react";

export default function BotMessage({ text, isLoading }) {
  return (
    <div className="message-container">
      {
        text?.type === "text" &&
          <div className="bot-message">
              {isLoading ? "..." : text.content}
          </div>
      }
      {
        text?.type === "image" &&
          <div className="bot-message">
              {isLoading ? "..." : <img src={text.content} width="200" height={200} />}
          </div>
      }
      </div>
  );
}
