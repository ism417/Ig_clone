import { getSinglePostData } from "@/actions";
import SinglePost from "@/components/SinglePost";


export default async function SinglePostPage({params}:{params:Promise<{ id: string }>})
{
    const paramsAwait = await params;
    const {post, authorProfile, comments, commenstAuthors,myLike, myBook} = await getSinglePostData(paramsAwait.id)
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
};