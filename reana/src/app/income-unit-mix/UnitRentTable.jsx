// src/app/income-unit-mix/UnitRentTable.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import styles from "./UnitRentTable.module.css";

export default function UnitRentTable({
  unitCount = 5,
  unitData = [],
  onUnitDataChange,
}) {
  const [units, setUnits] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const fieldsRef = useRef([]);

  const formatDisplayValue = (value, type = "number") => {
    if (type === "currency") {
      const numValue = parseFloat(value) || 0;
      return numValue === 0 ? "-" : `$${numValue.toLocaleString()}`;
    }
    if (type === "number") {
      const numValue = parseFloat(value) || 0;
      return numValue === 0 ? "-" : numValue.toString();
    }
    return value || "-";
  };

  useEffect(() => {
    const initializedUnits = Array.from({ length: unitCount }, (_, i) => {
      const existingData = unitData.find((unit) => unit.id === i + 1);
      const defaultUnit = {
        id: i + 1,
        furnished: false,
        sqft: "",
        bedrooms: "",
        bathrooms: "",
        perComps: "",
        scheduledRent: "",
        currentRent: "",
      };

      if (existingData) {
        return {
          id: i + 1,
          furnished: existingData.furnished || false,
          sqft: existingData.sqft?.toString() || "",
          bedrooms: existingData.bedrooms?.toString() || "",
          bathrooms: existingData.bathrooms?.toString() || "",
          perComps: existingData.perComps?.toString() || "",
          scheduledRent: existingData.scheduledRent?.toString() || "",
          currentRent: existingData.currentRent?.toString() || "",
        };
      }

      return defaultUnit;
    });

    setUnits(initializedUnits);
    setOriginalData(unitData);
    fieldsRef.current = [];
  }, [unitCount, unitData]);

  const handleChange = (idx, field) => (e) => {
    const val = field === "furnished" ? e.target.checked : e.target.value;

    setUnits((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });

    if (onUnitDataChange) {
      const unitId = idx + 1;
      const value =
        field === "furnished"
          ? e.target.checked
          : field === "sqft" ||
            field === "perComps" ||
            field === "scheduledRent" ||
            field === "currentRent"
          ? parseFloat(e.target.value) || 0
          : field === "bedrooms" || field === "bathrooms"
          ? parseInt(e.target.value) || 0
          : e.target.value;

      onUnitDataChange(unitId, field, value);
    }
  };

  const handleResetUnit = (unitIndex) => {
    const unitId = unitIndex + 1;
    const originalUnit = originalData.find((unit) => unit.id === unitId);

    if (originalUnit) {
      const resetUnit = {
        id: unitId,
        furnished: originalUnit.furnished || false,
        sqft: originalUnit.sqft?.toString() || "",
        bedrooms: originalUnit.bedrooms?.toString() || "",
        bathrooms: originalUnit.bathrooms?.toString() || "",
        perComps: originalUnit.perComps?.toString() || "",
        scheduledRent: originalUnit.scheduledRent?.toString() || "",
        currentRent: originalUnit.currentRent?.toString() || "",
      };

      setUnits((prev) => {
        const copy = [...prev];
        copy[unitIndex] = resetUnit;
        return copy;
      });

      if (onUnitDataChange) {
        Object.keys(resetUnit).forEach((field) => {
          if (field !== "id") {
            let value = resetUnit[field];
            if (
              field === "sqft" ||
              field === "perComps" ||
              field === "scheduledRent" ||
              field === "currentRent"
            ) {
              value = parseFloat(value) || 0;
            } else if (field === "bedrooms" || field === "bathrooms") {
              value = parseInt(value) || 0;
            }
            onUnitDataChange(unitId, field, value);
          }
        });
      }
    }
  };

  const [addRev, setAddRev] = useState({
    perComps: "",
    scheduledRent: "",
    currentRent: "",
  });
  const handleAddRev = (field) => (e) => {
    setAddRev((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const totalSqFt = units.reduce(
    (sum, u) => sum + (parseFloat(u.sqft) || 0),
    0
  );
  const totalBeds = units.reduce(
    (sum, u) => sum + (parseInt(u.bedrooms) || 0),
    0
  );
  const totalBaths = units.reduce(
    (sum, u) => sum + (parseInt(u.bathrooms) || 0),
    0
  );
  const totalPerComps = units.reduce(
    (sum, u) => sum + (parseFloat(u.perComps) || 0),
    0
  );
  const totalScheduled = units.reduce(
    (sum, u) => sum + (parseFloat(u.scheduledRent) || 0),
    0
  );
  const totalCurrent = units.reduce(
    (sum, u) => sum + (parseFloat(u.currentRent) || 0),
    0
  );

  const addPerComps = parseFloat(addRev.perComps) || 0;
  const addScheduled = parseFloat(addRev.scheduledRent) || 0;
  const addCurrent = parseFloat(addRev.currentRent) || 0;

  const combinedPerComps = totalPerComps + addPerComps;
  const combinedScheduled = totalScheduled + addScheduled;
  const combinedCurrent = totalCurrent + addCurrent;

  const annualPerComps = combinedPerComps * 12;
  const annualScheduled = combinedScheduled * 12;
  const annualCurrent = combinedCurrent * 12;

  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Unit</th>
            <th>Furnished?</th>
            <th>Sq Ft</th>
            <th>Bed</th>
            <th>Baths</th>
            <th>Per Comps</th>
            <th>Scheduled Rent</th>
            <th>Current Rent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map((u, i) => (
            <tr key={u.id}>
              <td>Unit {u.id}</td>
              <td>
                <label className="flex items-center justify-center w-12 h-12">
                  <input
                    type="checkbox"
                    className="scale-150"
                    checked={u.furnished}
                    onChange={handleChange(i, "furnished")}
                    ref={(el) => (fieldsRef.current[i * 7] = el)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const next = (i * 7 + 1) % (unitCount * 7);
                        fieldsRef.current[next]?.focus();
                      }
                    }}
                  />
                </label>
              </td>
              <td>
                <input
                  type="number"
                  value={u.sqft}
                  onChange={handleChange(i, "sqft")}
                  placeholder="0"
                  ref={(el) => (fieldsRef.current[i * 7 + 1] = el)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const next = (i * 7 + 2) % (unitCount * 7);
                      fieldsRef.current[next]?.focus();
                    }
                  }}
                />
              </td>
              <td>
                <select
                  value={u.bedrooms}
                  onChange={handleChange(i, "bedrooms")}
                  ref={(el) => (fieldsRef.current[i * 7 + 2] = el)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const next = (i * 7 + 3) % (unitCount * 7);
                      fieldsRef.current[next]?.focus();
                    }
                  }}
                >
                  <option value="">–</option>
                  <option value="0">Studio</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </td>
              <td>
                <select
                  value={u.bathrooms}
                  onChange={handleChange(i, "bathrooms")}
                  ref={(el) => (fieldsRef.current[i * 7 + 3] = el)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const next = (i * 7 + 4) % (unitCount * 7);
                      fieldsRef.current[next]?.focus();
                    }
                  }}
                >
                  <option value="">–</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={u.perComps}
                  onChange={handleChange(i, "perComps")}
                  placeholder="0"
                  ref={(el) => (fieldsRef.current[i * 7 + 4] = el)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const next = (i * 7 + 5) % (unitCount * 7);
                      fieldsRef.current[next]?.focus();
                    }
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={u.scheduledRent}
                  onChange={handleChange(i, "scheduledRent")}
                  placeholder="0"
                  ref={(el) => (fieldsRef.current[i * 7 + 5] = el)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const next = (i * 7 + 6) % (unitCount * 7);
                      fieldsRef.current[next]?.focus();
                    }
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={u.currentRent}
                  onChange={handleChange(i, "currentRent")}
                  placeholder="0"
                  ref={(el) => (fieldsRef.current[i * 7 + 6] = el)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const next = ((i + 1) * 7) % (unitCount * 7);
                      fieldsRef.current[next]?.focus();
                    }
                  }}
                />
              </td>
              <td>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleResetUnit(i)}
                  className="text-xs"
                  disabled={!originalData.find((unit) => unit.id === u.id)}
                >
                  Reset
                </Button>
              </td>
            </tr>
          ))}

          <tr className={styles.totalsRow}>
            <td colSpan="3">Totals Rental Income</td>
            <td>{formatDisplayValue(totalBeds, "number")}</td>
            <td>{formatDisplayValue(totalBaths, "number")}</td>
            <td>{formatDisplayValue(totalPerComps, "currency")}</td>
            <td>{formatDisplayValue(totalScheduled, "currency")}</td>
            <td>{formatDisplayValue(totalCurrent, "currency")}</td>
            <td></td>
          </tr>

          <tr className={styles.totalsRow}>
            <td colSpan="5">Additional Revenue (Laundry, Storage)</td>
            <td>
              <input
                type="number"
                placeholder="0"
                value={addRev.perComps}
                onChange={handleAddRev("perComps")}
                className={styles.inputCell}
                ref={(el) => (fieldsRef.current[units.length * 7] = el)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    fieldsRef.current[units.length * 7 + 1]?.focus();
                  }
                }}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="0"
                value={addRev.scheduledRent}
                onChange={handleAddRev("scheduledRent")}
                className={styles.inputCell}
                ref={(el) => (fieldsRef.current[units.length * 7 + 1] = el)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    fieldsRef.current[units.length * 7 + 2]?.focus();
                  }
                }}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="0"
                value={addRev.currentRent}
                onChange={handleAddRev("currentRent")}
                className={styles.inputCell}
                ref={(el) => (fieldsRef.current[units.length * 7 + 2] = el)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
            </td>
            <td></td>
          </tr>

          <tr className={styles.totalsRow}>
            <td colSpan="3">Totals</td>
            <td>{formatDisplayValue(totalBeds, "number")}</td>
            <td>{formatDisplayValue(totalBaths, "number")}</td>
            <td>{formatDisplayValue(combinedPerComps, "currency")}</td>
            <td>{formatDisplayValue(combinedScheduled, "currency")}</td>
            <td>{formatDisplayValue(combinedCurrent, "currency")}</td>
            <td></td>
          </tr>

          <tr className={styles.totalsRow}>
            <td colSpan="5">Annual Totals</td>
            <td>{formatDisplayValue(annualPerComps, "currency")}</td>
            <td>{formatDisplayValue(annualScheduled, "currency")}</td>
            <td>{formatDisplayValue(annualCurrent, "currency")}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
