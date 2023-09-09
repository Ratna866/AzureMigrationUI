import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApplicationItem } from '../Model/ApplicationItem';
import { ServerItem } from '../Model/ServerItem';
import * as d3 from 'd3';
import { sankey} from 'd3-sankey';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-d3app',
  templateUrl: './d3app.component.html',
  styleUrls: ['./d3app.component.css']
})
export class D3AppComponent implements OnInit, AfterViewInit {
  @ViewChild('sankeyContainer')
  private sankeyContainer!: ElementRef;

  applicationData: ApplicationItem[] = [];

  serverData: ServerItem[] = [];
  


  constructor(private http: HttpClient) { }



  ngOnInit() {

    const applicationData$ = this.http.get<ApplicationItem[]>('http://localhost:5078/api/ApplicationD3');

    const serverData$ = this.http.get<ServerItem[]>('http://localhost:5078/api/ServerD3');

//generate code for sankey diagram using d3.js use data from applicationData$ and serverData$ to generate sankey diagram

    // Use forkJoin to fetch both sets of data simultaneously

    forkJoin([applicationData$, serverData$]).subscribe(

      ([applicationData, serverData]) => {

        console.log("Application Data:", applicationData);

        console.log("Server Data:", serverData);

        this.applicationData = applicationData;

        this.serverData = serverData;

        this.renderSankey();

      },

      (error) => {

        console.error('Error fetching data:', error);

      }

    );

  }



  ngAfterViewInit() {

    this.renderSankey();

  }

  private renderSankey() {

    // Check if the necessary data is available

    if (!this.applicationData || this.applicationData.length === 0 || !this.serverData || this.serverData.length === 0) {

      return;

    }



    // Prepare the Sankey data



    const applicationNodes: any[] = [];

    const serverNodes: any[] = [];



    this.applicationData.forEach(d => {

      applicationNodes.push({ name: d.applicationId, group: 'Application' });

    });
    
    this.applicationData.forEach(d => {

      applicationNodes.push({ name: d.applicationServer, group: 'Application' });

    });
    

    this.serverData.forEach(d => {

      serverNodes.push({ name: d.serverId, group: 'Server' });

    });



    const links: any[] = [];


    this.applicationData.forEach(d => {
  links.push({ source: d.applicationId, target: d.serverId, value: d.applicationServer });
});




    // Create the Sankey layout

    const sankeyLayout = sankey()

      .nodeWidth(15)

      .nodePadding(10)

      .extent([[0, 5], [1000, 1000]]);





    // Compute the layout

    const sankeyData = sankeyLayout({

      nodes: [...applicationNodes, ...serverNodes],

      links: links

    });



    // Draw



    const svg = d3.select(this.sankeyContainer.nativeElement);

    svg.attr('width', 1000);

    svg.attr('height', 1000);



    // Draw the links first, so nodes appear on top of them



    svg.append('g')

      .attr('stroke', '#000')

      .attr('stroke-opacity', 0.2)  

      .selectAll('line')

      .data(sankeyData.links)

      .join('line')

      .attr('x1', (d:any )=> d.source.x1 + 10)

      .attr('x2', (d:any )=> d.target.x0)

      .attr('y1', (d:any )=> d.source.y0 + d.sy + 5)

      .attr('y2', (d:any )=> d.target.y0 + d.ty + 5)

      .attr('stroke-width', (d:any ) => Math.max(1, d.width));


    // Draw the nodes

    const node = svg.append('g')

      .selectAll('g')

      .data(sankeyData.nodes)

      .join('g')

      .attr('transform', d => `translate(${d.x0}, ${d.y0})`);

    node.append('rect')

      .attr('height', (d:any) => d.y1 - d.y0)

      .attr('width', (d:any) => d.x1 - d.x0)

      .attr('fill', '#ccc')

      .append('title')

      .text((d:any) => `${d.name}\n${d.value}`);

      
//continue here

    node.append('text')

      .attr('x', -6)

      .attr('y',( d:any) => (d.y1 - d.y0) / 2)

      .attr('dy', '0.35em')

      .attr('text-anchor', 'end')

      .attr('fill', '#000')

      .text((d:any) => d.name)

      .filter((d:any) => d.x0 < 1000 / 2)

      .attr('x', ( d:any )=> d.x1 - d.x0)
      
      .attr('text-anchor', 'start');




  }

}


















//     // Use forkJoin to fetch both sets of data simultaneously

//     forkJoin([applicationData$, serverData$]).subscribe(

//       ([applicationData, serverData]) => {

//         console.log("Application Data:", applicationData);

//         console.log("Server Data:", serverData);

//         this.applicationData = applicationData;

//         this.serverData = serverData;

//         this.renderSankey();

//       },

//       (error) => {

//         console.error('Error fetching data:', error);

//       }

//     );

//   }



//   ngAfterViewInit() {

//     this.renderSankey();

//   }

//   private renderSankey() {

//     // Check if the necessary data is available

//     if (!this.applicationData || this.applicationData.length === 0 || !this.serverData || this.serverData.length === 0) {

//       return;

//     }



//     // Prepare the Sankey data

