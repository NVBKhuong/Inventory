import React from 'react';
import './css/FAQSection.css'

const FaqSection: React.FC = () => {
  return (
    <div className="faq_area py-32" id="faq">
      <div className="container mx-auto">
        <div className="row justify-center">
          <div className="col-12 sm:col-8 lg:col-6">
            <div className="section_heading text-center wow fadeInUp" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
              <h3><span>Frequently </span> Asked Questions</h3>
              <p> </p>
              <div className="line"></div>
            </div>
          </div>
        </div>
        <div className="row justify-center">
          <div className="col-12 sm:col-10 lg:col-8">
            <div className="accordion faq-accordian" id="faqAccordion">
              {faqItems.map((item, index) => (
                <div className="card border-0 wow fadeInUp" data-wow-delay={`${0.2 + index * 0.1}s`} key={item.id} style={{ visibility: 'visible', animationDelay: `${0.2 + index * 0.1}s`, animationName: 'fadeInUp' }}>
                  <div className="card-header" id={`heading${item.id}`}>
                    <h6 className="mb-0 collapsed cursor-pointer" data-toggle="collapse" data-target={`#collapse${item.id}`} aria-expanded="true" aria-controls={`collapse${item.id}`}>
                      {item.question}<span className="lni-chevron-up"></span>
                    </h6>
                  </div>
                  <div className="collapse" id={`collapse${item.id}`} aria-labelledby={`heading${item.id}`} data-parent="#faqAccordion">
                    <div className="card-body">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="support-button text-center flex items-center justify-center mt-4 wow fadeInUp" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDelay: '0.5s', animationName: 'fadeInUp' }}>
              <i className="lni-emoji-sad"></i>
              <p className="mb-0 px-2">Can't find your answers?</p>
              <a href="#">Contact us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const faqItems = [
  {
    id: 'One',
    question: 'How do I create an account?',
    answer: 'To create an account, click on the "Register" button and fill in the required information.'
  },
  {
    id: 'Two',
    question: 'Can I cancel my order?',
    answer: 'Orders can be canceled within 24 hours of placing them. Please contact customer service for assistance.'
  },
  {
    id: 'Three',
    question: 'What payment methods do you accept?',
    answer: 'We accept VNPay, and other secure payment methods.'
  },
  {
    id: 'Four',
    question: 'Is my payment information secure?',
    answer: 'Of course, your payment information is absolutely protected.'
  },
  {
    id: 'Five',
    question: 'What are your shipping options?',
    answer: 'We offer standard, express, and overnight shipping options. Shipping costs and delivery times vary based on your location.'
  },
  {
    id: 'Six',
    question: 'When will I receive my refund?',
    answer: 'Refunds are processed within 7-10 business days after we receive the returned item.'
  }
];

export default FaqSection;
