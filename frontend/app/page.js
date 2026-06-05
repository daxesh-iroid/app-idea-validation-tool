'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const scores = [
  {
    icon: '💡',
    title: 'Idea Clarity',
    description:
      'How well-defined is your idea? We assess problem clarity, target audience, differentiation, and feature scope.',
  },
  {
    icon: '📊',
    title: 'Market Risk',
    description:
      'Is the market ready? We evaluate competition, demand uncertainty, user acquisition difficulty, and regulatory risks.',
  },
  {
    icon: '🚀',
    title: 'MVP Feasibility',
    description:
      'Can you build an MVP? We analyze feature count, complexity, integrations, and realistic timeline.',
  },
  {
    icon: '💰',
    title: 'Monetization Fit',
    description:
      'Will users pay? We check willingness to pay, usage frequency, value delivered, and revenue model fit.',
  },
  {
    icon: '⚙️',
    title: 'Development Complexity',
    description:
      'How hard is it to build? We assess platforms, workflows, payment logic, real-time features, AI needs, and security.',
  },
];

const audiences = [
  {
    icon: '🧑‍💻',
    title: 'Startup Founders',
    description: 'Validate your idea before pitching to investors.',
  },
  {
    icon: '👔',
    title: 'Entrepreneurs',
    description: 'Test your next business idea with data-driven insights.',
  },
  {
    icon: '🏢',
    title: 'Small Business Owners',
    description: 'Explore digital transformation with confidence.',
  },
  {
    icon: '🎓',
    title: 'Students & Innovators',
    description: 'Check if your hackathon idea has real potential.',
  },
  {
    icon: '💼',
    title: 'Product Managers',
    description: 'Get a second opinion on your product roadmap.',
  },
];

const deliverables = [
  {
    icon: '📈',
    title: 'Overall Score',
    description: 'A weighted score from 0-100 across all 5 dimensions.',
  },
  {
    icon: '📋',
    title: 'Detailed Report',
    description: 'Breakdown of each score with strengths and risks.',
  },
  {
    icon: '⚠️',
    title: 'Risk Analysis',
    description: 'Identified risks and actionable recommendations.',
  },
  {
    icon: '🎯',
    title: 'MVP Recommendation',
    description: 'Features to build first, features to delay, and timeline.',
  },
];

