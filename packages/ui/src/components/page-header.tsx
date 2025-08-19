import { cn } from "@amberops/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions, className, ...props }: PageHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between mb-6", className)} {...props}>
            <div className="grid gap-1">
                <h1 className="font-headline text-3xl md:text-4xl font-semibold">{title}</h1>
                {description && (
                    <p className="text-lg text-muted-foreground">{description}</p>
                )}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
    );
}
