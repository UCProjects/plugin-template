import { mkdir, writeFile } from 'node:fs/promises';

const SOURCE = 'https://github.com/UCProjects/UnderScript/releases/latest/download/underscript.d.ts';

try {
  const response = await fetch(SOURCE);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  await mkdir('types', { recursive: true });
  await writeFile('types/underscript.d.ts', await response.text());
  console.log('Updated types/underscript.d.ts');
} catch (error) {
  console.warn(`Could not download the UnderScript types (${error.message}), run "npm run types" to retry`);
}
