"use client";
import { shortTime } from "@/lib/time";
import { ChatListItem } from "@/lib/types";
import clsx from "clsx";
import Link from "next/link";

export default function ChatListItemRow({
  chat,
  active,
  onClick,
}: {
  chat: ChatListItem;
  active?: boolean;
  onClick?: () => void;
}) {
  const last = chat.last_message;

  return (
    <Link href={`/chat/${chat.wa_id}`} onClick={onClick}>
      <div
        className={clsx(
          "h-16 px-3 flex items-center gap-3 hover:bg-chat-hover cursor-pointer",
          active && "bg-chat-hover"
        )}
      >
        <div className="h-10 w-10 rounded-full bg-[#374045] flex items-center justify-center text-sm">
          {(chat.name || chat.wa_id).slice(-2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <div className="truncate font-medium text-sm">
              {chat.name || chat.wa_id}
            </div>
            <div className="text-[11px] text-gray-400">
              {shortTime(chat.last_message_at || (last?.at))}
            </div>
          </div>
          <div className="text-xs text-gray-300 truncate">
            {last?.text ||
              (last?.direction === "out" ? "You sent a message" : "Message")}
          </div>
        </div>
      </div>
    </Link>
  );
}
