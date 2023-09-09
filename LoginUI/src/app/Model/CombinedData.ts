import { ApplicationItem } from "./ApplicationItem";
import { ServerItem } from "./ServerItem";

export interface CombinedItem {
    servers: ServerItem[];
    applications: ApplicationItem[];
}