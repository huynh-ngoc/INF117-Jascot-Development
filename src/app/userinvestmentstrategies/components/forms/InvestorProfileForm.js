import InputField from "@/app/userinvestmentstrategies/components/ui/InputField";
import Section from "@/app/userinvestmentstrategies/components/ui/Section";

export default function InvestorProfileForm({ profile, onProfileChange }) {
  return (
    <Section title="Investor Profile">
      
      <div className="form-group">
        <label htmlFor="name">Profile Name</label>
        <InputField
          name="name"
          placeholder="Profile Name"
          value={profile.name}
          onChange={onProfileChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <InputField
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={onProfileChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <InputField
          name="phone"
          placeholder="Phone"
          value={profile.phone}
          onChange={onProfileChange}
        />
      </div>

    </Section>
  );
}
