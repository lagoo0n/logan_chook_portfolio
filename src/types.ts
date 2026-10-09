export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  type: 'firmware' | 'emulator' | 'peripheral' | 'hardware' | 'network';
}

export interface DiagramFlow {
  from: string;
  to: string;
  protocol?: string;
}

export interface ProjectDetail {
  slug: string;
  name: string;
  tagline: string;
  tags: string[];
  role: string;
  status: 'In Progress' | 'Active Development' | 'Completed Milestone';
  summary30s: string;
  problem: string;
  approach: string;
  diagram: {
    description: string;
    stages: string[];
    nodes: DiagramNode[];
    flows: DiagramFlow[];
  };
  myContribution: string[];
  technicalDetails: {
    title: string;
    items: string[];
  }[];
  currentProgress: {
    statusNote: string;
    hasTerminalOutput?: boolean;
    terminalSnippet?: {
      command: string;
      output: string[];
    };
    milestones: {
      name: string;
      status: 'Completed' | 'In Progress' | 'Planned';
      notes: string;
    }[];
  };
  nextSteps?: string[];
  whatILearned: string[];
}
