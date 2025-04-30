'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AccountForm from './AccountForm'
import SubscriptionManager from './SubscriptionManager'
import RoleSelector from '../role/RoleSelector'
import { Button } from '@/components/ui/button'

export default function ManageAccount() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [isFormValid, setIsFormValid] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFormValidityChange = (isValid) => {
    setIsFormValid(isValid)
  }

  const handleCreateClick = () => {
    if (isFormValid && selectedRole !== null) {
      router.push('/dashboard')
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Account Management</h1>
      
      <AccountForm onValidityChange={handleFormValidityChange} />
      <SubscriptionManager />
      
      <div>
        <h2 className="text-2xl font-semibold mb-6">Select Your Role</h2>
        <RoleSelector 
          onSelectRole={setSelectedRole} 
          selectedRole={selectedRole} 
        />
      </div>

      <div className="sticky bottom-6 flex justify-center mt-12">
        <Button
          size="lg"
          disabled={!isFormValid || selectedRole === null}
          onClick={handleCreateClick}
          className={`min-w-[300px] py-6 px-8 text-lg font-semibold
            transition-all duration-300
            ${isFormValid && selectedRole !== null 
              ? 'hover:-translate-y-1 opacity-100' 
              : 'opacity-60'}`}
        >
          Create Account
        </Button>
      </div>
    </div>
  )
}