//     const applicationNodes: any[] = [];

//     const serverNodes: any[] = [];



//     this.applicationData.forEach(d => {

//       applicationNodes.push({ name: d.applicationId, group: 'Application' });

//     });

//     this.serverData.forEach(d => {

//       serverNodes.push({ name: d.serverId, group: 'Server', AppId: d.appId });

//     });



//     // Create links based on the ApplicationId

//     const linkMap = new Map<string, any>(); // Use a Map to keep track of unique links

//     this.applicationData.forEach(appItem => {

//       const sourceNode = applicationNodes.find(node => node.name === appItem.applicationId);

//       const targetNodes = serverNodes.filter(node => node.AppId === appItem.appId);



//       if (sourceNode && targetNodes) {

//         targetNodes.forEach(targetNode => {

//           // Use a unique key for each link to avoid duplicates

//           const linkKey = `${sourceNode.name}-${targetNode.name}`;



//           // Check if the link already exists, if yes, update the value

//           if (linkMap.has(linkKey)) {

//             linkMap.get(linkKey).value += 1;

//           } else {

//             // Create a new link and add it to the map

//             linkMap.set(linkKey, {

//               source: sourceNode,
//               target: targetNode,

//               value: 1, // Modify this based on your requirements

//             });

//           }

//         });

//       }

//     });

//     // Convert the linkMap values to an array

//     const links = Array.from(linkMap.values());



//     // Set the dimensions of the Sankey diagram

//     const container = this.sankeyContainer.nativeElement;

//     const width = container.offsetWidth;

//     const height = container.offsetHeight;



//     // Set the margin and padding values

//     const margin = { top: 5, right: 30, bottom: 10, left: 30 };

//     const padding = { top: 10, right: 20, bottom: 20, left: 20 };



//     // Calculate the inner width and height

//     const innerWidth = width - margin.left - margin.right;

//     const innerHeight = height - margin.top - margin.bottom;



//     // Calculate the available width and height for the Sankey diagram

//     const availableWidth = innerWidth - padding.left - padding.right;

//     const availableHeight = innerHeight - padding.top - padding.bottom;
//     // Compute the Sankey layout

//     const sankeyDiagram = sankey<any, any>()

//       .nodeWidth(5)

//       .nodePadding(10)

//       .size([availableWidth, availableHeight]);



//     const sankeyData = {

//       nodes: [...applicationNodes, ...serverNodes],

//       links: links

//     };



//     sankeyDiagram(sankeyData);



//     // Create the SVG container

//     const svg = d3.select(container)

//       .append('svg')

//       .attr('width', width)

//       .attr('height', height)

//       .append('g')

//       .attr('transform', `translate(${margin.left + padding.left},${margin.top + padding.top})`);

//     // Create the link elements

//     const link = svg.append('g')

//       .selectAll('.link')

//       .data(sankeyData.links)

//       .enter()

//       .append('path')

//       .attr('class', 'link')

//       .attr('d', sankeyLinkHorizontal())

//       .style('stroke-width', 1) // Modify this value to adjust the link thickness

//       .style('fill', 'none')

//       .style('stroke', '#000')

//       .style('opacity', 0.5); // Modify this value to adjust the link opacity
//     // Create the node elements

//     const node = svg.append('g')

//       .selectAll('.node')

//       .data(sankeyData.nodes)

//       .enter()

//       .append('g')

//       .attr('class', 'node')

//       .attr('transform', function(d) {
//         if (typeof d.translationX === 'number' && typeof d.translationY === 'number' &&
//             !isNaN(d.translationX) && !isNaN(d.translationY)) {
//             return `translate(${d.translationX},${d.translationY})`;
//         } else {
//             // Handle missing or invalid translation values
//             return ''; // No transformation
//         }
//     })
    
//       .style('fill', '#000')

//       .style('opacity', 0.8);

//     // Create the node rectangles

//     node.append('rect')

//       .attr('x', 0)

//       .attr('y', 0)

//       .attr('height', function(d) {
//         if (typeof d.height === 'number' && !isNaN(d.height)) {
//             return d.height; // Use the valid numeric height value
//         } else {
//             // Handle missing or invalid height values
//             return 0; // Default value
//         }
//     })
    

//       .attr('width', sankeyDiagram.nodeWidth())

//       .style('shape-rendering', 'crispEdges')

//       .style('stroke', '#555')

//       .style('stroke-width', 0.5);

//     // Create the node labels

//     node.append('text')

//       .attr('x', -6)

//       .attr('y', function(d) {
//         if (typeof d.y === 'number' && !isNaN(d.y)) {
//             return d.y; // Use the valid numeric y value
//         } else {
//             // Handle missing or invalid y values
//             return 0; // Default value
//         }
//     })
    

//       .attr('dy', '0.05em')

//       .attr('text-anchor', 'start')

//       .text((d: any) => d.name)

//       .style('font-size', '10px')

//       .style('text-transform', 'upercase')

//       .filter((d: any) => d.x0 < availableWidth / 2)

//       .attr('x', 6 + sankeyDiagram.nodeWidth())

//       .attr('text-anchor', 'start');

//   }


// }  