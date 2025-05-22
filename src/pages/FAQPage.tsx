import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is CabMate?",
    answer: "CabMate is a ride-bidding platform that allows you to bid on rides and get the best possible price for your journey. Our platform connects passengers with drivers in a unique bidding system."
  },
  {
    question: "How does the bidding system work?",
    answer: "When you need a ride, you can place a bid for your journey. Drivers can then accept your bid if it matches their requirements. This system ensures you get the best possible price for your ride."
  },
  {
    question: "How do I pay for my rides?",
    answer: "CabMate supports multiple payment methods including credit/debit cards, digital wallets, and cash. All payments are processed securely through our platform."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we take security seriously. All payment information is encrypted and processed through secure payment gateways. We never store your complete card details on our servers."
  },
  {
    question: "How do I track my ride?",
    answer: "Once your bid is accepted, you can track your ride in real-time through the CabMate app. You'll receive updates about your driver's location and estimated arrival time."
  },
  {
    question: "What if I need to cancel my ride?",
    answer: "You can cancel your ride through the app before the driver arrives. Please note that cancellation policies may apply depending on the timing of your cancellation."
  },
  {
    question: "How do I rate my driver?",
    answer: "After your ride is completed, you'll receive a prompt to rate your driver. Your feedback helps us maintain quality service and helps other passengers make informed decisions."
  }
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600">
              Find answers to common questions about CabMate
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Still have questions? Contact our support team at{" "}
              <a href="mailto:support@cabmate.com" className="text-blue-600 hover:text-blue-800">
                support@cabmate.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 