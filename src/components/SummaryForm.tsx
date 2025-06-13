import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
  onAIGenerate?: () => void;
  isGenerating?: boolean;
}

export function SummaryForm({ 
  summary, 
  onChange, 
  onAIGenerate, 
  isGenerating = false 
}: SummaryFormProps) {  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-violet-300">
          Professional Summary          {onAIGenerate && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAIGenerate}
              disabled={isGenerating}
              className="ml-2 modern-button"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              {isGenerating ? 'Generating...' : 'AI Generate'}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <label className="block text-sm font-medium mb-1">
            Professional Summary *
          </label>
          <Textarea
            value={summary}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write a compelling summary that highlights your key achievements, skills, and career objectives..."
            rows={4}
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground mt-1">
            2-3 sentences highlighting your experience, skills, and value proposition.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
