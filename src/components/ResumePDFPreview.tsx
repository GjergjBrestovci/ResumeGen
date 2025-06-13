import { ResumeData } from '@/types/resume';
import { formatDate } from '@/utils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ResumePDFPreviewProps {
  data: ResumeData;
}

export function ResumePDFPreview({ data }: ResumePDFPreviewProps) {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto" style={{ 
      backgroundColor: '#ffffff', 
      color: '#000000',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-black mb-2">
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedIn && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span>{personalInfo.linkedIn}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-3 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-800 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-3 border-b border-gray-300 pb-1">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    <p>
                      {formatDate(exp.startDate)} - {' '}
                      {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mb-2">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && exp.achievements[0] && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {exp.achievements
                      .filter(achievement => achievement.trim())
                      .map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))
                    }
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-3 border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-700 font-medium">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    <p>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                </div>
                {edu.achievements.length > 0 && edu.achievements[0] && (
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                    {edu.achievements
                      .filter(achievement => achievement.trim())
                      .map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))
                    }
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-3 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Technical', 'Soft', 'Language', 'Other'].map(category => {
              const categorySkills = skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category}>
                  <h4 className="font-semibold text-black mb-2">{category} Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map(skill => (
                      <span
                        key={skill.id}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm border border-gray-300"
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
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-3 border-b border-gray-300 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-black">
                    {project.name}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {formatDate(project.startDate)} - {' '}
                    {project.endDate ? formatDate(project.endDate) : 'Ongoing'}
                  </div>
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs border border-blue-200"
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
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
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
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
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
