// src/app/realtor-popup/page.jsx
'use client';

import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { CheckCircle, XCircle } from 'lucide-react';

export default function RealtorPopup() {
  const [profile, setProfile] = useState({
    brokerage_name: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    office_number: '',
    office_number_ext: '',
    agent_name: '',
    license_number: '',
    email: '',
    cellphone: '',
    type_of_agent: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
    // clear that field's error as they type
    setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    // mark it touched
    setTouched((t) => ({ ...t, [name]: true }));
    // re-run full validation on blur
    setErrors(validate());
  };

  const setType = (type) => {
    setProfile((p) => ({ ...p, type_of_agent: type }));
    setTouched((t) => ({ ...t, type_of_agent: true }));
    setErrors(validate());
  };

  const validate = () => {
    const errs = {};
    if (!profile.brokerage_name.trim()) errs.brokerage_name = 'Required';
    if (!profile.street_address.trim()) errs.street_address = 'Required';
    if (!profile.city.trim()) errs.city = 'Required';
    if (!/^[A-Za-z]{2}$/.test(profile.state)) errs.state = '2-letter code';
    if (!/^\d{5}$/.test(profile.zip_code)) errs.zip_code = '5 digits';
    if (profile.office_number && !/^[\d\-\s()]{7,}$/.test(profile.office_number))
      errs.office_number = 'Invalid phone';
    if (!profile.agent_name.trim()) errs.agent_name = 'Required';
    if (!profile.license_number.trim()) errs.license_number = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email))
      errs.email = 'Invalid email';
    if (
      profile.cellphone &&
      !/^[\d\-\s()]{7,}$/.test(profile.cellphone)
    )
      errs.cellphone = 'Invalid phone';
    if (!profile.type_of_agent) errs.type_of_agent = 'Select one';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    // mark all fields touched
    setTouched(Object.keys(profile).reduce((acc, k) => {
      acc[k] = true;
      return acc;
    }, {}));
    if (Object.keys(errs).length === 0) {
      setShowConfirmation(true);
    }
  };

  const inputClasses = (name) => {
    if (errors[name]) return 'border-red-500';
    if (touched[name]) return 'border-green-500';
    return 'border-gray-300';
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex-1 flex items-center justify-center py-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-5xl bg-white p-8 rounded-lg shadow space-y-6 border-2 border-black"
          >
            {showConfirmation && (
              <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded mb-4">
                Form submitted!
              </div>
            )}

            <h2 className="text-2xl font-bold text-center">Realtor Profile</h2>

            {/* Brokerage Name */}
            <div className="relative">
              <label className="block font-medium mb-1">Brokerage Name</label>
              <input
                name="brokerage_name"
                value={profile.brokerage_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded px-3 py-2 border ${inputClasses(
                  'brokerage_name'
                )}`}
              />
              {touched.brokerage_name && (
                errors.brokerage_name ? (
                  <XCircle className="absolute right-3 top-9 text-red-500" size={18}/>
                ) : (
                  <CheckCircle className="absolute right-3 top-9 text-green-500" size={18}/>
                )
              )}
              {errors.brokerage_name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.brokerage_name}
                </p>
              )}
            </div>

            {/* Address row */}
            <div className="grid grid-cols-4 gap-4">
              {[
                ['street_address', 'Street'],
                ['city', 'City'],
                ['state', 'State'],
                ['zip_code', 'Zip Code'],
              ].map(([name, label]) => (
                <div key={name} className="relative">
                  <label className="block font-medium mb-1">{label}</label>
                  <input
                    name={name}
                    value={profile[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded px-3 py-2 border ${inputClasses(
                      name
                    )}`}
                    placeholder={label}
                  />
                  {touched[name] && (
                    errors[name] ? (
                      <XCircle className="absolute right-3 top-9 text-red-500" size={18}/>
                    ) : (
                      <CheckCircle className="absolute right-3 top-9 text-green-500" size={18}/>
                    )
                  )}
                  {errors[name] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Office, Ext, Agent Name & License */}
            <div className="grid grid-cols-4 gap-4">
              {[
                ['office_number', 'Office Phone'],
                ['office_number_ext', 'Ext'],
                ['agent_name', 'Agent Name'],
                ['license_number', 'License #'],
              ].map(([name, label]) => (
                <div key={name} className="relative">
                  <label className="block font-medium mb-1">{label}</label>
                  <input
                    name={name}
                    value={profile[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded px-3 py-2 border ${inputClasses(
                      name
                    )}`}
                    placeholder={label}
                  />
                  {touched[name] && (
                    errors[name] ? (
                      <XCircle className="absolute right-3 top-9 text-red-500" size={18}/>
                    ) : (
                      <CheckCircle className="absolute right-3 top-9 text-green-500" size={18}/>
                    )
                  )}
                  {errors[name] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Email & Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ['email', 'Email'],
                ['cellphone', 'Mobile #'],
              ].map(([name, label]) => (
                <div key={name} className="relative">
                  <label className="block font-medium mb-1">{label}</label>
                  <input
                    name={name}
                    value={profile[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded px-3 py-2 border ${inputClasses(
                      name
                    )}`}
                    placeholder={label}
                  />
                  {touched[name] && (
                    errors[name] ? (
                      <XCircle className="absolute right-3 top-9 text-red-500" size={18}/>
                    ) : (
                      <CheckCircle className="absolute right-3 top-9 text-green-500" size={18}/>
                    )
                  )}
                  {errors[name] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Type of Agent */}
            <div>
              <label className="block font-medium mb-2">Type of Agent</label>
              <div className="flex space-x-4">
                {[
                  ['Listing/Selling', 'listing'],
                  ['Purchase/Buyers', 'purchase'],
                  ['Both', 'both'],
                ].map(([label, val]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setType(val)}
                    className={`px-4 py-2 border rounded ${
                      profile.type_of_agent === val
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {touched.type_of_agent && (
                errors.type_of_agent ? (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.type_of_agent}
                  </p>
                ) : (
                  <p className="text-green-600 text-sm mt-1">
                    Looks good!
                  </p>
                )
              )}
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="mt-4 px-8 py-2 bg-green-600 text-white rounded"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
