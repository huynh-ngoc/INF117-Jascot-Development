'use client';
export const dynamic = "force-dynamic";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const defaultData = [
    {
        title: 'Area Appreciation Rate (5 yr running avg.)',
        value: '6.00%',
        notes: 'Pulled from DB, RE Data, or AI API. Know your market.',
        key: 'appreciation'
    },
    {
        title: 'Rent Appreciation Rate (5 yr running avg.)',
        value: '4.50%',
        notes: 'Pulled from DB, RE Data, or AI API.',
        key: 'rentAppreciation'
    },
    {
        title: 'DSCR Requirement (Check with your Lender)',
        value: '1.15',
        notes: 'The default is 1.15; confirm with lender.',
        key: 'dscr'
    },
    {
        title: 'Area Property Tax Rate',
        value: '2.16%',
        notes: 'User input; local property tax rate.',
        key: 'taxRate'
    },
    {
        title: 'Area Vacancy Rate (Current)',
        value: '9.90%',
        notes: 'Pulled from DB, RE Data, or AI API.',
        key: 'vacancy'
    },
    {
        title: 'Operating Expenses',
        value: '50%',
        notes: 'Rule of thumb default: 50%.',
        key: 'operatingExpenses'
    },
    {
        title: 'Annual change in Operating Costs',
        value: '3.00%',
        notes: 'Default is 3%.',
        key: 'opCostChange'
    },
    {
        title: 'Less Contingency for unexpected Costs (10-15%)',
        value: '12.50%',
        notes: 'Default is 12.5%.',
        key: 'contingency'
    },
    {
        title: 'Property Manager (Pro) (10 - 15% all inclusive)',
        value: '12.50%',
        notes: 'Default is 12.5%.',
        key: 'propertyManagerPro'
    },
    {
        title: 'Property Management (Self) (Software, Equip, Etc.)',
        value: '5.00%',
        notes: 'Default is 5%.',
        key: 'propertyManagerSelf'
    },
    {
        title: 'Repairs and Maintenance',
        value: '7.00%',
        notes: 'Default is 7%.',
        key: 'repairsAndMaintenance'
    },
    {
        title: 'Tenant Turnover Costs',
        value: '5.00%',
        notes: 'Default is 5%.',
        key: 'tenantTurnoverCosts'
    },
    {
        title: 'Administrative Costs',
        value: '2.00%',
        notes: 'Default is 2%.',
        key: 'administrativeCosts'
    },
    {
        title: 'Cost of Sale of Property',
        value: '8.00%',
        notes: 'Default is 8%.',
        key: 'costOfSale'
    },
];

export default function RuleOfThumbTable({ propertyId }) {
    const [tableData, setTableData] = useState(defaultData);
    const [hasChanges, setHasChanges] = useState(false);

    // Load data from Firebase when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/rule-of-thumb-metrics?propertyId=${propertyId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log('Fetched data from API:', data);
                if (data.success && data.ruleOfThumbMetrics) {
                    console.log('Rule of thumb metrics from API:', data.ruleOfThumbMetrics);
                    console.log('Default data keys:', defaultData.map(item => item.key));
                    
                    const updatedData = defaultData.map(item => ({
                        ...item,
                        value: data.ruleOfThumbMetrics[item.key] || item.value
                    }));
                    console.log('Updated data:', updatedData);
                    setTableData(updatedData);
                }
            } catch (error) {
                console.error('Error fetching rule of thumb metrics:', error);
            }
        };
        
        if (propertyId) {
            fetchData();
        }
    }, [propertyId]);

    const formatNumberWithTwoDecimals = (value) => {
        const cleanValue = value.replace('%', '').trim();
        const formattedValue = Number(cleanValue).toFixed(2);
        return formattedValue;
    };

    const handleInputChange = (index, newValue) => {
        const updatedData = [...tableData];
        updatedData[index].value = newValue;
        setTableData(updatedData);
        setHasChanges(true);
    };

    const isPercentageField = (row) => {
        // DSCR should NOT be treated as a percentage
        return row.key !== 'dscr' && row.value.includes('%');
    };

    const handleInputBlur = (index) => {
        const updatedData = [...tableData];
        const currentValue = updatedData[index].value;
        const row = updatedData[index];
        let formattedValue = formatNumberWithTwoDecimals(currentValue);

        // Only append % if it's a percentage field (not DSCR)
        if (row.key !== 'dscr' && formattedValue !== '') {
            formattedValue += '%';
        }

        updatedData[index].value = formattedValue;
        setTableData(updatedData);
    };

    const handleSave = async () => {
        try {
            const metricsData = tableData.reduce((acc, item) => {
                acc[item.key] = item.value;
                return acc;
            }, {});
            metricsData.propertyId = propertyId;
            
            console.log('Saving metrics data:', metricsData);
            console.log('Field names being saved:', Object.keys(metricsData));

            const response = await fetch('/api/rule-of-thumb-metrics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(metricsData),
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            const data = await response.json();
            if (data.success) {
                setHasChanges(false);
                alert('Data saved successfully!');
            }
        } catch (error) {
            console.error('Error saving rule of thumb metrics:', error);
            alert('Failed to save data. Please try again.');
        }
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
                                const isPercent = isPercentageField(row);
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
                                                    className={`w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] ${isPercent ? 'pr-8' : ''}`}
                                                    step="0.01"
                                                />
                                                {isPercent && (
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
                {hasChanges && (
                    <div className="mt-4 flex justify-start">
                        <Button
                            onClick={handleSave}
                            className="bg-[#00A3E0] hover:bg-[#0077AC] text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
