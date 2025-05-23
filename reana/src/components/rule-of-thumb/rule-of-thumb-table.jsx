'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LOCAL_STORAGE_KEY = 'ruleOfThumbMetrics';

const defaultData = [
    {
    title: 'Area Appreciation Rate (5 yr running avg.)',
    value: '6.00%',
    notes: 'Pulled from DB, RE Data, or AI API. Know your market.',
    },
    {
    title: 'Rent Appreciation Rate (5 yr running avg.)',
    value: '4.50%',
    notes: 'Pulled from DB, RE Data, or AI API.',
    },
    {
    title: 'DSCR Requirement (Check with your Lender)',
    value: '1.15',
    notes: 'The default is 1.15; confirm with lender.',
    },
    {
    title: 'Area Property Tax Rate',
    value: '2.16%',
    notes: 'User input; local property tax rate.',
    },
    {
    title: 'Area Vacancy Rate (Current)',
    value: '9.90%',
    notes: 'Pulled from DB, RE Data, or AI API.',
    },
    {
    title: 'Operating Expenses',
    value: '50%',
    notes: 'Rule of thumb default: 50%.',
    },
    {
    title: 'Annual change in Operating Costs',
    value: '3.00%',
    notes: 'Default is 3%.',
    },
    {
    title: 'Less Contingency for unexpected Costs (10-15%)',
    value: '12.50%',
    notes: 'Default is 12.5%.',
    },
    {
    title: 'Property Manager (Pro) (10 - 15% all inclusive)',
    value: '12.50%',
    notes: 'Default is 12.5%.',
    },
    {
    title: 'Property Management (Self) (Software, Equip, Etc.)',
    value: '5.00%',
    notes: 'Default is 5%.',
    },
    {
    title: 'Repairs and Maintenance',
    value: '7.00%',
    notes: 'Default is 7%.',
    },
    {
    title: 'Tenant Turnover Costs',
    value: '5.00%',
    notes: 'Default is 5%.',
    },
    {
    title: 'Administrative Costs',
    value: '2.00%',
    notes: 'Default is 2%.',
    },
    {
    title: 'Cost of Sale of Property',
    value: '8.00%',
    notes: 'Default is 8%.',
    },
];

export default function RuleOfThumbTable() {
    const [tableData, setTableData] = useState(defaultData);

    // Load from localStorage when component mounts
    useEffect(() => {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
            setTableData(JSON.parse(savedData));
        }
    }, []);

    const formatNumberWithTwoDecimals = (value) => {
        // Remove any existing % symbol and trim
        const cleanValue = value.replace('%', '').trim();
        // Convert to number and format to 2 decimal places
        const formattedValue = Number(cleanValue).toFixed(2);
        return formattedValue;
    };

    const handleInputChange = (index, newValue) => {
        const updatedData = [...tableData];
        // Just update the raw value during typing
        updatedData[index].value = newValue;
        setTableData(updatedData);
    };

    const handleInputBlur = (index) => {
        const updatedData = [...tableData];
        const currentValue = updatedData[index].value;
        
        // Format the number with two decimal places
        let formattedValue = formatNumberWithTwoDecimals(currentValue);
        
        // Add % symbol if it's a percentage field
        const isPercentageField = updatedData[index].title.toLowerCase().includes('rate')
            || updatedData[index].title.toLowerCase().includes('tax')
            || updatedData[index].title.toLowerCase().includes('expenses')
            || updatedData[index].title.toLowerCase().includes('cost')
            || updatedData[index].title.toLowerCase().includes('vacancy')
            || updatedData[index].title.toLowerCase().includes('maintenance')
            || updatedData[index].title.toLowerCase().includes('turnover')
            || updatedData[index].title.toLowerCase().includes('management')
            || updatedData[index].title.toLowerCase().includes('sale');
        
        if (isPercentageField && formattedValue !== '') {
            formattedValue += '%';
        }
        
        updatedData[index].value = formattedValue;
        setTableData(updatedData);
    };

    const handleSave = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tableData));
        alert('Data saved successfully and will persist next time you visit.');
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-montserrat font-semibold text-[#2D3142]">Local Rule of Thumb</h2>
                <p className="text-sm font-lato text-[#4F5D75]">
                    These numbers are essential for calculations. Defaults are shown below, but once you edit,
                    your inputs will be saved automatically until you change them again.
                </p>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-[#4F5D75] rounded-lg">
                        <thead className="bg-[#4F5D75] text-white">
                            <tr>
                                <th className="p-3 text-left font-montserrat">Item</th>
                                <th className="p-3 text-left font-montserrat">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => {
                                const isPercentageField = row.value.includes('%');
                                const numericValue = row.value.replace(/[^0-9.]/g, '');
                                return (
                                    <tr key={index} className="border-t border-[#4F5D75]">
                                        <td className="p-3 font-lato">{row.title}</td>
                                        <td className="p-3">
                                            <div className="relative w-32">
                                                <Input
                                                    type="number"
                                                    value={numericValue}
                                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                                    onBlur={() => handleInputBlur(index)}
                                                    className={`w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] ${isPercentageField ? 'pr-8' : ''}`}
                                                    step="0.01"
                                                />
                                                {isPercentageField && (
                                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4F5D75] font-lato pointer-events-none">
                                                        %
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6">
                    <Button onClick={handleSave} className="bg-[#00A3E0] text-white font-montserrat hover:bg-[#0077AC] hover:shadow-md">
                        Save
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
