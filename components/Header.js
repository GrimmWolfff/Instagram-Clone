import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { HeartIcon, HomeIcon, MenuIcon, PaperAirplaneIcon, PlusCircleIcon, SearchIcon, UserGroupIcon } from '@heroicons/react/outline'; 
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

export default function Header () {
    const { data: session } = useSession();
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);
    const goHome = () => router.push('/');

    return (
        <div className="shadow-sm border-b bg-white top-0 sticky z-50">
            <div className="flex justify-between max-w-6xl mx-5 lg:max-auto">
                <div onClick={() => goHome()} className="relative lg:inline-grid w-24">
                    <Image src="https://links.papareact.com/ocw" layout='fill' objectFit='contain'/>
                </div>
                <div onClick={() => goHome()} className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
                    <Image src="https://links.papareact.com/jjm" layout='fill' objectFit='contain'/>
                </div>
                <div className="relative mt-1 p-3 rounded-md">
                    <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input className="bg-gray-50 w-full block pl-10 sm:text-sm border-gray focus:border-black focus:ring-black" 
                    type="text" placeholder="Search..." />
                </div>
                <div className="flex items-center space-x-4">
                    <HomeIcon onClick={() => goHome()} className="navBtn" />
                    <MenuIcon className="h-10 md:hidden cursor-pointer" />
                    {session ? (
                        <>
                            <div className="relative navBtn">
                                <PaperAirplaneIcon className="navBtn rotate-45" />
                                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 
                                rounded-full flex items-center justify-center text-white">3</div>
                            </div>                    
                            <PlusCircleIcon className="navBtn" onClick={() => setOpen(true)}/>
                            <UserGroupIcon className="navBtn" />
                            <HeartIcon className="navBtn" />
                            <img onClick={signOut} src={session?.user?.image} alt="profile pic" className="h-10 w-10 rounded-full cursor-pointer"/>
                        </>
                    ) : (
                        <button onClick={signIn}>Sign In</button>
                    )}

                </div>
            </div>
        </div>
    );
}