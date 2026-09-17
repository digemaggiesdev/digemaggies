export const projectsData = [
  {
    id: 'tbm-2025',
    title: 'Boring Machine Mk-I',
    category: 'Current Build',
    tagline: 'Curved microtunneling TBM for a 30-meter competition tunnel',
    description: 'Designed by Dig ‘Em Aggies engineers with a four-spoke cutterhead, segmented chassis, pipe-jacking propulsion, slurry extraction, and tunnel lining systems.',
    image: '/assets/renders/Render1.png',
    specs: [
      { label: 'Target Distance', value: '30 Meters' },
      { label: 'Outer Diameter', value: '24 Inches' },
      { label: 'Power Source', value: '7.5 hp Electric HPU' },
      { label: 'Subsystem Focus', value: 'Cutterhead & Propulsion' }
    ]
  },
  {
    id: 'cutterhead',
    title: 'Cutterhead & Excavation System',
    category: 'Subsystem',
    tagline: 'High-torque soil cutting wheel with custom tooth geometry',
    description: 'Uses an open-faced, four-spoke cutterhead and mixer bars to break down soil and form slurry with conditioning fluid.',
    image: '/assets/renders/Render3.png',
    specs: [
      { label: 'Drive System', value: 'High-Torque Hydraulic/Electric' },
      { label: 'Operating Speed', value: '4.125 RPM' },
      { label: 'Soil Conditioning', value: 'Bentonite Slurry' },
      { label: 'Cutterhead', value: '27-Inch Open Face' }
    ]
  },
  {
    id: 'propulsion',
    title: 'Precision Hydraulic Propulsion',
    category: 'Subsystem',
    tagline: 'Multi-cylinder axial thrust and micro-steering assembly',
    description: 'Provides continuous forward force and micro-adjustments required to maintain laser-guided trajectory during underground boring.',
    image: '/assets/team/homepage.jpg',
    specs: [
      { label: 'Max Thrust Force', value: '1,136 kN' },
      { label: 'Steering Control', value: '2 Electro-Hydraulic Actuators' },
      { label: 'Guidance', value: 'Laser Target Sensor System' },
      { label: 'Liner Integration', value: 'Automated Segment Jacking' }
    ]
  },
  {
    id: 'control-telemetry',
    title: 'Underground Telemetry & Control',
    category: 'Electronics',
    tagline: 'Real-time telemetry, sensor arrays, and remote operator station',
    description: 'Monitors soil pressure, motor thermal metrics, torque loads, and position pitch/yaw to feed live data back to the surface control station.',
    image: '/assets/team/home2.jpg',
    specs: [
      { label: 'Data Bus', value: 'CAN bus & Fiber Ethernet' },
      { label: 'Listed Sensors', value: '19 Sensor Units' },
      { label: 'Operator UI', value: 'Raspberry Pi Interface' },
      { label: 'Safety System', value: 'PNOZ S5 E-Stop Relay' }
    ]
  }
];

export const machineTelemetry = [
  { value: '1,136 kN', label: 'Maximum Thrust', subtext: 'Eight-cylinder pipe-jacking system' },
  { value: '24 in', label: 'TBM Outer Diameter', subtext: '23 in tunnel-lining inner diameter' },
  { value: '30 m', label: 'Target Tunnel Distance', subtext: '25 four-foot segments' },
  { value: '4.125 RPM', label: 'Cutterhead Speed', subtext: '5 GPM HPU flow rate' },
  { value: '4.5 kN·m', label: 'Continuous Torque', subtext: 'Gearbox-limited cutterhead output' }
];

export const teamStats = [
  { target: 24, suffix: ' in', label: 'TBM Outer Diameter' },
  { target: 5, suffix: ' ft', label: 'TBM Length' },
  { target: 2000, suffix: ' lb', label: 'TBM Weight' }
];

export const engineeringMilestones = [
  {
    phase: '01',
    title: 'CAD & Soil Mechanics Modeling',
    status: 'In Progress',
    date: 'Summer',
    description: 'FEA structural simulation of the cutterhead wheel and 3D modeling of soil displacement under Bastrop clay conditions.'
  },
  {
    phase: '02',
    title: 'Gearbox & Propulsion Fabrication',
    status: 'Upcoming',
    date: 'August - October',
    description: 'Precision CNC machining of disc cutter teeth, hydraulic manifold assembly, and axial jacking frame welding.'
  },
  {
    phase: '03',
    title: 'Telemetry & Surface Control Deck',
    status: 'Upcoming',
    date: 'November - February',
    description: 'Integrating 32 live diagnostic nodes, CAN bus telemetry, laser target guidance, and operator React dashboards.'
  },
  {
    phase: '04',
    title: 'Field Testing & Bastrop NABC Dig',
    status: 'Upcoming',
    date: 'March',
    description: 'Deploying the machine underground in Bastrop, TX for full-scale 30-meter autonomous horizontal boring.'
  }
];

export const memberTestimonials = [
  {
    quote: "This is hands-down the best place at Texas A&M to learn hands-on engineering skills—from high-torque gearboxes to hydraulic propulsion—while building alongside your best friends.",
    name: "Jett Davis",
    role: "Class of '27, Mechanical Engineering",
    title: "Chief Executive Officer"
  },
  {
    quote: "Working on real-world tunneling challenges for international competition prepares Aggie engineers like nothing else in the classroom.",
    name: "Jonathan Harwood",
    role: "Class of '28, Mechanical Engineering",
    title: "Chief Operations Officer"
  }
];

