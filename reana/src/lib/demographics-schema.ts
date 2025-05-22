export const DemographicsSchema = {
    type: 'object',
    demographics: {
        nearestCity: {
            name:        { type: 'string' },
            distance:    { type: 'integer' },
            population:  { type: 'integer' },
        },
        employment: {
            largestEmployer:   { type: 'string' },
            jobSectors:        { type: 'string' },
            averageCommuteTime:  { type: 'integer' },
            averageCommuteDistance:  { type: 'integer' },
        },
        neighborhood: {
            name:           { type: 'string' },
            letterRating:   { type: 'string' },
            crimeRate:      { type: 'integer'}
        }
    },
    required: ['nearestCity', 'employment', 'neighborhood']
  } as const;
  