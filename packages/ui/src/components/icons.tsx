
import type { SVGProps } from 'react';

export function AmberOpsLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            width="1em"
            height="1em"
            {...props}
        >
            <path fill="none" d="M0 0h256v256H0z" />
            <path
                fill="hsl(var(--primary))"
                d="M128 24a104 104 0 0 0-91.4 153.2A104.2 104.2 0 0 0 128 232a104 104 0 0 0 91.4-154.8A103.4 103.4 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Z"
            />
            <path
                fill="hsl(var(--primary))"
                d="M168 96h-21.2a16 16 0 0 0-31.4-11.3A16 16 0 0 0 84.4 96H64a8 8 0 0 0 0 16h20.4a16 16 0 0 0 31.4 11.3A16 16 0 0 0 147.2 112H168a8 8 0 0 0 0-16Zm-41.2 19.3a24 24 0 0 1-3.2-19.3 8 8 0 1 0-15.2 4.6 39.9 39.9 0 0 0 5.3 32.2 8 8 0 0 0-1.8 11.5 8.1 8.1 0 0 0 11.5 1.8 40.2 40.2 0 0 0 32.2-5.3 8 8 0 0 0 4.6-15.2Z"
            />
        </svg>
    )
}

export function ClearFilterIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brush-cleaning-icon lucide-brush-cleaning"><path d="m16 22-1-4" /><path d="M19 13.99a1 1 0 0 0 1-1V12a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v.99a1 1 0 0 0 1 1" /><path d="M5 14h14l1.973 6.767A1 1 0 0 1 20 22H4a1 1 0 0 1-.973-1.233z" /><path d="m8 22 1-4" /></svg>
    )
}

    