import OpenAI from 'openai';
import { ResumeData } from '@/types/resume';

export class AIService {
  private openai: OpenAI | null = null;

  setApiKey(apiKey: string) {
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend API
      });
    }
  }

  async generateSummary(resumeData: ResumeData): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = this.createSummaryPrompt(resumeData);

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume writer. Create compelling, concise professional summaries that highlight key achievements and skills.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating AI summary:', error);
      throw new Error('Failed to generate AI summary. Please check your API key and try again.');
    }
  }

  async tailorForJob(resumeData: ResumeData, jobDescription: string): Promise<ResumeData> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = this.createTailoringPrompt(resumeData, jobDescription);

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume consultant. Analyze job descriptions and suggest improvements to resumes to better match the requirements.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.3,
      });

      const suggestions = response.choices[0]?.message?.content || '';
      return this.applySuggestions(resumeData, suggestions);
    } catch (error) {
      console.error('Error tailoring resume:', error);
      throw new Error('Failed to tailor resume. Please try again.');
    }
  }

  async improveDescription(description: string, context: string): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume writer. Improve job descriptions to be more impactful and ATS-friendly while maintaining accuracy.'
          },
          {
            role: 'user',
            content: `Context: ${context}\n\nImprove this description: ${description}`
          }
        ],
        max_tokens: 150,
        temperature: 0.5,
      });

      return response.choices[0]?.message?.content || description;
    } catch (error) {
      console.error('Error improving description:', error);
      throw new Error('Failed to improve description. Please try again.');
    }
  }

  private createSummaryPrompt(resumeData: ResumeData): string {
    const { personalInfo, experience, education, skills } = resumeData;
    
    return `Create a professional summary for a resume based on the following information:

Name: ${personalInfo.name}
Experience: ${experience.map(exp => `${exp.position} at ${exp.company}`).join(', ')}
Education: ${education.map(edu => `${edu.degree} in ${edu.field} from ${edu.institution}`).join(', ')}
Skills: ${skills.map(skill => skill.name).join(', ')}

Write a compelling 2-3 sentence professional summary that highlights key achievements and value proposition.`;
  }

  private createTailoringPrompt(resumeData: ResumeData, jobDescription: string): string {
    return `Job Description:
${jobDescription}

Current Resume Summary:
${resumeData.summary}

Current Skills:
${resumeData.skills.map(skill => skill.name).join(', ')}

Suggest specific improvements to better match this job posting. Focus on:
1. Keywords to include
2. Skills to emphasize
3. Summary improvements
4. Experience descriptions that should be enhanced

Provide actionable suggestions in bullet points.`;
  }

  private applySuggestions(resumeData: ResumeData, suggestions: string): ResumeData {
    // This is a simplified implementation
    // In a real app, you might parse the suggestions and apply them automatically
    // or present them to the user for review
    return {
      ...resumeData,
      summary: resumeData.summary + '\n\n' + '<!-- AI Suggestions: ' + suggestions + ' -->'
    };
  }
}

export const aiService = new AIService();
