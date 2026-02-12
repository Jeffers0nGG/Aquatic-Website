import React, { useState } from 'react';
import { useMousePosition } from './hooks/useCustomHooks';
import UnderwaterBackground from './components/UnderwaterBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ShrimpShowcase from './components/ShrimpShowcase';
import ProductDetailModal from './components/ProductDetailModal';
import InquiryModal from './components/InquiryModal';
import GradesSection from './components/GradesSection';
import CareGuide from './components/CareGuide';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ParticleCanvas from './components/ParticleCanvas';
import SectionWrapper from './components/SectionWrapper';

function App() {
    const mousePosition = useMousePosition();
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedShrimp, setSelectedShrimp] = useState(null);

    const handleViewDetails = (shrimp) => {
        setSelectedShrimp(shrimp);
        setIsDetailOpen(true);
    };

    const handleInquire = (shrimp = null) => {
        setSelectedShrimp(shrimp);
        setIsInquiryOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        // Don't clear selectedShrimp immediately to allow exit animation
        setTimeout(() => setSelectedShrimp(null), 300);
    };

    const handleCloseInquiry = () => {
        setIsInquiryOpen(false);
        // Don't clear selectedShrimp immediately to allow exit animation
        setTimeout(() => {
            if (!isDetailOpen) setSelectedShrimp(null);
        }, 300);
    };

    return (
        <div className="relative min-h-screen">
            <CustomCursor />
            <ParticleCanvas />

            {/* Animated background */}
            <UnderwaterBackground mousePosition={mousePosition} />

            {/* Navigation */}
            <Navigation onInquireClick={() => handleInquire()} />

            {/* Main content */}
            <main>
                <Hero />

                <SectionWrapper>
                    <ShrimpShowcase
                        onViewDetails={handleViewDetails}
                        onInquire={handleInquire}
                    />
                </SectionWrapper>

                <SectionWrapper>
                    <GradesSection />
                </SectionWrapper>

                <SectionWrapper>
                    <CareGuide />
                </SectionWrapper>

                <SectionWrapper>
                    <Gallery />
                </SectionWrapper>

                <SectionWrapper>
                    <Reviews />
                </SectionWrapper>

                <SectionWrapper>
                    <FAQ />
                </SectionWrapper>

                <SectionWrapper>
                    <Contact
                        isInquiryOpen={isInquiryOpen}
                        setIsInquiryOpen={setIsInquiryOpen}
                    />
                </SectionWrapper>
            </main>

            {/* Footer */}
            <SectionWrapper>
                <Footer />
            </SectionWrapper>

            {/* Modals */}
            <ProductDetailModal
                shrimp={selectedShrimp}
                isOpen={isDetailOpen}
                onClose={handleCloseDetail}
                onInquire={handleInquire}
            />
            <InquiryModal
                isOpen={isInquiryOpen}
                onClose={handleCloseInquiry}
                selectedShrimp={selectedShrimp}
            />
        </div>
    );
}

export default App;
