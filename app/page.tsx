import Hero from "@/components/hero"
import CctvSection from "@/components/services/cctv-section"
import WebDevSection from "@/components/services/web-dev-section"
import InfrastructureSection from "@/components/services/infrastructure-section"
import SupportSection from "@/components/services/support-section"
import ClientsCarousel from "@/components/clients-carousel"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CctvSection />
      <WebDevSection />
      <InfrastructureSection />
      <SupportSection />
      <ClientsCarousel />
      <Footer />
    </main>
  )
}

