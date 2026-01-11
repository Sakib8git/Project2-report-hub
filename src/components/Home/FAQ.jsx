import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaGlobeAsia } from "react-icons/fa";

const FAQ = () => {
  const faqs = [
    {
      icon: <MdReportProblem className="inline-block text-green-600 mr-2" />,
      question: "How can I report a city issue?",
      answer:
        "Simply go to the 'All Reports' section and click on 'Submit Issue'. Fill out the form with details and your report will be posted instantly.",
    },
    {
      icon: <FaUserTie className="inline-block text-blue-600 mr-2" />,
      question: "Who handles my report after submission?",
      answer:
        "Once you submit, our admin team reviews it and assigns the issue to the most relevant staff member for resolution.",
    },
    {
      icon: <FaBolt className="inline-block text-yellow-500 mr-2" />,
      question: "How quickly are issues solved?",
      answer:
        "Resolution time depends on the complexity of the issue. Minor problems may be solved within hours, while larger projects can take days.",
    },
    {
      icon: <FaBell className="inline-block text-purple-600 mr-2" />,
      question: "Will I get updates on my report?",
      answer:
        "Yes! You’ll receive notifications when your issue is assigned, in progress, and finally marked as resolved.",
    },
    {
      icon: <FaGlobeAsia className="inline-block text-pink-600 mr-2" />,
      question: "Why should I use ReportHub?",
      answer:
        "ReportHub empowers citizens to actively improve their city. Your feedback helps us build a cleaner, safer, and smarter community.",
    },
  ];

  return (
    <section className="text-base-content py-12 px-6 md:px-16">
      <h2 className="text-2xl md:text-3xl custom-heading  -mt-10">
         Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            tabIndex={0}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg"
          >
            <div className="collapse-title text-lg font-semibold flex items-center">
              {faq.icon}
              {faq.question}
            </div>
            <div className="collapse-content">
              <p className="text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;