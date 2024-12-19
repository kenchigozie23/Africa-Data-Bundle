'use client'
import React, { useState, useEffect } from 'react';
import Firstnav from "@/components/navbar";
import Secondnav from '@/components/Secondnav';
import Mainpage from '@/components/mainpage';
import SyncLoader from "react-spinners/SyncLoader";

import Cards from '@/components/cards';
import Carrd from '@/components/Carrd';
import Offer from '@/components/offer';
import Services from '@/components/services';
import Ours from '@/components/Ours';
import CustomerTestimonialCarousel from '@/components/Ratings';
// import SubscriptionCard from '@/components/Subscription';
import Footer from '@/components/footer';
// import BottomNavigation from '@/components/ButtonNavigation';



function Home() {


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>


{loading ? (
            <div className='w-full h-screen flex justify-center items-center'>

              <SyncLoader margin={2} color='#9333ea'  />
            </div>
      ) : (
        <div >
          <div className=''>
       <Firstnav/>
      <Secondnav/>
     </div>
     <div>
     <Mainpage/>
     <Cards/>
     <Carrd/>
     <Offer/>
     <Services/>
     <Ours/>
     <CustomerTestimonialCarousel/>
     {/* <BottomNavigation/> */}
     {/* <SubscriptionCard/> */}
     <Footer/>
     </div>
        </div>
      )}
      
    </div>
  )
}

export default Home