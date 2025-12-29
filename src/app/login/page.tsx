'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in')
    const [message, setMessage] = useState<string | null>(null)

    const router = useRouter()
    const supabase = createClient()

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setMessage(error.message)
            setIsLoading(false)
        } else {
            router.push('/')
            router.refresh()
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })

        if (error) {
            setMessage(error.message)
            setIsLoading(false)
        } else {
            setMessage('Check your email to continue sign in process')
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-[500px] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-xl border bg-card p-8 shadow-sm">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        {view === 'sign-in' ? 'Sign in to your account' : 'Create an account'}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {view === 'sign-in' ? (
                            <>
                                Don&apos;t have an account?{' '}
                                <button onClick={() => { setView('sign-up'); setMessage(null); }} className="font-medium text-primary hover:text-primary/90">
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button onClick={() => { setView('sign-in'); setMessage(null); }} className="font-medium text-primary hover:text-primary/90">
                                    Sign in
                                </button>
                            </>
                        )}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={view === 'sign-in' ? handleSignIn : handleSignUp}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {message && (
                        <div className="rounded-md bg-secondary/50 p-3 text-sm text-secondary-foreground">
                            {message}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {view === 'sign-in' ? 'Sign in' : 'Sign up'}
                    </Button>
                </form>
            </div>
        </div>
    )
}
