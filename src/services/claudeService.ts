import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: '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',
  dangerouslyAllowBrowser: true // Only for demo - use backend in production
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
      // Add user message to history
      this.conversationHistory.push({ role: 'user', content: userMessage });

      const response = await anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        system: this.systemPrompt,
        messages: this.conversationHistory
      });

      const content = response.content[0]?.text || '';
      
      // Add assistant response to history
      this.conversationHistory.push({ role: 'assistant', content });

      // Parse the response for blocks and buttons
      const parsed = this.parseResponse(content);
      
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
