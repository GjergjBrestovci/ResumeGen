import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Briefcase, Calendar } from 'lucide-react';
import { Experience } from '@/types/resume';
import { generateId } from '@/utils';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useState, useEffect } from 'react';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export function ExperienceForm({ experiences, onChange }: ExperienceFormProps) {
  const [isComplete, setIsComplete] = useState(false);
  const { handleKeyPress } = useAutoScroll();

  const addExperience = () => {
    const newExperience: Experience = {
      id: generateId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    onChange([...experiences, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
  };

  const addAchievement = (expId: string) => {
    const exp = experiences.find(e => e.id === expId);
    if (exp) {
      updateExperience(expId, 'achievements', [...exp.achievements, '']);
    }
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const exp = experiences.find(e => e.id === expId);
    if (exp) {
      const newAchievements = [...exp.achievements];
      newAchievements[index] = value;
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  const removeAchievement = (expId: string, index: number) => {
    const exp = experiences.find(e => e.id === expId);
    if (exp && exp.achievements.length > 1) {
      const newAchievements = exp.achievements.filter((_, i) => i !== index);
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  const checkFormCompletion = () => {
    return experiences.length > 0 && experiences.every(exp => 
      exp.company.trim() && exp.position.trim() && exp.startDate.trim()
    );
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && checkFormCompletion()) {
      handleKeyPress(e, 'experience');
      if (!isComplete) {
        setIsComplete(true);
      }
    }
  };

  useEffect(() => {
    setIsComplete(checkFormCompletion());
  }, [experiences]);

  return (
    <div id="experience" className="form-bubble p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-500/20 rounded-full">
            <Briefcase className="w-5 h-5 text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-violet-300">Work Experience</h2>
          {isComplete && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
        <Button onClick={addExperience} size="sm" className="modern-button">
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {experiences.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        ) : (
          experiences.map((experience, index) => (
            <div key={experience.id} className="bubble-card space-y-4" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  Experience #{index + 1}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
                    <Briefcase className="w-4 h-4" />
                    Company *
                  </label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    onKeyPress={onKeyPress}
                    placeholder="Company Name"
                    className="modern-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-violet-200">Position *</label>
                  <Input
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                    onKeyPress={onKeyPress}
                    placeholder="Job Title"
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
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    className="modern-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-violet-200">End Date</label>
                  <Input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    disabled={experience.current}
                    className="modern-input"
                  />
                  <label className="flex items-center mt-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={experience.current}
                      onChange={(e) => updateExperience(experience.id, 'current', e.target.checked)}
                      className="mr-2 accent-violet-500"
                    />
                    Currently working here
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-violet-200">Job Description</label>
                <Textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  onKeyPress={onKeyPress}
                  placeholder="Describe your role and responsibilities..."
                  rows={3}
                  className="modern-input resize-none"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-violet-200">Key Achievements</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addAchievement(experience.id)}
                    className="text-violet-400 hover:text-violet-300"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Achievement
                  </Button>
                </div>
                {experience.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex gap-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(experience.id, achIndex, e.target.value)}
                      onKeyPress={onKeyPress}
                      placeholder="• Describe a specific achievement or impact..."
                      className="modern-input flex-1"
                    />
                    {experience.achievements.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(experience.id, achIndex)}
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
              ✓ Work experience complete! Press Ctrl+Enter to continue to the next section.
            </p>
          </div>        )}
      </div>
    </div>
  );
}
