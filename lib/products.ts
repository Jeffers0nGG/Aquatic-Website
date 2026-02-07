/**
 * Aquatic Pet Accessories - Product Data
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  specs?: string[];
  inStock: boolean;
}

export const AQUATIC_PRODUCTS: Product[] = [
  // Aquariums
  {
    id: 'tank-1',
    name: 'Premium Glass Aquarium 55L',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1516440629219-1f53c46b5a10?w=500&h=700&fit=crop',
    category: 'Aquariums',
    description: 'Ultra-clear low-iron glass aquarium with stainless steel frame',
    specs: ['55 Liters', 'Low-Iron Glass', 'Dimensions: 60x45x50cm'],
    inStock: true,
  },
  {
    id: 'tank-2',
    name: 'Rimless Cube Aquarium 30L',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500&h=700&fit=crop',
    category: 'Aquariums',
    description: 'Modern rimless design for planted aquatic displays',
    specs: ['30 Liters', 'Rimless Design', 'Dimensions: 40x40x40cm'],
    inStock: true,
  },
  {
    id: 'tank-3',
    name: 'Large Planted Tank 120L',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=700&fit=crop',
    category: 'Aquariums',
    description: 'Spacious planted aquarium with substrate and plants included',
    specs: ['120 Liters', 'Full Setup', 'Dimensions: 120x40x50cm'],
    inStock: true,
  },
  {
    id: 'tank-4',
    name: 'Saltwater Reef Tank 60L',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1584019236885-3eda3006beea?w=500&h=700&fit=crop',
    category: 'Aquariums',
    description: 'All-in-one saltwater reef aquarium system',
    specs: ['60 Liters', 'Reef Ready', 'Includes Return Pump'],
    inStock: true,
  },

  // Filtration Systems
  {
    id: 'filter-1',
    name: 'Canister Filter Professional 305',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Filtration',
    description: 'High-capacity external canister filter for crystal clear water',
    specs: ['1200 L/h', 'Multi-Media Capable', '15L Tank'],
    inStock: true,
  },
  {
    id: 'filter-2',
    name: 'Hang-On-Back Power Filter HOB-500',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Filtration',
    description: 'Compact HOB filter with adjustable flow control',
    specs: ['450 L/h', 'Whisper Quiet', 'For 50-70L Tanks'],
    inStock: true,
  },
  {
    id: 'filter-3',
    name: 'Sponge Filter Deluxe Pro',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Filtration',
    description: 'Gentle biological filtration perfect for breeding tanks',
    specs: ['L-Shaped Design', 'Multiple Density Sponges', 'Airstone Included'],
    inStock: true,
  },
  {
    id: 'filter-4',
    name: 'Undergravel Filter Kit Complete',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Filtration',
    description: 'System-wide biological filtration using substrate',
    specs: ['Complete Kit', 'Dual Lift Tubes', 'Airstone Set'],
    inStock: true,
  },

  // Lighting
  {
    id: 'light-1',
    name: 'LED Light Full Spectrum 60cm',
    price: 124.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Lighting',
    description: 'Full spectrum LED with programmable day/night cycles',
    specs: ['60cm', '30W', 'WiFi Enabled', 'Color Adjustment'],
    inStock: true,
  },
  {
    id: 'light-2',
    name: 'Underwater Blue & White LEDs Kit',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Lighting',
    description: 'Submersible LED strips for aquatic decoration',
    specs: ['Submersible', 'RGB Control', '5m Tape Length'],
    inStock: true,
  },
  {
    id: 'light-3',
    name: 'High Output T5 Fluorescent Hood',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Lighting',
    description: 'Professional T5 lighting for planted tanks',
    specs: ['Dual T5 Tubes', '90cm', 'Built-in Reflector'],
    inStock: true,
  },
  {
    id: 'light-4',
    name: 'Solar LED Pendant Light',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Lighting',
    description: 'Elegant pendant design with natural daylight simulation',
    specs: ['Solar Charging', 'Bracketed Mount', '40cm Cord'],
    inStock: true,
  },

  // Substrate & Decor
  {
    id: 'subst-1',
    name: 'Premium Aqua Soil Black 3L',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1629451133099-e0d0dd60c64d?w=500&h=700&fit=crop',
    category: 'Substrate',
    description: 'Nutrient-rich substrates for planted aquariums',
    specs: ['3L Bag', 'PH 6.0-6.5', 'High Porosity'],
    inStock: true,
  },
  {
    id: 'subst-2',
    name: 'River Sand Natural 5kg',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1629451133099-e0d0dd60c64d?w=500&h=700&fit=crop',
    category: 'Substrate',
    description: 'Fine natural river sand for bottom dwelling fish',
    specs: ['5kg Bag', 'Pre-Washed', 'Fine Grade'],
    inStock: true,
  },
  {
    id: 'decor-1',
    name: 'Driftwood Branches Set',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=700&fit=crop',
    category: 'Decor',
    description: 'Natural driftwood for aquatic landscaping',
    specs: ['3-Piece Set', 'Pre-Treated', 'Varies 20-40cm'],
    inStock: true,
  },
  {
    id: 'decor-2',
    name: 'Lava Stone Aqua Landscape',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=700&fit=crop',
    category: 'Decor',
    description: 'Decorative lava rocks for hardscape design',
    specs: ['5kg Bag', 'Black Lava Rock', 'Porous Structure'],
    inStock: true,
  },

  // Pumps & Aeration
  {
    id: 'pump-1',
    name: 'Submersible Water Pump 2000LPH',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Pumps',
    description: 'Reliable submersible pump for circulation and waterfalls',
    specs: ['2000 L/H', 'Low Noise', 'Adjustable Flow'],
    inStock: true,
  },
  {
    id: 'pump-2',
    name: 'Air Pump Ultra Silent 80L',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Pumps',
    description: 'Whisper-quiet air pump with dual outlet',
    specs: ['80 L/H', 'Dual Outlet', 'Very Quiet Operation'],
    inStock: true,
  },

  // Maintenance
  {
    id: 'maint-1',
    name: 'Advanced Aquarium Test Kit 8-in-1',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Maintenance',
    description: 'Comprehensive water testing for all aquarium types',
    specs: ['8 Tests', '100 Test Strips', 'Accurate Results'],
    inStock: true,
  },
  {
    id: 'maint-2',
    name: 'Gravel Vacuum Cleaner 30cm',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Maintenance',
    description: 'Professional gravel cleaning siphon',
    specs: ['30cm Head', 'Flow Control', 'Adapter Included'],
    inStock: true,
  },
  {
    id: 'maint-3',
    name: 'Glass Cleaner Magnetic Double',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Maintenance',
    description: 'Dual-sided magnetic glass cleaner',
    specs: ['Magnetic Design', 'No Scratches', 'Quick Clean'],
    inStock: true,
  },
  {
    id: 'maint-4',
    name: 'Water Change System Complete',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Maintenance',
    description: 'Complete hose system for convenient water changes',
    specs: ['25L Bucket', '10m Hose', 'Tap Connector'],
    inStock: true,
  },

  // Heaters & Temperature
  {
    id: 'heat-1',
    name: 'Submersible Heater Thermostat 300W',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Heaters',
    description: 'Precise temperature control with digital display',
    specs: ['300W', 'Digital Thermostat', '20-35°C Range'],
    inStock: true,
  },
  {
    id: 'heat-2',
    name: 'Inline External Heater 500W',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Heaters',
    description: 'Powerful external heater for large tanks',
    specs: ['500W', 'Stainless Steel', 'Adjustable Temperature'],
    inStock: true,
  },

  // Supplements & Food
  {
    id: 'food-1',
    name: 'Premium Fish Food Flakes - Mixed Species',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Food',
    description: 'Balanced nutrition for tropical community fish',
    specs: ['250g', 'High Protein', 'Vitamin Enriched'],
    inStock: true,
  },
  {
    id: 'food-2',
    name: 'Sinking Pellet Food Bottom Feeders',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Food',
    description: 'Specialized food for catfish and bottom dwellers',
    specs: ['250g', 'Slow Sinking', 'Complete Nutrition'],
    inStock: true,
  },
  {
    id: 'supp-1',
    name: 'Beneficial Bacteria Culture 250ml',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Supplements',
    description: 'Establishes nitrogen cycle for healthy water',
    specs: ['250ml Bottle', 'Live Bacteria', 'Ammonia Reducing'],
    inStock: true,
  },
  {
    id: 'supp-2',
    name: 'Plant Fertilizer Liquid All-in-One',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Supplements',
    description: 'Complete nutrients for lush plant growth',
    specs: ['500ml Bottle', 'Macro & Micro', 'Dosing Cap'],
    inStock: true,
  },
];

export const CATEGORIES = [
  'Aquariums',
  'Filtration',
  'Lighting',
  'Substrate',
  'Decor',
  'Pumps',
  'Maintenance',
  'Heaters',
  'Food',
  'Supplements',
];

export const getProductsByCategory = (category: string) => {
  return AQUATIC_PRODUCTS.filter((p) => p.category === category);
};

export const getProductById = (id: string) => {
  return AQUATIC_PRODUCTS.find((p) => p.id === id);
};
