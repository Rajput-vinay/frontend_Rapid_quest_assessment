"use client";

import { getMessages, postMessage } from "@/lib/api";
import { getSocket } from "@/lib/socket";
import { MessageDoc } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./header";
import Conversation from "./conversation";
import Composer from "./composer";

export default function ChatClient({ wa_id }: { wa_id: string }) {
  const [name, setName] = useState<string | null>(null);
  const [items, setItems] = useState<MessageDoc[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loadingRef = useRef(false);

  // Load initial messages
  useEffect(() => {
    let mounted = true;
    (async () => {
      loadingRef.current = true;
      try {
        const res = await getMessages(wa_id, 50);
        if (!mounted) return;

        setItems(res.items);
        setCursor(res.nextCursor);
        setHasMore(!!res.nextCursor);

        const first = res.items.find((m) => m.name);
        setName(first?.name ?? null);
      } finally {
        loadingRef.current = false;
      }
    })();

    return () => {
      mounted = false;
      setItems([]);
      setCursor(null);
      setHasMore(true);
    };
  }, [wa_id]);

  // Socket listeners
  useEffect(() => {
    const s = getSocket();
    s.emit("join", wa_id);

    function onCreated(doc: MessageDoc) {
      if (doc.wa_id !== wa_id) return;
      setItems((prev) => [...prev, doc]);
    }

    function onUpdated(payload: { message_id: string; patch: Partial<MessageDoc> }) {
      setItems((prev) =>
        prev.map((m) =>
          m.message_id === payload.message_id ? { ...m, ...payload.patch } : m
        )
      );
    }

    s.on("message:created", onCreated);
    s.on("message:updated", onUpdated);

    return () => {
      s.emit("leave", wa_id);
      s.off("message:created", onCreated);
      s.off("message:updated", onUpdated);
    };
  }, [wa_id]);

  // Load older messages for pagination
  const loadOlder = async () => {
    if (!hasMore || loadingRef.current) return;
    loadingRef.current = true;

    try {
      const res = await getMessages(wa_id, 50, cursor || undefined);
      setItems((prev) => [...res.items, ...prev]);
      setCursor(res.nextCursor);
      setHasMore(!!res.nextCursor);
    } finally {
      loadingRef.current = false;
    }
  };

  // Send message handler with API call and socket emit
  const send = async (text: string) => {
    try {
      // 1. Send message to API
      const newMessage = await postMessage(wa_id, text);

      // 2. Emit socket event (optional, if backend listens)
      const socket = getSocket();
      socket.emit("message:send", { wa_id, text });

      // 3. Update local state to show message instantly
      setItems((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader name={name} number={wa_id} activeWaId={wa_id} />
      <Conversation wa_id={wa_id} items={items} onTopReached={loadOlder} />
      <Composer onSend={send} />
    </div>
  );
}
