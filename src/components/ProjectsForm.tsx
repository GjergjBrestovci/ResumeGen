import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types/resume';
import { generateId } from '@/utils';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const addProject = () => {
    const newProject: Project = {
      id: generateId(),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      url: '',
      github: ''
    };
    onChange([...projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id: string) => {
    onChange(projects.filter(project => project.id !== id));
  };

  const updateTechnologies = (id: string, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech);
    updateProject(id, 'technologies', technologies);
  };

  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-violet-300">
          Projects
          <Button onClick={addProject} size="sm" className="modern-button">
            <Plus className="w-4 h-4 mr-1" />
            Add Project
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No projects added yet. Click "Add Project" to showcase your work.
          </p>
        ) : (
          projects.map((project, index) => (
            <div key={project.id} className="border rounded-lg p-4 space-y-4 border-violet-500/20 bg-background/50">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-violet-300">Project #{index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Project Name *</label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    placeholder="My Awesome Project"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Technologies Used</label>
                  <Input
                    value={project.technologies.join(', ')}
                    onChange={(e) => updateTechnologies(project.id, e.target.value)}
                    placeholder="React, TypeScript, Node.js, etc."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate technologies with commas
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date *</label>
                  <Input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <Input
                    type="month"
                    value={project.endDate || ''}
                    onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                    placeholder="Leave empty if ongoing"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Live Demo URL</label>
                  <div className="relative">
                    <Input
                      value={project.url || ''}
                      onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                      placeholder="https://myproject.com"
                      className="pr-10"
                    />
                    {project.url && (
                      <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">GitHub Repository</label>
                  <div className="relative">
                    <Input
                      value={project.github || ''}
                      onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                      placeholder="https://github.com/username/repo"
                      className="pr-10"
                    />
                    {project.github && (
                      <Github className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Project Description *</label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Describe what this project does, the problems it solves, and your role in building it..."
                  rows={4}
                />
              </div>

              {project.technologies.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2">Technologies Preview</label>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
