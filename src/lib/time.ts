import {format} from 'date-fns';

export function shortTime(d?:string |Date |null){
    if(!d) return "";
    const date = typeof d === "string" ? new Date(d) : d;
    return format(date, "HH:mm");
}

export function iso(d?:string | Date | null) {
    if(!d) return "";
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toISOString();
}
