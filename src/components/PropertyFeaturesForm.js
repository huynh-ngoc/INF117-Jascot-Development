import Section from "@/components/Section";
import MultiCheckboxGroup from "@/components/MultiCheckboxGroup";

export default function PropertyFeaturesForm({ propertyFeatures, onPropertyFeaturesChange, onMultiSelectChange }) {
  return (
    <Section title="Property Features">

      {/* --- Minimum Square Footage --- */}
      <div className="form-group">
        <label>Minimum Square Footage Range</label>
        <div className="range-row">
          <input
            type="number"
            name="minSqft"
            placeholder="Min Sqft"
            value={propertyFeatures.minSqft}
            onChange={onPropertyFeaturesChange}
            className="number-input"
          />
          <div className="to-text">to</div>
          <input
            type="number"
            name="maxSqft"
            placeholder="Max Sqft"
            value={propertyFeatures.maxSqft}
            onChange={onPropertyFeaturesChange}
            className="number-input"
          />
        </div>
      </div>

      {/* --- Minimum Lot Size --- */}
      <div className="form-group">
        <label>Minimum Lot Size (Sqft)</label>
        <input
          type="number"
          name="minLotSize"
          placeholder="Minimum Lot Size"
          value={propertyFeatures.minLotSize}
          onChange={onPropertyFeaturesChange}
          className="number-input"
        />
      </div>

      {/* --- Total Bedrooms --- */}
      <div className="form-group">
        <label>Total Bedrooms Range</label>
        <div className="range-row">
          <input
            type="number"
            name="minBedrooms"
            placeholder="Min Bedrooms"
            value={propertyFeatures.minBedrooms}
            onChange={onPropertyFeaturesChange}
            className="number-input"
          />
          <div className="to-text">to</div>
          <input
            type="number"
            name="maxBedrooms"
            placeholder="Max Bedrooms"
            value={propertyFeatures.maxBedrooms}
            onChange={onPropertyFeaturesChange}
            className="number-input"
          />
        </div>
      </div>

      {/* --- Total Bathrooms --- */}
      <div className="form-group">
        <label>Total Bathrooms Range</label>
        <div className="range-row">
          <input
            type="number"
            name="minBathrooms"
            placeholder="Min Bathrooms"
            value={propertyFeatures.minBathrooms}
            onChange={onPropertyFeaturesChange}
            className="number-input"
          />
          <div className="to-text">to</div>
          <input
            type="number"
            name="maxBathrooms"
            placeholder="Max Bathrooms"
            value={propertyFeatures.maxBathrooms}
            onChange={onPropertyFeaturesChange}
            className="number-input"
          />
        </div>
      </div>

      {/* --- Property Condition --- */}
      <div className="form-group">
        <label>Condition (Select All That Apply)</label>
        <div className="checkbox-grid">
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
      <div className="form-group">
        <label>Parking (Select All That Apply)</label>
        <div className="checkbox-grid">
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
