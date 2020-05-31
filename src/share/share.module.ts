import {Global, Module} from '@nestjs/common';
import {ShareService} from './share.service';

@Global()
@Module({
    providers: [ShareService],
    exports: [ShareService]
})
export class ShareModule {
}
