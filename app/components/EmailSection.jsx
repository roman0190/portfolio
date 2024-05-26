"use client"
import React, { useState } from 'react'

const EmailSection = () => {
    const[sent,setSent] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value,
        }
        
        const JSONdata =  JSON.stringify(data)
        const endpoint = "/api/send/"

        const  options = {
            
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSONdata
        }
        const response = await fetch(endpoint,options)
        if(response.status === 500){
            console.log('Message Sent. ')
             setSent(true);
        // Reset the sent state to false after 1 second
        if(sent){
            alert("Thanks for Sending Your Valueable")
        }
            
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
            <label htmlFor="email" type="email" className='text-white block mt-4 text-sm font-medium'>Your Email</label>
            <input name="email" type="email" id="email" required placeholder='example@gmail.com' className='bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 '  />

            <label htmlFor="subject" type="subject" className='text-white block mt-4 text-sm font-medium'>Subject</label>
            <input name="subject" type="subject" id="subject" required placeholder='Just Saying Hi....' className='bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 '  />

            <label htmlFor="message" className='text-white block mt-4 text-sm font-medium'>Message</label>
            <textarea name="message" id="message" required placeholder="Let's Talk about......" className='bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 '  />
            <button type='submit' className='bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-5 rounded-lg w-full mt-2'>Send Email</button>
        </form>
    </div>
    </section>
  )
}

export default EmailSection
