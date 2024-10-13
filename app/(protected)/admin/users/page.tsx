'use client'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAdminUsers } from '@/hooks/use-user'
import { CheckboxIcon } from '@radix-ui/react-icons'
import React from 'react'
import moment from 'moment'
import { User } from '@prisma/client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Make sure you import this

export default function Page() {
  const [users, setUsers] = React.useState<User[] | undefined>(undefined)

  React.useEffect(() => {
    async function fetchUsers() {
      const users = await useAdminUsers()
      setUsers(users)
    }

    fetchUsers()
  }, [])

  return (
    <div className="bg-white rounded-md">
      <div className="bg-white rounded-md">
        {users && users?.length > 0 && <ProductTable users={users} />}
      </div>
    </div>
  )
}

function ProductTable({ users }: { users: User[] }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleChangeUserRole = async (value: string, userId: string) => {
    setIsLoading(true) // Start loading state

    try {
      const res = await axios.post(
        `/api/admin/users/update/role/`,
        {
          role: value,
          userId,
        },
        {
          withCredentials: true,
        }
      )

      // If success, show the success toast and redirect
      toast.success('You have successfully updated the role of the user')
      window.history.replaceState(null, '', '/admin/users')
    } catch (error) {
      console.error('🚀 ~ error:', error)
      if (axios.isAxiosError(error) && error.response) {
        toast.error(String(error.response.data.error))
      } else {
        toast.error('An unknown error occurred')
      }
    } finally {
      setIsLoading(false) // End loading state
    }
  }

  return (
    <Table>
      <TableCaption className="p-2">
        A table for all of your users.
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>CreatedAt</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users &&
          Array.isArray(users) &&
          users.length > 0 &&
          users?.map((user) => {
            const date = moment(user.createdAt.toString()).format('LLL')
            return (
              <TableRow key={user.id}>
                <TableCell className="max-h-16 max-w-16">
                  <CheckboxIcon />
                </TableCell>
                <TableCell className="font-medium text-gray-400">
                  {date}
                </TableCell>
                <TableCell className="max-h-16 max-w-16 font-medium">
                  {user.name?.toUpperCase()}
                </TableCell>
                <TableCell className="max-h-16 max-w-16">
                  {user.email}
                </TableCell>
                <TableCell className="max-h-16 max-w-16">
                  <Select
                    onValueChange={(value) =>
                      handleChangeUserRole(value, user.id)
                    }
                    value={user.role}
                    disabled={isLoading} // Disable while loading
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
