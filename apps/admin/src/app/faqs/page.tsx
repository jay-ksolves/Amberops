'use client';

import {
  addFaq,
  deleteFaq,
  fetchFaqs,
  updateFaq,
} from '@amberops/api/client';
import type { FAQ } from '@amberops/lib';
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
import { Textarea } from '@amberops/ui/components/ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, PlusCircle, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { DataTable } from '@amberops/ui/components/data-table';

export default function AdminFaqsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState<Omit<FAQ, 'id'>>({
    question: '',
    answer: '',
  });

  const queryClient = useQueryClient();

  const { data: faqs = [], isLoading } = useQuery<FAQ[]>({
    queryKey: ['faqs'],
    queryFn: fetchFaqs,
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  const mutation = useMutation({
    mutationFn: (faqData: Omit<FAQ, 'id'>) => {
      if (editingFaq) {
        return updateFaq(editingFaq.id, faqData);
      }
      return addFaq(faqData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success(`FAQ ${editingFaq ? 'updated' : 'created'} successfully!`);
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (faqId: string) => deleteFaq(faqId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success('FAQ deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    },
  });

  const openModal = (faq: FAQ | null = null) => {
    setEditingFaq(faq);
    setFormData(
      faq
        ? { question: faq.question, answer: faq.answer }
        : { question: '', answer: '' },
    );
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const columns: ColumnDef<FAQ>[] = [
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
      accessorKey: 'question',
      header: 'Question',
      cell: ({ row }) => (
        <p className="max-w-[400px] truncate">{row.original.question}</p>
      ),
    },
    {
      accessorKey: 'answer',
      header: 'Answer',
      cell: ({ row }) => (
        <p className="max-w-[500px] truncate">{row.original.answer}</p>
      ),
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
        title="Manage FAQs"
        description="Create, edit, and delete Frequently Asked Questions."
        actions={
          <Button onClick={() => openModal()} data-testid="new-faq-button">
            <PlusCircle className="mr-2 h-4 w-4" /> New FAQ
          </Button>
        }
      />
      <DataTable
        columns={columns}
        data={faqs}
        filterKey="question"
        isLoading={isLoading}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl" data-testid="faq-modal">
          <DialogHeader>
            <DialogTitle>{editingFaq ? 'Edit' : 'Create'} FAQ</DialogTitle>
            <DialogDescription>
              Fill in the details for the FAQ.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="question" className="text-right">
                Question
              </Label>
              <Input
                id="question"
                data-testid="question-input"
                value={formData.question}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, question: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="answer" className="mt-2 text-right">
                Answer
              </Label>
              <Textarea
                id="answer"
                data-testid="answer-textarea"
                value={formData.answer}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, answer: e.target.value }))
                }
                className="col-span-3 h-32"
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
                {mutation.isPending ? 'Saving...' : 'Save FAQ'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
