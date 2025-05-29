import Comment from "./Comment";
import LikesInfo from "./LikesInfo";
import { Suspense } from "react";
import SessionCommentForm from "./SessionCommentForm";
import { Comment as CommentModel, Like, Post, Profile, bookmark } from "@prisma/client";
import BookMarkButton from "./BookMarkButton";
import Image from "next/image";

export default async function SinglePost({
    post,
    authorProfile,
    comments,
    commentsAuthors,
    myLike,
    myBook,
}:{
    post:Post;
    authorProfile:Profile;
    comments:CommentModel[];
    commentsAuthors: Profile[];
    myLike : Like|null;
    myBook : bookmark|null;
}){
    return(
        <div>
            <div className="grid md:grid-cols-2 gap-4">
                <div >
                    <Image 
                    className="rounded-md" 
                    src={post.image} 
                    alt={post.description}/>
                </div>
                <div>
                    <Comment text={post.description} createdAt={post.createdAt} authorProfile={authorProfile} isComment={false}/>
                    <div className="pt-4 flex flex-col gap-2">
                        {comments.map( comment => (
                            <div key={comment.id}>
                                <Comment 
                                    text={comment.text}
                                    createdAt={comment.createdAt}
                                    authorProfile={commentsAuthors.find(a => a.email === comment.author)}
                                    isComment={true} 
                                    commentId={comment.id}/>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center text-gray-700 justify-between pt-4 mt-4 border-t border-t-gray-300 dark:border-t-gray-700">
                        <LikesInfo post={post} sessionLike={myLike} />
                        <BookMarkButton post={post} sessionBook={myBook} />
                    </div>
                    <div className="pt-8 border-t mt-4 border-t-gray-300 dark:border-t-gray-700">
                        <Suspense>
                            <SessionCommentForm postId={post.id} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}