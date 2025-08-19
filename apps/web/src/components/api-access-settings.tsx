
'use client';

import { useState } from 'react';
import {
  Button,
} from '@amberops/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@amberops/ui/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@amberops/ui/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@amberops/ui/components/ui/dialog';
import { Input } from '@amberops/ui/components/ui/input';
import { Label } from '@amberops/ui/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@amberops/ui/components/ui/tooltip';
import { MoreHorizontal, PlusCircle, Trash, Copy } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
}

const initialKeys: ApiKey[] = [
  {
    id: 'key_1',
    name: 'CI/CD Pipeline Key',
    key: 'sk_live_******************1234',
    createdAt: new Date(2023, 5, 15).toISOString(),
    lastUsed: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'key_2',
    name: 'Dev Laptop Key',
    key: 'sk_live_******************5678',
    createdAt: new Date(2024, 1, 10).toISOString(),
    lastUsed: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export function ApiAccessSettings() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialKeys);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const generateApiKey = () => {
    if (!newKeyName) {
      toast.error('Please provide a name for the API key.');
      return;
    }

    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      key: `sk_live_${[...Array(18)].map(() => Math.random().toString(36)[2]).join('')}${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      lastUsed: 'Never',
    };

    setApiKeys((prev) => [...prev, newKey]);
    toast.success(`API Key "${newKeyName}" generated successfully!`);
    setIsModalOpen(false);
    setNewKeyName('');
  };

  const revokeApiKey = (keyId: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== keyId));
    toast.success('API Key revoked successfully.');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API Key copied to clipboard.');
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>API Access</CardTitle>
            <CardDescription>
              Manage API keys and access tokens for programmatic access.
            </CardDescription>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Generate New Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate New API Key</DialogTitle>
                <DialogDescription>
                  Give your new key a descriptive name to remember its purpose.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="key-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="key-name"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Production Server"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={generateApiKey}>Generate Key</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key (Partial)</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{key.key}</span>
                       <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(key.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy full key</TooltipContent>
                       </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell>{format(new Date(key.createdAt), 'PP')}</TableCell>
                  <TableCell>
                    {key.lastUsed === 'Never'
                      ? 'Never'
                      : format(new Date(key.lastUsed), 'PPp')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Open actions</p>
                        </TooltipContent>
                      </Tooltip>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => revokeApiKey(key.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Revoke Key
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
