"use client";
import clsx from "clsx";
import { shortTime } from "@/lib/time";
import { MessageDoc, Status } from "@/lib/types";

function StatusChecks({ status }: { status: Status }) {
  if (status === "read") return <span className="text-[#53bdeb]">✓✓</span>;
  if (status === "delivered") return <span className="text-gray-300">✓✓</span>;
  if (status === "sent") return <span className="text-gray-300">✓</span>;
  if (status === "initiated") return <span className="text-gray-400">⌛</span>;
  if (status === "failed") return <span className="text-red-400">!</span>;
  return null;
}

export default function MessageBubble({
  m,
  isGroupStart,
  isGroupEnd,
}: {
  m: MessageDoc;
  isGroupStart: boolean;
  isGroupEnd: boolean;
}) {
  const isOut = m.direction === "out";
  const text = m.content.text || "";

  return (
    <div
      className={clsx(
        "w-full flex px-4",
        isOut ? "justify-end" : "justify-start",
        isGroupStart ? "mt-2" : "mt-[2px]"
      )}
    >
      <div
        className={clsx(
          "max-w-[75%] px-3 py-2 rounded-bubble text-[13px] leading-snug shadow-sm",
          isOut ? "bg-chat-bubbleOut text-white" : "bg-chat-bubbleIn text-[#e9edef]",
          isGroupStart && isOut && "rounded-tr-md",
          isGroupStart && !isOut && "rounded-tl-md",
          !isGroupEnd && "rounded-b-md"
        )}
      >
        <div className="whitespace-pre-wrap break-words">{text}</div>
        <div
          className={clsx(
            "text-[10px] flex items-center gap-1 mt-1",
            isOut ? "justify-end" : "justify-end text-gray-300"
          )}
        >
          <span className="opacity-90">{shortTime(m.timestamps.message_at)}</span>
          {isOut && <StatusChecks status={m.status} />}
        </div>
      </div>
    </div>
  );
}
