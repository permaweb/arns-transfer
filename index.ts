import fs from 'fs';

import {
  WarpFactory,
  defaultCacheOptions,
  LoggerFactory,
} from 'warp-contracts';

const ANT = process.env.ANT;
const KEYFILE_PATH = process.env.PATH_TO_WALLET;
const TARGET = process.env.ARNS_TARGET;

(async function () {
  LoggerFactory.INST.logLevel('error');

  const warp = WarpFactory.forMainnet(
    {
      ...defaultCacheOptions,
      inMemory: true,
    },
    true
  );

  const ownersWallet = JSON.parse(
    fs.readFileSync(KEYFILE_PATH || '').toString()
  );
  const pst = warp.pst(ANT);
  pst.connect(ownersWallet);
  const interaction = await pst.transfer(
    {
      target: TARGET || '',
      qty: 1,
    },
    {
      disableBundling: true,
    }
  );
  console.log(`Submitted transfer interaction: ${interaction!.originalTxId}`);
})();
