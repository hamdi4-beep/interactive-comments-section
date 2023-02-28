import { useQuery } from "react-query"
import { getData } from "../service/getData"

export default function User() {
    const userQuery = useQuery('user', () => {
        return getData('http://localhost:3000/currentUser')
    })

    if (userQuery.status === 'loading') return <p>Still loading</p>

    const { data: {
        image
    } } = userQuery

    return (
        <div className="user">
            <div className='user-img'>
                <img src={image.png} alt='' />
            </div>
        </div>
    )
}