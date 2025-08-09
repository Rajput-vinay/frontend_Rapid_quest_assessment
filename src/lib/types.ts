export type Direction = "in" | "out";

export type Status =
  | "initiated"
  | "sent"
  | "delivered"
  | "read"
  | "failed"
  | "ok";

export type ChatListItem = {
  wa_id: string;
  name?: string | null;
  last_message?: {
    text?: string | null;
    status?: Status;
    direction?: Direction;
    at?: string | Date;
  };
  last_message_at?: string | Date | null;
  unread?: number;
};

export type MessageDoc = {
  _id?: string;
  wa_id: string;
  direction: Direction;
  message_id: string;
  name?: string | null;
  content: { type: string; text?: string | null; media?: string; raw?: string };
  status: Status;
  timestamps: {
    created_at: string;
    updated_at: string;
    message_at?: string;
    sent_at?: string;
    delivered_at?: string;
    read_at?: string;
  };
  chat_key: string;
};


export type PaginatedMessages ={
    items: MessageDoc[];
    nextCursor: string | null;
}

