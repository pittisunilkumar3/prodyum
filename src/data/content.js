/**
 * ProDyum site content — CORRECTED per client brief (30 Sep 2026 review).
 * All facts below are Founder-confirmed values from the implementation brief
 * (sections 10 & 11). Unsupported claims, unverified projects, salary ranges
 * and invented vacancies have been removed.
 */

export const COMPANY_INFO = {
  // Legal entity (Founder-confirmed registered IT company name)
  legalName: "ProDyum IT Private Limited",
  name: "ProDyum IT Private Limited",
  domain: "prodyum.in",
  founder: "Srikanth Singam",
  cin: "U62090TS2024PTC185222",
  incorporated: "07-05-2024",

  // Operating office (verified via live Google Maps + LinkedIn)
  headquarters: "Flat 503, 5th Floor, Mandadi One Apartments, Gokul Plots, 13th Phase Road, KPHB Colony, Kukatpally, Hyderabad, Telangana 500085, India",
  addressLines: [
    "Flat 503, 5th Floor, Mandadi One Apartments",
    "Gokul Plots, 13th Phase Road, KPHB Colony",
    "Kukatpally, Hyderabad, Telangana 500085, India",
  ],
  pincode: "500085",
  mapsUrl: "https://maps.google.com/?cid=1377512955582297176",

  // Office hours (live LinkedIn About)
  hours: "Monday – Saturday: 10:00 AM – 7:00 PM • Sunday: Closed",

  // Contacts (Founder-confirmed)
  email: "contact@prodyum.in",
  itEmail: "it@prodyum.in",
  careersEmail: "hr@prodyum.in",
  entertainmentEmail: "entertainment@prodyum.in",
  mediaEmail: "media@prodyum.in",
  castingEmail: "entertainment@prodyum.in",
  phone: "+91 9949590033", // IT phone & WhatsApp + recruitment number
  itPhone: "+91 9949590033",
  entertainmentPhone: "+91 9550989977",
  listingPhone: "+91 9100077001", // Google Maps listing number (kept distinct)
  itWhatsapp: "919949590033",
  entertainmentWhatsapp: "919550989977",

  tagline: "Build. Promote. Grow. Entertain.",
  badgeSubtitle: "HYDERABAD • DIGITAL MARKETING • CREATIVE SERVICES • ENTERTAINMENT",

  // Brand-wise verified social accounts (from live LinkedIn company About)
  socials: {
    linkedin: "https://in.linkedin.com/company/prodyumit",
    instagram: "https://www.instagram.com/prodyum_it/",
    facebook: "https://www.facebook.com/profile.php?id=61559644906402",
    x: "https://x.com/ProDyumIT",
    youtube: "https://www.youtube.com/@prodyumentertainments",
  },
  brandSocials: {
    it: {
      instagram: "https://www.instagram.com/prodyum_it/",
      facebook: "https://www.facebook.com/profile.php?id=61559644906402",
      linkedin: "https://in.linkedin.com/company/prodyumit",
      x: "https://x.com/ProDyumIT",
      website: "https://prodyum.in",
    },
    entertainments: {
      instagram: "https://www.instagram.com/prodyumentertainments/",
      facebook: "https://www.facebook.com/profile.php?id=61575092141948",
      youtube: "https://www.youtube.com/@prodyumentertainments",
      x: "https://x.com/ProdyumE49496",
    },
    media: {
      instagram: "https://www.instagram.com/prodyum_media/",
      facebook: "https://www.facebook.com/profile.php?id=61564503903036",
      youtube: "https://www.youtube.com/@prodyummedia-b9x",
    },
    kavya: {
      youtube: "https://youtube.com/@kavyasistla",
      instagram: "https://www.instagram.com/kavyas_tape_recorder",
      facebook: "https://www.facebook.com/share/19RWdSvu7r/",
    },
  },
};

// Direct, verified channel URLs (no search-result links).
export const YOUTUBE_CHANNELS = [
  {
    id: "entertainments",
    name: "ProDyum Entertainments",
    description: "Films · Web Series · Stories",
    url: "https://www.youtube.com/@prodyumentertainments",
  },
  {
    id: "media",
    name: "ProDyum Media",
    description: "Infotainment · Interviews · Podcasts",
    url: "https://www.youtube.com/@prodyummedia-b9x",
  },
  {
    id: "kavya",
    name: "Kavya’s Tape Recorder",
    description: "Devotional · Carnatic · Light Music",
    url: "https://youtube.com/@kavyasistla",
  },
];

// Factual highlights only — no performance claims.
export const IT_METRICS = [
  { value: "3", label: "Brand Verticals", detail: "IT · Media · Entertainments" },
  { value: "8", label: "Core Services", detail: "From social media to websites" },
  { value: "2024", label: "Incorporated", detail: "ProDyum IT Private Limited" },
  { value: "Hyderabad", label: "Based in", detail: "Kukatpally, Telangana" },
];

