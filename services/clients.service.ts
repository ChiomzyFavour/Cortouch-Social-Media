import { db } from '../data/store';
import { ClientProfile, ServicePackage } from '../types';

export class ClientsService {
  getAllClients(): ClientProfile[] {
    return db.getClients();
  }

  getClientById(id: string): ClientProfile | undefined {
    return db.getClientById(id);
  }

  getAllPackages(): ServicePackage[] {
    return db.getPackages();
  }

  getPackageById(id: string): ServicePackage | undefined {
    return db.getPackageById(id);
  }
}

export const clientsService = new ClientsService();
