import { useCallback, useEffect, type Dispatch } from "react"

interface AppEvent<Payload = unknown> extends Event {
    detail: Payload
}

interface CustomEventMap extends WindowEventMap {
    onEvent: AppEvent<string>
}

export const useEvent = <Payload>(eventName: keyof CustomEventMap, callback: Dispatch<Payload>) => {
    useEffect(() => {
        const listener = ((e: AppEvent<Payload>) =>
            callback(e.detail)) as EventListener

        window.addEventListener(eventName, listener)

        return () =>
            window.removeEventListener(eventName, listener)
    }, [eventName, callback])

    const eventDispatch = useCallback(
        (detail: Payload) =>
            window.dispatchEvent(new CustomEvent(eventName, {
                detail
            })),
        [eventName]
    )

    return {
        eventDispatch
    }
}