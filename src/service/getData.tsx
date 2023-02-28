import { useEffect, useState } from "react"

export async function getData(endpoint: string) {
    try {
        const res = await fetch(endpoint)
        return await res.json()
    } catch (e) {
        console.log('Unable to fetch API!')
    }
}