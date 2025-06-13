import { useCallback } from 'react';

export const useAutoScroll = () => {
  const scrollToNextSection = useCallback((currentSectionId: string) => {
    const sectionOrder = [
      'personal-info',
      'summary',
      'experience',
      'education',
      'skills',
      'projects'
    ];
    
    const currentIndex = sectionOrder.indexOf(currentSectionId);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < sectionOrder.length) {
      const nextSectionId = sectionOrder[nextIndex];
      const nextSection = document.getElementById(nextSectionId);
      
      if (nextSection) {
        // Add completion animation to current section
        const currentSection = document.getElementById(currentSectionId);
        if (currentSection) {
          currentSection.classList.add('section-complete');
          setTimeout(() => {
            currentSection.classList.remove('section-complete');
          }, 900);
        }
        
        // Smooth scroll to next section with offset for better UX
        const headerOffset = 100;
        const elementPosition = nextSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Focus the first input in the next section
        setTimeout(() => {
          const firstInput = nextSection.querySelector('input, textarea') as HTMLElement;
          if (firstInput) {
            firstInput.focus();
          }
        }, 500);
      }
    }
  }, []);

  const handleKeyPress = useCallback((event: React.KeyboardEvent, sectionId: string) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      scrollToNextSection(sectionId);
    }
  }, [scrollToNextSection]);

  return { scrollToNextSection, handleKeyPress };
};
