import React, { useState } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! 👋 Welcome to TrendyInterios. How can we help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoadingQuotation, setIsLoadingQuotation] = useState(false);
  const [awaitingQuotationDetails, setAwaitingQuotationDetails] = useState(false);

  const quickReplies = [
    'View pricing',
    'Get Quotation',
    'Schedule consultation',
    'See portfolio',
    'Contact us'
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Calculate new message ID
    const newMessageId = Math.max(...messages.map(m => m.id), 0) + 1;

    // Add user message
    const userMessage = {
      id: newMessageId,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    const userInput = inputValue.toLowerCase();
    setInputValue('');

    // Handle quotation request
    if (awaitingQuotationDetails) {
      handleQuotationRequest(inputValue, updatedMessages);
      setAwaitingQuotationDetails(false);
    } else {
      // Generate intelligent bot response based on user input
      generateIntelligentReply(userInput, updatedMessages, newMessageId);
    }
  };

  const generateIntelligentReply = (userInput, updatedMessages, newMessageId) => {
    setTimeout(() => {
      let botResponse = '';

      // Check for business hours/opening time (HIGHEST PRIORITY)
      if (userInput.includes('opening time') || userInput.includes('hours') || userInput.includes('open') || userInput.includes('timing') || userInput.includes('when are you open') || userInput.includes('business hours')) {
        botResponse = '🕐 TrendyInterios Business Hours:\n\n📍 Monday - Friday: 10:00 AM - 6:00 PM\n📍 Saturday: 10:00 AM - 5:00 PM\n📍 Sunday: Closed\n\n☎️ For urgent queries outside business hours:\n+91 99652 99777\n\nWe also offer online consultations! Feel free to reach out via email at trendyinterios@gmail.com and we\'ll get back to you within 24 hours.';
      }
      // Check for budget/quotation-related keywords (HIGH PRIORITY)
      else if (userInput.includes('budget') || userInput.includes('quote') || userInput.includes('quotation') || userInput.includes('price') || userInput.includes('cost') || userInput.includes('estimate') || userInput.includes('lakh') || userInput.includes('affordable') || userInput.includes('can you do')) {
        botResponse = 'Great question about your budget! 💰\n\nWe work with clients across different budget ranges. The cost depends on several factors:\n\n📏 Size of the space\n🎨 Design complexity\n🛋️ Quality of materials\n✨ Scope of work\n\nSince you mentioned ₹1 Lakh, let\'s discuss what\'s possible within this budget. To give you an accurate estimate, I\'ll need some details:\n\n📐 Property type & size (sq ft)\n🛋️ Rooms to be designed\n🎨 Your preferred style\n📝 Specific areas you want to focus on\n\nPlease share these details so I can generate a detailed quotation for your budget!';
        setAwaitingQuotationDetails(true);
      }
      // Check for portfolio/project-related keywords (more specific matching)
      else if (userInput.includes('portfolio') || (userInput.includes('project') && !userInput.includes('budget')) || userInput.includes('show') || userInput.includes('example') || userInput.includes('previous')) {
        botResponse = '📸 Check out our amazing portfolio!\n\nWe have completed numerous residential and commercial projects with stunning designs. Visit the "Projects" section on our website to see:\n\n✨ Before & After transformations\n🏡 Residential projects\n🏢 Commercial spaces\n💡 Design inspirations\n\nFeel free to reach out if any of our projects inspire you!';
      }
      // Check for contact-related keywords
      else if (userInput.includes('contact') || userInput.includes('call') || userInput.includes('email') || userInput.includes('reach')) {
        botResponse = '📞 Get in touch with us!\n\n☎️ Phone: +91 99652 99777\n📧 Email: trendyinterios@gmail.com\n\nOur team is available during business hours and happy to discuss your interior design needs. We typically respond to emails within 24 hours.';
      }
      // Check for consultation-related keywords
      else if (userInput.includes('consultation') || userInput.includes('meet') || userInput.includes('appointment') || userInput.includes('schedule')) {
        botResponse = '🗓️ We\'d love to meet with you!\n\nWe offer complimentary initial consultations where we can:\n\n✅ Understand your design preferences\n✅ Discuss your budget and timeline\n✅ Take measurements and site survey\n✅ Provide initial design ideas\n\nPlease call us at +91 99652 99777 or email us at trendyinterios@gmail.com to schedule a consultation.';
      }
      // Check for service-related keywords
      else if (userInput.includes('service') || userInput.includes('what do you') || userInput.includes('offer') || userInput.includes('do you do')) {
        botResponse = '🎨 What We Offer at TrendyInterios:\n\n✨ Interior Design & Consultation\n🛋️ Furniture Selection & Arrangement\n🎨 Color & Material Consultation\n🏳️ Modular & Custom Furniture\n🪟 Lighting Design\n🧹 Space Planning & Optimization\n💄 Complete Home/Office Makeovers\n✅ Project Management & Execution\n\nWhatever your interior needs, we have a solution!';
      }
      // Check for testimonials/reviews
      else if (userInput.includes('testimonial') || userInput.includes('review') || userInput.includes('feedback') || userInput.includes('happy') || userInput.includes('satisfied')) {
        botResponse = '⭐ We\'re Proud of Our Work!\n\nOur clients love the transformations we create. Check out testimonials from our satisfied customers in the "Testimonials" section on our website.\n\nWe\'re committed to:\n✅ High-quality materials\n✅ Professional execution\n✅ On-time delivery\n✅ Customer satisfaction\n\nWant to share your experience? We\'d love your feedback!';
      }
      // Default helpful response
      else {
        botResponse = `Thanks for your message! 😊\n\nHow can I help you today?\n\n• 📋 Get a quotation for your space\n• 📸 See our portfolio & previous projects\n• 🗓️ Schedule a consultation\n• 📞 Contact information\n• 🎨 Learn about our services\n• 🕐 Shop opening hours\n\nFeel free to ask any questions about interior design, pricing, or our process!`;
      }

      const botMessage = {
        id: newMessageId + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 600);
  };

  const handleQuotationRequest = async (requirements, currentMessages) => {
    setIsLoadingQuotation(true);
    const nextId = Math.max(...currentMessages.map(m => m.id), 0) + 1;

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/quotations/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requirements })
      });

      const data = await response.json();

      if (data.success) {
        const botMessage = {
          id: nextId,
          text: data.quotation,
          sender: 'bot',
          timestamp: new Date(),
          isQuotation: true
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const botMessage = {
          id: nextId,
          text: `Unable to generate quotation: ${data.message}`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error fetching quotation:', error);
      const botMessage = {
        id: nextId,
        text: 'Sorry, I encountered an error while generating your quotation. Please try again or contact us at +91 99652 99777.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoadingQuotation(false);
    }
  };

  const handleQuickReply = (reply) => {
    // Calculate new message IDs
    const userMessageId = Math.max(...messages.map(m => m.id), 0) + 1;
    const botMessageId = userMessageId + 1;

    const userMessage = {
      id: userMessageId,
      text: reply,
      sender: 'user',
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Bot response
    setTimeout(() => {
      let botResponse = '';
      let shouldAwaitQuotation = false;

      switch (reply) {
        case 'View pricing':
          botResponse = 'Pricing varies based on project scope and requirements. Contact us for a personalized quote!';
          break;
        case 'Get Quotation':
          botResponse = 'Great! To generate an accurate quotation, please tell me about your interior requirements. Include details like:\n\n📐 Property type (apartment, house, villa, etc.)\n📏 Total area in sq ft\n🛋️ Rooms needed (Living, Bedrooms, Kitchen, etc.)\n🎨 Design style (Modern, Traditional, Minimalist, etc.)\n💰 Approximate budget range\n✨ Any special requirements\n\nPlease provide as much detail as possible for an accurate estimate.';
          shouldAwaitQuotation = true;
          break;
        case 'Schedule consultation':
          botResponse = 'Great! You can schedule a free consultation call. Please visit our contact page or call +91 99652 99777';
          break;
        case 'See portfolio':
          botResponse = 'Check out our amazing projects at the Projects section of our website!';
          break;
        case 'Contact us':
          botResponse = 'You can reach us at:\n📞 +91 99652 99777\n📧 trendyinterios@gmail.com\nOr visit our contact page!';
          break;
        default:
          botResponse = 'Thanks for your interest! How else can we help?';
      }

      const botMessage = {
        id: botMessageId,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      
      if (shouldAwaitQuotation) {
        setAwaitingQuotationDetails(true);
      }
    }, 500);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chatbot"
        title="Chat with us"
      >
        <FaComments />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-title">
              <FaComments className="chatbot-icon" />
              <div>
                <h3>TrendyInterios Chat</h3>
                <span className="status-indicator">Online</span>
              </div>
            </div>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className={`message-content ${msg.isQuotation ? 'quotation-content' : ''}`}>
                  <p style={{whiteSpace: 'pre-wrap'}}>{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoadingQuotation && (
              <div className="message bot">
                <div className="message-content">
                  <p>⏳ Generating your quotation... Please wait a moment.</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="quick-replies">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className="quick-reply-btn"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form className="chatbot-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={awaitingQuotationDetails ? "Share your interior requirements..." : "Type a message..."}
              className="chatbot-input"
              disabled={isLoadingQuotation}
            />
            <button
              type="submit"
              className="send-btn"
              disabled={!inputValue.trim() || isLoadingQuotation}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
