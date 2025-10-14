import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/data-access';
import ProjectDetailClient from './ProjectDetailClient';

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}