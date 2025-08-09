"use client";
import axios from "axios";

export type Contact = {
  _id?: string;
  wa_id: string;
  name?: string | null;
  avatarUrl?: string | null;
  created_at?: string;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export async function getContacts(): Promise<Contact[]> {
  const { data } = await api.get("/api/contacts");
  return data.data;
}

export async function createContact(payload: {
  wa_id: string;
  name?: string;
  avatarUrl?: string;
}) {
  const { data } = await api.post("/api/contacts", payload);
  return data.data as Contact;
}

export async function deleteContact(wa_id: string) {
  const { data } = await api.delete(`/api/contacts/${wa_id}`);
  return data.data as { deleted: boolean };
}
