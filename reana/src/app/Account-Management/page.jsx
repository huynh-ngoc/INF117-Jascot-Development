'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const AccountManagement = dynamic(
  () => import('@/components/account/ManageAccount'),
  { ssr: false }
)

export default function AccountManagementPage() {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <AccountManagement />
      </Suspense>
    </div>
  )
}