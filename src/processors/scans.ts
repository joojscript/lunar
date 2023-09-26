import { SCAN_EXECUTABLE } from '@/globals/constants/scans';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DoneCallback, Job } from 'bull';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const PARSE_SCAN_RESULT_REGEXP =
  /(\d+)\/([A-Za-z0-9-_]+)\s+([A-Za-z0-9-_]+)\s+([A-Za-z0-9-_]+)\s+([A-Za-z0-9-_]+)/gm;

const prismaClient = new PrismaClient();

export default async function (job: Job, cb: DoneCallback) {
  Logger.debug(
    `[${process.pid}] Starting Scan for ${job.data.hostname}`,
    'Scan Processor',
  );

  try {
    const { stdout } = await execPromise(
      `${SCAN_EXECUTABLE} -a ${job.data.hostname}`,
    );

    const regExpExecArray = PARSE_SCAN_RESULT_REGEXP.exec(stdout);
    const [, port, protocol, state, service, reason] = regExpExecArray;

    const scanPayload = {
      port: Number(port),
      protocol,
      state,
      service,
      reason,
      host: {
        connect: {
          hostname: job.data.hostname,
        },
      },
    };

    const previousScan = await prismaClient.scan.findFirst({
      where: { host: { hostname: job.data.hostname }, port: Number(port) },
      orderBy: { updatedAt: 'desc' },
    });

    const shouldInsert = !previousScan || previousScan.state !== state;

    if (!shouldInsert) {
      await prismaClient.scan.update({
        where: { id: previousScan.id },
        data: scanPayload,
      });
    } else {
      await prismaClient.scan.create({ data: scanPayload });
    }

    cb(null, { port, protocol, state, service, reason });
  } catch (error) {
    Logger.error(error);
    cb(error as Error);
  }
}
