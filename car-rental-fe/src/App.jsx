import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HeroSection from "./components/Hero/HeroSection";
import About from "./pages/about/About";
import AppLayout from "./components/Layout/AppLayout";

const SectionPage = ({ title, description }) => (
  <div className="min-h-screen bg-[#fcfcfd] px-6 py-24 text-[#111215]">
    <div className="mx-auto max-w-4xl">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#b89753] transition hover:text-[#8f6930]"
      >
        ← Back home
      </Link>
      <h1 className="mt-8 text-4xl font-semibold sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4b5563]">
        {description}
      </p>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HeroSection />} />
          <Route
            path="/institutional-services"
            element={
              <SectionPage
                title="Institutional Services"
                description="Tailored executive transportation and mobility programs for government, healthcare, education, and enterprise clients."
              />
            }
          />
          <Route
            path="/coverage-area"
            element={
              <SectionPage
                title="Coverage Area"
                description="Reliable service across major Canadian cities with dependable regional and intercity travel solutions."
              />
            }
          />
          <Route
            path="/events-delegations"
            element={
              <SectionPage
                title="Events & Delegations"
                description="Premium coordination for conferences, delegations, VIP arrivals, and high-touch group travel."
              />
            }
          />
          <Route
            path="/safety-compliance"
            element={
              <SectionPage
                title="Safety & Compliance"
                description="A rigorous approach to driver screening, vehicle care, and operational standards for every trip."
              />
            }
          />
          <Route
            path="/corporate-transportation"
            element={
              <SectionPage
                title="Corporate Transportation"
                description="Executive travel planning that keeps teams moving with professionalism and consistency."
              />
            }
          />
          <Route path="/about-us" element={<About />} />
          <Route
            path="*"
            element={
              <SectionPage
                title="Page not found"
                description="The page you are looking for does not exist. Return home to continue exploring."
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
