import {ModuleMetadata, Type} from "@nestjs/common";
import {MassiveOptionsFactory} from "./massive-options-factory.interface";
import {MassiveConnectOptions} from "./massive-module-options.interface";

export interface MassiveConnectAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useExisting?: Type<MassiveOptionsFactory>;
    useClass?: Type<MassiveOptionsFactory>;
    useFactory?: (
        ...args: any[]
    ) => Promise<MassiveConnectOptions> | MassiveConnectOptions;
}