
'use client';

import type { FAQ, PricingTier, Testimonial } from '@amberops/lib';
import { fetchFaqs, fetchPricingTiers, fetchTestimonials } from '@amberops/api/client';
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
  CardHeader,
} from '@amberops/ui/components/ui/card';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import {
  BarChart,
  Cpu,
  Database,
  GitBranch,
  HardDrive,
  Mail,
  MessageSquare,
  Package,
  Search,
  Server,
  Shield,
  Star,
  Terminal,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { AnimatedGlobe } from '../components/animated-globe';
import { FeatureCarousel } from '../components/feature-carousel';
import { Footer } from '../components/layout/footer';
import { Header } from '../components/layout/header';
import { PricingCard } from '../components/pricing-card';
import { TestimonialsMarquee } from '../components/testimonials-marquee';

const integrationIcons = [
  { icon: Database, name: 'HDFS' },
  { icon: Users, name: 'YARN' },
  { icon: GitBranch, name: 'MapReduce' },
  { icon: Cpu, name: 'Tez' },
  { icon: Server, name: 'Hive' },
  { icon: HardDrive, name: 'HBase' },
  { icon: Shield, name: 'Ranger' },
  { icon: Zap, name: 'Spark' },
  { icon: Package, name: 'Zookeeper' },
  { icon: Search, name: 'Solr' },
  { icon: BarChart, name: 'Grafana' },
  { icon: Terminal, name: 'Ambari' },
];

function LandingPageContent() {
  const { data: pricingTiers, isLoading: isLoadingTiers } = useQuery<PricingTier[]>({
    queryKey: ['publicPricingTiers'],
    queryFn: fetchPricingTiers,
  });

  const { data: testimonials, isLoading: isLoadingTestimonials } = useQuery<Testimonial[]>({
    queryKey: ['publicTestimonials'],
    queryFn: fetchTestimonials,
  });

  const { data: faqItems, isLoading: isLoadingFaqs } = useQuery<FAQ[]>({
    queryKey: ['publicFaqs'],
    queryFn: fetchFaqs,
  });

  return (
    <>
      <section className="relative w-full overflow-hidden py-20 md:py-28 lg:py-32 xl:py-40">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <div className="space-y-4">
                <div className="hero-element inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground" data-testid="hero-badge">
                  The Ambari UI. Reimagined.
                </div>
                <h1 className="hero-element font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none" data-testid="hero-title">
                  Unified Cluster Management, Supercharged by AI
                </h1>
                <p className="hero-element mx-auto max-w-[600px] text-muted-foreground md:text-xl lg:mx-0" data-testid="hero-description">
                  AmberOps provides a modern, fast, and intuitive frontend for Apache Ambari, supercharged with AI-powered insights to streamline your operations.
                </p>
              </div>
              <div className="hero-element flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                <Button asChild size="lg" data-testid="hero-cta-primary">
                  <Link href="/auth?action=signup">Get Started for Free</Link>
                </Button>
                <Button asChild variant="secondary" size="lg" data-testid="hero-cta-secondary">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex w-full items-center justify-center lg:order-last">
              <AnimatedGlobe />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full bg-muted/20 py-20 md:py-28 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm" data-testid="features-badge">
              Key Features
            </div>
            <h2 className="font-headline mt-2 text-3xl font-bold tracking-tighter sm:text-5xl" data-testid="features-title">
              Everything you need. Nothing you don&apos;t.
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" data-testid="features-description">
              AmberOps is packed with features designed to make cluster management faster, easier, and more intelligent. Stop fighting with your tools and start managing your stack.
            </p>
          </div>
          <FeatureCarousel />
        </div>
      </section>

      <section id="integrations-section" className="w-full py-20 md:py-28 lg:py-32">
        <div className="container px-4 text-center md:px-6">
          <p className="integration-section-element text-muted-foreground">
            Trusted by the world&apos;s most innovative technical teams
          </p>
          <div className="integration-section-element mt-4 mb-12 flex items-center justify-center gap-8 text-muted-foreground md:gap-12" data-testid="trusted-by-logos">
            <p className="text-lg font-semibold">Deda.tech</p>
            <p className="text-lg font-semibold">Unbabel</p>
            <p className="text-lg font-semibold">Microsoft</p>
            <p className="text-lg font-semibold">Vodafone</p>
          </div>

          <div className="integration-section-element mx-auto mb-16 grid max-w-5xl gap-6 md:grid-cols-3" data-testid="metrics-cards">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="flex items-start gap-4 p-6 text-left">
                <GitBranch className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Top 50 on GitHub</h3>
                  <p className="text-sm text-muted-foreground">
                    Our 129.1k stars place us among the most popular open-source projects.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="flex items-start gap-4 p-6 text-left">
                <Star className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">4.9/5 stars on G2</h3>
                  <p className="text-sm text-muted-foreground">
                    To quote &apos;A solid automation tool that just works.&apos;
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="flex items-start gap-4 p-6 text-left">
                <MessageSquare className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">200k+ community members</h3>
                  <p className="text-sm text-muted-foreground">
                    This wouldn&apos;t be possible without you.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="integration-section-element font-headline mt-2 text-3xl font-bold tracking-tighter sm:text-5xl" data-testid="integrations-title">
            Plug AI into your own data &amp;{' '}
            <span className="text-primary">over 500 integrations</span>
          </h2>

          <div className="integrations-grid integration-section-element mt-12">
            <div className="integrations-marquee">
              {[...integrationIcons, ...integrationIcons].map((item, index) => (
                <div key={`${item.name}-${index}`} className="integration-icon-container" data-testid={`integration-icon-${item.name}`}>
                  <div className="integration-icon">
                    <item.icon className="h-8 w-8" />
                  </div>
                </div>
              ))}
            </div>
            <div className="integrations-marquee" aria-hidden="true" style={{ animationDelay: '20s' }}>
              {[...integrationIcons, ...integrationIcons].map((item, index) => (
                <div key={`${item.name}-clone-${index}`} className="integration-icon-container" data-testid={`integration-icon-clone-${item.name}`}>
                  <div className="integration-icon">
                    <item.icon className="h-8 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="w-full bg-background py-20 md:py-28 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 pb-16 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm" data-testid="pricing-badge">
                Pricing
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl" data-testid="pricing-title">
                Find the perfect plan
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" data-testid="pricing-description">
                Start for free and scale as you grow. We have plans for every team size.
              </p>
            </div>
          </div>
          <div id="pricing-grid" className="mx-auto grid max-w-6xl items-start justify-items-center gap-32 lg:grid-cols-3">
            {isLoadingTiers ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-full pricing-card-wrapper">
                  <Skeleton className="h-[450px] w-full rounded-2xl" />
                </div>
              ))
            ) : (
              pricingTiers?.map((tier) => (
                <div key={tier.id} className="pricing-card-wrapper" data-testid={`pricing-card-${tier.id}`}>
                  <PricingCard
                    {...tier}
                    buttonText={
                      tier.title === 'Enterprise'
                        ? 'Contact Sales'
                        : 'Get Started'
                    }
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-20 md:py-28 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm" data-testid="testimonials-badge">
                What Our Users Say
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl" data-testid="testimonials-title">
                Trusted by Teams Who Demand a Better Way
              </h2>
            </div>
          </div>
        </div>
        {isLoadingTestimonials ? (
          <div className="flex gap-6 overflow-hidden p-4 testimonials-marquee-container">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-96 rounded-xl flex-shrink-0" />
            ))}
          </div>
        ) : (
          <TestimonialsMarquee testimonials={testimonials || []} />
        )}
      </section>

      <section id="faq" className="w-full bg-muted/20 py-20 md:py-28 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm" data-testid="faq-badge">
                FAQ
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl" data-testid="faq-title">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" data-testid="faq-description">
                Have questions? We have answers. If you can&apos;t find what
                you&apos;re looking for, feel free to contact us.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl py-12">
            <Accordion id="faq-accordion" type="single" collapsible className="w-full">
              {isLoadingFaqs ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2 border-b py-4">
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))
              ) : (
                faqItems?.map((faq, index) => (
                  <AccordionItem value={`item-${index + 1}`} key={faq.id} className="faq-item" data-testid={`faq-item-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))
              )}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="w-full py-20 md:py-28 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm" data-testid="contact-badge">
                Contact Us
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl" data-testid="contact-title">
                Get in Touch
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" data-testid="contact-description">
                We&apos;re here to help. Reach out to us for sales inquiries,
                support, or any other questions.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-lg py-12">
            <Card data-testid="contact-card">
              <CardContent className="p-6 text-center">
                <Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="font-headline text-xl font-semibold">
                  Email Us
                </h3>
                <p className="mb-4 mt-2 text-muted-foreground">
                  The best way to get in touch is by email. Send your
                  questions to our support team and we&apos;ll get back to you
                  as soon as possible.
                </p>
                <Button asChild>
                  <a href="mailto:support@amberops.app" data-testid="contact-email-link">
                    support@amberops.app
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="final-cta" className="relative w-full overflow-hidden py-20 md:py-24 lg:py-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative z-10 grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="cta-element font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight" data-testid="final-cta-title">
              Ready to Modernize Your Stack?
            </h2>
            <p className="cta-element mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" data-testid="final-cta-description">
              Sign up today and experience the future of cluster management.
              Go from zero to hero in minutes.
            </p>
          </div>
          <div className="cta-element mx-auto w-full max-w-sm space-y-2">
            <Button asChild size="lg" className="w-full" data-testid="final-cta-button">
              <Link href="/auth?action=signup">Sign Up Now</Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              Get started for free. No credit card required.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <LandingPageContent />
      </main>
      <Footer />
    </div>
  );
}
