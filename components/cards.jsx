import React from 'react'


function Cards() {
  return (
    <section className="w-full px-6 py-5 md:py-16 bg-gray-50 flex flex-col items-center text-center">
    <div className="max-w-4xl">
      {/* Subtitle */}
      <h3 className="text-lg md:text-xl font-bold text-indigo-700 mb-2">
        Buy Cheaper
      </h3>

      {/* Title */}
      <p className="text-3xl md:text-3xl font-bold text-purple-800 mb-4">
        Affordable Data Plans
      </p>

      {/* Description */}
      <p className="text-base md:text-md text-gray-600 leading-relaxed tracking-widest text-wrap">
        OneCrediit helps you make payments for services you enjoy right from the 
        comfort of your home or office. Experience total convenience, fast service 
        delivery, and easy payment right at your fingertips.
      </p>
    </div>

   
  </section>
  )
}

export default Cards