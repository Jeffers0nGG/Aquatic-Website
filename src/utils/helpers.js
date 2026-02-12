// Utility to get image path
export const getImagePath = (imageName) => {
    if (!imageName) return null;
    try {
        return `/assets/shrimps/${imageName}`;
    } catch (error) {
        console.error('Error loading image:', error);
        return null;
    }
};

// Generate gradient placeholder for missing images
export const getGradientPlaceholder = (color) => {
    const gradients = {
        Red: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        Blue: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        Orange: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        Yellow: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
        Green: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        Black: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        Brown: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)',
        White: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
    };
    return gradients[color] || 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
};

// Smooth scroll to section
export const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80; // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

// Debounce function for search
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Format inquiry message for copy
export const formatInquiryMessage = (formData) => {
    return `
🦐 SHRIMP INQUIRY

Name: ${formData.name}
Contact: ${formData.contact}
${formData.strain ? `Interested in: ${formData.strain}` : ''}
${formData.quantity ? `Quantity: ${formData.quantity}` : ''}
${formData.location ? `Pickup Location: ${formData.location}` : ''}
${formData.schedule ? `Preferred Schedule: ${formData.schedule}` : ''}

Message:
${formData.message}
  `.trim();
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Filter shrimp by criteria
export const filterShrimp = (shrimp, filters) => {
    return shrimp.filter(item => {
        // Color filter
        if (filters.color && filters.color !== 'All' && item.color !== filters.color) {
            return false;
        }

        // Grade filter
        if (filters.grade && filters.grade !== 'All' && item.grade !== filters.grade) {
            return false;
        }

        // Price range filter
        if (filters.priceRange && filters.priceRange !== 'All') {
            const [min, max] = filters.priceRange.split('-').map(p => parseInt(p));
            if (item.priceValue < min || item.priceValue > max) {
                return false;
            }
        }

        // Availability filter
        if (filters.availability && filters.availability !== 'All' && item.availability !== filters.availability) {
            return false;
        }

        // Beginner friendly filter
        if (filters.beginnerFriendly && item.difficulty !== 'Beginner Friendly') {
            return false;
        }

        // Search query
        if (filters.search) {
            const query = filters.search.toLowerCase();
            return (
                item.name.toLowerCase().includes(query) ||
                item.color.toLowerCase().includes(query) ||
                item.grade.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
        }

        return true;
    });
};

// Sort shrimp
export const sortShrimp = (shrimp, sortBy) => {
    const sorted = [...shrimp];

    switch (sortBy) {
        case 'featured':
            return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        case 'newest':
            return sorted.sort((a, b) => (b.newest ? 1 : 0) - (a.newest ? 1 : 0));
        case 'price-low':
            return sorted.sort((a, b) => a.priceValue - b.priceValue);
        case 'price-high':
            return sorted.sort((a, b) => b.priceValue - a.priceValue);
        case 'grade':
            const gradeOrder = { 'Show Grade': 4, 'Premium': 3, 'High Grade': 2, 'Sakura': 2, 'Rili': 1, 'Standard': 0 };
            return sorted.sort((a, b) => (gradeOrder[b.grade] || 0) - (gradeOrder[a.grade] || 0));
        default:
            return sorted;
    }
};
