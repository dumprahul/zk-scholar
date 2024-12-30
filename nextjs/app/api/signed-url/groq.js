const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: "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" });

async function fetchConversationDetails(conversationDetails) {
  try {
    // Ensure that conversationDetails is a string or an array
    const conversationContent = typeof conversationDetails === 'string' 
      ? conversationDetails 
      : JSON.stringify(conversationDetails); // Convert object to string if necessary

    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "system",
          "content": "Give mark out of 100 based on the conversation, output must be a single number no other explanation is needed."
        },
        {
          "role": "user",
          "content": conversationContent // Use the formatted content
        }
      ],
      "model": "llama-3.1-70b-versatile",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stop": null // Removed streaming option
    });

    console.log("Response content:", chatCompletion.choices[0]?.message?.content || 'No content available');
    return chatCompletion.choices[0]?.message?.content || 'No content available';
  } catch (error) {
    console.error("Error in fetching conversation from Groq:", error.message);
    throw error;
  }
}

module.exports = { fetchConversationDetails };
