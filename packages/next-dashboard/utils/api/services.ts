import { Service } from '@/types/service';
import { ServiceGenerator } from '@/utils/generators/services';

export class ServiceService {
  static async getServices(): Promise<Service[]> {
    return ServiceGenerator.generateFixedServices();
  }

  static async getServiceById(id: string): Promise<Service | null> {
    const services = await this.getServices();
    return services.find(service => service.id === id) || null;
  }
} 