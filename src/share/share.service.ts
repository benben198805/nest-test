import {Injectable} from '@nestjs/common';

var uuid = require("uuid");

@Injectable()
export class ShareService {
    log(mes) {
        console.log("this is debug");
        console.log(mes);
    }

    generateUUID() {
        return uuid.v4();
    }
}
