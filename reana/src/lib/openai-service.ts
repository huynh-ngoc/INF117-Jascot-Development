import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define types for common request parameters
type OpenAIRequestOptions = {
  model?: string;
  temperature?: number;
  max_completion_tokens?: number;
};

// Default options
const defaultOptions: OpenAIRequestOptions = {
  model: 'gpt-4o-mini',
  temperature: 0.5,
  max_completion_tokens: 1000,
};

/**
 * Generate JSON data using OpenAI's API
 * @param prompt The prompt to send to OpenAI
 * @param jsonStructure The structure for the model to follow
 * @param options Additional options for the OpenAI request
 * @returns The parsed JSON response
 */
export async function generateJsonData<T>(
  prompt: string,
  jsonStructure: Record<string, any>,
  options: OpenAIRequestOptions = {}
): Promise<T> {
  try {
    const mergedOptions = { ...defaultOptions, ...options };
    
    // System prompt for JSON output
    const systemPrompt = `You are a helpful assistant that always responds in valid JSON format. 
Follow the exact structure provided and only return the JSON data without any additional text or explanation.
The expected JSON structure is: ${JSON.stringify(jsonStructure)}`;

    const response = await openai.chat.completions.create({
      model: mergedOptions.model!,
      temperature: mergedOptions.temperature!,
      max_completion_tokens: mergedOptions.max_completion_tokens!,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
    });

    // Extract the content from the response
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content returned from OpenAI');
    }

    // Parse and return the JSON response
    return JSON.parse(content) as T;
  } catch (error) {
    console.error('Error generating JSON data:', error);
    throw error;
  }
}

/**
 * Generate a stream of JSON data from OpenAI (for streaming responses)
 * @param prompt The prompt to send to OpenAI
 * @param jsonStructure The structure for the model to follow
 * @param options Additional options for the OpenAI request
 * @returns A readable stream of the response
 */
export async function streamJsonData(
  prompt: string,
  jsonStructure: Record<string, any>,
  options: OpenAIRequestOptions = {}
) {
  try {
    const mergedOptions = { ...defaultOptions, ...options };
    
    // System prompt for JSON output
    const systemPrompt = `You are a helpful assistant that always responds in valid JSON format. 
Follow the exact structure provided and only return the JSON data without any additional text or explanation.
The expected JSON structure is: ${JSON.stringify(jsonStructure)}`;

    const stream = await openai.chat.completions.create({
      model: mergedOptions.model!,
      temperature: mergedOptions.temperature!,
      max_completion_tokens: mergedOptions.max_completion_tokens!,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      stream: true,
    });

    return stream;
  } catch (error) {
    console.error('Error streaming JSON data:', error);
    throw error;
  }
}

/**
 * Generate structured content based on a specific schema
 * @param prompt The prompt to generate content from
 * @param schema The JSON schema to validate against
 * @param options Additional options for the OpenAI request
 * @returns The validated structured data
 */
export async function generateStructuredData<T>(
  prompt: string,
  schema: Record<string, any>,
  options: OpenAIRequestOptions = {}
): Promise<T> {
  // Prompt includes the schema definition
  const enhancedPrompt = `
Generate content according to this JSON schema: ${JSON.stringify(schema)}
Request: ${prompt}
  `;
  
  return generateJsonData<T>(enhancedPrompt, schema, options);
}