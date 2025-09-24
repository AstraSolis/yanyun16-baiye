'use client'

import { useState, useEffect } from 'react'
import type { Member, MemberDataResponse } from '@/types/member'
import { getMembersClient } from '@/lib/config'

export function useMemberData(): MemberDataResponse {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true)
      
      try {
        const membersData = await getMembersClient()
        setMembers(membersData)
        setError(undefined)
      } catch (err) {
        setError('加载成员数据失败')
        console.error('Failed to load member data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadMembers()
  }, [])

  return { members, loading, error }
}

// 为服务端使用的成员数据加载函数
export async function loadMembersFromJSON(): Promise<Member[]> {
  try {
    const response = await fetch('/api/members')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to load members from JSON:', error)
    return []
  }
}
