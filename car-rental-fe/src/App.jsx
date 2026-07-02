import HeroSection from './components/Hero/HeroSection'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <>
      <div>
        {/* <Navbar /> */}
      </div>
      <div className="w-full">
        <HeroSection />
      </div>
      <div className='bg-white h-[100vh] w-[100vw]'>
        HELLO
      </div>
    </>
  )
}

export default App