export const coreValues = [
  {
    icon: 'fa-users',
    title: 'Community',
    description: 'Dig ‘Em Aggies exists to foster community among members and establish friendships and connections to last a lifetime.'
  },
  {
    icon: 'fa-lightbulb',
    title: 'Innovation',
    description: 'Dig ‘Em Aggies seeks to create innovation in the tunnel boring industry to meet local, regional, and national needs and advance the industry.'
  },
  {
    icon: 'fa-leaf',
    title: 'Sustainability',
    description: 'Dig ‘Em Aggies uses an electrically powered HPU and a controlled bentonite-based slurry system to support the tunneling process.'
  },
  {
    icon: 'fa-chalkboard-teacher',
    title: 'Mentorship',
    description: 'Dig ‘Em Aggies emphasizes inclusion of younger students to allow opportunities for leadership, teaching, and peer learning.'
  },
  {
    icon: 'fa-graduation-cap',
    title: 'Development',
    description: 'Dig ‘Em Aggies enhances the education of Aggie engineers and prepares them for local industry opportunities in Bastrop, TX, and beyond.'
  },
  {
    icon: 'fa-handshake',
    title: 'Respect',
    description: 'Dig ‘Em Aggies is built upon respect for each other, our university, our sponsors, and the planet we seek to improve.'
  }
];

export const executiveTeam = [
  {
    name: 'Jett Davis',
    role: 'Chief Executive Officer',
    classMajor: "'27 MEEN",
    image: '/assets/team/leadership/Jett_Davis.jpg',
    linkedin: 'https://www.linkedin.com/in/jett-davis-192604306/'
  },
  {
    name: 'Jonathan Harwood',
    role: 'Chief Operations Officer',
    classMajor: "'28 MEEN",
    image: '/assets/team/leadership/Jonathan_Harwood.jpg',
    linkedin: 'https://www.linkedin.com/in/jonathan-harwood-tamu/'
  },
  {
    name: 'William Campbell',
    role: 'Chief Financial Officer',
    classMajor: "'27 CVEN",
    image: '/assets/team/leadership/Will_Campbell.jpg',
    linkedin: 'https://www.linkedin.com/in/william-campbell-509357299/'
  },
  {
    name: 'Collin Sun',
    role: 'Chief Technical Officer',
    classMajor: "'28 MEEN",
    image: '/assets/team/leadership/Collin_sun.jpg',
    linkedin: 'https://www.linkedin.com/in/collin-sun-222197384/'
  },
  {
    name: 'Diogo Bandeira',
    role: 'Chief Underclassman Officer',
    classMajor: "'29 MEEN",
    image: '/assets/team/leadership/diogo_final.jpg',
    linkedin: 'https://www.linkedin.com/in/diogo-bandeira-29993b385/'
  }
];

export const facultyAdvisor = {
  name: 'Navid H. Jafari',
  department: 'Department of Civil & Environmental Engineering',
  image: '/assets/team/leadership/dr.jafari.png',
  bio: 'Navid H. Jafari is a current and beloved professor at Texas A&M University. He received his Ph.D. from the University of Illinois Urbana-Champaign in geotechnical engineering. He was awarded the prestigious ASCE Arthur Casagrande Professional Development Award in 2024, and his work in terrestrial, coastal, and offshore geotechnics has proven him as an emerging leader in the field.'
};

export const sponsorsData = {
  gold: [
    { name: 'Texas A&M Civil and Environmental Engineering', image: '/assets/sponsorship_images/CVEN_DEPT.png', url: 'https://engineering.tamu.edu/civil/index.html' },
    { name: 'Onshape', image: '/assets/sponsorship_images/onshape.png', url: 'https://www.onshape.com/en/' },
    { name: 'Spinks Solutions', image: '/assets/sponsorship_images/spinks_solution_llc.png', url: 'https://spinkssolutions.com/' },
    { name: 'Zachry Construction Corporation', image: '/assets/sponsorship_images/zachary_coorporation.jpg', url: 'https://www.zachryconstructioncorp.com/' }
  ],
  silver: [
    { name: 'Garver', image: '/assets/sponsorship_images/garver.png', url: 'https://garverusa.com/' },
    { name: 'Dovetail', image: '/assets/sponsorship_images/Dovetail.jpg', url: 'https://www.dovetailwealth.com/' },
    { name: 'Master Builders Solutions', image: '/assets/sponsorship_images/masterbuilders.png', url: 'https://master-builders-solutions.com/en-us/' }
  ],
  maroon: [
    { name: 'Metzler Family', image: '/assets/sponsorship_images/Metzler_Family.png', url: '#contact' }
  ]
};

export const faqList = [
  {
    question: "What is Dig 'Em Aggies?",
    answer: "Dig 'Em Aggies is a student-led engineering team, officially affiliated with Texas A&M University, focused on tunnel boring machine design, construction, and innovation."
  },
  {
    question: "What is the Not-a-Boring Competition?",
    answer: "It is an international engineering design competition where teams develop tunnel boring technology and participate in a week-long dig in Bastrop, Texas."
  },
  {
    question: "How can I support Dig 'Em Aggies?",
    answer: "Organizations can support the team through sponsorships and partnerships. Contact our team to explore opportunities."
  }
];
