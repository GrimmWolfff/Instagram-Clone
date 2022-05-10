import React from 'react'

import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, PaperAirplaneIcon } from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';

function Post({ id, username, userImg, caption }) {
    return (
        <div className="bg-white my-7 border rounded-sm">
            <div className="flex items-center p-5">
                <img src={ userImg } alt="Image Not Found" className="rounded-full h-12 w-12 object-contain border p-1 mr-3"/>
                <p className="flex-1 font-bold"> { username } </p>
                <DotsHorizontalIcon className="h-5" />
            </div>

            <img src={ userImg } alt="" className="object-cover"/>

            <div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-5">
                    <HeartIcon className="btn" />
                    <ChatIcon className="btn" />
                    <PaperAirplaneIcon className="btn" />
                </div>
                <BookmarkIcon className="btn"/>
            </div>

            <p className="p-5 truncate">
                <span className="font-bold mr-1"> { username } </span>
                <p> { caption } </p>
            </p>
        </div>
    )
}

export default Post;