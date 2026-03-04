import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | Hemanth Kumar',
    description: 'A showcase of my recent full-stack, distributed systems, and AI infrastructure work.',
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
