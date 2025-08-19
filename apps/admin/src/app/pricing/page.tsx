'use client';

import {
  addPricingTier,
  deletePricingTier,
  fetchPricingTiers,
  updatePricingTier,
} from '@amberops/api/client';
import type { PricingTier } from '@amberops/lib';
import { PageHeader } from '@amberops/ui/components/page-header';
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
import { Switch } from '@amberops/ui/components/ui/switch';
import { Textarea } from '@amberops/ui/components/ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, PlusCircle, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { DataTable } from '@amberops/ui/components/data-table';

export default function AdminPricingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null);
  const [formData, setFormData] = useState<Omit<PricingTier, 'id'>>({
    title: '',
    price: '',
    period: '',
    description: '',
    features: [],
    isFeatured: false,
  });

  const queryClient = useQueryClient();

  const { data: tiers = [], isLoading } = useQuery<PricingTier[]>({
    queryKey: ['pricingTiers'],
    queryFn: fetchPricingTiers,
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTier(null);
  };

  const mutation = useMutation({
    mutationFn: (tierData: Omit<PricingTier, 'id'>) => {
      if (editingTier) {
        return updatePricingTier(editingTier.id, tierData);
      }
      return addPricingTier(tierData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pricingTiers'] });
      toast.success(
        `Pricing tier ${editingTier ? 'updated' : 'created'} successfully!`,
      );
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (tierId: string) => deletePricingTier(tierId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pricingTiers'] });
      toast.success('Pricing tier deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    },
  });

  const openModal = (tier: PricingTier | null = null) => {
    setEditingTier(tier);
    setFormData(
      tier
        ? { ...tier }
        : {
            title: '',
            price: '',
            period: '',
            description: '',
            features: [],
            isFeatured: false,
          },
    );
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const columns: ColumnDef<PricingTier>[] = [
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
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'price', header: 'Price' },
    { accessorKey: 'period', header: 'Period' },
    {
      accessorKey: 'isFeatured',
      header: 'Featured',
      cell: ({ row }) => (row.original.isFeatured ? 'Yes' : 'No'),
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
        title="Manage Pricing Tiers"
        description="Create, edit, and delete pricing plans for the landing page."
        actions={
          <Button onClick={() => openModal()} data-testid="new-tier-button">
            <PlusCircle className="mr-2 h-4 w-4" /> New Tier
          </Button>
        }
      />
      <DataTable
        columns={columns}
        data={tiers}
        filterKey="title"
        isLoading={isLoading}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl" data-testid="tier-modal">
          <DialogHeader>
            <DialogTitle>
              {editingTier ? 'Edit' : 'Create'} Pricing Tier
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the pricing plan.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                data-testid="title-input"
                value={formData.title}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, title: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                data-testid="price-input"
                value={formData.price}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, price: e.target.value }))
                }
                className="col-span-3"
                placeholder="e.g., 99 or Custom"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">
                Period
              </Label>
              <Input
                id="period"
                data-testid="period-input"
                value={formData.period}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, period: e.target.value }))
                }
                className="col-span-3"
                placeholder="e.g., /month"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                data-testid="description-input"
                value={formData.description}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, description: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="features" className="mt-2 text-right">
                Features
              </Label>
              <Textarea
                id="features"
                data-testid="features-textarea"
                value={formData.features.join('\n')}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    features: e.target.value.split('\n'),
                  }))
                }
                className="col-span-3 h-32"
                placeholder="One feature per line."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isFeatured" className="text-right">
                Featured?
              </Label>
              <Switch
                id="isFeatured"
                data-testid="featured-switch"
                checked={formData.isFeatured}
                onCheckedChange={(checked) =>
                  setFormData((f) => ({ ...f, isFeatured: checked }))
                }
              />
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
                disabled={mutation.isPending}
                data-testid="save-button"
              >
                {mutation.isPending ? 'Saving...' : 'Save Tier'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
