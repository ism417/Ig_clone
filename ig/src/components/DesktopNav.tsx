'use client'
import Image from "next/image";
import logo from '@/app/logo1.png';
import { CameraIcon, HomeIcon, LayoutDashboard, Search, Send, User2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DesktopNav()
{
    const path  = usePathname();
    const profileActive = path.includes('profile');
    const createActive  = path.includes('create');
    const messageActive = path.includes('messages') || path.includes('dms');
    const browseActive  = path.includes('browse');
    const searchActive  = path.includes('search');
    const homeActive = !path.includes("posts") && !path.includes("users") &&  !profileActive && !createActive && !messageActive && !browseActive && !searchActive;
    return(
        <div className="shadow-xl shadow-gray-400 hidden lg:block w-35">
        <div className="top-0 sticky" >
          <Image src={logo} className="pl-1 pt-4 pr-1 w-60 flex justify-center dark:invert" alt=""/>
          <div className="flex flex-col gap-6 mt-6 ml-2 *:flex *:items-center *:gap-2">
            <Link href="/" className={homeActive ? "text-red-500":""}>
              <HomeIcon />
              Home
            </Link>
            <Link href="/profile" className={profileActive ? "text-red-500":""}>
              <User2Icon />
              Profile
            </Link>
            <Link href="/create" className={createActive ? "text-red-500":""}>
              <CameraIcon />
              Create
            </Link>
            <Link href="/messages" className={messageActive ? "text-red-500":""}>
              <Send/>
              Messages
            </Link>
            <Link href="/browse" className={browseActive ? "text-red-500":""}>
              <LayoutDashboard />
              Browse
            </Link>
            <Link href="/search" className={searchActive ? "text-red-500":""}>
              <Search />
              Search
            </Link>
          </div>
        </div>
      </div>
    )
}