// src/app/income-unit-mix/UnitRentTable.jsx
'use client';

import React, { useState, useEffect } from 'react';
import styles from './UnitRentTable.module.css';

export default function UnitRentTable({ unitCount = 5 }) {
  // 1) per-unit state
  const [units, setUnits] = useState([]);
  useEffect(() => {
    setUnits(prevUnits =>
      Array.from({ length: unitCount }, (_, i) => {
        const existing = prevUnits[i];
        return existing
          ? { ...existing, id: i + 1 }
          : {
              id: i + 1,
              furnished: false,
              sqFt: '',
              beds: '',
              baths: '',
              perComps: '',
              scheduledRent: '',
              currentRent: '',
            };
      })
    );
  }, [unitCount]);

  const handleChange = (idx, field) => e => {
    const val = field === 'furnished' ? e.target.checked : e.target.value;
    setUnits(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  // 2) additional-revenue state (inline inputs)
  const [addRev, setAddRev] = useState({
    perComps: '',
    scheduledRent: '',
    currentRent: '',
  });
  const handleAddRev = field => e => {
    setAddRev(prev => ({ ...prev, [field]: e.target.value }));
  };

  // 3) column sums
  const totalSqFt = units.reduce((sum, u) => sum + Number(u.sqFt || 0), 0);
  const totalBeds = units.reduce((sum, u) => sum + (parseInt(u.beds) || 0), 0);
  const totalBaths = units.reduce(
    (sum, u) => sum + (parseInt(u.baths) || 0),
    0
  );
  const totalPerComps = units.reduce(
    (sum, u) => sum + Number(u.perComps || 0),
    0
  );
  const totalScheduled = units.reduce(
    (sum, u) => sum + Number(u.scheduledRent || 0),
    0
  );
  const totalCurrent = units.reduce(
    (sum, u) => sum + Number(u.currentRent || 0),
    0
  );

  // 4) parse additional values
  const addPerComps = Number(addRev.perComps || 0);
  const addScheduled = Number(addRev.scheduledRent || 0);
  const addCurrent = Number(addRev.currentRent || 0);

  // 5) combined & annual totals
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
            <th>Beds</th>
            <th>Baths</th>
            <th>Per Comps</th>
            <th>Scheduled Rent</th>
            <th>Current Rent</th>
          </tr>
        </thead>
        <tbody>
          {units.map((u, i) => (
            <tr key={u.id}>
              <td>Unit {u.id}</td>
              <td>
                <input
                  type="checkbox"
                  checked={u.furnished}
                  onChange={handleChange(i, 'furnished')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={u.sqFt}
                  onChange={handleChange(i, 'sqFt')}
                />
              </td>
              <td>
                <select value={u.beds} onChange={handleChange(i, 'beds')}>
                  <option value="">–</option>
                  <option value="Studio">Studio</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="Commercial - Mixed Use">
                    Commercial – Mixed Use
                  </option>
                </select>
              </td>
              <td>
                <select value={u.baths} onChange={handleChange(i, 'baths')}>
                  <option value="">–</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={u.perComps}
                  onChange={handleChange(i, 'perComps')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={u.scheduledRent}
                  onChange={handleChange(i, 'scheduledRent')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={u.currentRent}
                  onChange={handleChange(i, 'currentRent')}
                />
              </td>
            </tr>
          ))}

          {/* Totals Rental Income */}
          <tr className={styles.totalsRow}>
            <td colSpan="2">Totals Rental Income</td>
            <td></td>
            <td></td>
            <td></td>
            <td>${totalPerComps.toLocaleString()}</td>
            <td>${totalScheduled.toLocaleString()}</td>
            <td>${totalCurrent.toLocaleString()}</td>
          </tr>

          {/* Additional Revenue */}
          <tr className={styles.totalsRow}>
            <td colSpan="5">Additional Revenue (Laundry, Storage)</td>
            <td>
              <input
                type="number"
                placeholder="0"
                value={addRev.perComps}
                onChange={handleAddRev('perComps')}
                className={styles.inputCell}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="0"
                value={addRev.scheduledRent}
                onChange={handleAddRev('scheduledRent')}
                className={styles.inputCell}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="0"
                value={addRev.currentRent}
                onChange={handleAddRev('currentRent')}
                className={styles.inputCell}
              />
            </td>
          </tr>

          {/* Totals */}
          <tr className={styles.totalsRow}>
            <td colSpan="2">Totals</td>
            <td>{totalSqFt.toLocaleString()}</td>
            <td>{totalBeds}</td>
            <td>{totalBaths}</td>
            <td>${combinedPerComps.toLocaleString()}</td>
            <td>${combinedScheduled.toLocaleString()}</td>
            <td>${combinedCurrent.toLocaleString()}</td>
          </tr>

          {/* Annual Totals */}
          <tr className={styles.totalsRow}>
            <td colSpan="5">Annual Totals</td>
            <td>${annualPerComps.toLocaleString()}</td>
            <td>${annualScheduled.toLocaleString()}</td>
            <td>${annualCurrent.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
