import Section from "@/components/ui/Section";
import MultiCheckboxGroup from "@/components/ui/MultiCheckboxGroup";
import propertyFeaturesStyles from "@/app/userinvestmentstrategies/styles/PropertyFeaturesForm.module.css"; // <-- Important!!

export default function PropertyFeaturesForm({ propertyFeatures, onPropertyFeaturesChange, onMultiSelectChange }) {
  return (
    <Section title="Property Features">

      {/* --- Minimum Square Footage --- */}
      <div className={propertyFeaturesStyles.formGroup}>
        <label>Minimum Square Footage Range</label>
        <div className={propertyFeaturesStyles.rangeRow}>
          <input
            type="number"
            name="minSqft"
            placeholder="Min Sqft"
            value={propertyFeatures.minSqft}
            onChange={onPropertyFeaturesChange}
            className={propertyFeaturesStyles.numberInput}
          />
          <span className={propertyFeaturesStyles.toText}>to</span>
          <input
            type="number"
            name="maxSqft"
            placeholder="Max Sqft"
            value={propertyFeatures.maxSqft}
            onChange={onPropertyFeaturesChange}
            className={propertyFeaturesStyles.numberInput}
          />
        </div>
      </div>

      {/* --- Minimum Lot Size --- */}
      <div className={propertyFeaturesStyles.formGroup}>
        <label>Minimum Lot Size (Sqft)</label>
        <input
          type="number"
          name="minLotSize"
          placeholder="Minimum Lot Size"
          value={propertyFeatures.minLotSize}
          onChange={onPropertyFeaturesChange}
          className={propertyFeaturesStyles.numberInput}
        />
      </div>

      {/* --- Total Bedrooms --- */}
      <div className={propertyFeaturesStyles.formGroup}>
        <label>Total Bedrooms Range</label>
        <div className={propertyFeaturesStyles.rangeRow}>
          <input
            type="number"
            name="minBedrooms"
            placeholder="Min Bedrooms"
            value={propertyFeatures.minBedrooms}
            onChange={onPropertyFeaturesChange}
            className={propertyFeaturesStyles.numberInput}
          />
          <span className={propertyFeaturesStyles.toText}>to</span>
          <input
            type="number"
            name="maxBedrooms"
            placeholder="Max Bedrooms"
            value={propertyFeatures.maxBedrooms}
            onChange={onPropertyFeaturesChange}
            className={propertyFeaturesStyles.numberInput}
          />
        </div>
      </div>

      {/* --- Total Bathrooms --- */}
      <div className={propertyFeaturesStyles.formGroup}>
        <label>Total Bathrooms Range</label>
        <div className={propertyFeaturesStyles.rangeRow}>
          <input
            type="number"
            name="minBathrooms"
            placeholder="Min Bathrooms"
            value={propertyFeatures.minBathrooms}
            onChange={onPropertyFeaturesChange}
            className={propertyFeaturesStyles.numberInput}
          />
          <span className={propertyFeaturesStyles.toText}>to</span>
          <input
            type="number"
            name="maxBathrooms"
            placeholder="Max Bathrooms"
            value={propertyFeatures.maxBathrooms}
            onChange={onPropertyFeaturesChange}
            className={propertyFeaturesStyles.numberInput}
          />
        </div>
      </div>

      {/* --- Property Condition --- */}
      <div className={propertyFeaturesStyles.formGroup}>
        <label>Condition</label>
        <div className={propertyFeaturesStyles.checkboxGrid}>
          <MultiCheckboxGroup 
            options={[
              { value: "Turnkey", label: "Turnkey" },
              { value: "Light Renovation", label: "Light Renovation" },
              { value: "Full Renovation", label: "Full Renovation" },
            ]}
            selected={propertyFeatures.condition || []}
            onChange={(value) => onMultiSelectChange("condition", value)}
          />
        </div>
      </div>

      {/* --- Parking Options --- */}
      <div className={propertyFeaturesStyles.formGroup}>
        <label>Parking</label>
        <div className={propertyFeaturesStyles.checkboxGrid}>
          <MultiCheckboxGroup 
            options={[
              { value: "Street Only", label: "Street Only" },
              { value: "Off-Street", label: "Off-Street" },
              { value: "Garage", label: "Garage" },
            ]}
            selected={propertyFeatures.parking || []}
            onChange={(value) => onMultiSelectChange("parking", value)}
          />
        </div>
      </div>

    </Section>
  );
}
