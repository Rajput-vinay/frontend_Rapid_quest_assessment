"use client";

import { useEffect, useState } from "react";
import { ChatListItem } from "@/lib/types";
import Sidebar from "./sidebar";

export default function SidebarClient({ activeWaId }: { activeWaId?: string }) {
  const [chats, setChats] = useState<ChatListItem[]>([]);

  useEffect(() => {
    async function fetchChats() {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${base}/api/chats`);
      const json = await res.json();
      setChats(json.data);
    }
    fetchChats();
  }, []);

  return <Sidebar activeWaId={activeWaId} intialChats={chats} />;
}
