'use client';

import { Button } from '@/components/ui/button'; // ShadCN UI Button
import React, { useState } from 'react';
import RichTextEditor from 'reactjs-tiptap-editor';
import {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  Column,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Italic,
} from 'reactjs-tiptap-editor/extension-bundle';
import 'reactjs-tiptap-editor/style.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const extensions = [
  BaseKit.configure({
    // Show placeholder
    placeholder: {
      showOnlyCurrent: true,
    },

    // Character count
    characterCount: {
      limit: 10_000,
    },
  }),

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
  themeId?: string;
  onDescriptionUpdate: (value: string) => void;
  initialContent?: string;
  readonly: boolean;
}

const DescriptionTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = '',
  readonly = true,
  themeId,
  onDescriptionUpdate,
}) => {
  const [content, setContent] = useState(initialContent);
  const queryClient = useQueryClient();

  const onChangeContent = (value: any) => {
    setContent(value);
  };
  console.log(content);

  const mutation = useMutation({
    mutationFn: (description: string) => {
      return axios.post('/api/theme/updateDescription', {
        themeId: themeId,
        description: description,
      });
    },
    onSuccess(data) {
      toast.success('Description updated successfully');

      if (themeId) {
        // Invalidate the specific theme query to trigger a refetch
        queryClient.invalidateQueries({
          queryKey: ['Theme', themeId],
        });
      }

      // Call the callback to update the themeDescription in ThemeEditor
      if (onDescriptionUpdate) {
        onDescriptionUpdate(content);
      }
    },
    onError(error) {
      toast.error('Failed to update description');
      console.error(error);
    },
  });

  const handleSave = () => {
    if (!themeId) {
      toast.error('Theme ID is required');
      return;
    }
    mutation.mutate(content);
  };

  return (
    <div className='space-y-4'>
      <div className='bg-white bg-opacity-25 backdrop-blur-lg rounded-md p-4'>
        <RichTextEditor
          content={content}
          output='html'
          extensions={extensions}
          onChangeContent={onChangeContent}
          disabled={readonly}
        />
      </div>
      {!readonly && (
        <div className='flex items-center justify-end mr-4'>
          <Button onClick={handleSave} disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save Description'}
          </Button>
        </div>
      )}
    </div>
  );
};
export default DescriptionTextEditor;
