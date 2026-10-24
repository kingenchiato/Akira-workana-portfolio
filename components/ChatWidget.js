"use client";

import { useState } from "react";
import { answerQuestion } from "../lib/chat";

const opener = {
  role: "assistant",
  text: "荒木秀樹のポートフォリオについて聞けます。経歴、スキル、所在地、ページの見方に答えます。載っていないことは、そのようにお伝えします。"
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([opener]);

  const send = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const reply = answerQuestion(text);
    setMessages((current) => [...current, { role: "user", text }, { role: "assistant", text: reply }]);
    setDraft("");
  };

  return (
    <div className={`chat-dock ${open ? "open" : ""}`}>
      {open ? (
        <section className="chat-panel" aria-label="ポートフォリオへの質問">
          <header>
            <strong>質問する</strong>
            <button type="button" onClick={() => setOpen(false)}>閉じる</button>
          </header>
          <div className="chat-log">
            {messages.map((message, index) => (
              <p key={`${message.role}-${index}`} className={message.role}>
                {message.text}
              </p>
            ))}
          </div>
          <form onSubmit={send}>
            <label className="visually-hidden" htmlFor="chat-input">質問</label>
            <input
              id="chat-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="例：対応できる技術は？"
            />
            <button type="submit">送信</button>
          </form>
        </section>
      ) : null}
      <button className="chat-launcher" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        質問
      </button>
    </div>
  );
}
