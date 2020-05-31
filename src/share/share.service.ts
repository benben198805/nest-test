import {Injectable} from '@nestjs/common';

@Injectable()
export class ShareService {
    log(mes) {
        console.log("this is debug");
        console.log(mes);
    }
}
