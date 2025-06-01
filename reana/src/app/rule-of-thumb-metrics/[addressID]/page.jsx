import RuleOfThumbMetricsClient from '@/components/rule-of-thumb/RuleOfThumbMetricsClient';

export default function Page({ params }) {
  return <RuleOfThumbMetricsClient addressID={params.addressID} />;
} 