'use server';

/**
 * @fileOverview A conversational AI assistant for teachers.
 * - assistantFlow - A function that handles the chat interaction.
 * - AssistantInput - The input type for the assistantFlow function.
 * - AssistantOutput - The return type for the assistantFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const AssistantInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('The conversation history between the user and the model.'),
});
export type AssistantInput = z.infer<typeof AssistantInputSchema>;

const AssistantOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response.'),
});
export type AssistantOutput = z.infer<typeof AssistantOutputSchema>;


export async function assistantFlow(input: AssistantInput): Promise<AssistantOutput> {
    const prompt = ai.definePrompt({
        name: 'assistantPrompt',
        input: { schema: AssistantInputSchema },
        output: { schema: AssistantOutputSchema },
        prompt: `You are EduBot, a friendly and knowledgeable AI assistant for teachers. Your personality is helpful, encouraging, and pedagogical. You have deep knowledge of educational theories, classroom management techniques, and subject matter for K-12 education in Turkey.

Your primary goal is to assist teachers with their daily tasks, provide creative ideas, and offer support.

- When a teacher asks for ideas, provide practical, actionable suggestions.
- When they ask for explanations, break down complex topics into simple, understandable concepts.
- Always maintain a positive and supportive tone.
- Your responses should be in Turkish.

Here is the conversation history so far:
{{#each history}}
**{{role}}**: {{content}}
{{/each}}

Based on this history, provide a relevant and helpful response to the user's last message.

Response:`,
    });
    
    const assistantFlow = ai.defineFlow(
        {
          name: 'assistantFlow',
          inputSchema: AssistantInputSchema,
          outputSchema: AssistantOutputSchema,
        },
        async (input) => {
          const { output } = await prompt(input);
          return output!;
        }
    );

    return assistantFlow(input);
}
