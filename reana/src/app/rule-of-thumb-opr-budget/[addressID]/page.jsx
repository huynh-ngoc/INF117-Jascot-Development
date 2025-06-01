import RuleOfThumbOprBudgetClient from '@/components/rule-of-thumb/RuleOfThumbOprBudgetClient';

export default function Page({ params }) {
  return <RuleOfThumbOprBudgetClient addressID={params.addressID} />;
} 