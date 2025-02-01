import { Check, X } from 'lucide-react';
import React from 'react'
const PasswordCriteria = ({ password }) => {
    const criteria = [
        { label: "At least 6 characters", met: password.length >= 6 },
        { label: "Contains uppercase letters", met: /[A-Z]/.test(password) },
        { label: "Contains lowercase letters", met: /[a-z]/.test(password) },
        { label: "Contains a number", met: /\d/.test(password) },
        { label: "Contains a special character", met: /[^a-zA-Z0-9]/.test(password) },
    ];
    return <div className='flex flex-col gap-1'>
        {criteria.map((criteria) => <div key={criteria.label} className='flex gap-2 items-center text-sm'>
            {criteria.met
                ? (<Check className='text-green-400 size-4' />)
                : (<X className='text-gray-500 size-4' />)}
            <span className={`${criteria.met ? "text-green-400" : "text-gray-500"}`}>{criteria.label}</span>
        </div>)}
    </div>
}
const PasswordStrenghtMeter = ({ password }) => {
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength++;
        if (pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength++;
        if (pass.match(/\d/)) strength++;
        if (pass.match(/[^a-zA-Z0-9]/)) strength++;
        return strength;
    }
    const getStrengthText = (strength) => {
        if (strength === 0) return "Very Weak";
        if (strength === 1) return "Weak";
        if (strength === 2) return "Fair";
        if (strength === 3) return "Good";
        return "Strong";

    }
    const getColor = (strength) => {
        if (strength === 0) return "bg-red-500";
        if (strength === 1) return "bg-red-400";
        if (strength === 2) return "bg-yellow-500";
        if (strength === 3) return "bg-yellow-400";
        return "bg-green-500";
    }
    const strength = getStrength(password)

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-between items-center gap-2'>
                <span className='text-sm text-gray-400'>Password Strength</span>
                <span className='text-sm text-gray-400'>{getStrengthText(strength)}</span>
            </div>
            <div className='flex gap-1'>
                {[...Array(4)].map((item, index) => <div
                    key={item}
                    className={`h-1 w-1/4 rounded-full transition-colors duration-300
                         ${index < strength ? getColor(strength) : "bg-gray-600"}`}
                />)}
            </div>
            <PasswordCriteria password={password} />
        </div>
    )
}

export default PasswordStrenghtMeter
