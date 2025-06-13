import { useState } from 'react';
import { ResumeData, PersonalInfo, Experience, Education, Skill, Project } from '@/types/resume';
import { PersonalInfoForm } from '@/components/PersonalInfoForm';
import { SummaryForm } from '@/components/SummaryForm';
import { ExperienceForm } from '@/components/ExperienceForm';
import { EducationForm } from '@/components/EducationForm';
import { SkillsForm } from '@/components/SkillsForm';
import { ProjectsForm } from '@/components/ProjectsForm';
import { ResumePreview } from '@/components/ResumePreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePDF } from '@/utils/pdf';
import { aiService } from '@/utils/ai';
import { Download, Settings, Eye, EyeOff } from 'lucide-react';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      github: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const [showPreview, setShowPreview] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };
  const updateExperience = (experience: Experience[]) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: Skill[]) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const updateProjects = (projects: Project[]) => {
    setResumeData(prev => ({ ...prev, projects }));
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      await generatePDF('resume-preview', `${resumeData.personalInfo.name || 'resume'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!apiKey) {
      alert('Please set your OpenAI API key in settings first.');
      setShowSettings(true);
      return;
    }

    try {
      setIsGeneratingSummary(true);
      aiService.setApiKey(apiKey);
      const generatedSummary = await aiService.generateSummary(resumeData);
      updateSummary(generatedSummary);
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Failed to generate AI summary. Please check your API key and try again.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const isFormValid = resumeData.personalInfo.name && resumeData.personalInfo.email;
  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Resume Builder
            </h1>
            <p className="text-muted-foreground mt-2">Create a professional resume in minutes</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="hidden lg:flex"
            >
              {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>            <Button
              onClick={handleDownloadPDF}
              disabled={!isFormValid || isGeneratingPDF}
              className="modern-button violet-glow"
            >
              <Download className="w-4 h-4 mr-2" />
              {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
        </div>        {/* Settings Panel */}
        {showSettings && (
          <Card className="mb-6 modern-card">
            <CardHeader>
              <CardTitle className="text-violet-300">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    OpenAI API Key (for AI features)
                  </label>                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full p-2 border border-input rounded-md modern-input bg-background text-foreground"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your API key is stored locally and never sent to our servers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
          {/* Form Section */}
          <div className="space-y-6">
            <PersonalInfoForm 
              data={resumeData.personalInfo} 
              onChange={updatePersonalInfo} 
            />
            
            <SummaryForm
              summary={resumeData.summary}
              onChange={updateSummary}
              onAIGenerate={apiKey ? handleGenerateSummary : undefined}
              isGenerating={isGeneratingSummary}
            />
              <ExperienceForm
              experiences={resumeData.experience}
              onChange={updateExperience}
            />

            <EducationForm
              education={resumeData.education}
              onChange={updateEducation}
            />

            <SkillsForm
              skills={resumeData.skills}
              onChange={updateSkills}
            />

            <ProjectsForm
              projects={resumeData.projects}
              onChange={updateProjects}
            />
          </div>          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle className="text-violet-300">Live Preview</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <ResumePreview data={resumeData} />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Mobile Preview Toggle */}
        <div className="lg:hidden mt-6">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="w-full"
          >
            {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
