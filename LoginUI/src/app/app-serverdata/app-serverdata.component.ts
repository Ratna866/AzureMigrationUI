import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

import { ApplicationItem } from '../Model/ApplicationItem';

import { CombinedItem } from '../Model/CombinedData';

import { ServerItem } from '../Model/ServerItem';


@Component({

  selector: 'app-app-serverdata',

  templateUrl: './app-serverdata.component.html',

  styleUrls: ['./app-serverdata.component.css']

})

export class AppServerdataComponent implements OnInit {
  displayedColumns: string[] = [

    'appId', 'serverId', 'serverLabel', 'applicationId', 'applicationLabel', 'applicationServer'

  ];

  serverData: ServerItem[] = []

  combinedData: CombinedItem[] = [];

  constructor(private serverService: AppService) { }

  ngOnInit(): void {

    this.fetchCombinedData();

  }

  fetchCombinedData(): void {

    this.serverService.getAppServer().subscribe(

      (data: CombinedItem[]) => {

        this.combinedData = data;

      },

      (error: any) => {

        console.error('Error fetching server data:', error);

      }

    );

  }

}

