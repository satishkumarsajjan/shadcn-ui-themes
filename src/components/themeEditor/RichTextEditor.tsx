'use client';

import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button'; // ShadCN UI Button
import { useState } from 'react';
import React from 'react';
import RichTextEditor from 'reactjs-tiptap-editor';
import {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Heading,
  Italic,
  Clear,
  Code,
  CodeBlock,
  Color,
  FontFamily,
  FontSize,
  FormatPainter,
  Column,
} from 'reactjs-tiptap-editor/extension-bundle';
import 'reactjs-tiptap-editor/style.css';

const extensions = [
  BaseKit,
  Heading,
  Italic,
  Bold,
  BulletList,
  Blockquote,
  Clear,
  Code,
  CodeBlock,
  Color,
  FontFamily,
  FontSize,
  FormatPainter,
  Column,
];
interface RichTextEditorProps {
  onSave: (content: string) => void;
  initialContent?: string;
}

const DescriptionTextEditor: React.FC<RichTextEditorProps> = ({
  onSave,
  initialContent = '',
}) => {
  const [content, setContent] = useState(initialContent);

  const onChangeContent = (value: any) => {
    setContent(value);
  };

  return (
    <div className='space-y-4'>
      <div className='border rounded-md p-4'>
        <RichTextEditor
          content={content}
          output='html'
          extensions={extensions}
          onChangeContent={onChangeContent}
        />
      </div>
      {/* <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Description'}
      </Button> */}
    </div>
  );
};

export default DescriptionTextEditor;
