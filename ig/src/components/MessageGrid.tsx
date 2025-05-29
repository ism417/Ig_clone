'use client'
import { Profile, message } from "@prisma/client"
import { Avatar } from "@radix-ui/themes"
import { formatDate } from "date-fns"
import { useEffect } from "react";

export default function MessageGrid({
    messages,
    myProfile,
    friend,
    id,
}:{
    messages:message[];
    myProfile:Profile|null;
    friend:Profile|null;
    id:string;
}){
    useEffect(() => {
        // Establish WebSocket connection
        const ws = new WebSocket(`ws://localhost:3001?convoId=${id}`);
        ws.onopen = () => {
            console.log("WebSocket connection established");
        };
        // Listen for new messages
        ws.onmessage = () => {
            // Refresh the page when a new message is received
            console.log("New message received:");
            window.location.reload();
        };
        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    
        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };
        return () => {
            ws.close();
        };
    }, [id]);
    return(
        <div className="ml-2 mr-2">
            {messages.map(message =>{
                    return (
                        <div key={message.id} className={`flex ${myProfile?.email === message.author ? 'justify-end' : 'justify-start'} mb-2`}>
                            <div className="flex">
                                {myProfile?.email !== message.author && (
                                    <Avatar
                                        size="3"
                                        radius="full"
                                        fallback={'avatar'} 
                                        src={friend?.avatar || ''}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col items-end ">
                                <div className={`${myProfile?.email === message.author ? 'bg-blue-300': 'bg-gray-300'} rounded-md p-2 mx-1`}>
                                    <p className="dark:text-gray-950" >{message.text}</p>
                                </div>
                                <div className="text-xs mx-1">
                                    {formatDate(message.createdAt,'HH:mm')}
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}