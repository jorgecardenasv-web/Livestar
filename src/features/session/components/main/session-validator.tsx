'use client'

import { useEffect } from 'react'
import { checkSession } from '../../services/verify-session.service'


export function SessionValidator() {
  useEffect(() => {
    const validateSession = async () => {
      await checkSession()
    }

    validateSession()
  }, [])

  return null
}