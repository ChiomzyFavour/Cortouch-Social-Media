import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { DataStoreService } from '../../common/data-store.service.js'; // 👈 Added .js
import { ClientProfile, ServicePackage } from '../../types/index.js'; // 👈 Added .js (and /index.js if it's a folder)
import { UpdateClientDto } from './dto/update-client.dto.js'; // 👈 Added .js

@Injectable()
export class ClientsService {
  constructor(@Inject(DataStoreService) private readonly dataStore: DataStoreService) {}

  getAllClients(): ClientProfile[] {
    return this.dataStore.getClients();
  }

  getClientById(id: string): ClientProfile {
    const client = this.dataStore.getClientById(id);
    if (!client) {
      throw new NotFoundException(`Client with ID "${id}" was not found`);
    }
    return client;
  }

  updateClient(id: string, dto: UpdateClientDto): ClientProfile {
    this.getClientById(id);
    const updated = this.dataStore.updateClient(id, dto);
    if (!updated) {
      throw new NotFoundException(`Client with ID "${id}" was not found`);
    }
    return updated;
  }

  getPackages(): ServicePackage[] {
    return this.dataStore.getPackages();
  }

  getPackageById(id: string): ServicePackage {
    const pkg = this.dataStore.getPackageById(id);
    if (!pkg) {
      throw new NotFoundException(`Service package with ID "${id}" was not found`);
    }
    return pkg;
  }
}