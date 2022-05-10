import React from 'react'

import Post from './Post';

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
function Posts() {
    return (
        <div>
            {Data.map(user => <Post key={user.id} username={user.username} userImg={user.userImg} caption={user.caption}/> )}
        </div>
    )
}

export default Posts;
