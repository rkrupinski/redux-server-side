import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { build, BuildOptions } from 'esbuild';

const define: Record<string, string> = {};

for (const k in process.env) {
  define[`process.env.${k}`] = JSON.stringify(process.env[k]);
}

const options: BuildOptions = {
  entryPoints: ['./src/index.tsx'],
  entryNames: '[dir]/[name]-[hash]',
  outdir: './dist',
  metafile: true,
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [
    {
      name: 'emitMeta',
      setup(build) {
        build.onEnd(({ metafile }) => {
          writeFileSync(
            resolve(__dirname, '_meta.json'),
            JSON.stringify(metafile, null, 2),
          );
        });
      },
    },
  ],
  define,
};

build(options).catch(() => process.exit(1));
