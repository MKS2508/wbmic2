import { DeviceProps } from './device-props';
import { ModeProps } from './mode-props';

export interface BoardProps {
    _id: any;
    name: String;
    host: String;
    port: number;
    pines: Number[];
    mode: ModeProps[];
    connected: boolean;
}
