import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Star } from 'lucide-react';
import { Skill } from '@/types/resume';
import { generateId } from '@/utils';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export function SkillsForm({ skills, onChange }: SkillsFormProps) {
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

  const skillCategories = ['Technical', 'Soft', 'Language', 'Other'] as const;
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-yellow-400';
      case 'Intermediate': return 'text-blue-400';
      case 'Advanced': return 'text-green-400';
      case 'Expert': return 'text-violet-400';
      default: return 'text-gray-400';
    }
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

  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-violet-300">
          Skills
          <Button onClick={addSkill} size="sm" className="modern-button">
            <Plus className="w-4 h-4 mr-1" />
            Add Skill
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skills.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No skills added yet. Click "Add Skill" to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={skill.id} className="border rounded-lg p-4 space-y-4 border-violet-500/20 bg-background/50">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-violet-300">Skill #{index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Skill Name *</label>
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      placeholder="JavaScript, Communication, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={skill.category}
                      onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                      className="w-full p-2 border border-input rounded-md modern-input bg-background text-foreground"
                    >
                      {skillCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Proficiency Level</label>
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                      className="w-full p-2 border border-input rounded-md modern-input bg-background text-foreground"
                    >
                      {skillLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Level:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= getLevelStars(skill.level)
                            ? getLevelColor(skill.level) + ' fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-sm font-medium ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {skills.length > 0 && (
          <div className="mt-6 p-4 border rounded-lg border-violet-500/20 bg-background/30">
            <h4 className="text-sm font-medium text-violet-300 mb-3">Skills by Category</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillCategories.map(category => {
                const categorySkills = skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h5 className="font-medium text-sm mb-2">{category} Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map(skill => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm border border-violet-500/30"
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
      </CardContent>
    </Card>
  );
}
