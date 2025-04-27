export type ServiceCategory = 'insurance' | 'investment' | 'banking' | 'credit' | 'advisory';
export type ServiceStatus = 'active' | 'inactive' | 'pending';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  status: ServiceStatus;
  description: string;
  monthlyFee: number;
  billingDate: Date;
  enrollmentDate: Date;
  features: string[];
  formattedMonthlyFee: string;
  formattedBillingDate: string;
  formattedEnrollmentDate: string;
  isAutoRenew: boolean;
} 