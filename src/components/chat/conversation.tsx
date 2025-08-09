"use client";
import { useEffect, useMemo, useRef, useCallback } from "react";
import { MessageDoc } from "@/lib/types";
import MessageBubble from "./message-bubble";

function groupMeta(items: MessageDoc[]) {
  const res: Array<{ m: MessageDoc; start: boolean; end: boolean }> = [];
  for (let i = 0; i < items.length; i++) {
    const prev = items[i - 1];
    const cur = items[i];
    const next = items[i + 1];
    const curT = cur.timestamps.message_at
      ? new Date(cur.timestamps.message_at).getTime()
      : 0;
    const prevT = prev?.timestamps.message_at
      ? new Date(prev.timestamps.message_at).getTime()
      : 0;
    const nextT = next?.timestamps.message_at
      ? new Date(next.timestamps.message_at).getTime()
      : 0;
    const withinPrev =
      prev && prev.direction === cur.direction && curT - prevT < 3 * 60 * 1000;
    const withinNext =
      next && next.direction === cur.direction && nextT - curT < 3 * 60 * 1000;
    const start = !withinPrev;
    const end = !withinNext;
    res.push({ m: cur, start, end });
  }
  return res;
}

export default function Conversation({
  wa_id,
  items,
  onTopReached,
}: {
  wa_id: string;
  items: MessageDoc[];
  onTopReached: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const grouped = useMemo(() => groupMeta(items), [items]);

  // Auto-scroll to bottom on new messages (smooth scroll)
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [items.length]);

  // Throttled onScroll handler
  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    if (el.scrollTop < 80) {
      onTopReached();
    }
  }, [onTopReached]);

  return (
    <div className="flex-1 h-full flex flex-col">
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto bg-chat-bg bg-cover bg-center"
        style={{ backgroundImage: "url('/chat-bg.png')" }}
      >
        <div className="py-3">
          {grouped.map(({ m, start, end }) => (
            <MessageBubble
              key={m.message_id}
              m={m}
              isGroupStart={start}
              isGroupEnd={end}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
