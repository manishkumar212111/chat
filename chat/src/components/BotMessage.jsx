import React, { useState, useEffect } from "react";

export default function BotMessage({ text, isLoading }) {
  return (
    <div className="message-container">
      <div className="bot-message">{isLoading ? "..." : text}</div>
    </div>
  );
}
