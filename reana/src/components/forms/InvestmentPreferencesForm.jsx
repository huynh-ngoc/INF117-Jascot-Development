import Section from "@/components/ui/Section";
import SelectField from "@/components/ui/SelectField";
import MultiCheckboxGroup from "@/components/ui/MultiCheckboxGroup";

export default function InvestmentPreferencesForm({
  investmentDetails,
  onInvestmentChange,
  onMultiSelectChange,
}) {
  return (
    <Section title="Investment Preferences">
      {/* --- Type of Investment --- */}
      <div className="form-group">
        <label htmlFor="investmentType">Type of Investment</label>
        <SelectField
          name="investmentType"
          value={investmentDetails.investmentType}
          onChange={onInvestmentChange}
          required
          options={[
            { value: "", label: "Select One" },
            { value: "Fix n Flip", label: "Fix n Flip" },
            { value: "BRRR", label: "BRRR" },
            { value: "Long Term Rental (LTR)", label: "Long Term Rental (LTR)" },
            { value: "Short Term Rental (STR)", label: "Short Term Rental (STR)" },
          ]}
        />
      </div>

      {/* --- Target Holding Period (Slider) --- */}
      <div className="form-group">
        <label htmlFor="holdingPeriod">
          Target Holding Period (Years): {investmentDetails.holdingPeriod}
        </label>
        <input
          type="range"
          id="holdingPeriod"
          name="holdingPeriod"
          min="1"
          max="10"
          value={investmentDetails.holdingPeriod}
          onChange={onInvestmentChange}
          className="w-full"
        />
      </div>

      {/* --- Desired Acquisition Margin (Slider) --- */}
      <div className="form-group">
        <label htmlFor="acquisitionMargin">
          Desired Acquisition Margin (% of ARV): {investmentDetails.acquisitionMargin}%
        </label>
        <input
          type="range"
          id="acquisitionMargin"
          name="acquisitionMargin"
          min="0"
          max="100"
          value={investmentDetails.acquisitionMargin}
          onChange={onInvestmentChange}
          className="w-full"
        />
      </div>

      {/* --- Out-of-State Investing --- */}
      <div className="form-group">
        <label htmlFor="outOfState">Open to Out-of-State Investing</label>
        <SelectField
          name="outOfState"
          value={investmentDetails.outOfState}
          onChange={onInvestmentChange}
          options={[
            { value: "No", label: "No" },
            { value: "Yes", label: "Yes" },
          ]}
        />
      </div>

      {/* --- Acquisition Financing Option --- */}
      <div className="form-group">
        <label htmlFor="financingOption">Acquisition Financing Option</label>
        <SelectField
          name="financingOption"
          value={investmentDetails.financingOption}
          onChange={onInvestmentChange}
          required
          options={[
            { value: "", label: "Select One" },
            { value: "Pay Cash", label: "Pay Cash" },
            { value: "Conventional Loan", label: "Conventional Loan" },
            { value: "DSCR Bridge Loan for Fix n Flip", label: "DSCR Bridge Loan for Fix n Flip" },
            {
              value: "DSCR Bridge + Permanent Loan for BRRR",
              label: "DSCR Bridge + Permanent Loan for BRRR",
            },
            { value: "Seller Financing", label: "Seller Financing" },
          ]}
        />
      </div>

      {/* --- Operational Preferences (Grouped) --- */}
      <div className="form-group">
        <label className="block font-medium mb-2">Operational Preferences <span className="text-sm text-gray-500">(Select all that apply)</span></label>

        <div className="space-y-4">
          {/* Group 1: Management */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Management</p>
            <MultiCheckboxGroup
              options={[
                { value: "Property Manager", label: "Property Manager" },
                { value: "Self Managed", label: "Self Managed" },
              ]}
              selected={investmentDetails.operationalPreferences}
              onChange={(value) => onMultiSelectChange("operationalPreferences", value)}
            />
          </div>

          {/* Group 2: Rehab */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Rehab</p>
            <MultiCheckboxGroup
              options={[
                { value: "Rehab Contractor", label: "Rehab Contractor" },
                { value: "Self Contracted", label: "Self Contracted" },
              ]}
              selected={investmentDetails.operationalPreferences}
              onChange={(value) => onMultiSelectChange("operationalPreferences", value)}
            />
          </div>

          {/* Group 3: Maintenance */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Maintenance</p>
            <MultiCheckboxGroup
              options={[
                { value: "Maintenance Contractors", label: "Maintenance Contractors" },
                { value: "Self Maintained", label: "Self Maintained" },
              ]}
              selected={investmentDetails.operationalPreferences}
              onChange={(value) => onMultiSelectChange("operationalPreferences", value)}
            />
          </div>

          {/* Group 4: Tenant Acquisition */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Tenant Acquisition</p>
            <MultiCheckboxGroup
              options={[
                { value: "Tenant Screening Outsourced", label: "Tenant Screening Outsourced" },
                { value: "Self Tenant Acquisition", label: "Self Tenant Acquisition" },
              ]}
              selected={investmentDetails.operationalPreferences}
              onChange={(value) => onMultiSelectChange("operationalPreferences", value)}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
