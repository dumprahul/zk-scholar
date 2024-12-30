import { NextResponse } from "next/server";
import { getConversationHistory } from "./conversationDetails"; // Adjust the path if necessary
const { fetchConversationDetails } = require("./groq"); // Import the Groq function

export async function GET() {
    const agentId = "r8xNPHWSl4wiZ5izr8OR";
    const apiKey = "sk_6393960e248910b20f478a9aab7edb7ba4f59be034e50f34";

    if (!agentId) {
        throw Error('AGENT_ID is not set');
    }
    if (!apiKey) {
        throw Error('XI_API_KEY is not set');
    }

    try {
        // Step 1: Get the signed URL
        const response = await fetch(
            `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
            {
                method: 'GET',
                headers: {
                    'xi-api-key': apiKey,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to get signed URL');
        }

        const data = await response.json();

        const signedUrl = new URL(data.signed_url);
        const agentIdFromUrl = signedUrl.searchParams.get("agent_id");
        const conversationSignature = signedUrl.searchParams.get("conversation_signature");

        console.log("Agent ID:", agentIdFromUrl, "Conversation ID:", conversationSignature);

        // Step 2: Call `getConversationHistory` to fetch conversation details
        let conversationDetails;
        try {
            conversationDetails = await getConversationHistory();
            console.log("Conversation Details:", conversationDetails);
        } catch (error) {
            console.error("Error fetching conversation history:", error);
            // Add fallback behavior or set `conversationDetails` to null
            conversationDetails = null;
        }

        
        // Step 3: Pass conversation details to `groq.js` for logging
        if (conversationDetails) {
            const groqResponse = await fetchConversationDetails(conversationDetails);
            console.log("Groq Response:", groqResponse);
        }
        // Return the signed URL
        return NextResponse.json({ signedUrl: data.signed_url });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
