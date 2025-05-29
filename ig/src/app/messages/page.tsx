import ConversationList from "@/components/Conversation"


export default function Messages(){
    return (
        <div className="flex h-screen  flex-col-2  justify-center">
            <ConversationList/>
            <div className="w-full flex flex-col items-center border-l border-l-gray-400">
                <h1 className="font-bold">Your messages</h1> 
                <p>Send a message to start a chat.</p>
            </div>
        </div>
    )
}