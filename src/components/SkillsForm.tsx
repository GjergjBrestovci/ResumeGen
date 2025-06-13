import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Star, Zap } from 'lucide-react';
import { Skill } from '@/types/resume';
import { generateId } from '@/utils';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useState, useEffect } from 'react';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const [isComplete, setIsComplete] = useState(false);
  const { handleKeyPress } = useAutoScroll();

  const addSkill = () => {
    const newSkill: Skill = {
      id: generateId(),
      name: '',
      level: 'Intermediate',
      category: 'Technical'
    };
    onChange([...skills, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onChange(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };
  const removeSkill = (id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  };

  const getLevelStars = (level: string) => {
    const stars = {
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3,
      'Expert': 4
    };
    return stars[level as keyof typeof stars] || 2;
  };

  const checkFormCompletion = () => {
    return skills.length >= 3 && skills.every(skill => skill.name.trim());
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && checkFormCompletion()) {
      handleKeyPress(e, 'skills');
      if (!isComplete) {
        setIsComplete(true);
      }
    }
  };

  useEffect(() => {
    setIsComplete(checkFormCompletion());
  }, [skills]);
  return (
    <div id="skills" className="form-bubble p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-500/20 rounded-full">
            <Zap className="w-5 h-5 text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-violet-300">Skills</h2>
          {isComplete && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
        <Button onClick={addSkill} size="sm" className="modern-button">
          <Plus className="w-4 h-4 mr-1" />
          Add Skill
        </Button>
      </div>

      <div className="space-y-6">
        {skills.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No skills added yet.</p>
            <p className="text-sm">Click "Add Skill" to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={skill.id} className="bubble-card space-y-4" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-white flex items-center gap-2">
                    <Star className="w-4 h-4 text-violet-400" />
                    Skill #{index + 1}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
                      <Zap className="w-4 h-4" />
                      Skill Name *
                    </label>
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      onKeyPress={onKeyPress}
                      placeholder="React, Python, Design..."
                      className="modern-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-violet-200">Category</label>
                    <select
                      value={skill.category}
                      onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                      className="modern-input w-full h-10 px-3 rounded-md bg-background border border-input"
                    >
                      <option value="Technical">Technical</option>
                      <option value="Soft">Soft Skills</option>
                      <option value="Language">Language</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
                      <Star className="w-4 h-4" />
                      Proficiency Level
                    </label>
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                      className="modern-input w-full h-10 px-3 rounded-md bg-background border border-input"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Level:</span>
                  <div className="flex items-center gap-1">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < getLevelStars(skill.level)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-violet-400">{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {checkFormCompletion() && (
          <div className="mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm flex items-center gap-2">
              ✓ Skills complete! Press Ctrl+Enter to continue to the next section.
            </p>
          </div>        )}
      </div>
    </div>
  );
}
