import * as React from 'react'
import { UserInterface } from '../interfaces/UserInterface'

export const UserContext = React.createContext<UserInterface>({
    image: {
        png: '',
        webp: ''
    },

    username: ''
})