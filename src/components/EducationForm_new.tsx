import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GraduationCap, Calendar } from 'lucide-react';
import { Education } from '@/types/resume';
import { generateId } from '@/utils';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useState, useEffect } from 'react';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationForm({ education, onChange }: EducationFormProps) {
  const [isComplete, setIsComplete] = useState(false);
  const { handleKeyPress } = useAutoScroll();

  const addEducation = () => {
    const newEducation: Education = {
      id: generateId(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: ['']
    };
    onChange([...education, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  const addAchievement = (eduId: string) => {
    const edu = education.find(e => e.id === eduId);
    if (edu) {
      updateEducation(eduId, 'achievements', [...edu.achievements, '']);
    }
  };

  const updateAchievement = (eduId: string, index: number, value: string) => {
    const edu = education.find(e => e.id === eduId);
    if (edu) {
      const newAchievements = [...edu.achievements];
      newAchievements[index] = value;
      updateEducation(eduId, 'achievements', newAchievements);
    }
  };

  const removeAchievement = (eduId: string, index: number) => {
    const edu = education.find(e => e.id === eduId);
    if (edu && edu.achievements.length > 1) {
      const newAchievements = edu.achievements.filter((_, i) => i !== index);
      updateEducation(eduId, 'achievements', newAchievements);
    }
  };

  const checkFormCompletion = () => {
    return education.length > 0 && education.every(edu => 
      edu.institution.trim() && edu.degree.trim() && edu.startDate.trim() && edu.endDate.trim()
    );
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && checkFormCompletion()) {
      handleKeyPress(e, 'education');
      if (!isComplete) {
        setIsComplete(true);
      }
    }
  };

  useEffect(() => {
    setIsComplete(checkFormCompletion());
  }, [education]);

  return (
    <div id="education" className="form-bubble p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-500/20 rounded-full">
            <GraduationCap className="w-5 h-5 text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-violet-300">Education</h2>
          {isComplete && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
        <Button onClick={addEducation} size="sm" className="modern-button">
          <Plus className="w-4 h-4 mr-1" />
          Add Education
        </Button>
      </div>

      <div className="space-y-6">
        {education.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No education entries added yet.</p>
            <p className="text-sm">Click "Add Education" to get started.</p>
          </div>
        ) : (
          education.map((edu, index) => (
            <div key={edu.id} className="bubble-card space-y-4" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  Education #{index + 1}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
                    <GraduationCap className="w-4 h-4" />
                    Institution *
                  </label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    onKeyPress={onKeyPress}
                    placeholder="University/School Name"
                    className="modern-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-violet-200">Degree *</label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    onKeyPress={onKeyPress}
                    placeholder="Bachelor's, Master's, etc."
                    className="modern-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-violet-200">Field of Study</label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    onKeyPress={onKeyPress}
                    placeholder="Computer Science, Engineering, etc."
                    className="modern-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-violet-200">GPA</label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    onKeyPress={onKeyPress}
                    placeholder="3.8/4.0"
                    className="modern-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
                    <Calendar className="w-4 h-4" />
                    Start Date *
                  </label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="modern-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-violet-200">End Date *</label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="modern-input"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-violet-200">Achievements & Honors</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addAchievement(edu.id)}
                    className="text-violet-400 hover:text-violet-300"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Achievement
                  </Button>
                </div>
                {edu.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex gap-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(edu.id, achIndex, e.target.value)}
                      onKeyPress={onKeyPress}
                      placeholder="• Dean's List, Scholarship, etc."
                      className="modern-input flex-1"
                    />
                    {edu.achievements.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(edu.id, achIndex)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        
        {checkFormCompletion() && (
          <div className="mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm flex items-center gap-2">
              ✓ Education complete! Press Ctrl+Enter to continue to the next section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
