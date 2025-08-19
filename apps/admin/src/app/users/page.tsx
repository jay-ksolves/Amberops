
'use client';

import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from '@amberops/api/client';
import type { User } from '@amberops/lib';
import { PageHeader } from '@amberops/ui/components/page-header';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@amberops/ui/components/ui/avatar';
import { Badge } from '@amberops/ui/components/ui/badge';
import { Button } from '@amberops/ui/components/ui/button';
import { Checkbox } from '@amberops/ui/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@amberops/ui/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@amberops/ui/components/ui/dropdown-menu';
import { Input } from '@amberops/ui/components/ui/input';
import { Label } from '@amberops/ui/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@amberops/ui/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { Edit, MoreHorizontal, Trash, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { DataTable } from '@amberops/ui/components/data-table';

const userSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['Admin', 'Operator', 'Viewer']),
    password: z.string().optional(),
  })
  .refine((data) => !data.password || data.password.length >= 6, {
    message: 'Password must be at least 6 characters long.',
    path: ['password'],
  });

type UserFormData = z.infer<typeof userSchema>;

export default function AdminUsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '', role: 'Viewer' },
  });

  const openModal = (user: User | null = null) => {
    setEditingUser(user);
    if (user) {
      reset({ name: user.name, email: user.email, role: user.role });
    } else {
      reset({ name: '', email: '', role: 'Viewer', password: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    reset();
  };

  const userMutation = useMutation({
    mutationFn: (formData: UserFormData) => {
      if (editingUser) {
        const { password, ...updateData } = formData;
        return updateUser(editingUser.id, updateData);
      }
      return addUser(formData as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`User ${editingUser ? 'updated' : 'added'} successfully!`);
      closeModal();
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to save user. Please try again.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to delete user. Please try again.');
    },
  });

  const onSubmit = (data: UserFormData) => {
    if (!editingUser && !data.password) {
      toast.error('Password is required for new users.');
      return;
    }
    userMutation.mutate(data);
  };

  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          data-testid="select-all-checkbox"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          data-testid={`select-row-${row.original.id}-checkbox`}
        />
      ),
    },
    {
      accessorKey: 'name',
      header: 'User',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={row.original.avatar} alt={row.original.name} />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-sm text-muted-foreground">
              {row.original.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
      cell: ({ row }) =>
        formatDistanceToNow(new Date(row.original.lastLogin), {
          addSuffix: true,
        }),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                data-testid={`actions-button-${row.original.id}`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              data-testid={`actions-menu-${row.original.id}`}
            >
              <DropdownMenuItem
                onClick={() => openModal(row.original)}
                data-testid={`edit-button-${row.original.id}`}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => deleteMutation.mutate(row.original.id)}
                data-testid={`delete-button-${row.original.id}`}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="User Management"
        description="Add, edit, and manage user accounts and permissions."
        actions={
          <Button onClick={() => openModal()} data-testid="new-user-button">
            <UserPlus className="mr-2 h-4 w-4" /> New User
          </Button>
        }
      />
      <DataTable
        columns={columns}
        data={users}
        filterKey="name"
        isLoading={isLoading}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={closeModal}
          data-testid="user-modal"
        >
          <DialogHeader>
            <DialogTitle>
              {editingUser ? 'Edit User' : 'Add New User'}
            </DialogTitle>
            <DialogDescription>
              {editingUser
                ? 'Update the user details below.'
                : 'Fill in the details to create a new user.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="name"
                      {...field}
                      className="col-span-3"
                      data-testid="name-input"
                    />
                  )}
                />
                {errors.name && (
                  <p
                    className="col-start-2 col-span-3 text-red-500 text-xs"
                    data-testid="name-error"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      {...field}
                      className="col-span-3"
                      data-testid="email-input"
                    />
                  )}
                />
                {errors.email && (
                  <p
                    className="col-start-2 col-span-3 text-red-500 text-xs"
                    data-testid="email-error"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      data-testid="role-select"
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Operator">Operator</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p
                    className="col-start-2 col-span-3 text-red-500 text-xs"
                    data-testid="role-error"
                  >
                    {errors.role.message}
                  </p>
                )}
              </div>
              {!editingUser && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="password"
                        type="password"
                        {...field}
                        className="col-span-3"
                        data-testid="password-input"
                      />
                    )}
                  />
                  {errors.password && (
                    <p
                      className="col-start-2 col-span-3 text-red-500 text-xs"
                      data-testid="password-error"
                    >
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={closeModal}
                data-testid="cancel-button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={userMutation.isPending}
                data-testid="save-button"
              >
                {userMutation.isPending ? 'Saving...' : 'Save User'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
