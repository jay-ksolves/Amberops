
'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@amberops/ui/components/ui/accordion';
import { Button } from '@amberops/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@amberops/ui/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@amberops/ui/components/ui/dialog';
import { Input } from '@amberops/ui/components/ui/input';
import { Label } from '@amberops/ui/components/ui/label';
import { Textarea } from '@amberops/ui/components/ui/textarea';
import { LifeBuoy, Mail } from 'lucide-react';
import { PageHeader } from '@amberops/ui/components/page-header';
import toast from 'react-hot-toast';

const faqs = [
  {
    question: 'How do I add a new cluster?',
    answer:
      'You can add a new cluster by navigating to the Clusters page and clicking the "Add Cluster" button. You will need to provide the cluster name and other relevant details.',
  },
  {
    question: 'Where can I find the logs for a specific service?',
    answer:
      'Go to the "Log Search" page from the main navigation. You can use the search bar to filter logs by component, host, level, or by a simple text search.',
  },
  {
    question: 'How do I resolve an alert?',
    answer:
      'From the Alerts page, click on an alert to view its details. After addressing the underlying issue, you can use the "Resolve" button on the alert detail page.',
  },
  {
    question: 'Can I create custom alert definitions?',
    answer:
      'Yes. Navigate to Alerts > Definitions. From there, you can create new alert definitions based on metrics, port checks, or scripts to monitor your services.',
  },
];

export default function HelpPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactSupport = () => {
    toast.success('Support request sent! We will get back to you shortly.');
    setIsModalOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Help & Support"
        description="Find answers to common questions and get in touch with our support team."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index + 1}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="items-center text-center">
              <LifeBuoy className="h-12 w-12 text-primary" />
              <CardTitle>Need Assistance?</CardTitle>
              <CardDescription>
                If you can&apos;t find an answer here, please don&apos;t
                hesitate to reach out to us.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contact Support</DialogTitle>
                    <DialogDescription>
                      Describe your issue below and our team will get back to
                      you as soon as possible.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                     <div className="grid items-center gap-2">
                      <Label htmlFor="from">From</Label>
                      <Input
                        id="from"
                        type="email"
                        defaultValue="alice@amberops.io"
                        disabled
                      />
                    </div>
                     <div className="grid items-center gap-2">
                      <Label htmlFor="to">To</Label>
                      <Input
                        id="to"
                        type="email"
                        defaultValue="support@amberops.io"
                      />
                    </div>
                     <div className="grid items-center gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Regarding..."
                      />
                    </div>
                    <div className="grid items-center gap-2">
                      <Label htmlFor="details">Message</Label>
                      <Textarea
                        id="details"
                        placeholder="Please provide as much detail as possible..."
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleContactSupport}>
                      Send Request
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    