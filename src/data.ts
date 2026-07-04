import { Course, Faculty, Testimonial, GalleryItem } from "./types";

export const COURSES: Course[] = [
  {
    id: "keyboard-piano",
    name: "Keyboard & Piano",
    tagline: "Master the keys from classical masterpieces to contemporary play.",
    description: "Comprehensive lessons in piano technique, reading notation, chord progression, and expressiveness, with dual tracks in Classical and Electronic Keyboard.",
    longDescription: "Our Keyboard & Piano program is meticulously designed for students of all ages. Under the guidance of our expert faculty, you will explore classical compositions by Bach, Mozart, and Beethoven, as well as modern keyboards, synthesis, and music sequencing. We provide comprehensive preparation for the prestigious Trinity College London and ABRSM graded exams.",
    iconName: "Piano", // Custom Lucide or custom SVG mapped later
    difficulty: "All Levels",
    duration: "Grade-wise (1 to 8) / 12 Months per Grade",
    exams: ["Trinity College London", "ABRSM"],
    outcomes: [
      "Read complex musical sheets and play with both hands independently",
      "Understand scales, arpeggios, and chord structures",
      "Develop absolute dynamics control and expressive phrasing",
      "Confidently perform classical, pop, jazz, and fusion repertoire"
    ],
    schedule: "2 sessions per week (1 hour each)"
  },
  {
    id: "violin",
    name: "Violin",
    tagline: "Elegance in strings, posture, and orchestral bow control.",
    description: "Learn the art of the violin. Emphasizing correct posture, intonation, bowing techniques, and expressive performance practices.",
    longDescription: "The violin is one of the most expressive acoustic instruments. Our curriculum emphasizes the Suzuki method combined with traditional European pedagogies, helping students develop a clean tone, perfect pitch, and natural physical mechanics. From basic bow holds to advanced vibrato and high-position shifts, we guide you step-by-step through standard concertos and grades.",
    iconName: "Violin",
    difficulty: "All Levels",
    duration: "Grade-wise (1 to 8)",
    exams: ["Trinity College London", "ABRSM"],
    outcomes: [
      "Master correct body posture and precise fingerboard positioning",
      "Develop exquisite bow speed, pressure, and angle controls",
      "Achieve near-perfect intonation and dynamic ear training",
      "Perform classical solos, sonatas, and ensemble pieces"
    ],
    schedule: "2 sessions per week (1 hour each)"
  },
  {
    id: "guitar",
    name: "Guitar",
    tagline: "Strum, pick, and shred in Acoustic, Classical, and Electric styles.",
    description: "Strumming patterns, fingerstyle, soloing, chord vocabulary, and scales across Acoustic, Classical, and Electric guitars.",
    longDescription: "Whether you want to play classical nylon-string pieces, strum fingerstyle acoustic ballads, or solo on an electric guitar, our courses cover it all. You'll study music theory, scale shapes, fretboard visualization, and rhythmic timing. We prepare classical guitarists for Trinity and ABRSM grades, and rock/pop players for Trinity Rock & Pop certifications.",
    iconName: "Guitar",
    difficulty: "All Levels",
    duration: "Grade-wise (1 to 8)",
    exams: ["Trinity College London", "ABRSM", "Trinity Rock & Pop"],
    outcomes: [
      "Perform complex fingerstyle arrangements and fluid strumming",
      "Fluently read standard sheet music and guitar tablatures (tabs)",
      "Play major/minor scales, pentatonics, modes, and lead solos",
      "Improvise over rhythm sections and construct creative song covers"
    ],
    schedule: "2 sessions per week (1 hour each)"
  },
  {
    id: "drums",
    name: "Drums (Full Kit)",
    tagline: "Build rock-solid tempo, coordination, and explosive drum fills.",
    description: "Learn the absolute fundamentals of the full acoustic drum kit, including rudiments, timing, syncopation, and drum soloing.",
    longDescription: "Get behind our professional Pearl acoustic kits and learn the physical coordination needed to drive the band. Students study rudiments, limb independence, complex syncopations, and double-bass patterns. We train you in a wide array of genres: rock, jazz, funk, Latin, and fusion, with structured prep for Trinity Rock & Pop drum exams.",
    iconName: "Drums",
    difficulty: "All Levels",
    duration: "Grade-wise (1 to 8)",
    exams: ["Trinity College London (Rock & Pop / Classical)"],
    outcomes: [
      "Master the 40 essential snare drum rudiments and stick control",
      "Develop complete 4-limb independence and a steady inner clock",
      "Play grooves in various time signatures (4/4, 3/4, 6/8, and odd times)",
      "Perform high-energy drum solos and play seamlessly along to tracks"
    ],
    schedule: "2 sessions per week (1 hour each)"
  },
  {
    id: "vocal",
    name: "Vocal Training",
    tagline: "Unlock the full potential of your natural voice with pitch perfect power.",
    description: "Vocal range expansion, breath management, pitch control, and performance styling in classical and contemporary music.",
    longDescription: "Our vocal program caters to both classical singers and modern pop/rock enthusiasts. We teach the physical science of voice production, starting with core breath support (diaphragmatic breathing), vocal safety, pitch accuracy, resonance selection, and performance articulation. Get ready to shine on stage or ace your Trinity Singing and Rock & Pop exams.",
    iconName: "Mic",
    difficulty: "All Levels",
    duration: "Grade-wise (1 to 8)",
    exams: ["Trinity College London (Classical / Rock & Pop)", "ABRSM"],
    outcomes: [
      "Significantly expand your comfortable singing range with safety",
      "Achieve precise pitch alignment and effortless breath support",
      "Understand registers: head voice, chest voice, and mixed registers",
      "Deliver emotionally moving performances on stage with confidence"
    ],
    schedule: "2 sessions per week (1 hour each)"
  },
  {
    id: "music-theory",
    name: "Music Theory",
    tagline: "The building blocks of music—read, analyze, and write.",
    description: "The universal language of music. Essential for reading sheet music, composing, analyzing chords, and ear training.",
    longDescription: "Music theory is the blueprint of musical sound. Highly recommended to complement any instrumental course, this class covers rhythm values, key signatures, interval calculations, chord construction, transposition, and traditional harmony. It is vital for clearing advanced Trinity and ABRSM instrumental grades (Grade 5 Theory is a prerequisite for advanced grades).",
    iconName: "BookOpen",
    difficulty: "All Levels",
    duration: "Grades 1 to 8",
    exams: ["Trinity College London", "ABRSM"],
    outcomes: [
      "Write and transcribe musical notations in treble, bass, and alto clefs",
      "Construct and identify all major and minor scales and key signatures",
      "Analyze chord structures, Roman numeral progressions, and cadences",
      "Deconstruct orchestral scores and compose original melodic fragments"
    ],
    schedule: "1 intensive session per week (1.5 hours)"
  },
  {
    id: "flute",
    name: "Flute & Woodwinds",
    tagline: "Breathing life into melody with delicate woodwind control.",
    description: "Classical and modern flute training focusing on embrochure, breath support, fingering agility, and beautiful tone.",
    longDescription: "The flute produces some of the most angelic and soaring melodies in the orchestral world. Our program focuses on developing an excellent embrochure (lip shape), diaphragmatic air column support, crisp fingering agility, and precise intonation. Explore classical sonatas, orchestral excerpts, and traditional folk music, with complete certification tracks.",
    iconName: "Wind",
    difficulty: "All Levels",
    duration: "Grade-wise (1 to 8)",
    exams: ["Trinity College London", "ABRSM"],
    outcomes: [
      "Achieve a beautiful, rich, and consistent tone across all octaves",
      "Master correct embrochure and highly efficient breath economy",
      "Develop fast, precise finger articulation and scale fluency",
      "Perform classical solos and play effectively in woodwind ensembles"
    ],
    schedule: "2 sessions per week (1 hour each)"
  }
];

