
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@amberops/ui/components/ui/card';
import { PageHeader } from '@amberops/ui/components/page-header';
import {
  FileText,
  ListOrdered,
  MessageSquare,
  Shield,
  Tag,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Manage site content and users."
        data-testid="admin-dashboard-header"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card data-testid="user-management-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users />
              User Management
            </CardTitle>
            <CardDescription>Add, edit, and remove users.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/users"
              className="text-primary hover:underline"
              data-testid="user-management-link"
            >
              Go to User Management
            </Link>
          </CardContent>
        </Card>
        <Card data-testid="documentation-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText />
              Documentation
            </CardTitle>
            <CardDescription>Manage documentation articles.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/documentation"
              className="text-primary hover:underline"
              data-testid="documentation-link"
            >
              Manage Documentation
            </Link>
          </CardContent>
        </Card>
        <Card data-testid="legal-docs-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield />
              Legal Documents
            </CardTitle>
            <CardDescription>
              Edit Terms of Service and Privacy Policy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/legal"
              className="text-primary hover:underline"
              data-testid="legal-docs-link"
            >
              Manage Legal Docs
            </Link>
          </CardContent>
        </Card>
        <Card data-testid="pricing-tiers-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag />
              Pricing Tiers
            </CardTitle>
            <CardDescription>
              Create, edit, and manage pricing plans.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/pricing"
              className="text-primary hover:underline"
              data-testid="pricing-tiers-link"
            >
              Manage Pricing
            </Link>
          </CardContent>
        </Card>
        <Card data-testid="testimonials-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare />
              Testimonials
            </CardTitle>
            <CardDescription>Manage customer testimonials.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/testimonials"
              className="text-primary hover:underline"
              data-testid="testimonials-link"
            >
              Manage Testimonials
            </Link>
          </CardContent>
        </Card>
        <Card data-testid="faqs-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListOrdered />
              FAQs
            </CardTitle>
            <CardDescription>Manage Frequently Asked Questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/faqs"
              className="text-primary hover:underline"
              data-testid="faqs-link"
            >
              Manage FAQs
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
