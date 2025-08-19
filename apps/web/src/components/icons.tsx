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
