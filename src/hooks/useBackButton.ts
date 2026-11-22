import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { registerBackButton } from '@/lib/native'

export function useBackButton() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useEffect(
    () => registerBackButton(() => pathname !== '/', () => navigate(-1)),
    [pathname, navigate],
  )
}
