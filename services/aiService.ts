import { InfoBlock, MessageButton, Document } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface AIResponse {
  content: string;
  blocks?: InfoBlock[];
  buttons?: MessageButton[];
  documents?: Document[];
}

export const aiResponseHandler = async (userMessage: string, currentStep: string): Promise<AIResponse> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const lowerMessage = userMessage.toLowerCase();
  
  // Asset detection responses
  if (lowerMessage.includes('shares') || lowerMessage.includes('stock') || lowerMessage.includes('equity')) {
    return {
      content: "I see you have company shares you'd like to tokenize. Let me gather some details to help you unlock that liquidity.\n\nWhat's the company name and approximately how many shares do you own?",
      buttons: [
        {
          id: uuidv4(),
          text: "Private startup shares",
          value: "startup_shares",
          icon: "🚀"
        },
        {
          id: uuidv4(),
          text: "Employee stock options", 
          value: "stock_options",
          icon: "💼"
        },
        {
          id: uuidv4(),
          text: "Public company shares",
          value: "public_shares",
          icon: "📈"
        }
      ]
    };
  }

  // Company details collection
  if (lowerMessage.includes('techcorp') || lowerMessage.includes('startup') || /\d+.*shares?/.test(lowerMessage)) {
    const shares = lowerMessage.match(/(\d+).*shares?/)?.[1] || '1000';
    const company = lowerMessage.match(/([A-Z][a-zA-Z]+)/)?.[1] || 'TechCorp';
    
    return {
      content: `Perfect! I've recorded your ${company} shares. Now let's understand your liquidity goals better.\n\nHow much of your stake would you like to convert to liquid tokens, and what's driving this need?`,
      blocks: [
        {
          id: uuidv4(),
          type: 'asset',
          title: 'Asset Details',
          data: {
            company: company,
            shares: parseInt(shares),
            assetType: 'Private Company Stock',
            estimatedValue: '~$50,000',
          },
          status: 'incomplete',
          sourceNumber: 1,
        }
      ],
      buttons: [
        {
          id: uuidv4(),
          text: "Need cash for major purchase",
          value: "cash_need",
          icon: "💰"
        },
        {
          id: uuidv4(),
          text: "Want trading flexibility",
          value: "trading_flexibility",
          icon: "🔄"
        },
        {
          id: uuidv4(),
          text: "Diversification strategy",
          value: "diversification",
          icon: "📊"
        }
      ]
    };
  }

  // Liquidity goals
  if (lowerMessage.includes('cash') || lowerMessage.includes('money') || lowerMessage.includes('liquidity')) {
    return {
      content: "Great! I understand you need some liquidity. Let me help you design the optimal token structure.\n\nTypically, I recommend tokenizing your entire stake but only selling the portion you need now. This preserves your upside while giving you immediate liquidity.",
      blocks: [
        {
          id: uuidv4(),
          type: 'liquidity',
          title: 'Liquidity Goals',
          data: {
            purpose: 'Cash for major purchase',
            timeline: 'Next 3-6 months',
            keepUpside: 'Yes',
            suggestedSplit: '40% sell, 60% keep'
          },
          status: 'incomplete',
          sourceNumber: 2,
        }
      ]
    };
  }

  // Legal structure discussion
  if (lowerMessage.includes('legal') || lowerMessage.includes('structure') || lowerMessage.includes('compliant')) {
    return {
      content: "Excellent question! For your situation, I recommend creating a Delaware LLC that holds your shares, then issuing tokens representing LLC membership interests.\n\nThis structure is:\n✅ Securities law compliant\n✅ Tax efficient\n✅ Easily tradeable\n✅ Familiar to investors",
      blocks: [
        {
          id: uuidv4(),
          type: 'legal',
          title: 'Legal Structure',
          data: {
            entityType: 'Delaware LLC',
            tokenStandard: 'ERC-20',
            exemption: 'Rule 506(b)',
            jurisdiction: 'United States'
          },
          status: 'complete',
          sourceNumber: 3,
        }
      ]
    };
  }

  // Token design
  if (lowerMessage.includes('token') || lowerMessage.includes('how many') || lowerMessage.includes('design')) {
    return {
      content: "Let's design your token structure! I recommend:\n\n🪙 1,000 tokens total = 100% of your shares\n🪙 Each token = 1 share of your company\n🪙 You keep 600 tokens, sell 400\n🪙 Automatic dividend distribution\n\nThis gives you $20,000+ in liquidity while keeping 60% upside exposure.",
      blocks: [
        {
          id: uuidv4(),
          type: 'token',
          title: 'Token Design',
          data: {
            totalSupply: '1,000 tokens',
            ratio: '1 token = 1 share',
            yourAllocation: '600 tokens (60%)',
            forSale: '400 tokens (40%)',
            features: 'Auto dividend distribution'
          },
          status: 'complete',
          sourceNumber: 4,
        }
      ]
    };
  }

  // Deployment and next steps
  if (lowerMessage.includes('deploy') || lowerMessage.includes('launch') || lowerMessage.includes('ready')) {
    return {
      content: "Perfect! I'm ready to deploy your tokenization infrastructure. Here's what happens next:\n\n📋 Generate legal documents (5 minutes)\n🏗️ Create Delaware LLC (24 hours)\n⛓️ Deploy smart contracts (10 minutes)\n🪙 Mint your tokens (5 minutes)\n📈 Set up trading infrastructure (30 minutes)\n\nTotal setup time: ~48 hours\nSetup cost: $2,500\n\nReady to proceed?",
      documents: [
        {
          id: uuidv4(),
          name: 'Token Holder Agreement',
          type: 'PDF',
          size: '2.1 MB',
          status: 'ready'
        },
        {
          id: uuidv4(),
          name: 'LLC Operating Agreement',
          type: 'PDF', 
          size: '1.8 MB',
          status: 'draft'
        }
      ],
      buttons: [
        {
          id: uuidv4(),
          text: "Yes, let's deploy!",
          value: "deploy_confirm",
          icon: "🚀"
        },
        {
          id: uuidv4(),
          text: "Review documents first",
          value: "review_docs",
          icon: "📄"
        }
      ]
    };
  }

  // Real estate responses
  if (lowerMessage.includes('real estate') || lowerMessage.includes('property') || lowerMessage.includes('house')) {
    return {
      content: "Real estate tokenization is a great use case! I can help you tokenize your property ownership stake to create liquidity without selling the entire property.\n\nWhat type of real estate are we working with?",
      buttons: [
        {
          id: uuidv4(),
          text: "Rental property I own",
          value: "rental_property",
          icon: "🏠"
        },
        {
          id: uuidv4(),
          text: "Commercial real estate",
          value: "commercial_property", 
          icon: "🏢"
        },
        {
          id: uuidv4(),
          text: "Real estate partnership",
          value: "re_partnership",
          icon: "🤝"
        }
      ]
    };
  }

  // Default helpful response
  return {
    content: "I'd be happy to help you tokenize your assets! Could you tell me more about what you own that you'd like to make more liquid?\n\nI specialize in tokenizing:\n• Company shares and stock options\n• Real estate ownership stakes\n• Business partnership interests\n• Revenue-generating assets\n\nWhat type of asset are you looking to tokenize?",
    buttons: [
      {
        id: uuidv4(),
        text: "Company shares",
        value: "company_shares",
        icon: "📈"
      },
      {
        id: uuidv4(),
        text: "Real estate",
        value: "real_estate",
        icon: "🏠"
      },
      {
        id: uuidv4(),
        text: "Business partnership",
        value: "partnership",
        icon: "🤝"
      },
      {
        id: uuidv4(),
        text: "Other assets",
        value: "other",
        icon: "💼"
      }
    ]
  };
};
