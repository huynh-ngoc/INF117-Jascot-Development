export const PropertySchema = {
    type: 'object',
    properties: {
      askingPrice: { type: 'integer' },
      propertyMetrics: {
        type: 'object',
        properties: {
            daysOnMarket:      { type: 'integer' },
            numberOfUnits:     { type: 'integer' },
            propertySize:      { type: 'integer' },
            propertyAge:       { type: 'integer' },
            numberOfbedrooms:  { type: 'integer' },
            numberOfbathrooms: { type: 'integer' },
        },
        required: [
            'daysOnMarket',
            'numberOfUnits',
            'propertySize',
            'propertyAge',
            'numberOfbedrooms',
            'numberOfbathrooms'
        ]
      }
    },
    required: ['askingPrice','propertyMetrics']
  } as const;
  