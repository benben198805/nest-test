import {OnQueueActive, Process, Processor} from "@nestjs/bull";
import {Job} from 'bull';
import {Logger} from "@nestjs/common";

@Processor('audio')
export class AudioProcessor {
    private readonly logger = new Logger(AudioProcessor.name);

    @Process('transcode')
    async handleTranscode(job: Job) {
        this.logger.debug("start process job");
        this.logger.debug(JSON.stringify(job));
        this.logger.debug("end process job");
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(
            `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}...`,
        );
    }
}