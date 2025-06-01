import ConventionalFinancingClient from '@/components/conventional-financing/ConventionalFinancingClient';

export default function Page({ params }) {
  return <ConventionalFinancingClient addressID={params.addressID} />;
} 