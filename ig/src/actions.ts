'use server';

import { prisma } from "./db";
import { auth } from "./auth";
import { uniq } from "lodash";
import { Profile } from "@prisma/client";

export async function getSessionEmail() : Promise<string|null|undefined>
{
    const session = await auth();
    return session?.user?.email;
}
export async function getSessionEmailOrThrow() :Promise<string>
{
    const userEmail = await getSessionEmail();
    if (!userEmail) {
        throw 'not logged in';
    }
    return userEmail;
}

export async function updateProfile(data: FormData)
{
    const userEmail = await getSessionEmailOrThrow();
    const newUserInfo = {
        username: data.get('username') as string,
        name: data.get('name') as string,
        subtitle: data.get('subtitle') as string,
        bio: data.get('bio') as string,
        avatar: data.get('avatar') as string,
    };
    await prisma.profile.upsert({
        where: {
            email: userEmail,
        },
        update: newUserInfo,
        create: {
            email: userEmail,
            ...newUserInfo,
        },
    });
}

export async function createPost(data: FormData)
{
    const userEmail = await getSessionEmailOrThrow();
    const postDoc = await prisma.post.create({
        data : {
            author: userEmail,
            image: data.get('image') as string,
            description : data.get('description') as string || '',
        },
    });
    return postDoc.id;
}
export async function createStory(data: FormData)
{
    const userEmail = await getSessionEmailOrThrow();
    const storyDoc = await prisma.story.create({
        data : {
            author: userEmail,
            image: data.get('image') as string,
        },
    });
    return storyDoc.id;
}

export async function postComment(data: FormData){
    const authorEmail = await getSessionEmailOrThrow();
    return prisma.comment.create({
        data:{
            author: authorEmail,
            postId: data.get('postId') as string,
            text:data.get('text') as string,
        },
    })
}
export async function DeleteComment(data: FormData){
    return prisma.comment.deleteMany({
        where:{
            id: data.get('id') as string,
        },
    })
}
export async function DeleteStory(data: FormData){
    return prisma.story.deleteMany({
        where:{
            id: data.get('id') as string,
        },
    })
}

async function updateLikecount(postId: string){
    await prisma.post.update({
        where:{id:postId},
        data:{
            likecount: await prisma.like.count({where:{postId}}),
        },
    });
}

export async function likepost(data: FormData){
    const postId = data.get('postId') as string;
    await prisma.like.create({
        data: {
            author: await getSessionEmailOrThrow(),
            postId
        },
    });
    updateLikecount(postId);
}

export async function removeLikeFromPost(data: FormData){
    const postId = data.get('postId') as string;
    await prisma.like.deleteMany({
        where: {
            postId,
            author: await getSessionEmailOrThrow(),
        }
    })
    updateLikecount(postId);
}

export async function Bookpost(data: FormData){
    const postId = data.get('postId') as string;
    await prisma.bookmark.create({
        data: {
            profileBookingEmail: await getSessionEmailOrThrow(),
            postId
        },
    });
}

export async function removeBookFromPost(data: FormData){
    const postId = data.get('postId') as string;
    await prisma.bookmark.deleteMany({
        where: {
            profileBookingEmail: await getSessionEmailOrThrow(),
            postId
        }
    })
}

export async function getSinglePostData(postId:string){
    const post = await prisma.post.findFirstOrThrow({
        where:{
            id: postId,
        }})
        const authorProfile = await prisma.profile.findFirstOrThrow({where:{email:post.author}})
        const comments = await prisma.comment.findMany({where:{postId:post.id}});
        const commenstAuthors = await prisma.profile.findMany({
            where: {
                email: {in : uniq(comments.map(c => c.author))},
            },
        })
        const myLike = await prisma.like.findFirst({
            where: {
                author: await getSessionEmailOrThrow(),
                postId : post.id,
            }
        })
        const myBook = await prisma.bookmark.findFirst({
            where: {
                profileBookingEmail: await getSessionEmailOrThrow(),
                postId : post.id,
            }
        })
        return { 
            post, authorProfile, comments, commenstAuthors,myLike,myBook
        }
    }
    export async function followUser(profileIdToFollow: string){
        const sessionProfile = await prisma.profile.findFirstOrThrow({
            where: {
                email : await getSessionEmailOrThrow(),
            }
        });
        await prisma.follower.create({
            data: {
                followingProfileEmail: sessionProfile.email,
                followingProfileId: sessionProfile.id,
                followedProfileId: profileIdToFollow,
            },
        });
    }
    export async function unfollowUser(profileIdToFollow: string){
        const sessionProfile = await prisma.profile.findFirstOrThrow({
            where: {
                email : await getSessionEmailOrThrow(),
            }
        });
        await prisma.follower.deleteMany({
            where: {
                followingProfileEmail: sessionProfile.email,
                followingProfileId: sessionProfile.id,
            },
        });
    }
    
    export async function startConvo(profile:Profile){
        const session = await auth();
        const myProfile =  await prisma.profile
        .findFirst({where:{email:session?.user?.email as string}});
        await prisma.convo.create({
            data:{
                destId: profile.id,
                srcEmail: await getSessionEmailOrThrow(),
                srcId: myProfile?.id as string,
            },
        })
    }
    
    export async function sendMessage(data: FormData){
        const message = data.get('message');
        const convoId = data.get('convoId');
        const session = await auth();
        const myProfile =  await prisma.profile
        .findFirst({where:{email:session?.user?.email as string}});
    
        if (typeof message !== 'string' || typeof convoId !== 'string') {
            throw new Error('Invalid form data: message and convoId must be strings.');
        }
        return prisma.message.create({
            data:{
                text:message,
                convoId:convoId,
                author:myProfile?.email as string,
            },
        })
    }