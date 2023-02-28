import * as React from 'react'
import { UserInterface } from '../interfaces/UserInterface'

import User from './User'

type UserProp = {
    receiver?: UserInterface
}

export default function Reply({ receiver }: UserProp) {

    const handleClick = (e: React.SyntheticEvent) => console.log('Gotcha!')
    const isReply = receiver && `@${receiver.username} `

    return (
        <div className='comment'>
            <div className="flex currentUser" style={{marginTop: '.5em', gap: '1rem'}}>
                <User />
                <input type="text" placeholder='Add a comment...' defaultValue={isReply} />
                <button className='cta-btn' onClick={handleClick}>{isReply ? 'Reply' : 'Send'}</button>
            </div>
        </div>
    )
}