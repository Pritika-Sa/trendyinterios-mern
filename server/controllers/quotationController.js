const Groq = require('groq-sdk').default;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const generateQuotation = async (req, res) => {
  try {
    const { requirements } = req.body;

    if (!requirements || requirements.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide your interior requirements' 
      });
    }

    console.log('Generating quotation for:', requirements);

    const prompt = `You are a professional interior designer in India with expertise in creating realistic, detailed, and budget-aware cost estimates.

IMPORTANT: Read the user's specific requirements carefully and generate a quotation EXACTLY for what they asked for.

User's Specific Requirements:
${requirements}

CRITICAL INSTRUCTIONS:
1. Identify and extract: Property type, size/area, design style, budget, and specific rooms/areas mentioned
2. Generate quotation ONLY for the rooms/areas the user specified - do not add extra rooms
3. Ensure the total cost is within or close to the user's stated budget
4. Allocate budget intelligently across rooms/areas based on priority and size
5. Suggest materials and solutions that fit their budget and style preference
6. If budget is tight, optimize costs and mention cost-saving alternatives
7. Be SPECIFIC and DETAILED about what is included - list actual items, quantities, and prices

Provide the output in the following EXACT format:

**QUOTATION FOR YOUR INTERIOR DESIGN PROJECT**

**PROJECT DETAILS**
- Property Type: [Extract from user input]
- Area/Size: [If mentioned]
- Design Style: [Extract from user input]  
- Budget: [Extract from user input]

**ROOM-WISE BREAKDOWN**

[ONLY list rooms/areas the USER specifically mentioned - do not invent additional rooms. For each area listed, provide detailed items with costs]

**SUMMARY**

Subtotal for materials and labor: ₹[calculate based on areas listed]
Design consultation fee: ₹5,000 - ₹10,000
Contingency (10%): ₹[10% of subtotal]

**TOTAL APPROXIMATE COST: ₹[amount] - ₹[amount]**

**OVERALL ASSESSMENT:** [Mention if this fits their budget]

**STYLE RECOMMENDATIONS FOR YOUR PREFERENCES:**
[2-3 specific design suggestions matching their style]

**COST-SAVING TIPS:**
[2-3 practical ways to optimize their budget]

**NEXT STEPS:**
Contact us at +91 99652 99777 to schedule a detailed site survey and finalize this quotation.

Make the quotation realistic, detailed, and match EXACTLY what the user asked for.`;

    const message = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    console.log('Groq response received successfully');

    const quotation = message.choices[0].message.content;

    res.status(200).json({
      success: true,
      quotation: quotation,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Quotation generation error:', error.message || error);
    
    // More specific error handling
    let errorMessage = 'Error generating quotation. Please try again.';
    
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      errorMessage = 'API authentication failed. Please check the Groq API key.';
    } else if (error.message.includes('429')) {
      errorMessage = 'Rate limit exceeded. Please try again in a moment.';
    } else if (error.message.includes('404')) {
      errorMessage = 'Service temporarily unavailable. Please try again later.';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { generateQuotation };
