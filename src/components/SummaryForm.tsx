import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, FileText } from 'lucide-react';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useState, useEffect } from 'react';

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
}: SummaryFormProps) {
  const [isComplete, setIsComplete] = useState(false);
  const { handleKeyPress } = useAutoScroll();

  const checkFormCompletion = () => {
    return summary.trim().length >= 50; // At least 50 characters for a meaningful summary
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && checkFormCompletion()) {
      handleKeyPress(e, 'summary');
      if (!isComplete) {
        setIsComplete(true);
      }
    }
  };

  useEffect(() => {
    setIsComplete(checkFormCompletion());
  }, [summary]);

  return (
    <div id="summary" className="form-bubble p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-500/20 rounded-full">
            <FileText className="w-5 h-5 text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-violet-300">Professional Summary</h2>
          {isComplete && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
        {onAIGenerate && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAIGenerate}
            disabled={isGenerating}
            className="modern-button flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'AI Generate'}
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-violet-200">
            <FileText className="w-4 h-4" />
            Professional Summary *
          </label>
          <Textarea
            value={summary}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Write a compelling summary that highlights your key achievements, skills, and career objectives..."
            rows={5}
            className="modern-input min-h-[120px] resize-none"
          />
          <p className="text-xs text-gray-400 mt-2">
            2-3 sentences highlighting your experience, skills, and value proposition.
            <br />
            <span className="text-violet-400">Tip: Press Ctrl+Enter when complete to move to the next section.</span>
          </p>
        </div>
          {checkFormCompletion() && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm flex items-center gap-2">
              ✓ Summary complete! Press Ctrl+Enter to continue to the next section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
