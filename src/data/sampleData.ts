// Sample resume data to help you get started
// Copy and paste sections into your resume builder

export const sampleResumeData = {
  personalInfo: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedIn: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    website: "alexjohnson.dev"
  },
  
  summary: "Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering high-impact projects that improve user experience and drive business growth.",
  
  experience: [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Full Stack Developer",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description: "Lead development of enterprise-level web applications serving 100K+ users daily.",
      achievements: [
        "Architected and built a microservices platform that improved system performance by 40%",
        "Led a team of 5 developers to deliver 3 major product releases on time",
        "Implemented CI/CD pipelines reducing deployment time from hours to minutes",
        "Mentored junior developers and conducted code reviews maintaining 95% code quality"
      ]
    },
    {
      company: "StartupXYZ",
      position: "Frontend Developer",
      startDate: "2020-06",
      endDate: "2021-12",
      current: false,
      description: "Developed responsive web applications using React and modern JavaScript technologies.",
      achievements: [
        "Built and launched 3 customer-facing applications with 99.9% uptime",
        "Optimized application performance resulting in 50% faster load times",
        "Collaborated with UX/UI designers to implement pixel-perfect designs"
      ]
    }
  ],
  
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2016-08",
      endDate: "2020-05",
      gpa: "3.8",
      achievements: [
        "Magna Cum Laude",
        "Dean's List for 6 semesters",
        "President of Computer Science Club",
        "Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering"
      ]
    }
  ],
  
  skills: [
    // Technical Skills
    { name: "JavaScript", level: "Expert", category: "Technical" },
    { name: "TypeScript", level: "Advanced", category: "Technical" },
    { name: "React", level: "Expert", category: "Technical" },
    { name: "Node.js", level: "Advanced", category: "Technical" },
    { name: "Python", level: "Intermediate", category: "Technical" },
    { name: "AWS", level: "Intermediate", category: "Technical" },
    { name: "Docker", level: "Intermediate", category: "Technical" },
    { name: "PostgreSQL", level: "Advanced", category: "Technical" },
    { name: "Git", level: "Expert", category: "Technical" },
    
    // Soft Skills
    { name: "Leadership", level: "Advanced", category: "Soft" },
    { name: "Communication", level: "Expert", category: "Soft" },
    { name: "Problem Solving", level: "Expert", category: "Soft" },
    { name: "Team Collaboration", level: "Advanced", category: "Soft" },
    
    // Languages
    { name: "English", level: "Expert", category: "Language" },
    { name: "Spanish", level: "Intermediate", category: "Language" }
  ],
  
  projects: [
    {
      name: "E-Commerce Platform",
      description: "Built a full-stack e-commerce platform with React frontend, Node.js backend, and PostgreSQL database. Features include user authentication, payment processing, inventory management, and admin dashboard.",
      technologies: ["React", "Node.js", "Express", "PostgreSQL", "Stripe API", "AWS S3", "Docker"],
      startDate: "2023-01",
      endDate: "2023-06",
      url: "https://ecommerce-demo.alexjohnson.dev",
      github: "https://github.com/alexjohnson/ecommerce-platform"
    },
    {
      name: "Task Management App",
      description: "Developed a collaborative task management application with real-time updates, file sharing, and team communication features. Used Socket.io for real-time functionality and implemented drag-and-drop interfaces.",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Redis", "Material-UI"],
      startDate: "2022-08",
      endDate: "2022-12",
      url: "https://taskmanager.alexjohnson.dev",
      github: "https://github.com/alexjohnson/task-manager"
    },
    {
      name: "AI-Powered Analytics Dashboard",
      description: "Created an analytics dashboard that uses machine learning to provide insights on user behavior and business metrics. Integrated with multiple data sources and provides real-time visualizations.",
      technologies: ["React", "D3.js", "Python", "FastAPI", "TensorFlow", "PostgreSQL"],
      startDate: "2023-07",
      endDate: "", // Ongoing project
      github: "https://github.com/alexjohnson/analytics-dashboard"
    }
  ]
};

// Tips for customizing your resume:
export const resumeTips = {
  personalInfo: [
    "Use a professional email address",
    "Include your city and state/country",
    "Add LinkedIn and GitHub profiles if relevant",
    "Consider adding a personal website or portfolio"
  ],
  
  summary: [
    "Keep it 2-3 sentences long",
    "Highlight your years of experience",
    "Mention key technologies or skills",
    "Include quantifiable achievements when possible",
    "Tailor it to the job you're applying for"
  ],
  
  experience: [
    "Use action verbs (Built, Led, Implemented, Optimized)",
    "Include quantifiable results (percentages, numbers, metrics)",
    "Focus on achievements, not just responsibilities",
    "List experiences in reverse chronological order",
    "Use bullet points for easy scanning"
  ],
  
  skills: [
    "Group skills by category (Technical, Soft, Languages)",
    "Be honest about your proficiency levels",
    "Include both technical and soft skills",
    "Prioritize skills relevant to your target job",
    "Consider industry-specific tools and technologies"
  ],
  
  projects: [
    "Choose 2-4 of your best projects",
    "Include personal and professional projects",
    "Explain the problem you solved",
    "List technologies used",
    "Provide links to live demos or code repositories"
  ]
};
