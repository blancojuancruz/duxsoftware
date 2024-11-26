import { User } from '@/models/User'

const API_URL = 'https://staging.duxsoftware.com.ar/api/personal'
const SECTOR = '1000'

export const getUsers = async (): Promise<{
  users: User[]
  totalCount: number
}> => {
  const queryParams = new URLSearchParams()

  const response = await fetch(`${API_URL}?${queryParams}`)

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  const users = await response.json()
  const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10)

  return { users, totalCount }
}

export const getUsersByParams = async (
  page: number,
  limit: number,
  searchTerm: string = '',
  sortField?: string,
  sortOrder?: number
): Promise<{ users: User[]; totalCount: number }> => {
  const queryParams = new URLSearchParams({
    sector: SECTOR,
    _page: page.toString(),
    _limit: limit.toString(),
    q: searchTerm
  })

  if (sortField && sortOrder !== null) {
    queryParams.append('_sort', sortField)
    queryParams.append('_order', sortOrder === 1 ? 'asc' : 'desc')
  }

  const response = await fetch(`${API_URL}?${queryParams}`)

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  const users = await response.json()
  const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10)

  return { users, totalCount }
}

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...user, sector: SECTOR })
  })

  if (!response.ok) {
    throw new Error('Failed to create user')
  }

  return response.json()
}

export const updateUser = async (user: User): Promise<User> => {
  const response = await fetch(`${API_URL}/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...user, sector: SECTOR })
  })

  if (!response.ok) {
    throw new Error('Failed to update user')
  }

  return response.json()
}

export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Failed to delete user')
  }
}
