'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { requestProvider } from 'webln'
import type { WebLNProvider } from 'webln'

type WebLNContextType = {
    webln: WebLNProvider | null
    isLoading: boolean
    error: string | null
    enable: () => Promise<void>
    disconnect: () => void
}

const WebLNContext = createContext<WebLNContextType | undefined>(undefined)

export function WebLNProvider({ children }: { children: React.ReactNode }) {
    const [webln, setWebln] = useState<WebLNProvider | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const enable = async () => {
        setIsLoading(true)
        try {
            const provider = await requestProvider()
            setWebln(provider)
            setError(null)
        } catch (err) {
            setError('Please install a WebLN provider like Alby')
        } finally {
            setIsLoading(false)
        }
    }

    const disconnect = () => setWebln(null)

    return (
        <WebLNContext.Provider value={{ webln, isLoading, error, enable, disconnect }}>
            {children}
        </WebLNContext.Provider>
    )
}

export function useWebLN() {
    const context = useContext(WebLNContext)
    if (!context) {
        throw new Error('useWebLN must be used within a WebLNProvider')
    }
    return context
}