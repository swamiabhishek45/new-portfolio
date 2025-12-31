
import { Project, Skill, Certification } from '../types/types';

const DATABASE = {
    projects: [
        {
            id: '1',
            title: 'LiveDocs - Web Application  ',
            description: 'LiveDocs is a clone of Goole Docs. The primary goal is to demonstrate the developer skills in realtime enviroment that creates a lasting impact.',
            image: 'https://swamiabhishek45.vercel.app/assets/livedocs-mrgNb06k.png',
            tags: ['Next', 'TypeScript', 'LiveBlocks'],
            link: 'https://livedocs45.vercel.app/',
            github: 'https://github.com/swamiabhishek45/LiveDocs'
        },
        {
            id: '2',
            title: 'Netlink - Social Media App  ',
            description: 'This project showcases a full stack social media platform. It offers a range of functionalities to enhance user interaction and engagement.',
            image: 'https://swamiabhishek45.vercel.app/assets/social-7_w9UxyQ.png',
            tags: ['Node', 'Express', 'MongoDB'],
            link: 'https://netlink-slxg.onrender.com/',
            github: 'https://github.com/swamiabhishek45/netlink-Social-Media-App'
        },
        {
            id: '3',
            title: 'Tree Trop Tales - Blog App  ',
            description: 'Developed a Blog Application in which users can post their though, ideas by writing blogs with images. It has authentication functionlity.',
            image: 'https://swamiabhishek45.vercel.app/assets/blog-QLVkmWAG.png',
            tags: ['React', 'TailwindCSS', 'AppWrite'],
            link: 'https://treetoptail.vercel.app/',
            github: 'https://github.com/swamiabhishek45/MegaBlog-Project'
        }
    ],
    skills: [
        { name: 'React', category: 'Frontend', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Next.js', category: 'Frontend', level: 92, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
        { name: 'TypeScript', category: 'Frontend', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'Tailwind CSS', category: 'Frontend', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Node.js', category: 'Backend', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'MongoDB', category: 'Backend', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'Python', category: 'Backend', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'GitHub', category: 'Tools', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'Git', category: 'Tools', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    ],
    certifications: [
        {
            id: 'c1',
            title: 'Google Cloud Professional Cloud Architect',
            issuer: 'Google Cloud',
            issueDate: 'Jan 2024',
            credentialUrl: '#',
            image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg'
        },
        {
            id: 'c2',
            title: 'Meta Front-End Developer Professional Certificate',
            issuer: 'Meta',
            issueDate: 'Nov 2023',
            credentialUrl: '#',
            image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg'
        },
        {
            id: 'c3',
            title: 'DeepLearning.AI AI Developer Specialization',
            issuer: 'DeepLearning.AI',
            issueDate: 'Sep 2023',
            credentialUrl: '#',
            image: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/DeepLearning.AI_logo.png'
        }
    ]
};

const apiFetch = async <T>(endpoint: string): Promise<T> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (endpoint === '/api/projects') return DATABASE.projects as unknown as T;
    if (endpoint === '/api/skills') return DATABASE.skills as unknown as T;
    if (endpoint === '/api/certifications') return DATABASE.certifications as unknown as T;

    throw new Error(`404: Endpoint ${endpoint} not found`);
};

export const mockApiService = {
    getProjects: () => apiFetch<Project[]>('/api/projects'),
    getSkills: () => apiFetch<Skill[]>('/api/skills'),
    getCertifications: () => apiFetch<Certification[]>('/api/certifications')
};
