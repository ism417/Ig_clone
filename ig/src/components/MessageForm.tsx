'use client'
import { sendMessage } from "@/actions";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { Send, Smile } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function MessageForm({convoId}:{convoId:string}){
    const router = useRouter();
    const areaRef = useRef<HTMLInputElement>(null);
    const ws = new WebSocket(`ws://localhost:3001?convoId=${convoId}`);
    return (
        <form className="flex" action={async(data:FormData)=>{
            const message = data.get("message") as string;
            if (areaRef.current){
                areaRef.current.value = '';
            }
              // Send the message to the WebSocket server
            await sendMessage(data);
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ convoId, message }));
            }
            router.refresh();
        }}>
            <input type="hidden" name="convoId" value={convoId} />
            <input
                type="text"
                className="h-8 w-80 px-2 rounded border border-blue-200"
                name="message"
                ref={areaRef}
                placeholder="Message...">
            </input>
            <button  className="border rounded border-blue-200 px-1" type="submit">
                <Send color="#757575" />
            </button>
    </form>
    )
}