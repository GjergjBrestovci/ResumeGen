import { ResumeData } from '@/types/resume';
import { formatDate } from '@/utils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const { personalInfo, summary, experience, education, skills, projects } = data;  return (
    <div id="resume-preview" className="resume-preview-dark p-8 max-w-4xl mx-auto rounded-lg animate-slideIn">
      {/* Header */}
      <div className="border-b-2 border-violet-500/30 pb-6 mb-6 animate-fadeInUp" style={{animationDelay: '0.1s'}}>        <h1 className="text-4xl font-bold text-white mb-2 animate-slideInLeft" style={{animationDelay: '0.2s'}}>
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-violet-200 animate-slideInRight" style={{animationDelay: '0.3s'}}>          {personalInfo.email && (
            <div className="flex items-center gap-1 hover:text-violet-300 transition-colors duration-200">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1 hover:text-violet-300 transition-colors duration-200">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1 hover:text-violet-300 transition-colors duration-200">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1 hover:text-violet-300 transition-colors duration-200">
              <Globe className="w-4 h-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedIn && (
            <div className="flex items-center gap-1 hover:text-violet-300 transition-colors duration-200">
              <Linkedin className="w-4 h-4" />
              <span>{personalInfo.linkedIn}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1 hover:text-violet-300 transition-colors duration-200">
              <Github className="w-4 h-4" />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </div>      {/* Summary */}
      {summary && (
        <div className="mb-6 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
          <h2 className="text-xl font-bold text-violet-300 mb-3 border-b border-violet-500/30 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-300 leading-relaxed bubble-content">{summary}</p>
        </div>
      )}      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6 animate-fadeInUp" style={{animationDelay: '0.5s'}}>
          <h2 className="text-xl font-bold text-violet-300 mb-3 border-b border-violet-500/30 pb-1">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={exp.id} className="bubble-card hover:scale-105 transition-transform duration-300" style={{animationDelay: `${0.6 + index * 0.1}s`}}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {exp.position}
                    </h3>
                    <p className="text-violet-200 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-400 text-right">
                    <p>
                      {formatDate(exp.startDate)} - {' '}
                      {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-300 mb-2">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && exp.achievements[0] && (
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {exp.achievements
                      .filter(achievement => achievement.trim())
                      .map((achievement, index) => (
                        <li key={index} className="hover:text-violet-200 transition-colors duration-200">{achievement}</li>
                      ))
                    }
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6 animate-fadeInUp" style={{animationDelay: '0.7s'}}>
          <h2 className="text-xl font-bold text-violet-300 mb-3 border-b border-violet-500/30 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={edu.id} className="bubble-card hover:scale-105 transition-transform duration-300" style={{animationDelay: `${0.8 + index * 0.1}s`}}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-violet-200 font-medium">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-400 mt-1">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-400 text-right">
                    <p>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                </div>
                {edu.achievements.length > 0 && edu.achievements[0] && (
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
                    {edu.achievements
                      .filter(achievement => achievement.trim())
                      .map((achievement, index) => (
                        <li key={index} className="hover:text-violet-200 transition-colors duration-200">{achievement}</li>
                      ))
                    }
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6 animate-fadeInUp" style={{animationDelay: '0.9s'}}>
          <h2 className="text-xl font-bold text-violet-300 mb-3 border-b border-violet-500/30 pb-1">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Technical', 'Soft', 'Language', 'Other'].map((category, categoryIndex) => {
              const categorySkills = skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;

              return (
                <div key={category} className="bubble-card" style={{animationDelay: `${1.0 + categoryIndex * 0.1}s`}}>
                  <h4 className="font-semibold text-white mb-3">{category} Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, skillIndex) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1.5 bg-gradient-to-r from-violet-500/20 to-purple-600/20 text-violet-200 rounded-full text-sm border border-violet-500/30 hover:from-violet-500/30 hover:to-purple-600/30 hover:text-white transition-all duration-200 transform hover:scale-105"
                        style={{animationDelay: `${1.1 + categoryIndex * 0.1 + skillIndex * 0.05}s`}}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6 animate-fadeInUp" style={{animationDelay: '1.2s'}}>
          <h2 className="text-xl font-bold text-violet-300 mb-3 border-b border-violet-500/30 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={project.id} className="bubble-card hover:scale-105 transition-transform duration-300" style={{animationDelay: `${1.3 + index * 0.1}s`}}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    {project.name}
                  </h3>
                  <div className="text-sm text-gray-400">
                    {formatDate(project.startDate)} - {' '}
                    {project.endDate ? formatDate(project.endDate) : 'Ongoing'}
                  </div>
                </div>
                <p className="text-gray-300 mb-3 leading-relaxed">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-200 rounded-lg text-xs border border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-500/30 hover:text-white transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4 text-sm">
                  {project.url && (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 transition-colors duration-200 flex items-center gap-1"
                    >
                      <Globe className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 transition-colors duration-200 flex items-center gap-1"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
