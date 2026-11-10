import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {existsSync} from 'node:fs';
const root=fileURLToPath(new URL('../',import.meta.url));
const cli=fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js',import.meta.url));
if(!existsSync(cli)){console.error('Install project dependencies with pnpm install --frozen-lockfile first.');process.exit(1)}
const result=spawnSync(process.execPath,['--import','./scripts/sites-env.mjs',cli,'d1','migrations','apply','DB','--local','--config','wrangler.local.jsonc','--persist-to','.wrangler/state'],{cwd:root,stdio:['ignore','inherit','inherit']});
if(result.error){console.error(result.error.message);process.exit(1)}
process.exit(result.status??1);
