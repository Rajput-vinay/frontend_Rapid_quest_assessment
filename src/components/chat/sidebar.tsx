"use client";

import { useMemo, useState } from "react";
import { MoreVertical, Search } from "lucide-react";
import Link from "next/link";
import NewChatSheet from "./new-chat-sheet";
import { ChatListItem } from "@/lib/types";
import ChatListItemRow from "./chat-list-item";
import { Input } from "../ui/input";

export default function Sidebar({
  activeWaId,
  intialChats,
  onNavigate,
}: {
  activeWaId?: string;
  intialChats: ChatListItem[];
  onNavigate?: () => void;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return intialChats;
    return intialChats.filter((c) =>
      (c.name || c.wa_id).toLowerCase().includes(s)
    );
  }, [intialChats, q]);

  return (
    <div className="w-full sm:w-80 md:w-96 bg-chat-sidebar h-full flex flex-col border-r border-chat-border">
      {/* Header with title and New Chat button */}
      <div className="h-14 px-3 flex items-center justify-between bg-chat-panel border-b border-chat-border">
        <div className="text-lg font-semibold">WhatsApp</div>
        <div className="flex items-center gap-1">
          <NewChatSheet />
          <button className="p-2 rounded hover:bg-chat-hover">
            <MoreVertical className="h-5 w-5 text-chat-icon" />
          </button>
        </div>
      </div>

      {/* Search input */}
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-chat-icon" />
          <Input
            className="bg-chat-input border-0 pl-9 placeholder:text-gray-400"
            placeholder="Search or start new chat"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((c) => (
          <ChatListItemRow
            key={c.wa_id}
            chat={c}
            active={activeWaId === c.wa_id}
            onClick={onNavigate}
          />
        ))}

        {/* Show message and start new chat CTA if no chats found */}
        {filtered.length === 0 && (
          <div className="p-6 text-sm text-gray-400">
            No chats. Start new chat with:
            <div className="mt-2">
              <Link
                href={q.trim() ? `/chat/${encodeURIComponent(q.trim())}` : "#"}
                className="underline text-brand"
                onClick={(e) => {
                  if (!q.trim()) e.preventDefault();
                }}
              >
                {q.trim() || "wa_id"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
