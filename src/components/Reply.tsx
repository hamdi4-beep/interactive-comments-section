import { UserInterface } from '../interfaces/UserInterface'

type UserProp = {
    user: UserInterface
}

export default function Reply({ user }: UserProp) {
    const { image } = user

    return (
        <div className='comment'>
            <div className="flex currentUser" style={{marginTop: '.5em', gap: '1rem'}}>
                <div className="user">
                    <div className='user-img'>
                        <img src={image.png} alt='' />
                    </div>
                </div>

                <input type="text" placeholder='Add a comment...' />
                <button className='cta-btn'>Send</button>
            </div>
        </div>
    )
}