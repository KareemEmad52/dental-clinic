import { auth } from '@/lib/auth'
import React from 'react'

const page = async () => {
  const session = await auth()
  console.log(session);
  if (!session?.user) return null
  return (
    <>
      <div>page: {session.user.name}</div>
    </>
  )
}

export default page