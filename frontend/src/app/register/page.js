"use client"
import { motion } from 'framer-motion'
import { Lock, Mail, User } from 'lucide-react'
import Input from '../components/Input'
import { useState } from 'react'
import Link from 'next/link'
import PasswordStrenghtMeter from '../components/PasswordStrengthMeter'
function RegisterPage() {
    const handleRegister = (event) => {
        event.preventDefault()
    }
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter
            backdrop-blur-xl rounded-xl shadow-lg overflow-hidden"
        >
            <div className='p-8 flex flex-col gap-5'>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text text-center'>
                    Create Account
                </h1>
                <form onSubmit={handleRegister} className='flex flex-col gap-3'>
                    <Input
                        icon={User}
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    {/* Password Strength Meter */}
                    <PasswordStrenghtMeter password={password} />
                    <motion.button className='w-full py-2 px-4 bg-gradient-to-r 
                    from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg 
                    hover:from-green-600 hover:to-emerald-700 focus:outline-none 
                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 duration-200'
                        type='submit'
                    >Register</motion.button>
                </form>

                <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                    <p className='text-sm text-gray-400'>Already have an acccount? {" "}
                        <Link href="/login" className='text-green-500 hover:underline'>Login</Link></p>

                </div>

            </div>
        </motion.div>
    )
}

export default RegisterPage
