'use client';

import { ArrowTopRightOnSquareIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Modal from './Modal';

export default function PromptCard({ prompt }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get first 200 characters of content for preview
  const previewContent = prompt.content?.slice(0, 200) + '...';

  return (
    <>
      <div
        className="group relative bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top bar with controls - IDE style */}
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <h2 className="text-sm font-mono text-gray-300">{prompt.name}</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-gray-400 hover:text-white transition-colors"
              title="View Full Prompt"
            >
              <EyeIcon className="w-4 h-4" />
            </button>
            <a
              href={prompt.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="Open in ChatGPT"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Content preview */}
        <div className="p-4 bg-gray-900 flex-grow">
          <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
            <code>{previewContent}</code>
          </pre>
        </div>

        {/* File path */}
        <div className="bg-gray-800 px-4 py-1 text-xs font-mono text-gray-400">
          {prompt.promptFile}
        </div>
      </div>

      {/* Full Content Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="overflow-hidden rounded-lg">
          {/* Modal Header */}
          <div className="bg-gray-800 px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <h2 className="text-sm sm:text-lg font-mono text-gray-300 truncate max-w-[150px] sm:max-w-md">
                {prompt.name}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={prompt.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="Open in ChatGPT"
              >
                <ArrowTopRightOnSquareIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                title="Close"
              >
                <XMarkIcon className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 bg-gray-900 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
            <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
              <code>{prompt.content}</code>
            </pre>
          </div>

          {/* Modal Footer */}
          <div className="bg-gray-800 px-4 sm:px-6 py-2 text-xs font-mono text-gray-400 truncate">
            {prompt.promptFile}
          </div>
        </div>
      </Modal>
    </>
  );
} 