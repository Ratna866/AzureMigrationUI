import { ApplicationItem } from './ApplicationItem'; // Import the ApplicationList interface

export interface ServerItem {
  id: number | null;
  serverId: string | null;
  serverLabel: string | null;
  global: string | null;
  iTLandscape: string | null;
  scatterView: string | null;
  size: string | null;
  inProduction: string | null;
  environment: string | null;
  virtualized: string | null;
  typeOfServer: string | null;
  typeOfServerNormalized: string | null;
  datacenter: string | null;
  serverDetailedLocation: string | null;
  country: string | null;
  oS: string | null;
  oSNormalized: string | null;
  oSVersion: string | null;
  oSVersionNormalized: string | null;
  reservedInstance: string | null;
  teeshirt: string | null;
  region: string | null;
  serverMigrationMonth: string | null;
  serverTargetInfrastructure: string | null;
  serverMigrationPath: string | null;
  isOrphan: string | null;
  isMutualized: string | null;
  fixedSize: string | null;
  numberOfApplicationsMapped: string | null;
  numberOfCPU: string | null;
  rAMSize: string | null;
  totalAllocatedDiskSize: string | null;
  usedDiskSize: string | null;
  usageHour: string | null;
  currentCost: string | null;
  serverMigrationCost: string | null;
  aWSCostPerYear: string | null;
  azureCostPerYear: string | null;
  sRVTCF: string | null;
  mANUF: string | null;
  rUN: string | null;
  rUNMarketBased: string | null;
  energy: string | null;
  energyPUEIncluded: string | null;
  webCollectCompleteness: string | null;
  serverOSObsolescence: string | null;
  sRVCarbonIntensityRate: string | null;
  sRVRenewableEnergyRate: string | null;
  sRVPUERate: string | null;
  sRVHostingRate: string | null;
  sRVHostingRateRECIncluded: string | null;
  appId: number | null; // Foreign key property
  applicationLists: ApplicationItem | null; // Foreign key property
  rowNumber: number | null; // New property to store the row number/order
}
