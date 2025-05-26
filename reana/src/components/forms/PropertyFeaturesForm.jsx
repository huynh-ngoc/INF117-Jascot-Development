import Section from "@/components/ui/Section";
import MultiCheckboxGroup from "@/components/ui/MultiCheckboxGroup";

export default function PropertyFeaturesForm({
  propertyFeatures,
  onPropertyFeaturesChange,
  onMultiSelectChange,
}) {

  return (
    <Section title="Property Features">
      {/* --- Minimum Square Footage --- */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Minimum Square Footage Range</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="minSqft"
            placeholder="Min Sqft"
            value={propertyFeatures.minSqft}
            onChange={onPropertyFeaturesChange}
            className="border p-2 rounded w-full"
          />
          <span>to</span>
          <input
            type="number"
            name="maxSqft"
            placeholder="Max Sqft"
            value={propertyFeatures.maxSqft}
            onChange={onPropertyFeaturesChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* --- Minimum Lot Size --- */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Minimum Lot Size (Sqft)</label>
        <input
          type="number"
          name="minLotSize"
          placeholder="Minimum Lot Size"
          value={propertyFeatures.minLotSize}
          onChange={onPropertyFeaturesChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* --- Total Bedrooms --- */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Total Bedrooms Range</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="minBedrooms"
            placeholder="Min Bedrooms"
            value={propertyFeatures.minBedrooms}
            onChange={onPropertyFeaturesChange}
            className="border p-2 rounded w-full"
          />
          <span>to</span>
          <input
            type="number"
            name="maxBedrooms"
            placeholder="Max Bedrooms"
            value={propertyFeatures.maxBedrooms}
            onChange={onPropertyFeaturesChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* --- Total Bathrooms --- */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Total Bathrooms Range</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="minBathrooms"
            placeholder="Min Bathrooms"
            value={propertyFeatures.minBathrooms}
            onChange={onPropertyFeaturesChange}
            className="border p-2 rounded w-full"
          />
          <span>to</span>
          <input
            type="number"
            name="maxBathrooms"
            placeholder="Max Bathrooms"
            value={propertyFeatures.maxBathrooms}
            onChange={onPropertyFeaturesChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* --- Property Condition --- */}
      <div className="mb-4">
        <label className="block font-medium mb-1">
          Condition <span className="text-sm text-gray-500">(Select all that apply)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
      <div className="mb-4">
        <label className="block font-medium mb-1">
          Parking <span className="text-sm text-gray-500">(Select all that apply)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
