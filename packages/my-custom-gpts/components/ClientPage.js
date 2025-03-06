'use client';

import { useState } from 'react';
import PromptCard from './PromptCard';
import SearchBar from './SearchBar';

export default function ClientPage({ prompts: initialPrompts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [prompts] = useState(initialPrompts);

  const filteredPrompts = prompts.filter(prompt => 
    prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">GPT Prompts</h1>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrompts.map((prompt, index) => (
          <PromptCard key={index} prompt={prompt} />
        ))}
      </div>
      {filteredPrompts.length === 0 && (
        <div className="text-center text-gray-500">
          No prompts found matching your search.
        </div>
      )}
    </div>
  );
} 