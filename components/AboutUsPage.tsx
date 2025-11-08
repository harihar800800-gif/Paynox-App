import React from 'react';

const AboutUsPage: React.FC = () => {
    return (
        <div className="bg-slate-800/50 p-6 sm:p-8 rounded-lg shadow-2xl max-w-4xl mx-auto border border-slate-700 text-slate-300">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                About Paynox Finance Private Limited
            </h1>

            <p className="text-lg leading-relaxed mb-8 text-center">
                Paynox Finance is one of India's premier financial services providers, committed to making finance simple, accessible, and transparent for everyone. We leverage cutting-edge technology to offer a seamless and efficient borrowing experience.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h2 className="text-2xl font-bold text-orange-500 mb-3">Our Vision</h2>
                    <p>To be the most trusted and preferred financial partner for every Indian, empowering them to achieve their dreams and financial goals through innovative and customer-centric solutions.</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h2 className="text-2xl font-bold text-orange-500 mb-3">Our Mission</h2>
                    <p>To provide quick and hassle-free access to a wide range of loan products by simplifying financial processes through technology, maintaining the highest standards of integrity, and fostering a culture of continuous improvement.</p>
                </div>
            </div>

            <div className="border-t border-slate-700 pt-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Choose Paynox Finance?</h2>
                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-7 w-7 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-slate-100">Technology-Driven Platform</h3>
                            <p className="mt-1">Our advanced online platform ensures a fast, secure, and paperless loan application process, allowing you to apply from anywhere, anytime.</p>
                        </div>
                    </div>
                     <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-7 w-7 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-slate-100">Customer-Centric Approach</h3>
                            <p className="mt-1">We put our customers first. Our dedicated support team is always ready to assist you at every step of your financial journey, ensuring a personalized and satisfactory experience.</p>
                        </div>
                    </div>
                     <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-7 w-7 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-slate-100">Transparency and Trust</h3>
                            <p className="mt-1">We believe in complete transparency. There are no hidden charges, and all terms and conditions are clearly communicated, building a relationship of trust with our clients.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-700 pt-8 mt-8">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Our Office</h2>
                <p className="text-center text-slate-400 leading-relaxed">
                    3459 Laxmi Industry Complex, Vasai (West),<br />
                    Dist - Palghar, Mumbai, Maharashtra 401208
                </p>
            </div>
        </div>
    );
};

export default AboutUsPage;