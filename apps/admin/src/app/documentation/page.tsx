'use client';

import {
  addDocumentationArticle,
  deleteDocumentationArticle,
  fetchDocumentationArticles,
  updateDocumentationArticle,
} from '@amberops/api/client';
import type { DocumentationArticle } from '@amberops/lib';
import { PageHeader } from '@amberops/ui/components/page-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@amberops/ui/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@amberops/ui/components/ui/dialog';
import { Button } from '@amberops/ui/components/ui/button';
import { Checkbox } from '@amberops/ui/components/ui/checkbox';
import { Input } from '@amberops/ui/components/ui/input';
import { Label } from '@amberops/ui/components/ui/label';
import { Textarea } from '@amberops/ui/components/ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Edit, MoreHorizontal, PlusCircle, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { DataTable } from '@amberops/ui/components/data-table';

export default function AdminDocumentationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] =
    useState<DocumentationArticle | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
  });

  const queryClient = useQueryClient();

  const { data: articles = [], isLoading } = useQuery<DocumentationArticle[]>({
    queryKey: ['documentation'],
    queryFn: fetchDocumentationArticles,
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const mutation = useMutation({
    mutationFn: (
      articleData: Omit<DocumentationArticle, 'id' | 'createdAt' | 'updatedAt'>,
    ) => {
      if (editingArticle) {
        return updateDocumentationArticle(editingArticle.slug, articleData);
      }
      return addDocumentationArticle(articleData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentation'] });
      toast.success(
        `Article ${editingArticle ? 'updated' : 'created'} successfully!`,
      );
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => deleteDocumentationArticle(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentation'] });
      toast.success('Article deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    },
  });

  const openModal = (article: DocumentationArticle | null = null) => {
    setEditingArticle(article);
    setFormData(
      article
        ? { title: article.title, slug: article.slug, content: article.content }
        : { title: '', slug: '', content: '' },
    );
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const columns: ColumnDef<DocumentationArticle>[] = [
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
    { accessorKey: 'slug', header: 'Slug' },
    {
      accessorKey: 'updatedAt',
      header: 'Last Updated',
      cell: ({ row }) => format(new Date(row.original.updatedAt), 'PPp'),
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
                aria-label={`Actions for ${row.original.title}`}
                data-testid={`actions-button-${row.original.slug}`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              data-testid={`actions-menu-${row.original.slug}`}
            >
              <DropdownMenuItem
                onClick={() => openModal(row.original)}
                data-testid={`edit-button-${row.original.slug}`}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => deleteMutation.mutate(row.original.slug)}
                data-testid={`delete-button-${row.original.slug}`}
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
        title="Manage Documentation"
        description="Create, edit, and delete documentation articles."
        actions={
          <Button onClick={() => openModal()} data-testid="new-article-button">
            <PlusCircle className="mr-2 h-4 w-4" /> New Article
          </Button>
        }
      />
      <DataTable
        columns={columns}
        data={articles}
        filterKey="title"
        isLoading={isLoading}
      />
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl" data-testid="article-modal">
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? 'Edit' : 'Create'} Article
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the documentation article.
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
              <Label htmlFor="slug" className="text-right">
                Slug
              </Label>
              <Input
                id="slug"
                data-testid="slug-input"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, slug: e.target.value }))
                }
                className="col-span-3"
                disabled={!!editingArticle}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="mt-2 text-right">
                Content
              </Label>
              <Textarea
                id="content"
                data-testid="content-textarea"
                value={formData.content}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, content: e.target.value }))
                }
                className="col-span-3 h-64"
                placeholder="Use HTML for formatting."
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
                {mutation.isPending ? 'Saving...' : 'Save Article'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
