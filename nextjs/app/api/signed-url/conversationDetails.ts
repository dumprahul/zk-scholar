// qroq.ts
export const apiKey = 'sk_6393960e248910b20f478a9aab7edb7ba4f59be034e50f34';
export const agentId = 'r8xNPHWSl4wiZ5izr8OR';
const { fetchConversationDetails } = require("./groq");

// Fetch conversation history
export async function getConversationHistory() {
    const url = `https://api.elevenlabs.io/v1/convai/conversations?agent_id=${agentId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'xi-api-key': apiKey,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch conversation history');
    }

    const data = await response.json();

    if (data.conversations && data.conversations.length > 0) {
        const firstConversation = data.conversations[0];
        const conversationId = firstConversation.conversation_id;

        console.log('First conversation ID:', conversationId);

        return await getConversationDetails(conversationId);
    } else {
        console.log('No conversations found.');
        return null;
    }
}

// Fetch conversation details by ID
export async function getConversationDetails(conversationId: string) {
    const url = `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'xi-api-key': apiKey,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch conversation details');
    }

    const data = await response.json();
    //conversation details are neef to 
    console.log('Conversation Details:', JSON.stringify(data, null, 2));
    if (data) {
            const groqResponse = await fetchConversationDetails(data);
            console.log("Groq Response:", groqResponse);
        }
    return data;
}
