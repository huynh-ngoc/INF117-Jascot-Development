import { NextResponse } from 'next/server'

function parseAddress(address) {
  const [street, city, stateZip] = address.split(/\s*,\s*/)
  const [state, zip] = stateZip.split(/\s+/)
  return { street, city, state, zip }
}

export async function GET(request) {
  const url = new URL(request.url)
  const address = url.searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 })
  }

  try {
    const { street, city, state: st, zip } = parseAddress(address)

    const geoRes = await fetch(
      `https://geocoding.geo.census.gov/geocoder/geographies/address?street=${encodeURIComponent(
        street
      )}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(
        st
      )}&benchmark=Public_AR_Current&vintage=Current_Current&layers=all&format=json`
    )
    const geoJson = await geoRes.json()
    const match = geoJson.result.addressMatches[0]

    if (!match) {
      throw new Error('Address not found.')
    }

    const tractInfo = match.geographies['Census Tracts'][0]
    const { STATE: stateCode, COUNTY: countyCode } = tractInfo
    const schoolDistrictsInfo = match.geographies['Unified School Districts'][0]
    const { NAME: schoolDistricts } = schoolDistrictsInfo

    const acsVars = [
        "B01003_001E", // population
        "B02001_002E", // White
        "B02001_003E", // Black
        "B02001_004E", // AIAN
        "B02001_005E", // Asian
        "B02001_006E", // Native HI/Other
        "B02001_008E", // Two or more
        "B19013_001E", // median income
        "B23025_005E", // unemployed
        "B23025_003E", // total labor
    ].join(",")

    const acsRes = await fetch(
      `https://api.census.gov/data/2023/acs/acs5?get=NAME,${acsVars}&for=county:${countyCode}&in=state:${stateCode}`
    )
    const acsJson = await acsRes.json()
    const [acsHeaders, acsValues] = acsJson
    const acsData = acsHeaders.reduce((obj, key, idx) => {
      obj[key] = acsValues[idx]
      return obj
    }, {})

    async function fetchPopulation(year) {
      const res = await fetch(
        `https://api.census.gov/data/${year}/acs/acs5?get=NAME,B01003_001E&for=county:${countyCode}&in=state:${stateCode}`
      )
      const json = await res.json()
      const [, vals] = json
      return vals[1]
    }

    async function fetchEmployment(year) {
        const res = await fetch(
          `https://api.census.gov/data/${year}/acs/acs5?get=NAME,B23025_003E&for=county:${countyCode}&in=state:${stateCode}`
        )
        const json = await res.json()
        const [, vals] = json
        return vals[1]
      }
  
    const population2023 = acsData.B01003_001E
    const population2022 = await fetchPopulation(2022)
    const population2021 = await fetchPopulation(2021)
    const population2020 = await fetchPopulation(2020)

    const employment2023 = acsData.B23025_003E
    const employment2022 = await fetchEmployment(2022)
    const employment2021 = await fetchEmployment(2021)
    const employment2020 = await fetchEmployment(2020)

    const result = {
      addressMatch: match,
      acsResJson: acsData,
      population: {
        '2023': population2023,
        '2022': population2022,
        '2021': population2021,
        '2020': population2020
      },
      employmentTrend: {
        '2023': employment2023,
        '2022': employment2022,
        '2021': employment2021,
        '2020': employment2020
      },
      schoolDistricts: schoolDistricts
    }

    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: e.message },
      {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    )
  }
}