const faqs = [
  {
    question: 'What is the App Idea Validation Tool?',
    answer:
      'It is a free tool by iRoid Solutions that helps startup founders and entrepreneurs validate their app ideas before investing in development. It scores your idea on 5 key dimensions — Idea Clarity, Market Risk, MVP Feasibility, Monetization Fit, and Development Complexity — and provides a detailed report with actionable recommendations.',
  },
  {
    question: 'Is this tool really free?',
    answer:
      'Yes, the validation tool is completely free. There is no credit card required and no hidden charges. We believe in helping founders make informed decisions before they spend money on development.',
  },
  {
    question: 'How long does the validation process take?',
    answer:
      'The entire questionnaire takes about 5-10 minutes to complete. Your scores are generated instantly after you submit the form.',
  },
  {
    question: 'How accurate are the scores?',
    answer:
      'Our scoring engine is based on industry best practices and 10+ years of app development experience. While no tool can guarantee market success, our scores provide a reliable data-driven assessment of your idea readiness for MVP development.',
  },
  {
    question: 'What happens after I get my scores?',
    answer:
      'You will see an on-screen summary of your scores. If you want a detailed PDF report, you can provide your email and we will send it to you. Our sales team may also reach out to discuss your idea further.',
  },
  {
    question: 'Will iRoid Solutions contact me after I use the tool?',
    answer:
      'If you opt-in to receive the detailed report via email, you may receive a follow-up email from our team. We respect your privacy and will not spam you. You can unsubscribe at any time.',
  },
  {
    question: 'Can I retake the validation for the same idea?',
    answer:
      'Yes, you can retake the validation as many times as you want. In fact, we encourage you to update your answers as your idea evolves and see how your scores change.',
  },
  {
    question: 'What types of app ideas can I validate?',
    answer:
      'You can validate any type of app idea — mobile apps, web apps, SaaS platforms, marketplaces, internal tools, and more. The tool supports various business models including B2B, B2C, B2B2C, and marketplace.',
  },
  {
    question: 'Do I need to have technical knowledge to use this tool?',
    answer:
      'No technical knowledge is required. The questions are designed for business-minded founders and entrepreneurs. We guide you through each step with clear explanations.',
  },
  {
    question: 'How is the overall score calculated?',
    answer:
      'The overall score is a weighted average of all 5 dimension scores. Each dimension has a configurable weight. The default weights are: Idea Clarity (25%), Market Risk (20%), MVP Feasibility (20%), Monetization Fit (15%), and Development Complexity (20%).',
  },
  {
    question: 'Can I share my validation report with investors?',
    answer:
      'Absolutely! The PDF report is designed to be shareable. It provides a professional, data-driven assessment of your idea that can complement your pitch deck.',
  },
  {
    question: 'What makes iRoid Solutions qualified to validate app ideas?',
    answer:
      'iRoid Solutions has 10+ years of experience in app development, 200+ satisfied clients, and 400+ apps delivered across various industries. Our team has seen what works and what does not, and we have built this tool to share that knowledge with founders.',
  },
];

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-primary/30">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors duration-200"
      >
        <span className="font-medium text-slate-900 pr-4">{question}</span>
        <span
          className={`text-primary text-xl font-bold transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <p className="text-slate-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <Header />
      <main>
        {/* ===== HERO SECTION ===== */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <span>🚀</span>
                <span>Free Tool — No Credit Card Required</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Validate Your App Idea Before You{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Spend Money
                </span>{' '}
                on Development
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Get an instant, data-driven assessment of your app idea across 5
                critical dimensions. Know your strengths, risks, and MVP
                readiness in under 10 minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/validation-tool"
                  className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-primary/30 text-lg"
                >
                  Validate Your Idea Free
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  href="#what-you-get"
                  className="inline-flex items-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200 border border-slate-200 text-lg"
                >
                  See What You Get
                </Link>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                ✅ Instant results &nbsp; ✅ No signup required &nbsp; ✅ Used by
                500+ founders
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHY VALIDATION MATTERS ===== */}
        <section id="why-validation" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Why Validation Matters
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
                  Most Apps Fail Because the{' '}
                  <span className="text-danger">Problem Was Never Clear</span>
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Every year, thousands of startup founders invest lakhs of
                    rupees building apps without first validating whether the
                    problem they are solving is real, whether users actually
                    need the solution, and whether the market is ready.
                  </p>
                  <p>
                    Studies show that <strong>42% of startups fail</strong> because
                    there is no market need for their product. That is the
                    number one killer of startups — not bad code, not bad design,
                    but building something nobody wants.
                  </p>
                  <p>
                    Our validation tool helps you answer the hardest questions
                    before you write a single line of code:
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    'Is the problem you are solving real and urgent?',
                    'Do you clearly understand who your users are?',
                    'Is there a viable path to revenue?',
                    'Can you build an MVP with realistic resources?',
                    'What are the biggest risks you should address first?',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-accent mt-1 flex-shrink-0">✓</span>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-danger/5 to-warning/5 rounded-2xl p-8 md:p-10">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  The Cost of Skipping Validation
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      stat: '₹5L - ₹50L+',
                      label: 'Average wasted development cost on failed apps',
                    },
                    {
                      stat: '6-12 Months',
                      label: 'Time lost building the wrong product',
                    },
                    {
                      stat: '42%',
                      label: 'Of startups fail due to no market need',
                    },
                    {
                      stat: '90%',
                      label: 'Of features in typical apps are rarely used',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
                    >
                      <span className="text-2xl font-bold text-danger whitespace-nowrap">
                        {item.stat}
                      </span>
                      <span className="text-sm text-slate-600">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHAT THIS TOOL CHECKS ===== */}
        <section
          id="what-we-check"
          className="py-16 md:py-24 bg-slate-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                What This Tool Checks
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                5 Critical Dimensions of Your App Idea
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our scoring engine evaluates your idea across 5 key areas that
                determine whether your app is ready for MVP development.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {scores.map((score, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-slate-100 group hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">{score.icon}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {score.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {score.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHO SHOULD USE THIS TOOL ===== */}
        <section id="who-should-use" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Who Should Use This
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Built for Founders, by Founders
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Whether you are a first-time entrepreneur or a seasoned product
                manager, this tool gives you clarity on your next step.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {audiences.map((item, i) => (
                <div
                  key={i}
                  className="text-center p-6 rounded-2xl bg-slate-50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 transition-all duration-200 border border-slate-100"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHAT YOU GET ===== */}
        <section id="what-you-get" className="py-16 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                What You Get
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Your Validation Report Includes
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                After completing the 8-step questionnaire, you will receive a
                comprehensive assessment of your app idea.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliverables.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-slate-100"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/validation-tool"
                className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-primary/30"
              >
                Get Your Free Report
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== WHY iROID SOLUTIONS ===== */}
        <section id="why-iRoid" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Why iRoid Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Trusted by 200+ Companies Worldwide
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We have been building apps for over a decade. This tool is built
                from our real-world experience of what makes apps succeed or
                fail.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 mb-12">
              {[
                {
                  number: '10+',
                  label: 'Years of Experience',
                  description:
                    'Delivering mobile and web applications since 2014',
                },
                {
                  number: '200+',
                  label: 'Happy Clients',
                  description:
                    'Across 15+ countries including US, UK, UAE, and India',
                },
                {
                  number: '400+',
                  label: 'Apps Delivered',
                  description:
                    'From MVPs to enterprise-scale platforms',
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-slate-100"
                >
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                    {stat.number}
                  </div>
                  <div className="font-semibold text-slate-900 mb-1">
                    {stat.label}
                  </div>
                  <p className="text-sm text-slate-600">{stat.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Have an idea? Let us help you build it right.
              </h3>
              <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                From validation to MVP development, iRoid Solutions is your
                end-to-end technology partner. Book a free consultation call
                with our team.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg"
              >
                Book a Free Consultation
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ===== FAQ SECTION ===== */}
        <section id="faq" className="py-16 md:py-24 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600">
                Everything you need to know about the App Idea Validation Tool.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === i}
                  onToggle={() => toggleFAQ(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Validate Your App Idea?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Do not spend lakhs on development without knowing if your idea is
              ready. Get your free validation report in under 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/validation-tool"
                className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-primary/30 text-lg"
              >
                Validate Your Idea Free
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <a
                href="#"
                className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 border border-white/30 text-lg"
              >
                📞 Book a Free App Idea Discussion Call
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
