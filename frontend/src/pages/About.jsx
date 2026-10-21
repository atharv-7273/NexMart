import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox';


const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quis quas laudantium fugit animi consequuntur dolor excepturi saepe dolore reprehenderit ipsa sapiente ullam, tenetur ipsum consectetur sunt blanditiis praesentium? Est!.</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, fugiat! Vitae, dolores quaerat ratione libero cumque placeat error nisi fuga ad mollitia accusamus earum, obcaecati eaque. Veritatis illo mollitia quidem!</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure officia perferendis temporibus illo ipsam exercitationem debitis, dolorem aut obcaecati ipsum corporis voluptatibus. Tempora itaque laborum, aliquid unde ducimus ipsa eius?</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga ab amet ipsam exercitationem aut delectus autem quas dolorum. Molestias quos totam molestiae corporis saepe enim. Maxime tempore sint et rem?</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
          <b>Convenince</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est cupiditate, saepe totam dolorum consequatur facilis ex laborum omnis, accusantium iure voluptate obcaecati numquam ipsa delectus animi sequi quasi eaque? Fugiat.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit earum id ducimus delectus accusamus cum tempore saepe, quia neque nulla officia impedit hic inventore? Consequatur officia quas repudiandae ratione nihil.</p>
        </div>
      </div>
      <NewsletterBox />

    </div>
  )
}

export default About
