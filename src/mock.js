// Mock data for ProDyum Entertainments

export const projects = [
  {
    id: 1,
    title: "Shadows of the Past",
    type: "Movie",
    year: "2024",
    status: "Released",
    category: "movies",
    logline: "A journalist uncovers dark secrets that threaten to destroy everything she holds dear.",
    synopsis: "When investigative journalist Priya stumbles upon a decades-old conspiracy, she finds herself entangled in a web of lies, corruption, and danger. As she digs deeper, the past comes back to haunt her, forcing her to confront her own demons while racing against time to expose the truth.",
    credits: {
      producer: "ProDyum Entertainments",
      director: "Vikram Reddy",
      writer: "Anjali Menon",
      cast: "Samantha, Vijay Devarakonda, Nani",
      dop: "Rathnavelu",
      editor: "Sreekar Prasad",
      music: "A.R. Rahman",
      vfx: "Red Chillies VFX",
      sound: "Resul Pookutty"
    },
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800"
  },
  {
    id: 2,
    title: "Urban Legends",
    type: "Web Series",
    year: "2024",
    status: "Released",
    category: "web-series",
    logline: "Eight episodes exploring the supernatural stories hidden in Hyderabad's urban landscape.",
    synopsis: "Each episode unveils a different urban legend from the streets of Hyderabad. From haunted metro stations to cursed cafes, this anthology series blends horror, mystery, and local folklore to create an unforgettable viewing experience that will make you question what lurks in the shadows of the city.",
    credits: {
      producer: "ProDyum Entertainments",
      director: "Sandeep Vanga",
      writer: "Multiple Writers",
      cast: "Ensemble Cast",
      dop: "Manoj Paramahamsa",
      editor: "ProDyum Post Team",
      music: "Anirudh Ravichander",
      vfx: "ProDyum VFX",
      sound: "ProDyum Sound"
    },
    thumbnail: "https://images.unsplash.com/photo-1574267432644-f74f8ec1e93b?w=800"
  },
  {
    id: 3,
    title: "The Last Dance",
    type: "Short Film",
    year: "2023",
    status: "Released",
    category: "short-films",
    logline: "An aging dancer gets one final chance to perform on the stage that made her famous.",
    synopsis: "Maya, a once-celebrated classical dancer, receives an unexpected invitation to perform at the theatre where her career began 40 years ago. As she prepares for what might be her final performance, she reflects on the sacrifices, triumphs, and the passion that defined her life in dance.",
    credits: {
      producer: "ProDyum Entertainments",
      director: "Nandini Reddy",
      writer: "Trivikram Srinivas",
      cast: "Revathi, Aditi Rao Hydari",
      dop: "PC Sreeram",
      editor: "ProDyum Post Team",
      music: "Ilaiyaraaja",
      vfx: "TBD",
      sound: "ProDyum Sound"
    },
    thumbnail: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=800"
  },
  {
    id: 4,
    title: "Neon Nights",
    type: "Music Video",
    year: "2024",
    status: "Released",
    category: "music-videos",
    logline: "A visual spectacle celebrating youth, energy, and the electric pulse of city nightlife.",
    synopsis: "This high-energy music video captures the essence of modern urban youth culture through stunning visuals, dynamic choreography, and cutting-edge VFX. Shot across Hyderabad's most iconic nighttime locations, it's a celebration of freedom, friendship, and living in the moment.",
    credits: {
      producer: "ProDyum Entertainments",
      director: "Anil Ravipudi",
      artist: "Sid Sriram",
      dop: "Jomon T. John",
      editor: "ProDyum Post Team",
      vfx: "ProDyum VFX",
      sound: "ProDyum Sound"
    },
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800"
  },
  {
    id: 5,
    title: "Echoes of Tomorrow",
    type: "Movie",
    year: "2025",
    status: "Upcoming",
    category: "movies",
    logline: "In a dystopian future, a group of rebels fights to preserve the last remnants of humanity.",
    synopsis: "Set in 2075, Earth has become a wasteland controlled by an authoritarian regime. A small band of freedom fighters discovers an ancient technology that could restore hope to humanity. But as they race to unlock its secrets, they must confront powerful enemies and their own inner conflicts in this epic sci-fi thriller.",
    credits: {
      producer: "ProDyum Entertainments",
      director: "S.S. Rajamouli",
      writer: "Vijayendra Prasad",
      cast: "TBD",
      dop: "Senthil Kumar",
      editor: "TBD",
      music: "M.M. Keeravani",
      vfx: "Makuta VFX",
      sound: "TBD"
    },
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800"
  },
  {
    id: 6,
    title: "Café Stories",
    type: "Web Series",
    year: "2025",
    status: "Upcoming",
    category: "web-series",
    logline: "Six strangers' lives intersect at a neighborhood café, revealing interconnected stories of love and loss.",
    synopsis: "Set in a cozy Hyderabad café, this heartwarming series follows the lives of six regulars whose stories gradually intertwine. From a struggling writer to a corporate executive questioning her choices, each character's journey explores themes of connection, identity, and finding meaning in everyday moments.",
    credits: {
      producer: "ProDyum Entertainments",
      director: "Nag Ashwin",
      writer: "TBD",
      cast: "TBD",
      dop: "TBD",
      editor: "ProDyum Post Team",
      music: "TBD",
      vfx: "ProDyum VFX",
      sound: "ProDyum Sound"
    },
    thumbnail: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800"
  }
];

