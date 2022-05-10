import React from 'react'

function Suggestions() {
    const Data = [
        {
            id: '1',
            username: 'user1',
            caption: 'ILIA MAGARIA',
            userImg: 'https://links.papareact.com/3ke'
        },
        {
            id: '2',
            username: 'user2',
            caption: 'ILIA MAGARIA',
            userImg: 'https://links.papareact.com/3ke'
        },
        {
            id: '3',
            username: 'user3',
            caption: 'ILIA MAGARIA',
            userImg: 'https://links.papareact.com/3ke'
        },
    ]
    
    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between text-sm mb-5">
                <h3 className="text-sm font-bold text-gray-400">Suggestions For you</h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>

            { Data.map(profile => (
                <div key={profile.id} className="flex items-center justify-between mt-3">
                    <img className="w-10 h-10 rounded-full border p-[2px]" src={profile.userImg} alt="" />
                    <div className="flex-1 ml-4">
                        <h2 className="font-semibold text-sm">Sandro</h2>
                        <h3 className="text-xs text-gray-400">Followed by chemi pexebi</h3>
                    </div>
                    <button className="text-blue-400 text-xs">Follow</button>
                </div>
            )) }
        </div>
    )
}

export default Suggestions
