/* eslint-disable */
'use client';

import React, { useRef, useState, FormEvent, ClipboardEvent } from 'react';
import {
  Bold,
  Italic,
  Link,
  List,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Smile,
  BookOpenCheck,
} from 'lucide-react';

interface RichTextEditorProps {
  onSubmit: (content: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ onSubmit }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editorRef.current && editorRef.current.innerHTML.trim()) {
      onSubmit(editorRef.current.innerHTML);
      editorRef.current.innerHTML = '';
      setContent('');
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case 'bold':
        execCommand('bold');
        break;
      case 'italic':
        execCommand('italic');
        break;
      case 'link': {
        const url = prompt('Enter URL:');
        if (url) execCommand('createLink', url);
        break;
      }
      case 'list':
        execCommand('insertUnorderedList');
        break;
      case 'align-left':
        execCommand('justifyLeft');
        break;
      case 'align-center':
        execCommand('justifyCenter');
        break;
      case 'align-right':
        execCommand('justifyRight');
        break;
      default:
        break;
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const processImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      execCommand('insertImage', imageUrl);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-black backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg drop-shadow-[0_0_1000px_rgba(75,0,140,0.5)]">
      {/* Toolbar */}
      <div className="flex items-center px-4 py-2 border-b border-gray-700 overflow-x-auto">
        <button
          onClick={() => handleToolbarAction('bold')}
          className="p-1.5 rounded-md hover:bg-gray-800 text-gray-300"
          title="Bold"
          aria-label="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => handleToolbarAction('italic')}
          className="p-1.5 rounded-md hover:bg-gray-800 text-gray-300"
          title="Italic"
          aria-label="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => handleToolbarAction('link')}
          className="p-1.5 rounded-md hover:bg-gray-800 text-gray-300"
          title="Insert Link"
          aria-label="Insert Link"
        >
          <Link size={18} />
        </button>
        <button
          onClick={() => handleToolbarAction('list')}
          className="p-1.5 rounded-md hover:bg-gray-800 text-gray-300"
          title="Bullet List"
          aria-label="Bullet List"
        >
          <List size={18} />
        </button>
        <div className="h-6 mx-2 border-r border-gray-700" />
        <button
          onClick={handleImageUpload}
          className="p-1.5 rounded-md hover:bg-gray-800 text-gray-300"
          title="Upload Image"
          aria-label="Upload Image"
        >
          <Image size={18} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={processImageUpload}
        />
        <div className="h-6 mx-2 border-r border-gray-700" />
        <button
          onClick={() => handleToolbarAction('align-left')}
          className="p-1.5 rounded-md hover:bg-gray-800 text-gray-300"
          title="Align Left"
          aria-label="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={() => handleToolbarAction('align-center')}
          className="p-1.5 rounded-md hover:bg-gray-800 text-gray-300"
          title="Align Center"
          aria-label="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={() => handleToolbarAction('align-right')}
          className="p-1.5 rounded-md hover:bg-gray-800 text-gray-300"
          title="Align Right"
          aria-label="Align Right"
        >
          <AlignRight size={18} />
        </button>
        <div className="h-6 mx-2 border-r border-gray-700" />
        <button
          className="p-1.5 rounded-md hover:bg-gray-800 text-gray-300"
          title="Emoji"
          aria-label="Emoji"
        >
          <Smile size={18} />
        </button>
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div
          ref={editorRef}
          contentEditable="true"
          onInput={handleContentChange}
          onPaste={handlePaste}
          className="w-full px-2 py-3 bg-transparent text-white min-h-[250px] focus:outline-none overflow-auto empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500"
          data-placeholder="Type your message here..."
        />

        {/* Footer with send button */}
        <div className="flex justify-between items-center px-4 py-2 border-t border-gray-700">
          <div className="text-xs text-gray-400">
            Format text using the toolbar above
          </div>
          <button
            type="submit"
            className="bg-transparent hover:bg-gray-900 text-white flex items-center gap-1.5 px-4 py-1.5 rounded-md transition-all shadow-lg shadow-indigo-900/30"
          >
            <span>Add Page</span>
            <BookOpenCheck size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default RichTextEditor;