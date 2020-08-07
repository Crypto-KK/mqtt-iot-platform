import {DynamicModule, Global, Module, Provider} from "@nestjs/common";
import {MassiveConnectAsyncOptions} from "./interfaces/massive-module-async-options.interface";
import {MassiveService} from "./massive.service";
import {MassiveOptionsFactory} from "./interfaces/massive-options-factory.interface";

@Global()
@Module({
    providers: [MassiveService],
    exports: [MassiveService]
})
export class MassiveModule {

    public static registerAsync(
        connectOptions: MassiveConnectAsyncOptions
    ): DynamicModule {
        return {
            module: MassiveModule,
            imports: connectOptions.imports || [],
            providers: [
                ...this.createConnectProviders(connectOptions)
            ]
        }
    }

    public static createConnectProviders(
        options: MassiveConnectAsyncOptions
    ): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createConnectOptionsProvider(options)]
        }

        // 对于useClass
        return [
            this.createConnectOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass
            }
        ]
    }

    public static createConnectOptionsProvider(
        options: MassiveConnectAsyncOptions
    ): Provider {
        if (options.useFactory) {
            return {
                provide: 'MASSIVE_CONNECT_OPTIONS',
                useFactory: options.useFactory,
                inject: options.inject || []
            }
        }

        return {
            provide: 'MASSIVE_CONNECT_OPTIONS',
            useFactory: async (optionsFactory: MassiveOptionsFactory) => {
                await optionsFactory.createMassiveConnectOptions()
            },
            inject: [options.useExisting || options.useClass]
        }
    }
}