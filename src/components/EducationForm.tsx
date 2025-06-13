import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Education } from '@/types/resume';
import { generateId } from '@/utils';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationForm({ education, onChange }: EducationFormProps) {
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

  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-violet-300">
          Education
          <Button onClick={addEducation} size="sm" className="modern-button">
            <Plus className="w-4 h-4 mr-1" />
            Add Education
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No education added yet. Click "Add Education" to get started.
          </p>
        ) : (
          education.map((edu, index) => (
            <div key={edu.id} className="border rounded-lg p-4 space-y-4 border-violet-500/20 bg-background/50">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-violet-300">Education #{index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Institution *</label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Degree *</label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor's, Master's, PhD, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Field of Study</label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science, Business, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">GPA (Optional)</label>
                  <Input
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date *</label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date *</label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Achievements & Honors</label>
                {edu.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex gap-2 mb-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(edu.id, achIndex, e.target.value)}
                      placeholder="• Dean's List, Summa Cum Laude, relevant coursework..."
                      className="flex-1"
                    />
                    {edu.achievements.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(edu.id, achIndex)}
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
                  onClick={() => addAchievement(edu.id)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Achievement
                </Button>
              </div>
            </div>
          ))        )}
      </CardContent>
    </Card>
  );
}
