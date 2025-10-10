import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/data-access';
import ProjectDetailClient from './ProjectDetailClient';

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}