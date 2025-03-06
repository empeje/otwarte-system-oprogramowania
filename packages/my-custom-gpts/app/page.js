import { promises as fs } from 'fs';
import path from 'path';
import ClientPage from '../components/ClientPage';

// This function runs at build time
async function getPrompts() {
  const manifestPath = path.join(process.cwd(), 'manifest.json');
  const manifestContent = await fs.readFile(manifestPath, 'utf8');
  const { prompts } = JSON.parse(manifestContent);

  // Read the content of each prompt file
  const promptsWithContent = await Promise.all(
    prompts.map(async (prompt) => {
      try {
        const promptPath = path.join(process.cwd(), prompt.promptFile);
        const content = await fs.readFile(promptPath, 'utf8');
        return { ...prompt, content };
      } catch (error) {
        console.error(`Error reading prompt file: ${prompt.promptFile}`, error);
        return { ...prompt, content: 'Preview not available' };
      }
    })
  );

  return promptsWithContent;
}

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

export default async function Page() {
  const prompts = await getPrompts();
  return <ClientPage prompts={prompts} />;
} 