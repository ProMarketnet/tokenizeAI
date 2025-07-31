import Anthropic from '@anthropic-ai/sdk';

// For production, this should be done through your backend API
// This is a direct browser implementation for demo purposes
const anthropic = new Anthropic({
  apiKey: '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'
});

export interface InfoBlock {
  id: string;
  type: 'asset' | 'liquidity' | 'legal' | 'compliance' | 'token';
  title: string;
  data: Record<string, any>;
  status: 'incomplete' | 'complete' | 'verified';
  sourceNumber?: number;
}

export interface MessageButton {
  id: string;
  text: string;
  value: string;
  icon?: string;
}

export interface ClaudeResponse {
  content: string;
  blocks?: InfoBlock[];
  buttons?: MessageButton[];
}

class ClaudeService {
  private conversationHistory: { role: 'user' | 'assistant'; content: string }[] = [];
  
  private systemPrompt = `You are TokenizeAI, an AI assistant that helps people tokenize their illiquid assets like company shares, real estate, and partnership stakes. Your goal is to guide users through the process of converting these assets into tradeable blockchain tokens.

Key guidelines:
- Be conversational and helpful, like Anthropic's Claude
- Focus on practical tokenization solutions
- Ask clarifying questions to understand their assets
- Explain complex concepts simply
- Be encouraging about the possibilities of tokenization
- When appropriate, suggest creating information blocks to track progress

When you identify specific asset information, you can create information blocks using this format:
[BLOCK:type:title:data]

Available block types: asset, liquidity, legal, compliance, token

Example: [BLOCK:asset:Asset Details:{"company":"TechCorp","shares":1000,"type":"Common Stock","value":"~$50,000"}]

You can also suggest action buttons using:
[BUTTONS:text1|value1|icon1,text2|value2|icon2]

Example: [BUTTONS:Private startup shares|startup_shares|🚀,Stock options|stock_options|💼]

Keep responses concise but informative, and always maintain a helpful, professional tone.`;

  async sendMessage(userMessage: string): Promise<ClaudeResponse> {
    try {
      // For demo purposes, we'll simulate Claude responses
      // In production, this should go through your backend API
      
      // Add user message to history
      this.conversationHistory.push({ role: 'user', content: userMessage });

      // Simple response logic for demo
      let response = await this.generateResponse(userMessage);
      
      // Add assistant response to history
      this.conversationHistory.push({ role: 'assistant', content: response });

      // Parse the response for blocks and buttons
      const parsed = this.parseResponse(response);
      
      return parsed;
    } catch (error) {
      console.error('Claude API error:', error);
      return {
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        blocks: [],
        buttons: []
      };
    }
  }

  private async generateResponse(userMessage: string): Promise<string> {
    const lowerMessage = userMessage.toLowerCase();
    
    // Asset detection responses
    if (lowerMessage.includes('shares') || lowerMessage.includes('stock') || lowerMessage.includes('equity')) {
      return `I see you have company shares you'd like to tokenize. Let me gather some details to help you unlock that liquidity.

What's the company name and approximately how many shares do you own?

[BUTTONS:Private startup shares|startup_shares|🚀,Employee stock options|stock_options|💼,Public company shares|public_shares|📈]`;
    }

    // Company details collection
    if (lowerMessage.includes('techcorp') || lowerMessage.includes('startup') || /\d+.*shares?/.test(lowerMessage)) {
      const shares = lowerMessage.match(/(\d+).*shares?/)?.[1] || '1000';
      const company = lowerMessage.match(/([A-Z][a-zA-Z]+)/)?.[1] || 'TechCorp';
      
      return `Perfect! I've recorded your ${company} shares. Now let's understand your liquidity goals better.

[BLOCK:asset:Asset Details:{"company":"${company}","shares":${shares},"assetType":"Private Company Stock","estimatedValue":"~$50,000"}]

How much of your stake would you like to convert to liquid tokens, and what's driving this need?

[BUTTONS:Need cash for major purchase|cash_need|💰,Want trading flexibility|trading_flexibility|🔄,Diversification strategy|diversification|📊]`;
    }

    // Liquidity goals
    if (lowerMessage.includes('cash') || lowerMessage.includes('money') || lowerMessage.includes('liquidity')) {
      return `Great! I understand you need some liquidity. Let me help you design the optimal token structure.

[BLOCK:liquidity:Liquidity Goals:{"purpose":"Cash for major purchase","timeline":"Next 3-6 months","keepUpside":"Yes","suggestedSplit":"40% sell, 60% keep"}]

Typically, I recommend tokenizing your entire stake but only selling the portion you need now. This preserves your upside while giving you immediate liquidity.

Would you like me to show you how the tokenization process works?`;
    }

    // Real estate responses
    if (lowerMessage.includes('real estate') || lowerMessage.includes('property') || lowerMessage.includes('house')) {
      return `Real estate tokenization is a great use case! I can help you tokenize your property ownership stake to create liquidity without selling the entire property.

What type of real estate are we working with?

[BUTTONS:Rental property I own|rental_property|🏠,Commercial real estate|commercial_property|🏢,Real estate partnership|re_partnership|🤝]`;
    }

    // Default helpful response
    return `I'd be happy to help you tokenize your assets! Could you tell me more about what you own that you'd like to make more liquid?

I specialize in tokenizing:
• Company shares and stock options
• Real estate ownership stakes  
• Business partnership interests
• Revenue-generating assets

What type of asset are you looking to tokenize?

[BUTTONS:Company shares|company_shares|📈,Real estate|real_estate|🏠,Business partnership|partnership|🤝,Other assets|other|💼]`;
  }

  private parseResponse(content: string): ClaudeResponse {
    let cleanContent = content;
    const blocks: InfoBlock[] = [];
    const buttons: MessageButton[] = [];

    // Parse blocks
    const blockMatches = content.match(/\[BLOCK:([^:]+):([^:]+):({[^}]+})\]/g);
    if (blockMatches) {
      blockMatches.forEach((match, index) => {
        const parts = match.match(/\[BLOCK:([^:]+):([^:]+):({.+})\]/);
        if (parts) {
          try {
            const [, type, title, dataStr] = parts;
            const data = JSON.parse(dataStr);
            
            blocks.push({
              id: `block_${Date.now()}_${index}`,
              type: type as any,
              title,
              data,
              status: 'incomplete',
              sourceNumber: index + 1
            });
            
            // Remove block syntax from content
            cleanContent = cleanContent.replace(match, '');
          } catch (e) {
            console.error('Error parsing block:', e);
          }
        }
      });
    }

    // Parse buttons
    const buttonMatch = content.match(/\[BUTTONS:([^\]]+)\]/);
    if (buttonMatch) {
      const buttonStr = buttonMatch[1];
      const buttonPairs = buttonStr.split(',');
      
      buttonPairs.forEach((pair, index) => {
        const [text, value, icon] = pair.split('|');
        if (text && value) {
          buttons.push({
            id: `btn_${Date.now()}_${index}`,
            text: text.trim(),
            value: value.trim(),
            icon: icon?.trim()
          });
        }
      });
      
      // Remove button syntax from content
      cleanContent = cleanContent.replace(buttonMatch[0], '');
    }

    return {
      content: cleanContent.trim(),
      blocks,
      buttons
    };
  }

  resetConversation() {
    this.conversationHistory = [];
  }
}

export const claudeService = new ClaudeService();
export default claudeService;
