import { ServerItem } from "./ServerItem";

export interface CombinedItem {
    appId: number;
    serverId: number;
    serverLabel: string;
    applicationId: number;
    applicationLabel: string;
    applicationServer: ServerItem[];
  }
  