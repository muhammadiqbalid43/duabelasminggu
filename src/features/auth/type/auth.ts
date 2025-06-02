export interface Profile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  timezone: string;
  preferredPlanningDay: number;
  weeklyReviewTime: string;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  profile?: Profile;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
