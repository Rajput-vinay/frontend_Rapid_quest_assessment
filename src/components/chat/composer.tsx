"use client";
import { useState } from "react";
import { Smile, Paperclip, Mic } from "lucide-react";

export default function Composer({
  onSend,
}: {
  onSend: (text: string) => Promise<void> | void;
}) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSend() {
    const t = text.trim();
    if (!t) return;
    try {
      setBusy(true);
      await onSend(t);
      setText("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="h-16 bg-chat-panel border-t border-chat-border flex items-center gap-2 px-3">
      <button type="button" className="p-2 rounded hover:bg-chat-hover" aria-label="Add emoji">
        <Smile className="h-6 w-6 text-chat-icon" />
      </button>
      <button type="button" className="p-2 rounded hover:bg-chat-hover" aria-label="Attach file">
        <Paperclip className="h-6 w-6 text-chat-icon" />
      </button>
      <div className="flex-1">
        <input
          className="w-full bg-chat-input rounded-lg px-4 py-2 outline-none placeholder:text-gray-400"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={busy}
          aria-label="Message input"
        />
      </div>
      <button
        type="button"
        onClick={handleSend}
        disabled={busy || !text.trim()}
        className={`p-2 rounded-lg font-semibold ${
          text.trim() ? "bg-brand text-black px-4" : "bg-transparent"
        }`}
        aria-label="Send message"
      >
        {text.trim() ? "Send" : <Mic className="h-6 w-6 text-chat-icon" />}
      </button>
    </div>
  );
}
