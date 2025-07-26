import React from 'react'

const page = () => {
    return (
        <div>
            <section className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
                <p className="text-base leading-7 text-gray-500">
                    By using this application, you agree to our terms of service outlined here.
                    <br /><br />
                    We value your privacy and only collect the following user information:
                </p>
                <ul className="list-disc list-inside mt-4 text-gray-500">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Avatar image</li>
                </ul>
                <p className="mt-4 text-base leading-7 text-gray-500">
                    This information is used solely for account identification and personalization within the app.
                    We do not share or sell your data to third parties.
                </p>
            </section>
        </div>
    )
}

export default page
