const BASE = import.meta.env.BASE_URL

export const brands = [
  {
    id: 'paseo',
    name: 'Paseo',
    category: 'Tissue',
    image: `${BASE}images/brands/paseo.svg`,
    photo: `${BASE}images/brands/paseo1.jpg`,
    cover: `${BASE}images/catalogues/paseo.jpg`,
    catalogue: `${BASE}catalogues/paseo.pdf`,
    tagline: 'Softness that speaks for itself',
    description: 'Premium tissue products crafted for everyday comfort. Paseo combines superior softness with consistent quality, trusted by businesses and households alike.',
    features: ['Ultra-soft 3-ply', 'Hypoallergenic', 'Bulk supply available', 'Custom packaging'],
    products: [
      { name: 'Facial Tissue Boxes', sku: 'PSO-FT-001', unit: 'Box of 200' },
      { name: 'Pocket Tissues', sku: 'PSO-PT-002', unit: 'Pack of 10' },
      { name: 'Table Napkins', sku: 'PSO-TN-003', unit: 'Pack of 100' },
      { name: 'Bathroom Tissue Rolls', sku: 'PSO-BR-004', unit: 'Roll of 250 sheets' },
    ],
    color: 'stone-100',
    accent: '#d4c9b5',
  },
  {
    id: 'origami',
    name: 'Origami',
    category: 'Tissue',
    image: `${BASE}images/brands/origami.svg`,
    photo: `${BASE}images/brands/origami1.JPG`,
    cover: `${BASE}images/catalogues/origami.jpg`,
    catalogue: `${BASE}catalogues/origami.pdf`,
    tagline: 'Precision in every fold',
    description: 'Where form meets function. Origami tissue products are engineered for precision and consistency, ideal for hotels, restaurants, and corporate environments.',
    features: ['Precision-cut sheets', 'Restaurant grade', 'Eco-friendly options', 'Embossed finish'],
    products: [
      { name: 'Dinner Napkins', sku: 'ORI-DN-001', unit: 'Pack of 50' },
      { name: 'Cocktail Napkins', sku: 'ORI-CN-002', unit: 'Pack of 100' },
      { name: 'Dispenser Napkins', sku: 'ORI-DPN-003', unit: 'Pack of 250' },
      { name: 'Interfolded Tissue', sku: 'ORI-IT-004', unit: 'Pack of 200' },
    ],
    color: 'stone-50',
    accent: '#b5a48b',
  },
  {
    id: 'kressa',
    name: 'Kressa',
    category: 'Tissue',
    image: `${BASE}images/brands/kressa.svg`,
    photo: `${BASE}images/brands/kressa1.JPG`,
    cover: `${BASE}images/catalogues/kressa.jpg`,
    catalogue: `${BASE}catalogues/kressa.pdf`,
    tagline: 'Reliable quality, every time',
    description: 'Built for volume and reliability. Kressa products offer consistent quality at scale, making them the preferred choice for institutional and commercial buyers.',
    features: ['High-volume supply', 'Industrial grade', 'Multi-layered strength', 'Cost-effective'],
    products: [
      { name: 'Industrial Paper Towels', sku: 'KRS-PT-001', unit: 'Roll of 400 sheets' },
      { name: 'Jumbo Tissue Rolls', sku: 'KRS-JT-002', unit: 'Roll of 500 sheets' },
      { name: 'Centre Pull Towels', sku: 'KRS-CP-003', unit: 'Roll of 300 sheets' },
      { name: 'Tissue Bulk Pack', sku: 'KRS-BP-004', unit: 'Pack of 1000' },
    ],
    color: 'stone-100',
    accent: '#8c7a60',
  },

  // ---- Real brands added from catalogues. TEMP visuals (category photo +
  // lettered logo) until proper logo/photo assets are provided. Please confirm
  // each brand's CATEGORY and tagline. ----
  {
    id: 'chuk',
    name: 'Chuk',
    category: 'Disposables',
    image: null, // TODO: add public/images/brands/chuk.svg
    photo: `${BASE}images/categories/disposable.JPG`, // TEMP cover
    cover: `${BASE}images/catalogues/chuk.jpg`,
    catalogue: `${BASE}catalogues/chuk.pdf`,
    tagline: 'Eco-friendly disposable tableware',
    description: 'Sustainable, biodegradable disposable tableware — practical and planet-friendly for food service and events.',
    features: ['Biodegradable', 'Food-safe', 'Bulk supply'],
    products: [],
    color: 'stone-100',
    accent: '#c4a882',
  },
  {
    id: 'disposo',
    name: 'Disposo',
    category: 'Disposables',
    image: null, // TODO: add public/images/brands/disposo.svg
    photo: `${BASE}images/categories/disposable.JPG`, // TEMP cover
    cover: `${BASE}images/catalogues/disposo.jpg`,
    catalogue: `${BASE}catalogues/disposo.pdf`,
    tagline: 'Everyday disposables, done right',
    description: 'A complete range of hygienic disposable products for households, kitchens, and businesses.',
    features: ['Wide range', 'Hygienic', 'Cost-effective'],
    products: [],
    color: 'stone-50',
    accent: '#cbb085',
  },
  {
    id: 'gipl',
    name: 'GIPL',
    category: 'Tissue',
    image: null, // TODO: add public/images/brands/gipl.svg
    photo: `${BASE}images/categories/tissue.JPG`, // TEMP cover
    cover: `${BASE}images/catalogues/gipl.jpg`,
    catalogue: `${BASE}catalogues/gipl.pdf`,
    tagline: 'Quality you can rely on',
    description: 'Dependable everyday products supplied at scale for businesses and institutions.',
    features: ['Trusted quality', 'Bulk supply', 'Reliable'],
    products: [],
    color: 'stone-100',
    accent: '#b5a48b',
  },
  {
    id: 'spotzero',
    name: 'Spotzero',
    category: 'Housekeeping',
    image: null, // TODO: add public/images/brands/spotzero.svg
    photo: `${BASE}images/categories/housekeeping.WEBP`, // TEMP cover
    cover: `${BASE}images/catalogues/spotzero.jpg`,
    catalogue: `${BASE}catalogues/spotzero.pdf`,
    tagline: 'Effortless cleaning, spotless results',
    description: 'Smart housekeeping and cleaning tools designed to make spotless spaces effortless.',
    features: ['Professional grade', 'Streak-free', 'Durable'],
    products: [],
    color: 'stone-50',
    accent: '#6b8fa8',
  },
]

export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'Tissue', label: 'Tissue Products' },
  { id: 'Disposables', label: 'Disposable Items' },
  { id: 'Housekeeping', label: 'Housekeeping' },
]
