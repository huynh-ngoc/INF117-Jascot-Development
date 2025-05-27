'use client';

import React from 'react';

export default function ProgressBar({
  current = 0,
  total = 100,
  label = 'Progress',
  showPercentage = false,
  showFraction = true,
  size = 'medium',
  color = 'blue',
  completedColor = 'green',
  className = '',
  labelClassName = '',
  barClassName = '',
}) {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;
  const isCompleted = current >= total;

  const sizeClasses = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3',
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
  };

  const progressColor = isCompleted ? colorClasses[completedColor] : colorClasses[color];

  return (
    <div className={`w-full ${className}`}>
      {/* Label and counters */}
      <div className={`flex justify-between text-sm text-gray-500 mb-1 ${labelClassName}`}>
        <span>{label}</span>
        <div className="flex gap-2">
          {showFraction && (
            <span>
              {current}/{total} {total === 1 ? 'item' : 'items'}
            </span>
          )}
          {showPercentage && (
            <span>({Math.round(percentage)}%)</span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} ${barClassName}`}>
        <div
          className={`${sizeClasses[size]} rounded-full transition-all duration-300 ease-in-out ${progressColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function useFormCompletion(formData, requiredFields = null, validator = null) {
  const fields = requiredFields || Object.keys(formData);
  
  const completedFields = fields.filter(field => {
    const value = formData[field];
    
    if (validator && typeof validator === 'function') {
      return validator(field, value);
    }
    
    if (typeof value === 'string') {
      return value.trim() !== '' && (!isNaN(Number(value)) ? Number(value) > 0 : true);
    }
    
    if (typeof value === 'number') {
      return value > 0;
    }
    
    return value != null && value !== '';
  });

  return {
    completed: completedFields.length,
    total: fields.length,
    isComplete: completedFields.length === fields.length,
    completedFields,
    missingFields: fields.filter(field => !completedFields.includes(field)),
    percentage: fields.length > 0 ? (completedFields.length / fields.length) * 100 : 0,
  };
}