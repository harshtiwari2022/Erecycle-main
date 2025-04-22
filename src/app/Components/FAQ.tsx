"use client";
import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const FAQ = () => {
    const faqData = [
        {
            question: "Is the information about e-waste facilities on Erecycle verified?",
            answer:
                "Yes, Erecycle ensures that the information about e-waste recycling facilities is verified. This verification process helps users trust the accuracy and reliability of the facility details provided on the platform.",
        },
        {
            question: "Can I book the recycling of my e-waste through Erecycle?",
            answer:
                "Absolutely! Erecycle offers a user-friendly booking system that allows you to schedule the recycling of your e-waste. Choose the facility, select a convenient pickup date and time, and contribute to sustainable e-waste management.",
        },
        {
            question: "What educational resources are available on Erecycle?",
            answer:
                "Erecycle features an education section with blogs and informative content to raise awareness about the impact of e-waste. Explore articles that highlight the importance of responsible e-waste recycling and its positive effects on the environment.",
        },
        {
            question: "How can I stay updated on the latest rules and regulations regarding e-waste management?",
            answer:
                "The most recent e-waste management laws and regulations are listed in a special area provided by Erecycle. Remain aware of the legal ramifications of disposing of e-waste and have a positive environmental impact.",
        },
        {
            question: "Is there a newsletter for Erecycle users?",
            answer:
                "Yes, you can sign up for Erecycle's newsletter. You will get news, offers, and useful information on recycling e-waste if you sign up for the newsletter. Keep up with the most recent developments and projects in the field of e-waste management.",
        },
    ];


    const [activeQuestion, setActiveQuestion] = useState(null);

    const toggleQuestion = (index: any) => {
        if (activeQuestion === index) {
            setActiveQuestion(null);
        } else {
            setActiveQuestion(index);
        }
    };

    return (
        <section className="md:mb-40">
            <Container >
                <Row>
                    <Col>
                        <h2 className="text-center text-5xl">Frequently Asked Questions</h2>
                        <div className="mt-8">
                            {faqData.map((item, index) => (
                                <div
                                    className={`mb-6 p-8 rounded-xl shadow-md ${activeQuestion === index ? "active" : ""
                                        }`}
                                    key={index}
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <div className="flex items-center justify-between text-center gap-12 transition-all duration-300">
                                        <h4 className="text-2xl font-bold">
                                            {item.question}
                                        </h4>
                                        <div className="text-xl font-semibold ">
                                            <RiArrowDropUpLine fontSize={28} className={`${activeQuestion === index ? 'rotate-180' : ""}`} />
                                        </div>
                                    </div>
                                    {activeQuestion === index && (
                                        <p className="text-xl mt-4 ">{item.answer}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default FAQ;