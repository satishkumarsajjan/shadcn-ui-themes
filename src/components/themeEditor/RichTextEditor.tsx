'use client';
import { Button } from '@/components/ui/button'; // ShadCN UI Button
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
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
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const extensions = [
  BaseKit,
  Heading,
  Italic,
  Bold,
  BulletList,
  Blockquote,
  Clear,
  Code,
  CodeBlock.configure({ defaultTheme: 'andromeeda' }),
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

  const onChangeContent = (value: string) => {
    setContent(value);
  };

  const mutation = useMutation({
    mutationFn: (description: string) => {
      return axios.post('/api/theme/updateDescription', {
        themeId: themeId,
        description: description,
      });
    },
    onSuccess() {
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
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='text-foreground border rounded-md drop-shadow-lg p-4 text-xl'>
          Theme Description
        </AccordionTrigger>
        <AccordionContent>
          <div className='space-y-4 mt-2'>
            <div className='bg-white bg-opacity-25 backdrop-blur-lg rounded-md p-4 drop-shadow-lg'>
              <RichTextEditor
                content={content}
                output='html'
                extensions={extensions}
                onChangeContent={onChangeContent}
                disabled={readonly}
                hideToolbar={readonly}
                removeDefaultWrapper
                contentClass={'bg-background text-foreground'}
                hideBubble={readonly}
                label='Theme Description'
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default DescriptionTextEditor;
