import * as React from 'react'
import { UserInterface } from '../interfaces/UserInterface'

type UserProp = {
    data: UserInterface[]
}

export default function Reply({ data: [user, receiver]}: UserProp) {
    const { image } = user

    const handleClick = (e: React.SyntheticEvent) => console.log('Gotcha!')

    const isReply = receiver && `@${receiver.username} `

    return (
        <div className='comment'>
            <div className="flex currentUser" style={{marginTop: '.5em', gap: '1rem'}}>
                <div className="user">
                    <div className='user-img'>
                        <img src={image.png} alt='' />
                    </div>
                </div>

                <input type="text" placeholder='Add a comment...' defaultValue={isReply} />
                <button className='cta-btn' onClick={handleClick}>{isReply ? 'Reply' : 'Send'}</button>
            </div>
        </div>
    )
}