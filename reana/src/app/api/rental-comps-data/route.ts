import { NextResponse } from 'next/server'
import { generateStructuredData } from '@/lib/openai-service'
import { RentalCompsSchema } from '@/lib/rental-comps-schema'

export async function GET(
  request: Request
) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 })
  }

  try {
    const prompt = `Provide realistic real‐estate details for the main property at: "${address}". 
                    Find three comparable properties on the market for the main property in the area located within 1 mile of the main property.
                    The comparable property must be the same type of property with the main property.
                    Provide realistic real-estate details for comparable properties.`
    const data = await generateStructuredData(
      prompt,
      RentalCompsSchema,
    )
    return NextResponse.json(data)
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
