export type PrivilegeLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
export type PrivilegeCategory = 'travel' | 'shopping' | 'dining' | 'lifestyle' | 'financial';

export interface Privilege {
  id: string;
  name: string;
  level: PrivilegeLevel;
  category: PrivilegeCategory;
  description: string;
  points: number;
  requiredPoints: number;
  validUntil: Date;
  benefits: string[];
  isActive: boolean;
  progress: number; // percentage to next level
  formattedValidUntil: string;
} 