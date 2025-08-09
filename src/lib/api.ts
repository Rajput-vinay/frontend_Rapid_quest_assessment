
import axios from 'axios'
import { ChatListItem,PaginatedMessages,MessageDoc } from './types'

const api = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_BASE_URL
})


export async function getChats():Promise<ChatListItem[]>{
  const {data} = await api.get("/api/chats");
  return data.data;
}

export async function getMessages(wa_id:string, limit = 50,cursor?:string):Promise<PaginatedMessages>{
    const {data} = await api.get(`/api/chats/${wa_id}/messages`, {
        params: {
            limit,
            cursor
        }
    });
    return data.data;
}


export async function postMessage(wa_id:string, text:string,name?:string):Promise<MessageDoc>{
    const {data} = await api.post(`/api/chats/${wa_id}/messages`, {
        text,
        name
    });
    return data.data as MessageDoc;
}


