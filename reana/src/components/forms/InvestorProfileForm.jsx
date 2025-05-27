import InputField from "@/components/ui/InputField";
import Section from "@/components/ui/Section";

export default function InvestorProfileForm({ profile, onProfileChange, userType }) {
  return (
    <Section title="Investor Profile">
      {/* Username */}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <InputField
          name="username"
          placeholder="Username"
          value={profile.username}
          onChange={onProfileChange}
          required
        />
      </div>

      {/* Full Name */}
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <InputField
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={onProfileChange}
          required
        />
      </div>

      {/* Role (Read-only display since userType comes from parent) */}
      <div className="form-group">
        <label>Role</label>
        <input
          type="text"
          className="border p-2 rounded w-full bg-gray-100 text-gray-600"
          value={userType}
          readOnly
        />
      </div>

      {/* Conditional fields based on role */}
      {userType === "User" && (
        <>
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
        </>
      )}

      {userType === "Realtor" && (
        <>
          <div className="form-group">
            <label htmlFor="license">License Number</label>
            <InputField
              name="license"
              placeholder="License #"
              value={profile.license}
              onChange={onProfileChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company (optional)</label>
            <InputField
              name="company"
              placeholder="Company Name"
              value={profile.company}
              onChange={onProfileChange}
            />
          </div>
        </>
      )}
    </Section>
  );
}
