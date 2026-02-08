/**
 * Jeffers0n Aquat1cs - Neocaridina Shrimp Products
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
  // Neocaridina Shrimp Species
  {
    id: 'shrimp-red-1',
    name: 'Red Cherry Neocaridina Shrimp',
    price: 6.99,
    image: '/assets/shrimps/Neocardina Red Cherry.jpg',
    category: 'Shrimp Species',
    description: 'Stunning bright red coloration, hardy and easy to care for breeding pairs.',
    specs: ['Bright Red', 'Hardy', 'Great for Beginners'],
    inStock: true,
  },
  {
    id: 'shrimp-orange-1',
    name: 'Orange Neocaridina Shrimp',
    price: 5.99,
    image: '/assets/shrimps/Neocardina Orange.jpg',
    category: 'Shrimp Species',
    description: 'Beautiful vibrant orange, perfect beginner species with excellent survival rate.',
    specs: ['Vibrant Orange', 'Peaceful', 'Prolific Breeder'],
    inStock: true,
  },
  {
    id: 'shrimp-yellow-1',
    name: 'Yellow Fire Neocaridina Shrimp',
    price: 7.99,
    image: '/assets/shrimps/Neocardina Yellow Fire.jpg',
    category: 'Shrimp Species',
    description: 'Striking yellow coloration with bold patterns, excellent for planted tanks.',
    specs: ['Golden Yellow', 'Active', 'Great Scavengers'],
    inStock: true,
  },
  {
    id: 'shrimp-blue-1',
    name: 'Blue Dream Neocaridina Shrimp',
    price: 8.99,
    image: '/assets/shrimps/Neocardina Blue Dream.jpg',
    category: 'Shrimp Species',
    description: 'Deep blue coloration, highly sought after for their stunning appearance.',
    specs: ['Deep Blue', 'Rare', 'Perfect for Display Tanks'],
    inStock: true,
  },
  {
    id: 'shrimp-black-1',
    name: 'Black Diamond Neocaridina Shrimp',
    price: 9.99,
    image: '/assets/shrimps/Neocardina Black Diamond.jpg',
    category: 'Shrimp Species',
    description: 'Jet black with crystalline patterns, premium variety for collectors.',
    specs: ['Jet Black', 'Premium Quality', 'Filter Feeders'],
    inStock: true,
  },

  // Shrimp Care Supplies
  {
    id: 'care-substrate-1',
    name: 'Shrimp Soil Premium 3L',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1629451133099-e0d0dd60c64d?w=500&h=700&fit=crop',
    category: 'Shrimp Care',
    description: 'Specialized substrate for optimal shrimp health and water parameters.',
    specs: ['3L Bag', 'pH 6.0-6.5', 'Promotes Bacteria Growth'],
    inStock: true,
  },
  {
    id: 'care-filter-1',
    name: 'Sponge Filter Shrimp Safe',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Shrimp Care',
    description: 'Gentle filtration that won\'t trap delicate shrimp or shrimplets.',
    specs: ['Safe Design', 'Fine Sponge', 'Airstone Included'],
    inStock: true,
  },
  {
    id: 'care-moss-1',
    name: 'Java Moss Live Plant Bunch',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=700&fit=crop',
    category: 'Shrimp Care',
    description: 'Essential plant for shrimp habitat, provides grazing and hiding spots.',
    specs: ['Live Plant', 'Hardy Species', 'Natural Shelter'],
    inStock: true,
  },
  {
    id: 'care-test-1',
    name: 'Aquarium Test Kit 6-in-1 Shrimp Focus',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Shrimp Care',
    description: 'Tests all critical parameters for shrimp water quality monitoring.',
    specs: ['100 Strips', 'pH, GH, KH, Ammonia', 'Accurate Results'],
    inStock: true,
  },

  // Shrimp Food & Nutrition
  {
    id: 'food-pellets-1',
    name: 'Neocaridina Shrimp Pellets Premium',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Shrimp Food',
    description: 'Specially formulated pellets with essential nutrients for shrimp growth.',
    specs: ['250g', 'Sinking Pellets', 'Calcium Enhanced'],
    inStock: true,
  },
  {
    id: 'food-veggie-1',
    name: 'Vegetable Mix Dried Spirulina Wafers',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Shrimp Food',
    description: 'Natural vegetable-based nutrition for healthy color and digestion.',
    specs: ['100g', 'Spirulina Rich', 'Natural Colors'],
    inStock: true,
  },
  {
    id: 'food-calcium-1',
    name: 'Calcium Supplement Powder',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Shrimp Food',
    description: 'Essential calcium for molting and shell development.',
    specs: ['50g', 'Pure Calcium', 'Supports Molting'],
    inStock: true,
  },
  {
    id: 'food-algae-1',
    name: 'Vacuum Dried Algae Wafers',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Shrimp Food',
    description: 'Natural algae providing complete nutrition and mimicking natural diet.',
    specs: ['100g', 'Nutritious', 'Shrimp Approved'],
    inStock: true,
  },

  // Shrimp Tank Setup
  {
    id: 'setup-tank-1',
    name: 'Shrimp Nano Tank 20L Glass',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1516440629219-1f53c46b5a10?w=500&h=700&fit=crop',
    category: 'Tank Setup',
    description: 'Perfect sized aquarium for shrimp colonies, minimal footprint.',
    specs: ['20L', 'Rimless', 'Dimensions: 30x20x33cm'],
    inStock: true,
  },
  {
    id: 'setup-tank-2',
    name: 'Shrimp Breeding Tank 30L Rimless',
    price: 84.99,
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500&h=700&fit=crop',
    category: 'Tank Setup',
    description: 'Ideal for breeding colonies with pristine visibility.',
    specs: ['30L', 'Rimless Design', 'Dimensions: 40x25x30cm'],
    inStock: true,
  },
  {
    id: 'setup-light-1',
    name: 'LED Light Shrimp Safe 30cm',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Tank Setup',
    description: 'Low intensity LED perfect for planted shrimp tanks.',
    specs: ['30cm', '15W', 'Full Spectrum'],
    inStock: true,
  },
  {
    id: 'setup-heater-1',
    name: 'Mini Heater 25W Shrimp Tank',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1578298577594-f0af9e1fbf4a?w=500&h=700&fit=crop',
    category: 'Tank Setup',
    description: 'Compact heater for maintaining ideal shrimp temperature range.',
    specs: ['25W', 'Thermostat', '20-30°C Range'],
    inStock: true,
  },

  // Shrimp Accessories
  {
    id: 'acc-hide-1',
    name: 'Shrimp Hideout Caves Ceramic',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=700&fit=crop',
    category: 'Accessories',
    description: 'Natural ceramic hiding spots for security and stress reduction.',
    specs: ['3-Piece Set', 'Safe for Shrimp', 'Natural Look'],
    inStock: true,
  },
  {
    id: 'acc-wood-1',
    name: 'Spider Wood for Shrimp',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=700&fit=crop',
    category: 'Accessories',
    description: 'Hardy driftwood perfect for moss attachment and shrimp grazing.',
    specs: ['Pre-Treated', 'Unique Shapes', 'Varies 15-25cm'],
    inStock: true,
  },
  {
    id: 'acc-pebbles-1',
    name: 'Decorative River Stones 2kg',
    price: 17.99,
    image: 'https://images.unsplash.com/photo-1629451133099-e0d0dd60c64d?w=500&h=700&fit=crop',
    category: 'Accessories',
    description: 'Natural smooth stones for tank aesthetic and shrimp enjoyment.',
    specs: ['2kg Bag', 'Polished', 'Safe for Shrimp'],
    inStock: true,
  },
  {
    id: 'acc-cloth-1',
    name: 'Shrimp Breeding Cloth Net',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=700&fit=crop',
    category: 'Accessories',
    description: 'Spawning cloth for safe egg and shrimplet attachment and growth.',
    specs: ['Fine Mesh', 'Easy Install', 'Breeding Support'],
    inStock: true,
  },

  // Supplements & Water
  {
    id: 'supp-bacteria-1',
    name: 'Beneficial Bacteria Culture Shrimp',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Supplements',
    description: 'Establishes healthy biofilm for shrimp nutrition and colony health.',
    specs: ['250ml', 'Live Bacteria', 'Biofilm Former'],
    inStock: true,
  },
  {
    id: 'supp-conditioner-1',
    name: 'Water Conditioner Shrimp Safe 500ml',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Supplements',
    description: 'Removes chlorine and heavy metals safe for newborn shrimp.',
    specs: ['500ml Bottle', 'Instant Action', 'pH Neutral'],
    inStock: true,
  },
  {
    id: 'supp-mineral-1',
    name: 'Mineral Mix for Shrimp Water GH+',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Supplements',
    description: 'Raises general hardness for optimal shell and color development.',
    specs: ['100g', 'Balanced Minerals', 'Dosing Spoon'],
    inStock: true,
  },
  {
    id: 'supp-balance-1',
    name: 'KH Buffer for pH Stability 200ml',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=500&h=700&fit=crop',
    category: 'Supplements',
    description: 'Stabilizes pH and carbonate hardness for shrimp wellbeing.',
    specs: ['200ml', 'pH 6.0-7.0', 'Consistent Results'],
    inStock: true,
  },
];

export const CATEGORIES = [
  'Shrimp Species',
  'Shrimp Care',
  'Shrimp Food',
  'Tank Setup',
  'Accessories',
  'Supplements',
];

export const getProductsByCategory = (category: string) => {
  return AQUATIC_PRODUCTS.filter((p) => p.category === category);
};

export const getProductById = (id: string) => {
  return AQUATIC_PRODUCTS.find((p) => p.id === id);
};