export const services = [
  {
    id: 1,
    category: "Production",
    title: "Movies",
    description: "Feature films for OTT and theatrical release with comprehensive development, casting, production, and delivery services.",
    features: ["Script Development", "Casting", "Line Production", "Post & Delivery"]
  },
  {
    id: 2,
    category: "Production",
    title: "Web Series",
    description: "Original episodic content from concept to delivery, including season planning and marketing support.",
    features: ["Concept Development", "Season Planning", "Episodic Production", "QC & Delivery"]
  },
  {
    id: 3,
    category: "Production",
    title: "Short Films & Music Videos",
    description: "Complete production for short-form content, branded material, and festival-ready outputs.",
    features: ["Concept to Completion", "Branded Content", "Trailers & Posters", "Festival Outputs"]
  },
  {
    id: 4,
    category: "Post-Production",
    title: "Editing & Conform",
    description: "Professional editing services with conform and assembly for seamless storytelling.",
    features: ["Online Editing", "Offline Editing", "Conform", "Assembly"]
  },
  {
    id: 5,
    category: "Post-Production",
    title: "DI & Color Grading",
    description: "Digital Intermediate and color grading to achieve the perfect cinematic look.",
    features: ["Color Grading", "DI Suite", "Look Development", "HDR Mastering"]
  },
  {
    id: 6,
    category: "Post-Production",
    title: "VFX & Title Design",
    description: "Visual effects and title design to enhance your visual storytelling.",
    features: ["VFX Compositing", "Motion Graphics", "Title Design", "3D Animation"]
  },
  {
    id: 7,
    category: "Post-Production",
    title: "Sound Design & Mix",
    description: "Complete audio post-production including ADR, Foley, and 5.1 surround mix.",
    features: ["ADR", "Foley", "Sound Design", "5.1 Mix"]
  },
  {
    id: 8,
    category: "Delivery",
    title: "Distribution & QC",
    description: "Master delivery for all platforms with quality control and multiple format support.",
    features: ["OTT Specs", "DCP Prep", "Subtitles/CC", "Language Versions"]
  }
];

export const teamMembers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Founder & Producer",
    bio: "With over 15 years in the industry, Rajesh brings a wealth of experience in film production and distribution.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Creative Director",
    bio: "Award-winning director with a passion for storytelling and a keen eye for visual aesthetics.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
  },
  {
    id: 3,
    name: "Arun Reddy",
    role: "Head of Post-Production",
    bio: "Leading our technical team with expertise in DI, VFX, and sound design for premium content.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Venkat Reddy",
    role: "Independent Producer",
    content: "ProDyum's transparent approach and exceptional post-production capabilities made our project a success. Highly recommended!",
    rating: 5
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    role: "OTT Content Head",
    content: "Their attention to detail and commitment to quality is unmatched. They delivered our web series ahead of schedule with outstanding results.",
    rating: 5
  },
  {
    id: 3,
    name: "Karthik Subramanian",
    role: "Director",
    content: "Working with ProDyum was a dream. Their in-house post-production team understood my vision perfectly and brought it to life.",
    rating: 5
  }
];