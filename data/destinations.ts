// ─────────────────────────────────────────────────────────────────
//  destinations.ts  —  all destinations, grouped by region
//
//  startingPrice and tripCount are auto-computed at the bottom
//  of trips.ts after both arrays are defined, so you never need
//  to keep them in sync manually.
//
//  URL: /destinations/india/himalayas
//       /destinations/international/europe
// ─────────────────────────────────────────────────────────────────
import type { Destination } from "./types";

const DESTINATIONS: Destination[] = [
  // ── INDIA ──────────────────────────────────────────────────────
  {
    slug: "himalayas",
    region: "india",
    name: "Himalayas",
    tagline: "Where the Earth Touches the Sky",
    description:
      "Snow peaks, ancient monasteries, high-altitude lakes, and passes that defy imagination. The Himalayas are not just a place — they are an emotion.",
    image: "/images/destinations/himalayas.jpg",
    accent: "#3db89e",
    highlights: [
      "High-altitude treks & mountain passes",
      "Ancient monasteries & remote villages",
      "Star-drenched night skies at 14,000 ft",
    ],
    bestMonths: "Jun – Oct",
    startingPrice: 0,   // auto-computed in trips.ts
    tripCount: 0,       // auto-computed in trips.ts
    featured: true,
  },
  {
    slug: "rajasthan",
    region: "india",
    name: "Rajasthan",
    tagline: "Land of Forts, Deserts & Royalty",
    description:
      "Majestic forts, camel safaris across golden dunes, vibrant bazaars, and the most photogenic palaces on earth. Rajasthan is India at its most vivid.",
    image: "/images/destinations/rajasthan.jpg",
    accent: "#f59e0b",
    highlights: [
      "Mehrangarh & Amber Fort",
      "Sam Sand Dunes camel safari",
      "Desert camp under the stars",
    ],
    bestMonths: "Oct – Mar",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "kerala",
    region: "india",
    name: "Kerala",
    tagline: "God's Own Country",
    description:
      "Misty tea estates, silent backwater canals, and sun-drenched shores. Kerala is nature at its most serene — perfect for couples, families, and solo wanderers alike.",
    image: "/images/destinations/kerala.jpg",
    accent: "#22c55e",
    highlights: [
      "Alleppey overnight houseboat",
      "Munnar sunrise tea gardens",
      "Periyar wildlife sanctuary",
    ],
    bestMonths: "Sep – Feb",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "northeast",
    region: "india",
    name: "Northeast India",
    tagline: "The Unexplored Paradise",
    description:
      "Living root bridges, crystal rivers, the wettest place on earth, and Asia's cleanest village. Northeast India is India's best-kept secret.",
    image: "/images/destinations/northeast.jpg",
    accent: "#a78bfa",
    highlights: [
      "Double-decker living root bridges",
      "Dawki crystal-clear river",
      "Mawlynnong — Asia's cleanest village",
    ],
    bestMonths: "Oct – May",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "uttarakhand",
    region: "india",
    name: "Uttarakhand",
    tagline: "The Land of Gods",
    description:
      "Devbhoomi — from the roaring rapids of Rishikesh to the snow-dusted peaks of Kedarkantha, Uttarakhand packs divine landscapes into every kilometre.",
    image: "/images/destinations/uttarakhand.jpg",
    accent: "#38bdf8",
    highlights: [
      "Kedarkantha winter summit",
      "Ganga white-water rafting",
      "Campfire under Himalayan stars",
    ],
    bestMonths: "Sep – Jun",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "karnataka",
    region: "india",
    name: "Karnataka",
    tagline: "Misty Hills & Ancient Temples",
    description:
      "Coffee-scented hills, ancient temple ruins, and verdant wildlife reserves. Karnataka is India's most underrated state.",
    image: "/images/destinations/karnataka.jpg",
    accent: "#fb923c",
    highlights: [
      "Coorg coffee estate walk",
      "Abbey Falls & Iruppu Falls",
      "Raja's Seat sunset viewpoint",
    ],
    bestMonths: "Oct – Jun",
    startingPrice: 0,
    tripCount: 0,
    featured: false,
  },

  // ── INTERNATIONAL ──────────────────────────────────────────────
// ─── INTERNATIONAL REGIONS ───────────────────────────────────────────────────
// Paste these into your regions.ts array

  {
    slug: "europe",
    region: "international",
    name: "Europe",
    tagline: "A Continent of Endless Wonders",
    description:
      "From the canals of Venice to the fjords of Norway, Europe blends ancient history, architectural marvels, and vibrant cultures into one extraordinary tapestry of travel.",
    image: "/images/destinations/europe.jpg",
    accent: "#4a90d9",
    highlights: [
      "Iconic landmarks & UNESCO World Heritage Sites",
      "Diverse cultures, cuisines & languages",
      "Scenic train journeys & charming old towns",
    ],
    bestMonths: "Apr – Oct",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "vietnam",
    region: "international",
    name: "Vietnam",
    tagline: "Where Dragons & Legends Come Alive",
    description:
      "Emerald rice terraces, ancient lantern-lit phố, limestone karsts rising from jade bays — Vietnam is Southeast Asia's most vivid adventure, from Hanoi's chaos to Ho Chi Minh's hustle.",
    image: "/images/destinations/vietnam.jpg",
    accent: "#e84545",
    highlights: [
      "Ha Long Bay — 1,600+ limestone islands",
      "Hoi An Ancient Town by lantern light",
      "Motorbike trails through misty Sapa terraces",
    ],
    bestMonths: "Feb – Apr",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "bali",
    region: "international",
    name: "Bali",
    tagline: "Island of Gods & Infinite Sunsets",
    description:
      "Terraced rice paddies, Hindu temples draped in incense smoke, world-class surf breaks, and a wellness culture that heals the soul — Bali is not just a destination, it's a feeling.",
    image: "/images/destinations/bali.jpg",
    accent: "#f4a226",
    highlights: [
      "Tegallalang rice terraces & Tirta Empul temple",
      "Surfing & sunsets at Seminyak & Uluwatu",
      "Sacred Monkey Forest & Mount Batur sunrise trek",
    ],
    bestMonths: "Apr – Oct",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "thailand",
    region: "international",
    name: "Thailand",
    tagline: "Land of Smiles & Golden Temples",
    description:
      "Turquoise Andaman islands, Bangkok's neon-lit temples, Chang Mai's elephant sanctuaries, and street food that explodes with flavor. Thailand delivers everything — beaches, culture, and adventure.",
    image: "/images/destinations/thailand.jpg",
    accent: "#f7c948",
    highlights: [
      "Phi Phi Islands & Maya Bay snorkeling",
      "Grand Palace & Wat Pho in Bangkok",
      "Elephant sanctuary experience in Chiang Mai",
    ],
    bestMonths: "Nov – Mar",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "japan",
    region: "international",
    name: "Japan",
    tagline: "Ancient Traditions, Future Horizons",
    description:
      "Cherry blossoms over Kyoto temples, bullet trains slicing through Mount Fuji's shadow, ramen alleys and robot cafes — Japan is the world's most fascinating paradox of old and new.",
    image: "/images/destinations/japan.jpg",
    accent: "#e8294a",
    highlights: [
      "Cherry blossom season in Kyoto & Tokyo",
      "Mount Fuji at sunrise from Lake Kawaguchiko",
      "Hiroshima, Nara deer park & Osaka street food",
    ],
    bestMonths: "Mar – May, Oct – Nov",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "kenya",
    region: "international",
    name: "Kenya",
    tagline: "The Greatest Wildlife Show on Earth",
    description:
      "Witness the thundering Great Migration across the Masai Mara, walk with the Maasai, and watch Africa's Big Five in their raw, unfiltered savannah home. Kenya is wildlife at its most spectacular.",
    image: "/images/destinations/kenya.jpg",
    accent: "#c0392b",
    highlights: [
      "Great Wildebeest Migration — Masai Mara",
      "Big Five game drives at dawn",
      "Amboseli — elephants with Kilimanjaro backdrop",
    ],
    bestMonths: "Jul – Oct",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "georgia",
    region: "international",
    name: "Georgia",
    tagline: "Europe's Best Kept Secret",
    description:
      "Ancient cave cities, Caucasus mountain towers, world-famous wine valleys, and a warmth of hospitality unmatched anywhere. Georgia sits at the crossroads of East and West — and belongs to neither.",
    image: "/images/destinations/georgia.jpg",
    accent: "#d4541a",
    highlights: [
      "Kazbegi — Gergeti Trinity Church above the clouds",
      "Tbilisi's old town sulfur baths & balconied houses",
      "Vardzia cave monastery & Kakheti wine region",
    ],
    bestMonths: "May – Oct",
    startingPrice: 0,
    tripCount: 0,
    featured: false,
  },
  {
    slug: "sri-lanka",
    region: "international",
    name: "Sri Lanka",
    tagline: "The Pearl of the Indian Ocean",
    description:
      "Eight UNESCO World Heritage Sites packed into one teardrop island — ancient kingdoms, misty tea highlands, leopard-prowled national parks, and turquoise beaches make Sri Lanka a destination that punches far above its size.",
    image: "/images/destinations/sri-lanka.jpg",
    accent: "#f4a226",
    highlights: [
      "Sigiriya Rock Fortress & Dambulla Cave Temple",
      "Train ride through Ella's tea country",
      "Yala National Park — leopard sightings",
    ],
    bestMonths: "Dec – Mar",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "bhutan",
    region: "international",
    name: "Bhutan",
    tagline: "The Last Shangri-La",
    description:
      "The world's only carbon-negative country measures success in Gross National Happiness. Tiger's Nest monastery clings to a cliff, monks chant in dzong courtyards, and the Himalayas tower above it all.",
    image: "/images/destinations/bhutan.jpg",
    accent: "#f76c1c",
    highlights: [
      "Tiger's Nest (Paro Taktsang) — Bhutan's icon",
      "Punakha Dzong at the confluence of two rivers",
      "Bhutanese festivals — Thimphu Tsechu",
    ],
    bestMonths: "Mar – May, Sep – Nov",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "philippines",
    region: "international",
    name: "Philippines",
    tagline: "7,641 Islands of Pure Wonder",
    description:
      "Hidden lagoons of Palawan, the Chocolate Hills of Bohol, Intramuros' Spanish walls, and the warmest people in Asia — the Philippines is an archipelago that rewards every kind of explorer.",
    image: "/images/destinations/philippines.jpg",
    accent: "#0e76bc",
    highlights: [
      "El Nido & Coron — secret lagoons & shipwrecks",
      "Chocolate Hills & tarsiers in Bohol",
      "Mayon Volcano & Tubbataha Reef diving",
    ],
    bestMonths: "Nov – May",
    startingPrice: 0,
    tripCount: 0,
    featured: false,
  },
  {
    slug: "egypt",
    region: "international",
    name: "Egypt",
    tagline: "Walk Among the Pharaohs",
    description:
      "The Great Pyramids of Giza, the Sphinx, Luxor's Valley of the Kings, a felucca on the Nile at sunset — Egypt is where human civilization wrote its most enduring chapters.",
    image: "/images/destinations/egypt.jpg",
    accent: "#d4ac0d",
    highlights: [
      "Great Pyramids of Giza & the Sphinx",
      "Valley of the Kings — Tutankhamun's tomb",
      "Nile cruise from Luxor to Aswan",
    ],
    bestMonths: "Oct – Apr",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "iceland",
    region: "international",
    name: "Iceland",
    tagline: "Fire, Ice & the Northern Lights",
    description:
      "Waterfalls that crash into black sand beaches, geysers erupting from volcanic fields, the Aurora Borealis dancing across an Arctic sky — Iceland is nature at its most theatrical.",
    image: "/images/destinations/iceland.jpg",
    accent: "#3db89e",
    highlights: [
      "Northern Lights — Sep to Mar",
      "Golden Circle — Geysir, Gullfoss, Þingvellir",
      "Blue Lagoon geothermal spa",
    ],
    bestMonths: "Jun – Aug (midnight sun), Sep – Mar (Aurora)",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "turkey",
    region: "international",
    name: "Turkey",
    tagline: "Where Continents Collide",
    description:
      "Hot air balloons over Cappadocia's fairy chimneys, the Blue Mosque's minarets at dusk, turquoise coves of the Aegean coast, and bazaars smelling of spice — Turkey is two continents in one extraordinary country.",
    image: "/images/destinations/turkey.jpg",
    accent: "#c0392b",
    highlights: [
      "Cappadocia — balloon rides over fairy chimneys",
      "Istanbul's Hagia Sophia & Grand Bazaar",
      "Pamukkale's white terraced thermal pools",
    ],
    bestMonths: "Apr – Jun, Sep – Nov",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "kazakhstan",
    region: "international",
    name: "Kazakhstan",
    tagline: "The Steppe, the Mountains & the Silk Road",
    description:
      "Central Asia's largest country is a land of jaw-dropping contrasts — futuristic Astana, ancient Silk Road cities, Big Almaty Lake shimmering below snowy peaks, and nomadic culture alive in its yurt villages.",
    image: "/images/destinations/kazakhstan.jpg",
    accent: "#1a9e72",
    highlights: [
      "Big Almaty Lake & Tian Shan mountain treks",
      "Charyn Canyon — Kazakhstan's Grand Canyon",
      "Nur-Sultan's futuristic skyline",
    ],
    bestMonths: "May – Sep",
    startingPrice: 0,
    tripCount: 0,
    featured: false,
  },
  {
    slug: "maldives",
    region: "international",
    name: "Maldives",
    tagline: "Paradise Found, Above & Below",
    description:
      "Overwater bungalows on transparent lagoons, bioluminescent beaches glowing at midnight, manta ray diving, and sunsets that turn the horizon gold — the Maldives is the world's most romantic address.",
    image: "/images/destinations/maldives.jpg",
    accent: "#00b4d8",
    highlights: [
      "Overwater villas on crystal-clear lagoons",
      "Whale shark & manta ray snorkeling",
      "Bioluminescent beach at Vaadhoo Island",
    ],
    bestMonths: "Nov – Apr",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "south-africa",
    region: "international",
    name: "South Africa",
    tagline: "A World in One Country",
    description:
      "From the Big Five in Kruger to the Cape of Good Hope's wild cliffs, Table Mountain's flat-topped majesty, and the Cape Winelands' vineyard valleys — South Africa packs a dozen destinations into one.",
    image: "/images/destinations/south-africa.jpg",
    accent: "#2ecc71",
    highlights: [
      "Kruger National Park — Big Five safaris",
      "Table Mountain & Cape Peninsula drive",
      "Shark cage diving in Gansbaai",
    ],
    bestMonths: "May – Sep",
    startingPrice: 0,
    tripCount: 0,
    featured: false,
  },
  {
    slug: "singapore",
    region: "international",
    name: "Singapore",
    tagline: "The City That Has Everything",
    description:
      "A dazzling city-state where hawker centres serve some of the world's best food, Gardens by the Bay lights up the night, and Marina Bay Sands overlooks an entire skyline that seems conjured from the future.",
    image: "/images/destinations/singapore.jpg",
    accent: "#e84545",
    highlights: [
      "Gardens by the Bay — Supertree light show",
      "Universal Studios & Sentosa Island",
      "Hawker Centre food trail — Michelin-starred street food",
    ],
    bestMonths: "Feb – Apr",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "new-zealand",
    region: "international",
    name: "New Zealand",
    tagline: "Adventure Capital of the World",
    description:
      "Fiordland's dramatic fjords, Hobbiton's rolling green hills, Rotorua's geothermal chaos, and bungee jumps over turquoise gorges — New Zealand is where epic landscapes meet pure adrenaline.",
    image: "/images/destinations/new-zealand.jpg",
    accent: "#27ae60",
    highlights: [
      "Milford Sound — Fiordland's crown jewel",
      "Queenstown — bungee, skydive & ski",
      "Hobbiton Movie Set & Waitomo Glowworm Caves",
    ],
    bestMonths: "Dec – Feb (Summer), Jun – Aug (Ski)",
    startingPrice: 0,
    tripCount: 0,
    featured: false,
  },
  {
    slug: "france",
    region: "international",
    name: "France",
    tagline: "Art, Wine & the Art of Living",
    description:
      "The Eiffel Tower at golden hour, Provence's lavender fields in July, the châteaux of the Loire Valley, and patisseries on every Parisian corner — France perfected the art of beautiful living.",
    image: "/images/destinations/france.jpg",
    accent: "#2980b9",
    highlights: [
      "Paris — Eiffel Tower, Louvre & Montmartre",
      "French Riviera — Nice, Cannes, Monaco",
      "Lavender fields of Provence in July",
    ],
    bestMonths: "Apr – Jun, Sep – Oct",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "switzerland",
    region: "international",
    name: "Switzerland",
    tagline: "Peaks, Lakes & Pure Alpine Magic",
    description:
      "The Matterhorn reflected in Zermatt's mirror lakes, Interlaken's twin-lake valley, the Jungfraujoch at the top of Europe, and chocolate-box villages dusted with snow — Switzerland is a postcard come to life.",
    image: "/images/destinations/switzerland.jpg",
    accent: "#e74c3c",
    highlights: [
      "Jungfraujoch — Top of Europe at 11,333 ft",
      "Interlaken — paragliding & skydiving",
      "Zermatt & the iconic Matterhorn",
    ],
    bestMonths: "Jun – Sep (summer), Dec – Mar (ski)",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "spain",
    region: "international",
    name: "Spain",
    tagline: "Passion, Flamenco & Sun-Drenched Shores",
    description:
      "Gaudí's surreal Barcelona, flamenco in Granada's Sacromonte caves, the running of the bulls, and the Balearic Islands' electric nightlife — Spain lives louder, eats later, and celebrates harder than anywhere else.",
    image: "/images/destinations/spain.jpg",
    accent: "#f39c12",
    highlights: [
      "Barcelona — Sagrada Família & Park Güell",
      "Alhambra Palace in Granada",
      "Ibiza, Mallorca & Costa Brava beaches",
    ],
    bestMonths: "Apr – Jun, Sep – Oct",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "dubai",
    region: "international",
    name: "Dubai",
    tagline: "Where the Desert Meets the Sky",
    description:
      "The tallest building, the largest mall, the only 7-star hotel, and a desert where you ski indoors — Dubai is the world's most audacious city, a monument to human ambition rising from golden sands.",
    image: "/images/destinations/dubai.jpg",
    accent: "#d4ac0d",
    highlights: [
      "Burj Khalifa — top of the world view deck",
      "Desert safari — dune bashing & Bedouin camp",
      "Dubai Marina, Gold Souk & Burj Al Arab",
    ],
    bestMonths: "Oct – Apr",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "australia",
    region: "international",
    name: "Australia",
    tagline: "Big Land, Bigger Adventures",
    description:
      "The Great Barrier Reef, Uluru at dawn, koalas in eucalyptus forests, Sydney Opera House at dusk, and the Red Centre's ancient ochre plains — Australia is a continent-sized adventure unlike anywhere on Earth.",
    image: "/images/destinations/australia.jpg",
    accent: "#f4a226",
    highlights: [
      "Great Barrier Reef — world's largest coral system",
      "Sydney Harbour, Opera House & Bondi Beach",
      "Uluru — sacred red monolith at sunrise",
    ],
    bestMonths: "Sep – Nov, Mar – May",
    startingPrice: 0,
    tripCount: 0,
    featured: false,
  },
  {
    slug: "malaysia",
    region: "international",
    name: "Malaysia",
    tagline: "Truly Asia, All in One Place",
    description:
      "Petronas Towers piercing the KL sky, orangutans swinging through Borneo rainforests, Langkawi's emerald-sea islands, and a street food culture that rivals anywhere in Asia — Malaysia is Southeast Asia distilled.",
    image: "/images/destinations/malaysia.jpg",
    accent: "#e84545",
    highlights: [
      "Petronas Twin Towers & KL city break",
      "Orangutan watching in Sepilok, Borneo",
      "Langkawi Island — beaches & cable car",
    ],
    bestMonths: "Mar – Oct",
    startingPrice: 0,
    tripCount: 0,
    featured: false,
  },
  {
    slug: "mauritius",
    region: "international",
    name: "Mauritius",
    tagline: "Heaven Has a Street Address",
    description:
      "Crystal lagoons protected by the world's third-largest coral reef, waterfall-draped volcanic interiors, Franco-Creole cuisine, and the legendary Chamarel Coloured Earth — Mauritius is the Indian Ocean's finest jewel.",
    image: "/images/destinations/mauritius.jpg",
    accent: "#00b4d8",
    highlights: [
      "Seven Coloured Earths of Chamarel",
      "Le Morne & Blue Bay lagoon snorkeling",
      "Underwater waterfall illusion — Le Morne",
    ],
    bestMonths: "May – Dec",
    startingPrice: 0,
    tripCount: 0,
    featured: false,
  },
];

export default DESTINATIONS;

// ── Helpers ───────────────────────────────────────────────────────
export const getDestination = (slug: string) =>
  DESTINATIONS.find((d) => d.slug === slug);

export const getDestinationsByRegion = (region: string) =>
  DESTINATIONS.filter((d) => d.region === region);

export const getFeaturedDestinations = () =>
  DESTINATIONS.filter((d) => d.featured);
