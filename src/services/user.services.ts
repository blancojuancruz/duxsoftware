import { IQueryParams } from '@/models/Global'
import { User } from '@/models/User'

const API_URL = 'https://staging.duxsoftware.com.ar/api/personal'
const SECTOR = '2222'

const getUsers = async (
  params: IQueryParams
): Promise<{
  users: User[]
  totalCount: number
}> => {
  const queryParams = new URLSearchParams({
    sector: params.filters.sectorFilter || SECTOR,
    _limit: params.rows.toString(),
    _page: params.page.toString()
  })

  if (params.sortField) {
    queryParams.append('_sort', params.sortField)
    queryParams.append('_order', params.sortOrder === 1 ? 'asc' : 'desc')
  }

  if (params.filters.globalFilter) {
    queryParams.append('q', params.filters.globalFilter)
  }

  if (params.filters.sectorFilter) {
    queryParams.append('sector', params.filters.sectorFilter)
  }

  if (params.filters.stateFilter) {
    queryParams.append('estado', params.filters.stateFilter)
  }

  const response = await fetch(`${API_URL}?${queryParams}`)

  if (!response.ok) console.log('Error al obtener los usuarios')

  const users = await response.json()
  const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10)

  return { users, totalCount }
}

const createUser = async (user: Omit<User, 'sector'>): Promise<User> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...user, sector: SECTOR })
  })

  if (!response.ok) console.log('Error al crear el nuevo usuario')

  return response.json()
}

const updateUser = async (user: Omit<User, 'sector'>): Promise<User> => {
  const response = await fetch(`${API_URL}/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...user, sector: SECTOR })
  })

  if (!response.ok) console.log('Error al modificar usuario')

  return response.json()
}

const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) console.log('Error al eliminar usuario')
}

export const userServices = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}
