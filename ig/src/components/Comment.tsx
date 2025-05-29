import { Profile } from "@prisma/client"
import Avatar from "./Avatar";
import { formatDate } from "date-fns";
import { Edit, Edit2, Edit2Icon, Trash2Icon, TrashIcon } from "lucide-react";
import DeleteCommentForm from "./DeleteCommentForm";

export default function Comment({
    text,
    createdAt,
    authorProfile,
    isComment,
    commentId,
}:{
    text: string;
    createdAt: Date
    authorProfile?: Profile
    isComment:boolean;
    commentId?:string;
}
)
{
    return(
        <div className="flex gap-2">
        <div>
            <Avatar src={authorProfile?.avatar || ''}/>
        </div>
        <div className="w-full">
            <div className="flex justify-between">
                <div>
                    <h3 className="flex font-medium">
                        {authorProfile?.name}
                    </h3>
                    <h4 className="text-gray-500  text-sm">
                        @{authorProfile?.username}
                    </h4>
                </div>
                {isComment && (
                    <DeleteCommentForm id={commentId || ""}/>
                )}
            </div>
            <div>
                <div className="bg-gray-200 dark:bg-slate-800 dark:border-0  border border-gray-300 rounded-md p-4 mt-3">
                    <p>
                        {text}
                    </p>
                </div>
                <div className="text-xs text-gray-400  text-right">
                    {formatDate(createdAt,'yyyy-MM-dd HH:mm:ss')}
                </div>
            </div>
        </div>
    </div>
    )
}