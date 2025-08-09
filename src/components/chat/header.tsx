"use client";
import {
  ChevronLeft,
  Search,
  Paperclip,
  MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";
import MobileDrawer from "./mobile-drawer";

export default function ChatHeader({
  name,
  number,
  mobileBack = true,
  activeWaId,
}: {
  name?: string | null;
  number: string;
  mobileBack?: boolean;
  activeWaId?: string;
}) {
  const router = useRouter();
  const avatarText = (name || number).slice(-2);

  return (
    <div className="h-14 bg-chat-panel flex items-center justify-between px-3 border-b border-chat-border">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <MobileDrawer activeWaId={activeWaId} />
        </div>
        {mobileBack && (
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded hover:bg-chat-hover"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5 text-chat-icon" />
          </button>
        )}
        <div className="h-9 w-9 rounded-full bg-[#374045] flex items-center justify-center text-xs">
          {avatarText}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{name || number}</span>
          <span className="text-[11px] text-gray-400">{number}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="p-2 rounded hover:bg-chat-hover"
          aria-label="Search chat"
        >
          <Search className="h-5 w-5 text-chat-icon" />
        </button>
        <button
          type="button"
          className="p-2 rounded hover:bg-chat-hover"
          aria-label="Attach file"
        >
          <Paperclip className="h-5 w-5 text-chat-icon" />
        </button>
        <button
          type="button"
          className="p-2 rounded hover:bg-chat-hover"
          aria-label="More options"
        >
          <MoreVertical className="h-5 w-5 text-chat-icon" />
        </button>
      </div>
    </div>
  );
}
