import { Input } from "@/components/ui/input";
import Section from "@/components/ui/Section";

export default function RealtorProfileForm({ profile, onProfileChange }) {
  
  // Form Validation Function
  const validateForm = () => {
    // Check if all required fields have been filled out
    const requiredFields = [
      "brokerage_name", "street_address", "city", "state", "zip_code", 
      "office_number", "office_number_ext", "agent_name", "license_number", "email"
    ];
    for (let field of requiredFields) {
      if (!profile[field]) {
        alert(`Please fill in the ${field.replace(/_/g, ' ')} field.`);
        return false;
      }
    }
    return true;
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form before proceeding
    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log("Form Data:", profile);
      // Can add further logic here, like sending the data  further
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Section title="Investor Profile">
          <div className="form-group">
            <label htmlFor="brokerage_name">Brokerage Name</label>
            <Input
              name="brokerage_name"
              placeholder="Brokerage Name"
              value={profile.brokerage_name || ""}
              onChange={onProfileChange}
              required
            />
          </div>
        </Section>

        <Section title="Address">
          <div className="form-group">
            <label htmlFor="street_address">Street</label>
            <Input
              name="street_address"
              placeholder="Street: 123 Main St"
              value={profile.street_address || ""}
              onChange={onProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <Input
              name="city"
              placeholder="City"
              value={profile.city || ""}
              onChange={onProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <Input
              name="state"
              placeholder="State"
              value={profile.state || ""}
              onChange={onProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip_code">Zip Code</label>
            <Input
              name="zip_code"
              placeholder="Zipcode"
              value={profile.zip_code || ""}
              onChange={onProfileChange}
              required
            />
          </div>
        </Section>

        <Section title="Office Information">
          <div className="form-group">
            <label htmlFor="office_number">Office Number</label>
            <Input
              name="office_number"
              placeholder="Office #"
              value={profile.office_number || ""}
              onChange={onProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="office_number_ext">Ext</label>
            <Input
              name="office_number_ext"
              placeholder="Extension"
              value={profile.office_number_ext || ""}
              onChange={onProfileChange}
              required
            />
          </div>
        </Section>

        <Section title="Agent Information">
          <div className="form-group">
            <label htmlFor="agent_name">Agent Name</label>
            <Input
              name="agent_name"
              placeholder="Full Agent Name (First Last)"
              value={profile.agent_name || ""}
              onChange={onProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="license_number">License Number</label>
            <Input
              name="license_number"
              placeholder="License #"
              value={profile.license_number || ""}
              onChange={onProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              name="email"
              placeholder="Email"
              value={profile.email || ""}
              onChange={onProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Agent's Phone Number</label>
            <Input
              name="phone"
              placeholder="Phone #"
              value={profile.phone || ""}
              onChange={onProfileChange}
            />
          </div>
        </Section>

        <Section title="Type of Agent">
          <div className="form-group">
            <label htmlFor="type_of_agent" className="block text-lg font-semibold">Type of Agent</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="type_of_agent"
                  value="Listing/Selling"
                  checked={profile.type_of_agent === "Listing/Selling"}
                  onChange={onProfileChange}
                  className="mr-2"
                />
                Listing/Selling
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="type_of_agent"
                  value="Purchase/Buyers"
                  checked={profile.type_of_agent === "Purchase/Buyers"}
                  onChange={onProfileChange}
                  className="mr-2"
                />
                Purchase/Buyers
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="type_of_agent"
                  value="Both"
                  checked={profile.type_of_agent === "Both"}
                  onChange={onProfileChange}
                  className="mr-2"
                />
                Both
              </label>
            </div>
          </div>
        </Section>

        {/* Submit Button */}
        <div className="form-group">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}