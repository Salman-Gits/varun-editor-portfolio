export interface ProjectItem {
  id: string;
  category: string;
  categoryTag: string;
  title: string;
  subtitle: string;
  description: string;
  aspectRatio: '16:9' | '9:16' | '4:3';
  image: string;
  previewVideoUrl?: string; // Optional local or remote mp4 preview
  tools: string[];
  deliverables: string[];
  featured?: boolean;
}

export interface ServiceItem {
  number: string;
  title: string;
  shortDesc: string;
  deliverables: string[];
  idealFor: string;
}

export interface WorkflowStage {
  number: string;
  title: string;
  description: string;
  substeps: string[];
}

export interface PackageItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  scope: string;
  highlighted?: boolean;
}

export const BRAND_CONFIG = {
  name: "VARUN EDITOR",
  tagline: "VIDEO EDITING • REELS • VIDEO SHOOTS",
  heroHeadline: "YOUR VISION. MY CREATION.",
  supportingLine: "CREATIVE MEDIA • VISUAL STORYTELLING • CINEMATIC FINISH",
  location: "Chennai, Tamil Nadu",
  year: "2026",
  quote: "Visuals with a purpose.",
  signOff: "YOUR STORY. YOUR STYLE. YOUR FRAME.",

  // Contact configurations
  instagramHandle: "@_.stylish_stud.__",
  instagramUrl: "https://www.instagram.com/_.stylish_stud.__?rpxt=MTgzcGp3ZGY1dThsZQ==",
  whatsappNumber: "+91 63793 84156",
  whatsappMessage: "Hi Varun, I'd like to discuss a video editing project.",
  whatsappUrl: "https://wa.me/916379384156?text=Hi%20Varun%2C%20I%27d%20like%20to%20discuss%20a%20video%20editing%20project.",
  emailPlaceholder: "contact@varuneditor.com",
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "cinematic-video-editing",
    category: "Video Editing",
    categoryTag: "01 / NARRATIVE CUT",
    title: "Cinematic Story Cuts & Pacing",
    subtitle: "Story-led narrative flow, sound design & 4K grade",
    description:
      "Longer-form video edits with careful attention to rhythm, pacing, and story structure. Includes full dialogue cleanup, sound design, and natural colour grading ready for YouTube or commercial release.",
    aspectRatio: "16:9",
    image: "/images/project-cinematic.jpg",
    tools: ["Premiere Pro", "DaVinci Resolve", "Audition"],
    deliverables: ["4K Master ProRes/H.264", "Clean Dialogue & Audio Mix", "Platform-Ready Exports"],
    featured: true,
  },
  {
    id: "reels-short-form",
    category: "Reels & Short Content",
    categoryTag: "02 / HIGH RETENTION",
    title: "Instagram Reels & Social Cuts",
    subtitle: "Beat sync, dynamic typography & viral hooks",
    description:
      "Fast-paced vertical videos tailored for Instagram and YouTube Shorts. Cut on the beat with clean captions, punchy sound cues, and pacing that holds viewer attention from start to finish.",
    aspectRatio: "9:16",
    image: "/images/project-reels.jpg",
    tools: ["Premiere Pro", "After Effects", "CapCut Pro"],
    deliverables: ["Vertical 1080x1920 Exports", "Styled Captions & Sound Effects", "Cover Frame Options"],
    featured: true,
  },
  {
    id: "event-birthday-shoots",
    category: "Video Shoots",
    categoryTag: "03 / LIVE COVERAGE",
    title: "Event & Birthday Coverage",
    subtitle: "Candid emotional highlights & cinematic coverage",
    description:
      "On-location filming for birthdays, private gatherings, and creative events across Chennai. Focused on candid reactions, warm natural lighting, and unscripted moments that tell the real story of the day.",
    aspectRatio: "4:3",
    image: "/images/project-event.jpg",
    tools: ["Sony Cinema Line", "Gimbal Stablization", "Prime Lenses"],
    deliverables: ["1–3 Min Highlight Film", "Vertical Social Cutdowns", "Complete Footage Backup"],
    featured: true,
  },
  {
    id: "creative-visual-shoots",
    category: "Creative Media",
    categoryTag: "04 / CONCEPT SHOOT",
    title: "Creative Portrait & Lifestyle Shoots",
    subtitle: "Atmospheric framing & modern brand imagery",
    description:
      "Concept-driven shoots for artists, creators, and local brands. Guided visual direction on location or in studio, focusing on mood, styling, and distinctive personality.",
    aspectRatio: "4:3",
    image: "/images/varun-retro.jpg",
    tools: ["35mm / Digital Hybrid", "Directional Lighting", "Lightroom Classic"],
    deliverables: ["High-Res Graded Stills", "Behind-The-Scenes Video", "Web & Print Ready Files"],
  },
  {
    id: "poster-social-design",
    category: "Poster & Design",
    categoryTag: "05 / KEY ART",
    title: "Key Art Posters & Story Layouts",
    subtitle: "Branded social graphics, typography & thumbnails",
    description:
      "Movie-style promotional posters, custom YouTube thumbnails, and social announcement graphics that give your release a striking, cohesive identity.",
    aspectRatio: "16:9",
    image: "/images/project-cinematic.jpg",
    tools: ["Photoshop", "Illustrator", "After Effects"],
    deliverables: ["Print-Ready High Res Art", "Custom Social Media Kit", "Editable Source Assets"],
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    number: "01",
    title: "REELS & SHORT VIDEOS",
    shortDesc: "Fast-paced vertical videos for Instagram and Shorts with sound design, beat sync, and styled subtitles.",
    deliverables: ["0–60s vertical format cuts", "Beat-matched speed ramps", "Custom on-screen captions", "Layered sound effects"],
    idealFor: "Creators, personal brands, fashion labels & small businesses.",
  },
  {
    number: "02",
    title: "VIDEO EDITING",
    shortDesc: "Full-length video editing with tight pacing, clear dialogue balancing, audio leveling, and narrative structure.",
    deliverables: ["Full narrative assembly", "Dialogue cleanup & audio balance", "Music curation & sound design", "Full HD / 4K master export"],
    idealFor: "YouTube creators, brand stories, music videos & documentaries.",
  },
  {
    number: "03",
    title: "PHOTO & VIDEO SHOOTS",
    shortDesc: "On-location filming and photography for birthdays, intimate celebrations, and creative portrait sessions in Chennai.",
    deliverables: ["On-location 4K camera gear", "Natural & creative lighting setup", "Audio recording & gimbal work", "Candid color-graded stills"],
    idealFor: "Birthday milestones, family events, creator portraits & brand lookbooks.",
  },
  {
    number: "04",
    title: "POSTER & SOCIAL DESIGN",
    shortDesc: "Custom promotional posters, YouTube thumbnails, and branded layout graphics that make your project stand out.",
    deliverables: ["Film-style title & poster art", "Click-worthy YouTube thumbnails", "Instagram story & carousel layouts", "Vector graphic elements"],
    idealFor: "Music releases, event promotions, YouTube channels & brand campaigns.",
  },
  {
    number: "05",
    title: "COLOUR GRADING",
    shortDesc: "Professional colour correction and look creation to give your raw camera footage depth, balance, and mood.",
    deliverables: ["Log/RAW correction & normalization", "Skin tone balancing", "Custom film-emulation look", "Shot-to-shot color matching"],
    idealFor: "Cinematographers, editors with raw footage & commercial directors.",
  },
  {
    number: "06",
    title: "CUSTOM CREATIVE WORK",
    shortDesc: "Tailored creative production combining shooting, editing, and visual direction for one-off projects.",
    deliverables: ["Collaborative creative planning", "Custom shoot & edit schedule", "Multi-platform distribution cuts", "Direct communication throughout"],
    idealFor: "Unique projects, one-off brand collaborations & special productions.",
  },
];

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    number: "01",
    title: "DISCOVER",
    description: "We talk through your idea, references, timeline, and where the video will be shared.",
    substeps: ["Discuss creative vision & tone", "Review reference videos & moodboards", "Define audience & target platform"],
  },
  {
    number: "02",
    title: "PLAN",
    description: "We agree on the project scope, footage transfer or shoot date, deadlines, and deliverables.",
    substeps: ["Set milestone deadlines & review rounds", "Coordinate footage handoff or shoot details", "Finalize transparent scope & deliverables"],
  },
  {
    number: "03",
    title: "CREATE",
    description: "I handle the shooting or editing, focusing on pacing, story flow, sound design, and colour.",
    substeps: ["Cinematic capture or rough cut assembly", "Sound design, motion sync & color pass", "Refining transitions & micro-details"],
  },
  {
    number: "04",
    title: "DELIVER",
    description: "You review the draft, we make any needed adjustments, and I deliver the final files ready to post.",
    substeps: ["Collaborative review & minor polish", "High-bitrate final rendering", "Ready-to-upload files and project archive"],
  },
];

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: "reels-edit",
    name: "REELS EDIT",
    tagline: "For creators & small businesses",
    description: "Ideal if you have raw mobile or camera clips and need a single, punchy vertical reel that keeps viewers watching.",
    features: [
      "Up to 60 seconds vertical cut",
      "Dynamic beat sync & sound effects",
      "Styled on-screen subtitles",
      "Color grading & exposure balance",
      "1 revision round included",
    ],
    scope: "Single short-form video edit",
  },
  {
    id: "content-bundle",
    name: "CONTENT BUNDLE",
    tagline: "Best value for regular posting",
    description: "A batch of short-form videos edited with a consistent visual style, designed to keep your feed active and engaging.",
    features: [
      "Batch of 4–8 short-form edits",
      "Consistent visual tone & typography",
      "Hook analysis & pacing strategy",
      "Thumbnail cover designs included",
      "Priority turnaround schedule",
    ],
    scope: "Multi-video social media suite",
    highlighted: true,
  },
  {
    id: "event-shoot",
    name: "EVENT SHOOT",
    tagline: "For birthdays & celebrations",
    description: "Candid, unobtrusive video and photo coverage capturing the real emotions and key moments of your event in Chennai.",
    features: [
      "On-location coverage in Chennai",
      "Cinematic highlight video (1-3 mins)",
      "High-res candid color-graded photos",
      "Full raw media archive backup",
      "Quick social preview within 48h",
    ],
    scope: "Live event coverage & post-production",
  },
  {
    id: "custom-project",
    name: "CUSTOM PROJECT",
    tagline: "For unique or long-form briefs",
    description: "Tailored for projects that need bespoke media direction, long-form documentary edits, or commercial shoots.",
    features: [
      "Custom shooting & editing schedule",
      "Multi-camera setup or 4K master grade",
      "Full audio mix & original score sync",
      "Poster and key art collateral",
      "Direct creative direction sessions",
    ],
    scope: "End-to-end bespoke production",
  },
];
