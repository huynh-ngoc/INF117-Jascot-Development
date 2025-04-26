import Section from "@/app/userinvestmentstrategies/components/ui/Section";
import SelectField from "@/app/userinvestmentstrategies/components/ui/SelectField";
import MultiCheckboxGroup from "@/app/userinvestmentstrategies/components/ui/MultiCheckboxGroup";

export default function InvestmentPreferencesForm({ investmentDetails, onInvestmentChange, onMultiSelectChange }) {
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
            { value: "Fix n Flip", label: "Fix n Flip" },
            { value: "BRRR", label: "BRRR" },
            { value: "Long Term Rental (LTR)", label: "Long Term Rental (LTR)" },
            { value: "Short Term Rental (STR)", label: "Short Term Rental (STR)" },
          ]}
        />
      </div>

      {/* --- Target Holding Period (Slider) --- */}
      <div className="form-group">
        <label htmlFor="holdingPeriod">Target Holding Period (Years): {investmentDetails.holdingPeriod}</label>
        <input 
          type="range"
          id="holdingPeriod"
          name="holdingPeriod"
          min="1"
          max="10"
          value={investmentDetails.holdingPeriod}
          onChange={onInvestmentChange}
        />
      </div>

      {/* --- Desired Acquisition Margin (Slider) --- */}
      <div className="form-group">
        <label htmlFor="acquisitionMargin">Desired Acquisition Margin (% of ARV): {investmentDetails.acquisitionMargin}%</label>
        <input 
          type="range"
          id="acquisitionMargin"
          name="acquisitionMargin"
          min="0"
          max="100"
          value={investmentDetails.acquisitionMargin}
          onChange={onInvestmentChange}
        />
      </div>

      {/* --- Open to Out-of-State Investing --- */}
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
            { value: "Pay Cash", label: "Pay Cash" },
            { value: "Conventional Loan", label: "Conventional Loan" },
            { value: "DSCR Bridge Loan for Fix n Flip", label: "DSCR Bridge Loan for Fix n Flip" },
            { value: "DSCR Bridge + Permanent Loan for BRRR", label: "DSCR Bridge + Permanent Loan for BRRR" },
            { value: "Seller Financing", label: "Seller Financing" },
          ]}
        />
      </div>

      {/* --- Operational Preferences --- */}
      <div className="form-group">
        <label>Operational Preferences</label>
        <div className="checkbox-grid">
          <MultiCheckboxGroup 
            options={[
              { value: "Property Manager", label: "Property Manager" },
              { value: "Self Managed", label: "Self Managed" },
              { value: "Rehab Contractor", label: "Rehab Contractor" },
              { value: "Self Contracted", label: "Self Contracted" },
              { value: "Maintenance Contractors", label: "Maintenance Contractors" },
              { value: "Self Maintained", label: "Self Maintained" },
              { value: "Tenant Screening Outsourced", label: "Tenant Screening Outsourced" },
              { value: "Self Tenant Acquisition", label: "Self Tenant Acquisition" },
            ]}
            selected={investmentDetails.operationalPreferences}
            onChange={(value) => onMultiSelectChange("operationalPreferences", value)}
          />
        </div>
      </div>

    </Section>
  );
}
