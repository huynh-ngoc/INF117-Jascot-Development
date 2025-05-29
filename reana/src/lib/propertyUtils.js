import crypto from "crypto";
export function normalizeAddress(address) {
  return {
    street: address.street
      .toLowerCase()
      .trim()
      .replace(
        /\b(street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|lane|ln|court|ct|place|pl)\b/g,
        (match) => {
          const abbrev = {
            street: "st",
            avenue: "ave",
            road: "rd",
            boulevard: "blvd",
            drive: "dr",
            lane: "ln",
            court: "ct",
            place: "pl",
          };
          return abbrev[match] || match;
        }
      )
      .replace(/\s+/g, " "),
    city: address.city.toLowerCase().trim().replace(/\s+/g, " "),
    state: address.state.toLowerCase().trim(),
    zip: address.zip.replace(/[^0-9]/g, "").substring(0, 5),
  };
}

export function generatePropertyId(address, mlsNumber = null) {
  if (mlsNumber) {
    return `mls_${mlsNumber.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  }

  const normalized = normalizeAddress(address);
  const addressString = [
    normalized.street,
    normalized.city,
    normalized.state,
    normalized.zip,
  ].join("|");

  const hash = crypto
    .createHash("sha256")
    .update(addressString)
    .digest("hex")
    .substring(0, 16);

  return `addr_${hash}`;
}
