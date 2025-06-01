import AdditionalFinancingClient from '@/components/additional-financing/AdditionalFinancingClient';

export default function Page({ params }) {
  return <AdditionalFinancingClient addressID={params.addressID} />;
} 