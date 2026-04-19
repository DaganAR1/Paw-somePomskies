
export interface Puppy {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  age: string;
  status: 'Available' | 'Reserved' | 'Adopted';
  image: string;
  additionalImages?: string[];
  description: string;
  coatColor?: string;
  eyeColor?: string;
  weight?: string;
}

export interface Parent {
  id: string;
  name: string;
  role: 'Male' | 'Female';
  image: string;
  breed: string;
  weight: string;
  description: string;
  age?: string;
  coatColor?: string;
  eyeColor?: string;
}

export interface ScheduleEvent {
  id: string;
  period: string;
  event: string;
  date: string;
  details: string;
}

export interface GuardianDog {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  age: string;
  image: string;
  description: string;
  breed: string;
  status: 'Available' | 'Found';
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: 'Health' | 'Training' | 'News';
  date: string;
  image: string;
  author: string;
}
