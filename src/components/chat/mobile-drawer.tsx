"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SidebarServer from "./sidebar-server";
import { useState } from "react";

export default function MobileDrawer({ activeWaId }: { activeWaId?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open chat list"
          className="p-2 rounded hover:bg-chat-hover"
          type="button"
        >
          <Menu className="h-5 w-5 text-chat-icon" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 w-[85vw] sm:w-96 bg-chat-sidebar border-chat-border"
      >
        <SidebarServer activeWaId={activeWaId} />
      </SheetContent>
    </Sheet>
  );
}
