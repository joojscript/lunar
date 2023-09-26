import { SCAN_EXECUTABLE } from '@/globals/constants/scans';

import { execSync } from 'child_process';
const shell = (cmd) => execSync(cmd, { encoding: 'utf8' });

export function verifyScannerIsPresent() {
  try {
    shell(`which ${SCAN_EXECUTABLE}`);
  } catch (error) {
    throw new Error("Didn't find scanner executable in PATH.");
  }
}
