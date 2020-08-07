import {MassiveConnectOptions} from "./massive-module-options.interface";

export interface MassiveOptionsFactory {
    createMassiveConnectOptions(): Promise<MassiveConnectOptions> | MassiveConnectOptions
}