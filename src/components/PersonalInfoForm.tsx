import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonalInfo } from '@/types/resume';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };
  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="text-violet-300">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name *</label>
            <Input
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="City, State, Country"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn</label>
            <Input
              value={data.linkedIn || ''}
              onChange={(e) => handleChange('linkedIn', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">GitHub</label>
            <Input
              value={data.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="github.com/johndoe"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <Input
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="www.johndoe.com"
          />
        </div>
      </CardContent>
    </Card>
  );
}
