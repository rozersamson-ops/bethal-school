export interface Course {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  iconName: string; // Lucide icon identifier
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string; // e.g., "1 Year Course / Grade-wise"
  exams: string[]; // e.g., ["Trinity College London", "ABRSM"]
  outcomes: string[];
  schedule: string;
}

export interface Faculty {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  bio: string;
  instruments: string[];
  imageUrl: string;
}

export interface Inquiry {
  id: string;
  studentName: string;
  parentName?: string;
  studentAge: number;
  courseId: string;
  courseName: string;
  phone: string;
  email: string;
  experience: string; // "Beginner" | "Under 1 year" | "1-3 years" | "3+ years"
  notes?: string;
  dateSubmitted: string;
  status: "new" | "contacted" | "enrolled" | "closed";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Student (Grade 5 Piano)", "Parent of Guitar Student"
  text: string;
  rating: number;
  avatarUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "classes" | "performances" | "campus" | "exams";
  imageUrl: string;
  description: string;
}
