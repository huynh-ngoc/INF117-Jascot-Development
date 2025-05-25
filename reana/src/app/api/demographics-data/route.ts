import { NextResponse } from 'next/server'
import { generateStructuredData } from '@/lib/openai-service'
import { DemographicsSchema } from '@/lib/demographics-schema'

export async function GET(
  request: Request
) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 })
  }

  try {
    //Provide the nearest large city of the address with city name, distance to the city and population of the city.
    const prompt = `Provide realistic demographics data for the address: "${address}".`
    const data = await generateStructuredData(
      prompt,
      DemographicsSchema,
    )
    return NextResponse.json(data)
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