export const FACULTY: Faculty[] = [
  {
    id: "samson",
    name: "Prof. Samson Rozer",
    role: "Director & Principal",
    qualifications: "Fellow of Trinity College London (FTCL), LRSM (Royal Schools of Music)",
    bio: "With over 22 years of international teaching and performance experience, Prof. Samson founded Bethel School of Music in 2010 to provide top-tier music education in Ooty. He specializes in advanced Piano, Classical Guitar, and Music Theory, having mentored over 200 students to achieve high distinctions in Trinity and ABRSM exams.",
    instruments: ["Piano", "Classical Guitar", "Music Theory"],
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400" // Placeholder student-friendly face
  },
  {
    id: "sarah",
    name: "Sarah Paul",
    role: "Head of Bowed Strings",
    qualifications: "Licentiate of Trinity College London (LTCL) in Violin",
    bio: "Sarah is a passionate violinist and chamber musician. She holds an LTCL with distinction. Her nurturing teaching style combines the Suzuki method with rigorous technical standards, helping young violinists build a deep love for strings and pristine performance mechanics.",
    instruments: ["Violin", "Viola", "Chamber Orchestra"],
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400"
  },
  {
    id: "david",
    name: "David Anand",
    role: "Senior Woodwind & Vocal Instructor",
    qualifications: "DipABRSM in Flute, Grade 8 Singing (Trinity College)",
    bio: "David is a versatile multi-instrumentalist who has performed extensively in orchestras across India and Europe. He excels in guiding woodwind posture, embrochure, and vocal breath support, assisting students in unlocking their full range in both classical flute and contemporary singing styles.",
    instruments: ["Flute", "Vocal", "Choral Conducting"],
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400"
  },
  {
    id: "john",
    name: "John Wesley",
    role: "Drums & Percussion Specialist",
    qualifications: "Grade 8 Rock & Pop Drums (Trinity College London)",
    bio: "John is the rhythmic backbone of our institute. He is a touring session drummer who has spent a decade training students to master coordination, snare rudiments, double-bass grooves, and stage performance. He teaches drum sheet reading and improvisation.",
    instruments: ["Drums (Full Kit)", "Cajon", "Percussion"],
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sharon Jennifer",
    role: "Alumna (Grade 8 Piano, Trinity College London)",
    text: "Bethel School of Music changed my life. I started from zero in 2012, and in 2022 I cleared my Grade 8 with distinction. The teachers in Ooty are incredibly knowledgeable and patient. The individual attention you get here is incomparable to any other institute.",
    rating: 5
  },
  {
    id: "t2",
    name: "Dr. Rajesh K. Krishnan",
    role: "Parent of Arjun (Grade 5 Guitar Student)",
    text: "We enrolled our son Arjun at Bethel when he was 8. Now at 12, his guitar playing is fantastic, and his self-confidence has soared. The school's structured prep for Trinity and ABRSM exams provides great milestones. Strongly recommended for parents in the Nilgiris!",
    rating: 5
  },
  {
    id: "t3",
    name: "Priyanth S.",
    role: "Current Drum Student (Grade 4)",
    text: "The infrastructure is incredible. Playing on real Pearl acoustic kits in acoustically-treated rooms makes a huge difference. The curriculum is fun, challenging, and John Sir's guidance is stellar!",
    rating: 5
  },
  {
    id: "t4",
    name: "Maria Jones",
    role: "Vocal & Flute Student",
    text: "Bethel provides an incredible platform for local talent. Singing at their annual concert is an experience I will cherish forever. The faculty are international class, and the Ooty mountain environment is so inspiring!",
    rating: 5
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Vibrant Violin Class",
    category: "classes",
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800",
    description: "Group violin class learning classical bowing posture in our spacious studio."
  },
  {
    id: "g2",
    title: "Pearl Drum Studio Setup",
    category: "campus",
    imageUrl: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800",
    description: "Our state-of-the-art drumming station equipped with professional Pearl kit."
  },
  {
    id: "g3",
    title: "An Elegant Piano Masterclass",
    category: "classes",
    imageUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800",
    description: "One-on-one professional piano instruction focusing on hand posture."
  },
  {
    id: "g4",
    title: "Annual Concert Performance",
    category: "performances",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800",
    description: "Our students showcasing their talents at the Annual Music Gala in Ooty."
  },
  {
    id: "g5",
    title: "Acoustic Guitar Workshop",
    category: "classes",
    imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800",
    description: "Intermediate students exploring chord voicing and scale frameworks."
  },
  {
    id: "g6",
    title: "Trinity College Exam Candidates",
    category: "exams",
    imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800",
    description: "Our students happily posing after scoring top grades in theory and practical exams."
  },
  {
    id: "g7",
    title: "Vocal and Flute Harmony",
    category: "performances",
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=800",
    description: "A gorgeous collaborative recital featuring our vocalists and flute ensemble."
  },
  {
    id: "g8",
    title: "The Nilgiris Campus View",
    category: "campus",
    imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800",
    description: "Located in Ooty, the green hills provide a peaceful and inspiring backdrop for music."
  }
];
