"use client";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getContacts, createContact, Contact } from "@/lib/contacts";
import { Plus, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewChatSheet() {
  const [open, setOpen] = useState(false);
  const [waId, setWaId] = useState("");
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    (async () => {
      setLoading(true);
      try {
        const list = await getContacts();
        setContacts(list);
      } finally {
        setLoading(false);
      }
    })();
  }, [open]);

  async function startChat() {
    const id = waId.trim();
    if (!id) return;
    if (name.trim()) {
      await createContact({ wa_id: id, name: name.trim() });
    }
    setOpen(false);
    router.push(`/chat/${encodeURIComponent(id)}`);
  }

  async function addContact() {
    const id = waId.trim();
    if (!id) return;
    await createContact({ wa_id: id, name: name.trim() || undefined });
    const list = await getContacts();
    setContacts(list);
    setWaId("");
    setName("");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-chat-hover h-8 px-3">
          <Plus className="h-4 w-4 mr-1" /> New chat
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 w-[85vw] sm:w-96 bg-chat-sidebar border-chat-border"
      >
        <div className="p-4 border-b border-chat-border bg-chat-panel">
          <SheetHeader>
            <SheetTitle className="text-white">New chat</SheetTitle>
          </SheetHeader>
          <div className="mt-3 space-y-2">
            <Input
              className="bg-chat-input border-0 text-white"
              placeholder="Phone / wa_id (e.g., 9199xxxxxxx)"
              value={waId}
              onChange={(e) => setWaId(e.target.value)}
            />
            <Input
              className="bg-chat-input border-0 text-white"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                onClick={startChat}
                className="bg-brand text-black hover:bg-brand/90"
              >
                Start chat
              </Button>
              <Button
                onClick={addContact}
                variant="secondary"
                className="bg-chat-input text-white hover:bg-chat-hover"
              >
                <UserPlus className="h-4 w-4 mr-1" /> Save contact
              </Button>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="text-xs text-gray-400 mb-2">Contacts</div>
          {loading && <div className="text-sm text-gray-400 px-1">Loading…</div>}
          {!loading && contacts.length === 0 && (
            <div className="text-sm text-gray-400 px-1">No contacts yet</div>
          )}
          <div className="space-y-[2px]">
            {contacts.map((c) => (
              <Link
                key={c.wa_id}
                href={`/chat/${c.wa_id}`}
                onClick={() => setOpen(false)}
              >
                <div className="h-14 px-2 rounded hover:bg-chat-hover flex items-center gap-3 cursor-pointer">
                  <div className="h-9 w-9 rounded-full bg-[#374045] flex items-center justify-center text-xs">
                    {(c.name || c.wa_id).slice(-2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{c.name || c.wa_id}</div>
                    <div className="text-xs text-gray-400 truncate">{c.wa_id}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
