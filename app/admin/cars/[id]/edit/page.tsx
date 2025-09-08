import EditCarClient from './EditCarClient';

export default function Page({ params }: { params: { id: string } }) {
  return <EditCarClient id={params.id} />;
}

export async function generateStaticParams() {
  // Nie generujemy żadnych ścieżek dla exportu
  return [];
}
