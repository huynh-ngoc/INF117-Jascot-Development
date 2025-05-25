export const RentalCompsSchema = {
    type: 'object',
    properties: {
        mainProperty: {
            monthlyRent:        { type: 'integer' },
            propertySize:       { type: 'integer' },
            numberOfbedrooms:   { type: 'integer' },
            numberOfbathrooms:  { type: 'integer' },
        },
        comparableProperties: {
            type: 'object',
            property1: {
                address:            { type: 'string' },
                monthlyRent:        { type: 'integer' },
                propertySize:       { type: 'integer' },
                numberOfbedrooms:   { type: 'integer' },
                numberOfbathrooms:  { type: 'integer' },
            },
            property2: {
                address:            { type: 'string' },
                monthlyRent:        { type: 'integer' },
                propertySize:       { type: 'integer' },
                numberOfbedrooms:   { type: 'integer' },
                numberOfbathrooms:  { type: 'integer' },
            },
            property3: {
                address:            { type: 'string' },
                monthlyRent:        { type: 'integer' },
                propertySize:       { type: 'integer' },
                numberOfbedrooms:   { type: 'integer' },
                numberOfbathrooms:  { type: 'integer' },
            },
            required: [
                'address',
                'monthlyRent',
                'propertySize',
                'numberOfbedrooms',
                'numberOfbathrooms'
            ]
        }
    },
    required: ['mainProperty', 'comparableProperties']
  } as const;
  