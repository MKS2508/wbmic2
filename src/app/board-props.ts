import { DeviceProps } from './device-props';
export interface BoardProps {
    _id: any;
    name: String;
    host: String;
    port: number;
    pines: number[];
    mode: any[];
    connected: boolean;
}
