// src/app/income-unit-mix/UnitRentTable.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './UnitRentTable.module.css';

export default function UnitRentTable({ unitCount = 5 }) {
  const [units, setUnits] = useState([]);
  const fieldsRef = useRef([]);

  useEffect(() => {
    setUnits(prev =>
      Array.from({ length: unitCount }, (_, i) => {
        const existing = prev[i];
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
    fieldsRef.current = [];
  }, [unitCount]);

  const handleChange = (idx, field) => e => {
    const val = field === 'furnished' ? e.target.checked : e.target.value;
    setUnits(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const [addRev, setAddRev] = useState({ perComps: '', scheduledRent: '', currentRent: '' });
  const handleAddRev = field => e => {
    setAddRev(prev => ({ ...prev, [field]: e.target.value }));
  };

  const totalSqFt = units.reduce((sum, u) => sum + Number(u.sqFt || 0), 0);
  const totalBeds = units.reduce((sum, u) => sum + (parseInt(u.beds) || 0), 0);
  const totalBaths = units.reduce((sum, u) => sum + (parseInt(u.baths) || 0), 0);
  const totalPerComps = units.reduce((sum, u) => sum + Number(u.perComps || 0), 0);
  const totalScheduled = units.reduce((sum, u) => sum + Number(u.scheduledRent || 0), 0);
  const totalCurrent = units.reduce((sum, u) => sum + Number(u.currentRent || 0), 0);

  const addPerComps = Number(addRev.perComps || 0);
  const addScheduled = Number(addRev.scheduledRent || 0);
  const addCurrent = Number(addRev.currentRent || 0);

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
                <label className="flex items-center justify-center w-12 h-12">
                  <input
                    type="checkbox"
                    className="scale-150"
                    checked={u.furnished}
                    onChange={handleChange(i, 'furnished')}
                    ref={el => fieldsRef.current[i * 7] = el}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
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
                  type="text"
                  value={u.sqFt}
                  onChange={handleChange(i, 'sqFt')}
                  ref={el => fieldsRef.current[i * 7 + 1] = el}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const next = (i * 7 + 2) % (unitCount * 7);
                      fieldsRef.current[next]?.focus();
                    }
                  }}
                />
              </td>
              <td>
                <select
                  value={u.beds}
                  onChange={handleChange(i, 'beds')}
                  ref={el => fieldsRef.current[i * 7 + 2] = el}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const next = (i * 7 + 3) % (unitCount * 7);
                      fieldsRef.current[next]?.focus();
                    }
                  }}
                >
                  <option value="">–</option>
                  <option value="Studio">Studio</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="Commercial - Mixed Use">Commercial – Mixed Use</option>
                </select>
              </td>
              <td>
                <select
                  value={u.baths}
                  onChange={handleChange(i, 'baths')}
                  ref={el => fieldsRef.current[i * 7 + 3] = el}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const next = (i * 7 + 4) % (unitCount * 7);
                      fieldsRef.current[next]?.focus();
                    }
                  }}
                >
                  <option value="">–</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={u.perComps}
                  onChange={handleChange(i, 'perComps')}
                  ref={el => fieldsRef.current[i * 7 + 4] = el}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const next = (i * 7 + 5) % (unitCount * 7);
                      fieldsRef.current[next]?.focus();
                    }
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={u.scheduledRent}
                  onChange={handleChange(i, 'scheduledRent')}
                  ref={el => fieldsRef.current[i * 7 + 5] = el}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const next = (i * 7 + 6) % (unitCount * 7);
                      fieldsRef.current[next]?.focus();
                    }
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={u.currentRent}
                  onChange={handleChange(i, 'currentRent')}
                  ref={el => fieldsRef.current[i * 7 + 6] = el}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const next = ((i + 1) * 7) % (unitCount * 7);
                      fieldsRef.current[next]?.focus();
                    }
                  }}
                />
              </td>
            </tr>
          ))}

          <tr className={styles.totalsRow}>
            <td colSpan="2">Totals Rental Income</td>
            <td></td>
            <td></td>
            <td></td>
            <td>${totalPerComps.toLocaleString()}</td>
            <td>${totalScheduled.toLocaleString()}</td>
            <td>${totalCurrent.toLocaleString()}</td>
          </tr>

          <tr className={styles.totalsRow}>
            <td colSpan="5">Additional Revenue (Laundry, Storage)</td>
            <td>
              <input
                type="text"
                placeholder="0"
                value={addRev.perComps}
                onChange={handleAddRev('perComps')}
                className={styles.inputCell}
                ref={el => fieldsRef.current[units.length * 7] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    fieldsRef.current[units.length * 7 + 1]?.focus();
                  }
                }}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="0"
                value={addRev.scheduledRent}
                onChange={handleAddRev('scheduledRent')}
                className={styles.inputCell}
                ref={el => fieldsRef.current[units.length * 7 + 1] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    fieldsRef.current[units.length * 7 + 2]?.focus();
                  }
                }}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="0"
                value={addRev.currentRent}
                onChange={handleAddRev('currentRent')}
                className={styles.inputCell}
                ref={el => fieldsRef.current[units.length * 7 + 2] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />
            </td>
          </tr>

          <tr className={styles.totalsRow}>
            <td colSpan="2">Totals</td>
            <td>{totalSqFt.toLocaleString()}</td>
            <td>{totalBeds}</td>
            <td>{totalBaths}</td>
            <td>${combinedPerComps.toLocaleString()}</td>
            <td>${combinedScheduled.toLocaleString()}</td>
            <td>${combinedCurrent.toLocaleString()}</td>
          </tr>

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