import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Application } from 'src/app/Model/application';
import { ApplicationItem } from 'src/app/Model/ApplicationItem';
import { Applications } from 'src/app/Model/client';

@Component({
  selector: 'app-applicat',
  templateUrl: './applicat.component.html',
  styleUrls: ['./applicat.component.css']
})
export class ApplicatComponent implements OnInit {


  displayedColumns: string[] = [
    'appId', 'applicationId', 'applicationLabel', 'global', 'iTDomain', 'iTSubDomain',
    'scatterView', 'size', 'projectPortfolio', 'creationYear', 'decommissioningPlan',
    'businessDomain', 'businessProcessLevel1', 'businessProcessLevel2',
    'mainTechnologies', 'solutionMix', 'packageCategory', 'numberOfUsers', 'readyForAssessment',
    'scope', 'nicheProgrammingLanguage', 'decommissioningType', 'package', 'sMAC', 'regulatory',
    'deployment', 'intDeliveryModel', 'extDeliveryModel', 'dRP', 'redundantApplications',
    'databaseManagementSystem', 'applicationServer', 'targetApplication', 'hostingMode',
    'cloudTargetInfrastructure', 'cloudMigrationPath', 'cloudMigrationComplexity',
    'cloudServiceModel', 'rationale', 'publicCloudBlocker', 'cloudMigrationWave',
    'mainOSInProduction', 'mainOS', 'mainProdServersLocations', 'rationalizationDestiny',
    'rationalizationCategory', 'rationalizationType', 'candidateToGHOSTSRV', 'candidateToPSMutualization',
    'fixedSize', 'totalServers', 'productionServers', 'productionVirtualServers', 'productionPhysicalServers',
    'nonProductionServers', 'nonProductionVirtualServers', 'allocatedDiskSpace', 'usedDiskSpace',
    'fTE', 'fTEInternal', 'fTEExternal', 'fTEExternalFP', 'fTEMajorChanges', 'fTEMinorChanges',
    'fTEProblems', 'fTEServiceRequests', 'tCO', 'totalStaffCost', 'internalStaffCost', 'externalStaffCost',
    'totalInfrastructureCost', 'hardwareCost', 'licenseCost', 'managedServicesCost', 'externalFPStaffCost',
    'majorChangesCost', 'minorChangesCost', 'problemsCost', 'serviceRequestsCost', 'numberOfMinorChanges',
    'numberOfProblems', 'numberOfServiceRequests', 'backlogMinorChanges', 'backlogProblems', 'backlogServiceRequests',
    'hAETProblems', 'numberOfMajorReleases', 'numberOfITPPerYear', 'cloudMigrationComplexitySize',
    'costPerYearAWS', 'costPerYearAzure', 'tCFKgCO2ePerYear', 'cOMPUTE', 'cOMPUTEMANUF', 'cOMPUTERUN',
    'cOMPUTERUNMarketBased', 'oPERATINGMODEL', 'criticality', 'dynamism', 'serviceLevel', 'functionalComplexity',
    'usage', 'businessDifferentiation', 'demandQuality', 'businessNeedsAdequacy', 'requiredTTM', 'devOpsMaturity',
    'qOS', 'maxAcceptableDowntime', 'technicalObsolescence', 'codeQuality', 'maintainability',
    'sourceCodeAvailability', 'levelOfIntegration', 'packageCustomization', 'ageOfApplication',
    'suppliersDependency', 'globalOffshoreRatio', 'internalOffshoreRatio', 'externalOffshoreRatio',
    'changeIndex', 'iTDigitalReadiness', 'webCollectCompleteness', 'levelOfRobustness', 'oSObsolescence',
    'virtualizationRate', 'diskSpaceUsed', 'productionServerRate', 'globalRisk', 'securityRisk',
    'instabilityRisk', 'maintainabilityRisk', 'technicalObsolescenceRisk', 'volatilityRisk',
    'peopleDependencyRisk', 'suppliersDependencyRisk', 'licensePortability', 'cloudCompatibleArchitecture',
    'dataResidency', 'dataClassification', 'virtualizationStatus', 'rto', 'rpo',
    'responseTimeLatencyRequirement', 'security', 'securityCompliance', 'availability', 'integrity', 'confidentiality',
    'proof', 'rationalizationSolutionQuality', 'rationalizationTCOLevel', 'cyberSecurityScore', 'carbonIntensityRate',
    'pUERate', 'renewableEnergyRate', 'hostingRate', 'hostingRateRECIncluded', 'manufacturingRate', 'cloudRate'
  ];
  
  
  



  // searchId: number | undefined;
  // searchResult: Applications | undefined;
  // searchError = false;

  // application: Applications | undefined;

  allApplicationData: ApplicationItem[] = [];
  constructor(private route: ActivatedRoute,
    private http : AppService,
    private applicationService: AppService){}

  ngOnInit(): void {
    // const id = +this.route.snapshot.paramMap.get('id')!;
    // this.applicationService.getApp(id).subscribe((data) => {
    //   this.application = data;
    // });

    this.fetchApplicationData();
  }

  fetchApplicationData(): void {
    this.http.getAllApplicationList().subscribe(
      data => {
        console.log('Fetched data:', data);
        this.allApplicationData = data;
        console.log('allApplicationData:', this.allApplicationData);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // searchApplication() {
  //   if (this.searchId) {
  //     this.applicationService.GetByID(this.searchId).subscribe(
  //       (data) => {
  //         this.searchResult = data;
  //         this.searchError = false;
  //       },
  //       (error) => {
  //         this.searchError = true;
  //         this.searchResult = undefined;
  //       }
  //     );
  //   }
  // }
}
