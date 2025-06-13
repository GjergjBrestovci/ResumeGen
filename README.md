# 🚀 Modern Resume Builder

A sophisticated, AI-powered Resume Builder built with React, TypeScript, and modern dark theme with stunning violet accents.

![Resume Builder](https://img.shields.io/badge/Status-Complete-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-teal)

## ✨ Features

### 🎯 **Complete Resume Management**
- ✅ **Personal Information** - Contact details with social links
- ✅ **Professional Summary** - AI-powered summary generation
- ✅ **Work Experience** - Multiple positions with achievements
- ✅ **Education** - Academic background with honors
- ✅ **Skills** - Categorized skills with proficiency levels
- ✅ **Projects** - Showcase your portfolio with tech stacks

### 🤖 **AI Integration**
- **Smart Summary Generation** using OpenAI GPT-3.5-turbo
- **Job-Specific Tailoring** to match job descriptions
- **Content Enhancement** for better ATS compatibility

### 🎨 **Modern Dark Theme**
- **Stunning violet accents** with gradient backgrounds
- **Glassmorphism effects** with backdrop blur
- **Smooth animations** and hover effects
- **Responsive design** for all devices

### 📄 **Export & Preview**
- **Live preview** updates in real-time
- **High-quality PDF** generation
- **Professional formatting** optimized for ATS
- **Print-ready** layouts

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)

### Installation & Setup
1. **Navigate to project folder:**
   ```powershell
   cd "c:\Users\PC\Desktop\code\ResumeGen"
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Start development server:**
   ```powershell
   npm run dev
   ```
   
   **Or simply double-click:** `start.bat`

4. **Open your browser:** http://localhost:5173/

## 🎯 Usage Guide

### 1. **Fill Personal Information**
- Add your contact details
- Include social media links (LinkedIn, GitHub)
- All fields are validated for proper formatting

### 2. **Craft Professional Summary**
- Write your summary manually
- Or use AI generation (requires OpenAI API key)
- Get suggestions tailored to your experience

### 3. **Add Work Experience**
- Multiple positions supported
- Add specific achievements for each role
- Include current job indicator

### 4. **Education & Qualifications**
- Add degrees and certifications
- Include GPA if relevant
- Highlight academic achievements

### 5. **Showcase Skills**
- Categorize by Technical/Soft/Language
- Set proficiency levels (Beginner to Expert)
- Visual star ratings for quick overview

### 6. **Portfolio Projects**
- Describe your key projects
- Add technology stacks
- Include live demo and GitHub links

### 7. **Export Your Resume**
- Live preview updates automatically
- Download high-quality PDF
- Professional formatting guaranteed

## 🤖 AI Features Setup

To unlock AI-powered features:

1. **Get OpenAI API Key:**
   - Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
   - Create new secret key

2. **Configure in App:**
   - Click "Settings" in the app
   - Enter your API key
   - Key is stored locally (never sent to our servers)

3. **Use AI Features:**
   - Click "AI Generate" in summary section
   - Get intelligent content suggestions
   - Tailor resume for specific jobs

## 🛠️ Technical Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2.0 |
| **TypeScript** | Type Safety | 5.2.2 |
| **Vite** | Build Tool | 4.5.0 |
| **Tailwind CSS** | Styling | 3.3.5 |
| **Lucide React** | Icons | Latest |
| **jsPDF** | PDF Generation | 2.5.1 |
| **html2canvas** | Screen Capture | 1.4.1 |
| **OpenAI** | AI Integration | 4.20.1 |

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   │   ├── button.tsx   # Enhanced button with animations
│   │   ├── card.tsx     # Modern card with glassmorphism
│   │   ├── input.tsx    # Styled input with focus effects
│   │   └── textarea.tsx # Enhanced textarea component
│   ├── PersonalInfoForm.tsx    # Personal details form
│   ├── SummaryForm.tsx         # Professional summary with AI
│   ├── ExperienceForm.tsx      # Work experience management
│   ├── EducationForm.tsx       # Education background
│   ├── SkillsForm.tsx          # Skills with proficiency
│   ├── ProjectsForm.tsx        # Portfolio projects
│   └── ResumePreview.tsx       # Live preview component
├── types/               # TypeScript definitions
│   └── resume.ts        # Resume data interfaces
├── utils/               # Utility functions
│   ├── ai.ts           # OpenAI integration
│   ├── pdf.ts          # PDF generation logic
│   └── index.ts        # Common utilities
├── App.tsx             # Main application
├── main.tsx            # Entry point
└── globals.css         # Global styles & theme
```

## 🎨 Theme Customization

The app uses a modern dark theme with violet accents. Key design features:

- **Dark background** with subtle gradients
- **Violet/purple accent** colors (#8B5CF6)
- **Glassmorphism effects** with backdrop blur
- **Smooth animations** and micro-interactions
- **Responsive design** for all screen sizes

## 🔧 Build Commands

```powershell
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🚀 Deployment

The app builds to static files and can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Any static hosting**

Simply run `npm run build` and deploy the `dist` folder.

## 🤝 Contributing

Want to contribute? Here are some ideas:
- 🎨 Additional resume templates
- 🌍 Internationalization support
- 📊 Analytics dashboard
- 🔒 User authentication
- ☁️ Cloud storage integration

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 What's Next?

Future enhancements planned:
- 📋 Multiple resume templates
- 🎨 Custom color themes
- 💾 Local storage persistence
- 🔄 Import from LinkedIn
- 📈 Resume analytics
- 🌐 Multi-language support

---

**Built with ❤️ by developers, for developers**

*Create professional resumes that get you hired!*
