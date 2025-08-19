'use client';

import {
  Button,
} from '@amberops/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Input } from '@amberops/ui/components/ui/input';
import { Label } from '@amberops/ui/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@amberops/ui/components/ui/select';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateUser } from '@amberops/api/client';
import type { User } from '@amberops/lib';

export function GeneralSettings() {
    const { theme, setTheme } = useTheme();
    const queryClient = useQueryClient();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('amberops_user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);
            setName(user.name);
            setEmail(user.email);
        }
    }, []);

    const mutation = useMutation({
        mutationFn: (updatedUserData: Partial<User>) => {
            if (!currentUser) throw new Error('No user found');
            return updateUser(currentUser.id, updatedUserData);
        },
        onSuccess: (data) => {
            toast.success("Your changes have been saved!");
            localStorage.setItem('amberops_user', JSON.stringify(data));
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            toast.error(`Failed to save changes: ${(error as Error).message}`);
        }
    });

    const handleSaveChanges = () => {
        if (!currentUser) return;
        const updatedData: Partial<User> = {};
        if (name !== currentUser.name) updatedData.name = name;
        if (email !== currentUser.email) updatedData.email = email;
        
        if (Object.keys(updatedData).length > 0) {
            mutation.mutate(updatedData);
        } else {
            toast('No changes to save.');
        }
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Update your profile and application preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
         <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme" className="w-[180px]">
                    <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveChanges} disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardFooter>
    </Card>
  );
}
