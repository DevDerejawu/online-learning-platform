

import HeroSection from '../components/clientComponents/heroSection'
import GetInTouch from '../components/clientComponents/getInTouch'
import Coures from '../components/clientComponents/courses'
import AboutUs from '../components/clientComponents/aboutUs'
import Navbar from '../components/clientComponents/homeNavbar'
import Footer from '../components/serverComponents/footer'

const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Coures/>
      <AboutUs/>
      <GetInTouch/>
      <Footer/>

    </div>
  )
}

export default Homepage