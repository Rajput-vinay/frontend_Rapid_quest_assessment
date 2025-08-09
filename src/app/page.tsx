import SidebarServer from "@/components/chat/sidebar-server";

export default async function HomePage() {
  return (
    <div className="w-full h-full flex">
      <div className="hidden md:block">
        <SidebarServer />
      </div>
      <div className="flex-1 hidden md:flex items-center justify-center text-gray-400">
        Select a chat to start Messaging
      </div>
      <div className="md:hidden w-full">
        <SidebarServer />
      </div>
    </div>
  );
}
