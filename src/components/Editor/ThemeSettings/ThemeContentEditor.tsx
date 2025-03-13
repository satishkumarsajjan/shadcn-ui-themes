import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Copy, Check } from 'lucide-react';

export const ThemeContentEditor = ({
  content,
  onChange,
  onFormat,
}: {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFormat: () => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);
  const [lineCount, setLineCount] = useState(1);
  const [textContent, setTextContent] = useState(content);

  // Track if local edits are in progress to prevent prop overrides
  const isEditingRef = useRef(false);
  const cursorPositionRef = useRef<{ start: number; end: number } | null>(null);

  // Only sync with parent content when it's different from our local state
  // and we're not in the middle of editing
  useEffect(() => {
    if (!isEditingRef.current && content !== textContent) {
      setTextContent(content);

      // Calculate line count for the new content
      const lines = (content.match(/\n/g) || []).length + 1;
      setLineCount(lines);
    }
  }, [content, textContent]);

  // Update line count when local content changes
  useEffect(() => {
    const lines = (textContent.match(/\n/g) || []).length + 1;
    setLineCount(lines);
  }, [textContent]);

  // Restore cursor position after state updates
  useEffect(() => {
    if (cursorPositionRef.current && textareaRef.current) {
      const { start, end } = cursorPositionRef.current;
      textareaRef.current.selectionStart = start;
      textareaRef.current.selectionEnd = end;
      cursorPositionRef.current = null;
    }
  });

  // Tab key handler for better indentation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Tab') {
        e.preventDefault();

        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Create new content with tab inserted
        const newContent =
          textContent.substring(0, start) +
          '  ' + // Two spaces for a tab
          textContent.substring(end);

        // Update the local state first
        setTextContent(newContent);

        // Then notify parent
        const fakeEvent = {
          target: { value: newContent },
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(fakeEvent);

        // Save cursor position for restoration
        cursorPositionRef.current = { start: start + 2, end: start + 2 };
      }
    },
    [textContent, onChange]
  );

  // Handle copy to clipboard
  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(textContent)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Failed to copy to clipboard:', error);
      });
  }, [textContent]);

  const handleOnchange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      // Set editing flag to prevent content prop override
      isEditingRef.current = true;

      // Save cursor position
      if (textareaRef.current) {
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        cursorPositionRef.current = { start, end };
      }

      // Update local state
      setTextContent(newValue);

      // Notify parent
      onChange(e);

      // Clear editing flag after a short delay
      setTimeout(() => {
        isEditingRef.current = false;
      }, 100);
    },
    [onChange]
  );

  // Handle focus to set editing state
  const handleFocus = useCallback(() => {
    isEditingRef.current = true;
  }, []);

  // Handle blur to clear editing state
  const handleBlur = useCallback(() => {
    // Small delay to prevent immediate sync with prop
    setTimeout(() => {
      isEditingRef.current = false;
    }, 100);
  }, []);

  return (
    <div className='relative mt-2'>
      <div className='flex items-center justify-between bg-muted px-3 py-1.5 mb-1 rounded-t-md'>
        <div className='text-xs text-muted-foreground'>Lines: {lineCount}</div>
        <div className='flex gap-1'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={copyToClipboard}
                  size='sm'
                  variant='ghost'
                  className='h-7 w-7 p-0'
                  aria-label={
                    copied ? 'Copied to clipboard' : 'Copy to clipboard'
                  }
                >
                  {copied ? (
                    <Check size={16} className='text-green-500' />
                  ) : (
                    <Copy size={16} />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? 'Copied!' : 'Copy to Clipboard'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onFormat}
                  size='sm'
                  variant='ghost'
                  className='h-7 w-7 p-0'
                  aria-label='Format code'
                >
                  <span className='font-mono text-xs'>{'{}'}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Format Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Textarea
        ref={textareaRef}
        value={textContent}
        onChange={handleOnchange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder='Type your theme here.'
        className='h-[550px] font-mono text-sm resize-none leading-relaxed'
        spellCheck={false}
        wrap='on'
      />
    </div>
  );
};
