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
  const [attemptSubmit, setAttemptSubmit] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(p => ({ ...p, [name]: value }));
    setErrors(errs => ({ ...errs, [name]: undefined }));
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    // don't trigger summary here
    setErrors(validate());
  };

  const setType = type => {
    setProfile(p => ({ ...p, type_of_agent: type }));
    setTouched(t => ({ ...t, type_of_agent: true }));
    setErrors(validate());
  };

  const validate = () => {
    const errs = {};
    if (profile.state.trim() && !/^[A-Za-z]{2}$/.test(profile.state)) {
      errs.state = 'State must be 2 letters';
    }
    if (profile.zip_code.trim() && !/^\d{5}$/.test(profile.zip_code)) {
      errs.zip_code = 'Zip Code must be 5 digits';
    }
    if (
      profile.office_number.trim() &&
      !/^[\d\-\s()]{7,}$/.test(profile.office_number)
    ) {
      errs.office_number = 'Invalid phone format';
    }
    if (
      profile.cellphone.trim() &&
      !/^[\d\-\s()]{7,}$/.test(profile.cellphone)
    ) {
      errs.cellphone = 'Invalid phone format';
    }
    if (
      profile.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)
    ) {
      errs.email = 'Invalid email address';
    }
    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setAttemptSubmit(true);
    const errs = validate();
    setErrors(errs);
    setTouched(
      Object.keys(profile).reduce((acc, k) => {
        acc[k] = true;
        return acc;
      }, {})
    );
    if (Object.keys(errs).length === 0) {
      setShowConfirmation(true);
    }
  };

  const inputClasses = name => {
    if (errors[name]) return 'border-red-500';
    if (touched[name] && !errors[name]) return 'border-green-500';
    return 'border-gray-300';
  };

  const fieldLabels = {
    brokerage_name: 'Brokerage Name',
    street_address: 'Street',
    city: 'City',
    state: 'State',
    zip_code: 'Zip Code',
    office_number: 'Office Phone',
    office_number_ext: 'Ext',
    agent_name: 'Agent Name',
    license_number: 'License #',
    email: 'Email',
    cellphone: 'Mobile Phone',
    type_of_agent: 'Type of Agent',
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
                Form submitted successfully!
              </div>
            )}

            {attemptSubmit && !showConfirmation && Object.keys(errors).length > 0 && (
              <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-2 rounded mb-4">
                <p className="font-medium">Please fix the following errors:</p>
                <ul className="list-disc list-inside">
                  {Object.entries(errors).map(([field, msg]) => (
                    <li key={field}>
                      {fieldLabels[field]}: {msg}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <h2 className="text-2xl font-bold text-center">Realtor Profile</h2>

            <div className="relative">
              <label className="block font-medium mb-1">Brokerage Name</label>
              <input
                name="brokerage_name"
                value={profile.brokerage_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded px-3 py-2 border ${inputClasses('brokerage_name')}`} 
              />
              {touched.brokerage_name && (
                errors.brokerage_name ? (
                  <XCircle className="absolute right-3 top-9 text-red-500" size={18}/>
                ) : (
                  <CheckCircle className="absolute right-3 top-9 text-green-500" size={18}/>
                )
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                'street_address',
                'city',
                'state',
                'zip_code',
              ].map(name => (
                <div key={name} className="relative">
                  <label className="block font-medium mb-1">{fieldLabels[name]}</label>
                  <input
                    name={name}
                    value={profile[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded px-3 py-2 border ${inputClasses(name)}`}
                    placeholder={fieldLabels[name]}
                  />
                  {touched[name] && (
                    errors[name] ? (
                      <XCircle className="absolute right-3 top-9 text-red-500" size={18}/>
                    ) : (
                      <CheckCircle className="absolute right-3 top-9 text-green-500" size={18}/>
                    )
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                'office_number',
                'office_number_ext',
                'agent_name',
                'license_number',
              ].map(name => (
                <div key={name} className="relative">
                  <label className="block font-medium mb-1">{fieldLabels[name]}</label>
                  <input
                    name={name}
                    value={profile[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded px-3 py-2 border ${inputClasses(name)}`}
                    placeholder={fieldLabels[name]}
                  />
                  {touched[name] && (
                    errors[name] ? (
                      <XCircle className="absolute right-3 top-9 text-red-500" size={18}/>
                    ) : (
                      <CheckCircle className="absolute right-3 top-9 text-green-500" size={18}/>
                    )
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'email',
                'cellphone',
              ].map(name => (
                <div key={name} className="relative">
                  <label className="block font-medium mb-1">{fieldLabels[name]}</label>
                  <input
                    name={name}
                    value={profile[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded px-3 py-2 border ${inputClasses(name)}`}
                    placeholder={fieldLabels[name]}
                  />
                  {touched[name] && (
                    errors[name] ? (
                      <XCircle className="absolute right-3 top-9 text-red-500" size={18}/>
                    ) : (
                      <CheckCircle className="absolute right-3 top-9 text-green-500" size={18}/>
                    )
                  )}
                </div>
              ))}
            </div>

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
                      profile.type_of_agent === val ? 'bg-blue-600 text-white' : 'bg-gray-100'
                    }`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

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
