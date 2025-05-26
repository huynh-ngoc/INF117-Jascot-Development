import { NextResponse } from 'next/server'
import { generateStructuredData } from '@/lib/openai-service'
import { PropertySchema } from '@/lib/property-schema'

export async function GET(
  request: Request
) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 })
  }

  try {
    const prompt = `Provide realistic real‐estate details for the property at: "${address}".`
    const data = await generateStructuredData(
      prompt,
      PropertySchema,
    )
    return NextResponse.json(data)
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
