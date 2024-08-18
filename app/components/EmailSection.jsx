"use client"
import React, { useState } from 'react'

const EmailSection = () => {
    const [sent, setSent] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSent(false)
        setError(null)

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                setSent(true)
            } else {
                setError('Failed to send message. Please try again later.')
            }
        } catch (error) {
            setError('An error occurred. Please try again later.')
        }
    }

    return (
        <section className='grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 font-mono'>  
            <div>
                <h5 className='text-xl font-bold text-white my-2'>Let{"'"}s Contact</h5>
                <p className='text-white/45 mb-4 max-w-md'>If you're interested in collaborating with me, I'd love to hear from you! You can reach out through LinkedIn or GitHub, or simply send me an email using the form in the contact section. I'm always excited to connect with fellow developers and explore new opportunities. Looking forward to hearing from you soon. Have a fantastic day!</p>
                <div className='socials flex flex-row gap-2'>
                    <a className='rounded-full border p-2 hover:text-green-400 hover:border-green-400' href='https://github.com/roman0190'>Github</a>
                    <a className='rounded-full border p-2 hover:text-green-400 hover:border-green-400' href='https://www.linkedin.com/in/roman-howladar-4a576123a/'>LinkedIn</a>
                </div>
            </div>
            <div>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label htmlFor="email" className='text-white block mt-4 text-sm font-medium'>Your Email</label>
                    <input name="email" type="email" id="email" required placeholder='example@gmail.com' className='bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5' />

                    <label htmlFor="subject" className='text-white block mt-4 text-sm font-medium'>Subject</label>
                    <input name="subject" type="text" id="subject" required placeholder='Just Saying Hi....' className='bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5' />

                    <label htmlFor="message" className='text-white block mt-4 text-sm font-medium'>Message</label>
                    <textarea name="message" id="message" required placeholder="Let's Talk about......" className='bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5' />

                    <button type='submit' className='bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-5 rounded-lg w-full mt-2'>Send Email</button>

                    {sent && <p className='text-green-500 mt-4'>Message sent successfully!</p>}
                    {error && <p className='text-red-500 mt-4'>{error}</p>}
                </form>
            </div>
        </section>
    )
}

export default EmailSection