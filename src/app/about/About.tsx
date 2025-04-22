import Image from "next/image";
import Link from "next/link";
import React from "react";
import feature from "../../assets/features/hero_image.jpg";

const About = () => {
    return (
        <section className="section features" id="features" aria-label="features">
            <div className="container mx-auto px-4 text-center">
                <p className="section-subtitle font-bold text-gray-700 mb-2">
                    -About Erecycle-
                </p>

                <h2 className=" text-4xl section-title font-bold text-black mb-4">
                    Revolutionizing E-Waste Locator and Management
                </h2>

                <div className=" mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row gap-10 items-center justify-between text-center md:text-left">
                        <div className="md:w-1/2 mb-4 md:mb-0 md:pl-8">
                            <p className="section-text text-3xl text-gray-600  font-semibold leading-relaxed">
                                The concerning 1.71 million metric tons of e-waste collected annually in India is a result of incorrect e-waste disposal. Finding reliable e-waste collection sites is still quite difficult, which makes this environmental problem worse.
                                This problem is intended to be directly addressed by the Erecycle Web Platform. When looking for dependable e-waste collection facilities, both people and businesses can find a dynamic and user-friendly interface on our platform.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start">
                                <p className="btn btn-primary mr-3">
                                    <Link href="/contactus"> Contact Us</Link>
                                </p>
                                <p className="btn btn-secondary mr-3">
                                    <Link href="/recycle"> Recycling Services</Link>
                                </p>{" "}
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center section-banner has-before">
                            <Image
                                src={feature}
                                alt="Image"
                                width={400}
                                height={400}
                                className="object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
