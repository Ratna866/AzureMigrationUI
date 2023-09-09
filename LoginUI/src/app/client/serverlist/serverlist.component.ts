import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ServerItem } from 'src/app/Model/ServerItem';

@Component({
  selector: 'app-serverlist',
  templateUrl: './serverlist.component.html',
  styleUrls: ['./serverlist.component.css']
})
export class ServerlistComponent implements OnInit {

  displayedColumns: string[] = [
    'serverId', 'serverLabel', 'global', 'iTDomain', 'scatterView', 'size', 'inProduction',
    'environment', 'virtualized', 'typeOfServer', 'typeOfServerNormalized', 'datacenter',
    'serverDetailedLocation', 'country', 'oS', 'oSNormalized', 'oSVersion', 'oSVersionNormalized',
    'reservedInstance', 'teeshirt', 'region', 'serverMigrationMonth', 'serverTargetInfrastructure',
    'serverMigrationPath', 'isOrphan', 'isMutualized', 'fixedSize', 'numberOfApplicationsMapped',
    'numberOfCPU', 'rAMSize', 'totalAllocatedDiskSize', 'usedDiskSize', 'usageHour', 'currentCost',
    'serverMigrationCost', 'aWSCostPerYear', 'azureCostPerYear', 'sRVTCF', 'mANUF', 'rUN',
    'rUNMarketBased', 'energy', 'energyPUEIncluded', 'webCollectCompleteness', 'serverOSObsolescence',
    'sRVCarbonIntensityRate', 'sRVRenewableEnergyRate', 'sRVPUERate', 'sRVHostingRate',
    'sRVHostingRateRECIncluded', 'actions'
  ];
  
  
  
  

  serverData: ServerItem[] = [];

  constructor(private serverService: AppService) {}
  
  ngOnInit(): void {
    this.fetchServerData();
  }

  fetchServerData(): void {
    this.serverService.getServers().subscribe(
      data => {
        console.log('Fetched data:', data);
        this.serverData = data;
        console.log('serverData:', this.serverData);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
