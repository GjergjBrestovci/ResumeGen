import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Experience } from '@/types/resume';
import { generateId } from '@/utils';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export function ExperienceForm({ experiences, onChange }: ExperienceFormProps) {
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
  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-violet-300">
          Work Experience
          <Button onClick={addExperience} size="sm" className="modern-button">
            <Plus className="w-4 h-4 mr-1" />
            Add Experience
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {experiences.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No work experience added yet. Click "Add Experience" to get started.
          </p>        ) : (
          experiences.map((experience, index) => (
            <div key={experience.id} className="border rounded-lg p-4 space-y-4 border-violet-500/20 bg-background/50">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-violet-300">Experience #{index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company *</label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position *</label>
                  <Input
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date *</label>
                  <Input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <Input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    disabled={experience.current}
                  />
                  <label className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={experience.current}
                      onChange={(e) => updateExperience(experience.id, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Currently working here</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Job Description</label>
                <Textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  placeholder="Describe your role and responsibilities..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Key Achievements</label>
                {experience.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex gap-2 mb-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(experience.id, achIndex, e.target.value)}
                      placeholder="• Describe a specific achievement or impact..."
                      className="flex-1"
                    />
                    {experience.achievements.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(experience.id, achIndex)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addAchievement(experience.id)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Achievement
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
