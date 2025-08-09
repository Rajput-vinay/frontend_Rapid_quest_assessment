import ChatClient from "@/components/chat/chat-client";
import SidebarServer from "@/components/chat/sidebar-server";

// type Props = { params: Promise<{ wa_id: string | null }> ;};

interface Props {
  params: Promise<{ wa_id: string }>;
}

export default async function ChatPage({ params }: Props) {
  const {wa_id} = await (params);
  console.log("wa_id", wa_id);

  return (
    <div className="w-full h-full flex">
      <div className="hidden md:block">
        <SidebarServer activeWaId={wa_id} />
      </div>
      <div className="flex-1 h-full">
        <ChatClient wa_id={wa_id} />
      </div>
    </div>
  );
}
