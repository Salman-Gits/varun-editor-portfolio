import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SelectedWork } from './components/SelectedWork';
import { Services } from './components/Services';
import { Workflow } from './components/Workflow';
import { Packages } from './components/Packages';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ProjectItem } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('');

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForInquiry(serviceName);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (packageName: string) => {
    setSelectedServiceForInquiry(`Package: ${packageName}`);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#060608] text-[#e8e8ec] selection:bg-[#e5a93c]/30 selection:text-white w-full max-w-full film-grain">
      {/* Cinematic Navigation */}
      <Navbar onSelectService={handleSelectService} />

      {/* Main Sections */}
      <main className="w-full max-w-full">
        {/* Hero Section with WebThreads Background */}
        <Hero />

        {/* About Section with PaperCrumple Interactive Portrait */}
        <About />

        {/* Selected Work Section with Motion Scroll-driven Gallery */}
        <SelectedWork onSelectProject={(project) => setSelectedProject(project)} />

        {/* Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* Workflow Section */}
        <Workflow />

        {/* Packages Section */}
        <Packages onSelectPackage={handleSelectPackage} />

        {/* Contact Section */}
        <Contact initialService={selectedServiceForInquiry} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleSelectService}
      />
    </div>
  );
}
