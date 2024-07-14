import Link from 'next/link'
import React from 'react'

const Pricing = () => {
    return (
        <>
            <h2 className='font-bold text-4xl tracking-wide flex justify-center'>Pricing Plans</h2>
            <h2 className='text-gray-500 p-2 text-xl text-center'>Be a member of the DocEasy Healthcare Community by subscribing to any of the plans below</h2>
            <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
                    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="p-6 sm:px-8">
                            <h2 className="text-lg font-medium text-gray-900">
                                Basic Health
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 text-gray-700">Manage appointments and track your health effortlessly.</p>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-red-500 sm:text-4xl"> <s>₹100</s><span className='text-black'> Free</span></strong>

                                <span className="text-sm font-medium text-gray-700"></span>
                            </p>

                            <Link
                                className="mt-4 block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 sm:mt-6"
                                href="#"
                            >
                                Get Started
                            </Link>
                        </div>

                        <div className="p-6 sm:px-8">
                            <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>

                            <ul className="mt-2 space-y-2 sm:mt-4">
                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Book up to 5 appointments per month </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Access to general practitioners </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Email reminders for appointments </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-red-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>

                                    <span className="text-gray-700"> Access to specialists </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-red-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>

                                    <span className="text-gray-700"> 24/7 customer support </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="p-6 sm:px-8">
                            <h2 className="text-lg font-medium text-gray-900">
                                Advance Health+
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 text-gray-700">Interactive medical bots and personalized diet plans.</p>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> ₹175 </strong>

                                <span className="text-sm font-medium text-gray-700">/month</span>
                            </p>

                            <Link
                                className="mt-4 block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 sm:mt-6"
                                href="#"
                            >
                                Get Started
                            </Link>
                        </div>

                        <div className="p-6 sm:px-8">
                            <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>

                            <ul className="mt-2 space-y-2 sm:mt-4">
                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Book up to 10 appointments per month </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Access to general practitioners and specialists </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Email and SMS reminders for appointments </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Personalized diet and fitness plans </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> 24/7 customer support </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="p-6 sm:px-8">
                            <h2 className="text-lg font-medium text-gray-900">
                                Pro Health+
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 text-gray-700">Unlimited doctor consultations and priority support.</p>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> ₹275 </strong>

                                <span className="text-sm font-medium text-gray-700">/month</span>
                            </p>

                            <Link
                                className="mt-4 block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 sm:mt-6"
                                href="#"
                            >
                                Get Started
                            </Link>
                        </div>

                        <div className="p-6 sm:px-8">
                            <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>

                            <ul className="mt-2 space-y-2 sm:mt-4">
                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Unlimited appointments </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Access to all general practitioners and specialists </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Email and SMS reminders for appointments </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Personalized diet and fitness plans </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Priority customer support </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 text-blue-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> 24/7 medical advice </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pricing
