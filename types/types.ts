
export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
    github: string;
}

export interface Skill {
    name: string;
    category: 'Frontend' | 'Backend' | 'AI' | 'Tools';
    level: number; // 1-100
    icon: string;
}

export interface Certification {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    credentialUrl: string;
    image: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

export enum PersonaMode {
    DEVELOPER = 'Developer Alex',
    DESIGNER = 'Designer Alex',
    MENTOR = 'Mentor Alex',
    CAREER_ADVISOR = 'Career Advisor'
}
