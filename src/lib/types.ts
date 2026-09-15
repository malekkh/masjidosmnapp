export type UserRole = "admin" | "sheikh" | "visitor";
export type QuestionStatus = "pending" | "answered" | "rejected";

export type Profile = {
  id: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
};

export type Question = {
  id: string;
  user_id: string | null;
  question: string;
  category: string;
  is_anonymous: boolean;
  status: QuestionStatus;
  answer: string | null;
  answered_by: string | null;
  answered_at: string | null;
  created_at: string;
};

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  sort_order: number;
  created_at: string;
};

export type Announcement = {
  id: string;
  title: string;
  description: string | null;
  speaker: string | null;
  starts_at: string;
  location: string | null;
  published: boolean;
  created_by: string;
  created_at: string;
};

export type IbadahCategory = {
  id: string;
  slug: string;
  name: string;
  icon: string;
  sort_order: number;
  created_at: string;
};

export type IbadahRuling = {
  id: string;
  category_id: string;
  title: string;
  definition: string;
  question: string | null;
  answer: string;
  source_name: string;
  source_url: string;
  scholar: string | null;
  madhhab: string | null;
  verified: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
