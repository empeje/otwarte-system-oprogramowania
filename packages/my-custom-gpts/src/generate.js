import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');

// Template for new prompt files
const PROMPT_TEMPLATE = `# {name}

## Role and Goal
[Describe the GPT's primary role and objectives]

## Constraints
- [List key constraints]

## Guidelines
1. [Add main guidelines]

## Clarification
Ask for clarification when:
- [List situations]

## Personalization
- [Add personality traits]
`;

async function generatePromptFile(prompt) {
  const promptPath = path.join(ROOT_DIR, prompt.promptFile);
  
  // Check if prompt file already exists
  if (await fs.pathExists(promptPath)) {
    console.log(`Prompt file already exists: ${prompt.promptFile}`);
    return;
  }

  // Create directory if it doesn't exist
  await fs.ensureDir(path.dirname(promptPath));
  
  // Generate new prompt file from template
  const promptContent = PROMPT_TEMPLATE.replace('{name}', prompt.name);
  await fs.writeFile(promptPath, promptContent);
  console.log(`Created new prompt file: ${prompt.promptFile}`);
}

async function generateReadme() {
  // Read the manifest
  const manifest = await fs.readJson(path.join(ROOT_DIR, 'manifest.json'));
  
  // Generate table headers
  let readmeContent = `# Custom GPT Prompts\n\n`;
  readmeContent += `This repository contains a collection of custom GPT prompts.\n\n`;
  readmeContent += `## Prompts List\n\n`;
  readmeContent += `| GPT Name | Prompt File | Live Link |\n`;
  readmeContent += `|----------|-------------|-----------|\n`;

  // Generate table rows
  for (const prompt of manifest.prompts) {
    const promptLink = `[${prompt.promptFile}](${prompt.promptFile})`;
    const liveLink = prompt.liveLink ? `[Live GPT](${prompt.liveLink})` : 'N/A';
    readmeContent += `| ${prompt.name} | ${promptLink} | ${liveLink} |\n`;
  }

  // Add footer
  readmeContent += `\n## Usage\n\n`;
  readmeContent += `1. Prompts are stored in the \`prompts/\` directory\n`;
  readmeContent += `2. Manifest is maintained in \`manifest.json\`\n`;
  readmeContent += `3. Run \`npm run generate\` to update this README\n`;

  // Write the README
  await fs.writeFile(path.join(ROOT_DIR, 'README.md'), readmeContent);
  console.log('README.md has been generated successfully!');
}

// Create prompts directory if it doesn't exist
async function ensureDirectories() {
  await fs.ensureDir(path.join(ROOT_DIR, 'prompts'));
}

// Main execution
async function main() {
  try {
    await ensureDirectories();
    
    // Read manifest and generate missing prompt files
    const manifest = await fs.readJson(path.join(ROOT_DIR, 'manifest.json'));
    for (const prompt of manifest.prompts) {
      await generatePromptFile(prompt);
    }
    
    await generateReadme();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main(); 