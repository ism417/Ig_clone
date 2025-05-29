import { getSinglePostData } from "@/actions";
import SinglePost from "./SinglePost";

export default async function ModelPostCentent({postId}:{postId:string}){
    // const paramsAwait = await params;
    const {
        post, authorProfile, comments, commenstAuthors, myLike, myBook
    } = await getSinglePostData(postId)
    return(
        <SinglePost
            post={post}
            authorProfile={authorProfile}
            comments={comments}
            commentsAuthors={commenstAuthors}
            myLike={myLike}
            myBook={myBook}
        />
    )
}