// The eight approved services (client brief, section 2).
export const IT_SERVICES = [
  {
    id: "social-media",
    title: "Social Media Management",
    subtitle: "Instagram & Facebook",
    description: "Content planning, creative production, publishing and reporting for Instagram and Facebook.",
    metrics: "Monthly content calendars",
    tags: ["Content Planning", "Design", "Publishing", "Reports"],
    icon: "Share2",
    accent: "cyan",
    highlight: "Consistent Presence",
  },
  {
    id: "graphic-design",
    title: "Graphic Design and Branding",
    subtitle: "Posters · Identity · Print",
    description: "Posters, carousels, brochures and brand identity materials.",
    metrics: "Editable source files",
    tags: ["Posters", "Carousels", "Brochures", "Brand Identity"],
    icon: "PenTool",
    accent: "violet",
    highlight: "Original Design",
  },
  {
    id: "video-editing",
    title: "Video Editing and Reels",
    subtitle: "Short-form & Promotional",
    description: "Short videos, advertisements and promotional edits.",
    metrics: "Reels · Ads · Promos",
    tags: ["Reels", "Ad Creatives", "Promotional Edits"],
    icon: "Clapperboard",
    accent: "amber",
    highlight: "Scroll-stopping Edits",
  },
  {
    id: "product-photo",
    title: "Product Photography and Video",
    subtitle: "Shoots & Assets",
    description: "Planned shoots and edited assets for products and business promotions.",
    metrics: "Studio & on-location",
    tags: ["Product Shoots", "Edited Assets", "Promotions"],
    icon: "Camera",
    accent: "cyan",
    highlight: "Planned Shoots",
  },
  {
    id: "meta-google-ads",
    title: "Meta and Google Ads",
    subtitle: "Campaign Setup & Optimisation",
    description: "Campaign setup, optimisation and enquiry measurement.",
    metrics: "Transparent reporting",
    tags: ["Meta Ads", "Google Ads", "Enquiry Tracking"],
    icon: "TrendingUp",
    accent: "violet",
    highlight: "Goal-focused Campaigns",
  },
  {
    id: "seo",
    title: "SEO and Website Optimisation",
    subtitle: "Search Visibility",
    description: "Technical improvements, content optimisation and local search visibility.",
    metrics: "Local & organic search",
    tags: ["Technical SEO", "Content", "Local Search"],
    icon: "Compass",
    accent: "cyan",
    highlight: "Sustainable Visibility",
  },
  {
    id: "web-dev",
    title: "Website Development",
    subtitle: "Business Sites & E-commerce",
    description: "Business websites, landing pages and e-commerce development.",
    metrics: "Business · Landing · Store",
    tags: ["Business Websites", "Landing Pages", "E-commerce"],
    icon: "Code2",
    accent: "amber",
    highlight: "Websites that Work",
  },
  {
    id: "youtube-management",
    title: "YouTube Management",
    subtitle: "Channel Growth",
    description: "Titles, thumbnails, metadata, publishing and channel reviews.",
    metrics: "End-to-end channel care",
    tags: ["Titles", "Thumbnails", "Metadata", "Reviews"],
    icon: "Youtube",
    accent: "violet",
    highlight: "Channel Care",
  },
];

// Production slate: hidden pending Founder verification of every entry.
// (Chronicles of Deccan, Echoes of Silence, Project Kukatpally and
//  Rhythm of Telangana were removed as unverified — brief §1.)
export const ENTERTAINMENTS_SLATE = [];

// The two approved, currently-open roles (client brief, section 4).
// No public salary ranges. Applications: hr@prodyum.in / WhatsApp +91 9949590033.
export const CAREER_LISTINGS = [
  {
    id: "video-editor-colourist",
    title: "Video Editor and Colourist",
    vertical: "Creative & IT",
    department: "Video · All Three Brands",
    type: "Full-Time • On-site • Hyderabad",
    experience: "Experience required",
    salary: "As per discussion",
    overview: "Create digital ads, reels, narrative edits and media videos across ProDyum IT, Entertainments and Media. Responsibilities include editing, colour correction and grading, dialogue cleanup, captions, organised project files and final exports.",
    requirements: [
      "Relevant portfolio is mandatory.",
      "Premiere Pro and DaVinci Resolve.",
      "Storytelling, continuity and reliable delivery.",
      "Advanced VFX and final cinema mastering are separate specialist requirements.",
    ],
    applyNote: "Send your CV and portfolio to hr@prodyum.in or WhatsApp +91 9949590033. Include your location, relevant experience, expected salary and joining availability. Identify your own contribution to the submitted work.",
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    vertical: "Creative & IT",
    department: "Design · All Three Brands",
    type: "Full-Time • On-site • Hyderabad",
    experience: "Experience required",
    salary: "As per discussion",
    overview: "Create original posters, carousels, thumbnails, branding and campaign assets across all three brands. Responsibilities include readable typography, consistent branding, film and media artwork, website assets and editable-source handover.",
    requirements: [
      "Relevant portfolio is mandatory.",
      "Photoshop, Illustrator and Canva.",
      "Composition and careful quality checking.",
      "Software licence access is confirmed during onboarding.",
    ],
    applyNote: "Send your CV and portfolio to hr@prodyum.in or WhatsApp +91 9949590033. Include your location, relevant experience, expected salary and joining availability. Identify your own contribution to the submitted work.",
  },
];

// Service dropdown options for the enquiry form (all eight services).
export const ENQUIRY_SERVICES = [
  "Social Media Management",
  "Graphic Design and Branding",
  "Video Editing and Reels",
  "Product Photography and Video",
  "Meta and Google Ads",
  "SEO and Website Optimisation",
  "Website Development",
  "YouTube Management",
];

// Founder-approved IT budget options (brief §3). Monthly vs project basis is
// clarified on the call; ad spend is always separate.
export const BUDGET_OPTIONS_IT = [
  "Below ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1 lakh",
  "₹1 lakh+",
  "Not decided",
];

export const TIMELINE_OPTIONS = ["Immediate", "Within one month", "Within three months", "Exploring"];
