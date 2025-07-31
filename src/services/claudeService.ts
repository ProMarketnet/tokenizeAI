// Mock Claude service for TokenizeAI
// In production, this would connect to Claude API through your backend

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

  async sendMessage(userMessage: string): Promise<ClaudeResponse> {
    try {
      // Add user message to history
      this.conversationHistory.push({ role: 'user', content: userMessage });

      // Generate intelligent response
      const response = await this.generateResponse(userMessage);
      
      // Add assistant response to history
      this.conversationHistory.push({ role: 'assistant', content: response });

      // Parse the response for blocks and buttons
      const parsed = this.parseResponse(response);
      
      return parsed;
    } catch (error) {
      console.error('Claude service error:', error);
      return {
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        blocks: [],
        buttons: []
      };
    }
  }

  private async generateResponse(userMessage: string): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
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

    // Legal structure discussion
    if (lowerMessage.includes('legal') || lowerMessage.includes('structure') || lowerMessage.includes('compliant')) {
      return `Excellent question! For your situation, I recommend creating a Delaware LLC that holds your shares, then issuing tokens representing LLC membership interests.

[BLOCK:legal:Legal Structure:{"entityType":"Delaware LLC","tokenStandard":"ERC-20","exemption":"Rule 506(b)","jurisdiction":"United States"}]

This structure is:
✅ Securities law compliant
✅ Tax efficient
✅ Easily tradeable
✅ Familiar to investors

Ready to move forward with deployment?`;
    }

    // Token design
    if (lowerMessage.includes('token') || lowerMessage.includes('how many') || lowerMessage.includes('design')) {
      return `Let's design your token structure! I recommend:

[BLOCK:token:Token Design:{"totalSupply":"1,000 tokens","ratio":"1 token = 1 share","yourAllocation":"600 tokens (60%)","forSale":"400 tokens (40%)","features":"Auto dividend distribution"}]

🪙 1,000 tokens total = 100% of your shares
🪙 Each token = 1 share of your company
🪙 You keep 600 tokens, sell 400
🪙 Automatic dividend distribution

This gives you $20,000+ in liquidity while keeping 60% upside exposure.`;
    }

    // Real estate responses
    if (lowerMessage.includes('real estate') || lowerMessage.includes('property') || lowerMessage.includes('house')) {
      return `Real estate tokenization is a great use case! I can help you tokenize your property ownership stake to create liquidity without selling the entire property.

What type of real estate are we working with?

[BUTTONS:Rental property I own|rental_property|🏠,Commercial real estate|commercial_property|🏢,Real estate partnership|re_partnership|🤝]`;
    }

    // Deployment readiness
    if (lowerMessage.includes('deploy') || lowerMessage.includes('launch') || lowerMessage.includes('ready')) {
      return `Perfect! I'm ready to deploy your tokenization infrastructure. Here's what happens next:

📋 Generate legal documents (5 minutes)
🏗️ Create Delaware LLC (24 hours)
⛓️ Deploy smart contracts (10 minutes)
🪙 Mint your tokens (5 minutes)
📈 Set up trading infrastructure (30 minutes)

Total setup time: ~48 hours
Setup cost: $2,500

Ready to proceed?

[BUTTONS:Yes, let's deploy!|deploy_confirm|🚀,Review documents first|review_docs|📄]`;
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
