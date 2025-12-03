export interface SocialMedia {
  linkedin: string;
  twitter: string;
  email: string;
}

export interface Founder {
  _id: string;
  name: string;
  position: string;
  quote: string;
  details: string;
  socialMedia: SocialMedia;
  avatar: string;
}

export interface FounderFormData {
  name: string;
  position: string;
  quote: string;
  details: string;
  linkedin: string;
  twitter: string;
  email: string;
}
