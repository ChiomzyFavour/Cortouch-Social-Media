import { Controller, Get, Patch, Param, Body, Inject } from '@nestjs/common';
import { ClientsService } from './clients.service.js'; // 👈 Added .js
import { UpdateClientDto } from './dto/update-client.dto.js'; // 👈 Added .js

@Controller('clients')
export class ClientsController {
  constructor(@Inject(ClientsService) private readonly clientsService: ClientsService) {}

  @Get()
  getClients() {
    const clients = this.clientsService.getAllClients();
    return {
      success: true,
      count: clients.length,
      data: clients,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('packages')
  getPackages() {
    const packages = this.clientsService.getPackages();
    return {
      success: true,
      count: packages.length,
      data: packages,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('packages/:id')
  getPackageById(@Param('id') id: string) {
    const pkg = this.clientsService.getPackageById(id);
    return {
      success: true,
      data: pkg,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  getClientById(@Param('id') id: string) {
    const client = this.clientsService.getClientById(id);
    return {
      success: true,
      data: client,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id')
  updateClient(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    const updated = this.clientsService.updateClient(id, dto);
    return {
      success: true,
      message: 'Client profile updated successfully',
      data: updated,
      timestamp: new Date().toISOString(),
    };
  }
}