
import { auth, signIn, signOut } from "@/auth"
import UserHome from "@/components/UserHome";
import { Suspense } from "react";

export default async function Home() {
	const session = await auth();
	return (
		<div>
			{session && (
				<Suspense fallback="Loading...">
					<UserHome session={session} />
				</Suspense>
			)}
			{!session && (
				<form
					className="fixed inset-0 flex justify-center items-center bg-white dark:bg-gray-950"
					action={async () => {
						"use server"
						await signIn("google")
					}}>
					<button 
						className="border px-4 text-black dark:text-white rounded-lg"
						type="submit">Login with google
						</button>
				</form>
			)}
		</div>
	);
}
