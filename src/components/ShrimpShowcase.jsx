import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ShrimpCard from './ShrimpCard';
import { shrimpData } from '../data/shrimpData';
import { filterShrimp, sortShrimp, debounce } from '../utils/helpers';
import { useInView, useReducedMotion } from '../hooks/useCustomHooks';

const ShrimpShowcase = ({ onViewDetails, onInquire }) => {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    const prefersReducedMotion = useReducedMotion();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Search state
    const [searchQuery, setSearchQuery] = useState('');

    // Create a debounced search handler
    const handleSearchChange = (event) => {
        debounce(() => setSearchQuery(event.target.value), 300)();
    };

    // Filter state
    const [filters, setFilters] = useState({
        color: 'All',
        grade: 'All',
        availability: 'All',
        beginnerFriendly: false,
    });

    // Sort state
    const [sortOption, setSortOption] = useState('featured');

    // Filter and Sort Logic (Memoized)
    const filteredShrimp = useMemo(() => {
        let result = filterShrimp(shrimpData, filters);

        if (searchQuery) {
            result = result.filter(shrimp =>
                shrimp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                shrimp.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                shrimp.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filters.beginnerFriendly) {
            result = result.filter(shrimp => shrimp.difficulty === 'Beginner Friendly');
        }

        return sortShrimp(result, sortOption);
    }, [shrimpData, filters, searchQuery, sortOption]);

    // Pagination logic
    const totalPages = Math.ceil(filteredShrimp.length / itemsPerPage);
    const displayedShrimp = filteredShrimp.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top of section gently
        const element = document.getElementById('shrimps');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Filter Options
    const colors = ['All', ...new Set(shrimpData.map(s => s.color))];
    const grades = ['All', ...new Set(shrimpData.map(s => s.grade))];

    return (
        <section id="shrimps" ref={ref} className="section-padding bg-navy-950/20">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center space-x-2 glass px-3 py-1 rounded-full mb-4">
                        <span className="w-2 h-2 bg-neon-purple rounded-full"></span>
                        <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">Our Collection</span>
                    </div>
                    <h2 className="heading-lg mb-4">Explore Our Strains</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Browse our selection of premium Neocaridina shrimp. From vibrant reds to deep blues, find the perfect addition to your tank.
                    </p>
                </motion.div>

                {/* Filters and Search Bar */}
                <div className="mb-10 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search by name, color, or description..."
                            className="input-field pl-10"
                            onChange={handleSearchChange}
                        />
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Filters Group */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Color Filter */}
                        <select
                            className="glass px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-violet"
                            value={filters.color}
                            onChange={(e) => setFilters({ ...filters, color: e.target.value })}
                        >
                            {colors.map(color => (
                                <option key={color} value={color} className="bg-navy-900 text-white">
                                    Color: {color}
                                </option>
                            ))}
                        </select>

                        {/* Grade Filter */}
                        <select
                            className="glass px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-violet"
                            value={filters.grade}
                            onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
                        >
                            {grades.map(grade => (
                                <option key={grade} value={grade} className="bg-navy-900 text-white">
                                    Grade: {grade}
                                </option>
                            ))}
                        </select>

                        {/* Beginner Friendly Toggle */}
                        <button
                            onClick={() => setFilters({ ...filters, beginnerFriendly: !filters.beginnerFriendly })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet ${filters.beginnerFriendly
                                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                                    : 'glass text-gray-300 hover:text-white'
                                }`}
                        >
                            Beginner Friendly
                        </button>

                        {/* Sort */}
                        <select
                            className="glass px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-violet ml-auto md:ml-0"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="featured" className="bg-navy-900 text-white">Featured</option>
                            <option value="newest" className="bg-navy-900 text-white">Newest</option>
                            <option value="priceLowHigh" className="bg-navy-900 text-white">Price: Low to High</option>
                            <option value="priceHighLow" className="bg-navy-900 text-white">Price: High to Low</option>
                            <option value="grade" className="bg-navy-900 text-white">Grade</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {displayedShrimp.length > 0 ? (
                        displayedShrimp.map((shrimp, index) => (
                            <ShrimpCard
                                key={shrimp.id}
                                shrimp={shrimp}
                                onViewDetails={onViewDetails}
                                onInquire={onInquire}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="heading-md mb-2">No shrimps found</h3>
                            <p className="text-gray-400">Try adjusting your filters or search query.</p>
                            <button
                                onClick={() => {
                                    setFilters({ color: 'All', grade: 'All', availability: 'All', beginnerFriendly: false });
                                    setSearchQuery('');
                                    setSortOption('featured');
                                }}
                                className="btn-secondary mt-6"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center space-x-2">
                        <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 focus:outline-none ${currentPage === 1
                                    ? 'text-gray-600 bg-white/5 cursor-not-allowed'
                                    : 'text-white glass hover:bg-white/20'
                                }`}
                        >
                            Previous
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet ${currentPage === i + 1
                                        ? 'bg-gradient-to-r from-neon-violet to-neon-purple text-white shadow-glow-sm'
                                        : 'glass text-gray-300 hover:text-white hover:bg-white/20'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 focus:outline-none ${currentPage === totalPages
                                    ? 'text-gray-600 bg-white/5 cursor-not-allowed'
                                    : 'text-white glass hover:bg-white/20'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ShrimpShowcase;
