import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonalInfo } from '@/types/resume';
import { useEffect, useState } from 'react';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  onSectionComplete?: () => void;
}

export function PersonalInfoForm({ data, onChange, onSectionComplete }: PersonalInfoFormProps) {
  const [isComplete, setIsComplete] = useState(false);
  const { handleKeyPress } = useAutoScroll();

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const checkFormCompletion = () => {
    const requiredFields = ['name', 'email', 'phone', 'location'];
    return requiredFields.every(field => data[field as keyof PersonalInfo]?.trim());
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && checkFormCompletion()) {
      handleKeyPress(e, 'personal-info');
      if (!isComplete) {
        setIsComplete(true);
        onSectionComplete?.();
      }
    }
  };

  useEffect(() => {
    const isFormComplete = checkFormCompletion();
    setIsComplete(isFormComplete);
  }, [data]);

  return (
    <div id="personal-info" className="form-bubble p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-violet-500/20 rounded-full">
          <User className="w-5 h-5 text-violet-400" />
        </div>
        <h2 className="text-xl font-bold text-violet-300">Personal Information</h2>
        {isComplete && (
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
              <User className="w-4 h-4" />
              Full Name *
            </label>
            <Input
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="John Doe"
              className="modern-input"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
              <Mail className="w-4 h-4" />
              Email *
            </label>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="john.doe@example.com"
              className="modern-input"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
              <Phone className="w-4 h-4" />
              Phone *
            </label>
            <Input
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="+1 (555) 123-4567"
              className="modern-input"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
              <MapPin className="w-4 h-4" />
              Location *
            </label>
            <Input
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="City, State, Country"
              className="modern-input"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </label>
            <Input
              value={data.linkedIn || ''}
              onChange={(e) => handleChange('linkedIn', e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="linkedin.com/in/johndoe"
              className="modern-input"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
              <Github className="w-4 h-4" />
              GitHub
            </label>
            <Input
              value={data.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="github.com/johndoe"
              className="modern-input"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
            <Globe className="w-4 h-4" />
            Website
          </label>
          <Input
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="www.johndoe.com"
            className="modern-input"
          />
        </div>
        
        {checkFormCompletion() && (
          <div className="mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm flex items-center gap-2">
              ✓ Personal information complete! Press Enter to continue to the next section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
