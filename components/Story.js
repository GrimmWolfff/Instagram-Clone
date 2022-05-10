import React from 'react'

export default function Story({ avatar, username }) {
    return (
        <div className="w-20 h-30 rounded-full cursor-pointer">
            <img className="h-14 w-14 p-[1.5px] border-red-500 border-2 rounded-full" src={avatar} alt="Image Not Found" />
            <p className="text-xs w-14 truncate text-center top-0">{username}</p>
        </div>
    )
}
