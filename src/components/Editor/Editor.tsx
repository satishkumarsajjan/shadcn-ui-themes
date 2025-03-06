'use client';
import MonacoEditor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LiveError, LivePreview, LiveProvider } from 'react-live';
import { Button } from '../ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Edit } from 'lucide-react';

// Define the props interface
interface EditorProps {
  initialCode?: string;
  debounceTime?: number;
  scope?: any;
}

const Editor = ({
  initialCode = `function CardWithForm() {
  return (
    <Card className="border-none w-full">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}`,
  debounceTime = 500,
  scope = useMemo(
    () => ({
      Button,
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
      Input,
      Label,
    }),
    []
  ),
}: EditorProps) => {
  const [code, setCode] = useState(initialCode);
  const tailwindScriptRef = useRef<HTMLScriptElement | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [debouncedCode, setDebouncedCode] = useState(initialCode);
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  scope = useMemo(() => scope, []);

  // Add Tailwind CSS runtime styles
  useEffect(() => {
    // Check if the script already exists to prevent duplicates
    if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
      // This ensures Tailwind is available in the preview
      const tailwindScript = document.createElement('script');
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      tailwindScript.defer = true; // Use defer to not block rendering
      document.head.appendChild(tailwindScript);
      tailwindScriptRef.current = tailwindScript;
    }

    return () => {
      // Only remove if we added it
      if (
        tailwindScriptRef.current &&
        document.head.contains(tailwindScriptRef.current)
      ) {
        document.head.removeChild(tailwindScriptRef.current);
      }
    };
  }, []);

  // Memoize the handleCodeChange function to prevent unnecessary re-renders
  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);

      // Clear previous timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      // Set a new timeout
      debounceTimeout.current = setTimeout(() => {
        setDebouncedCode(newCode);
      }, debounceTime);
    },
    [debounceTime]
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  // Configure Monaco editor on mount
  const handleEditorDidMount = useCallback(
    (
      editor: monaco.editor.IStandaloneCodeEditor,
      monaco: typeof import('monaco-editor')
    ) => {
      monacoRef.current = editor;

      // Configure TypeScript/JSX language features
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.React,
        jsxFactory: 'React.createElement',
        reactNamespace: 'React',
        allowNonTsExtensions: true,
        allowJs: true,
        target: monaco.languages.typescript.ScriptTarget.Latest,
      });

      // Add React and Tailwind type definitions
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        `
      declare namespace React {
        function createElement(type: any, props?: any, ...children: any[]): any;
      }
      
      declare function useState<T>(initialState: T | (() => T)): [T, (newState: T) => void];
      declare function useEffect(effect: () => void | (() => void), deps?: any[]): void;
      declare function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
      declare function useMemo<T>(factory: () => T, deps: any[]): T;
      
      declare interface ButtonProps {
        className?: string;
        onClick?: () => void;
        children?: React.ReactNode;
      }
      
      declare const Button: React.FC<ButtonProps>;
      `,
        'typescript'
      );
    },
    []
  );

  // Memoize the editor component with Monaco editor
  const editorComponent = useMemo(
    () => (
      <div className='rounded-md backdrop-blur-md w-full min-h-80'>
        <div className='h-full rounded-md overflow-hidden'>
          <MonacoEditor
            height='100%'
            language='typescript'
            theme='vs-dark'
            value={code}
            onChange={(value) => handleCodeChange(value || '')}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              wordWrap: 'on',
              formatOnPaste: true,
              formatOnType: true,
              automaticLayout: true,
              tabSize: 2,
              scrollBeyondLastLine: false,
              suggestOnTriggerCharacters: true,
              acceptSuggestionOnEnter: 'on',
              quickSuggestions: true,
            }}
          />
        </div>
      </div>
    ),
    [code, handleCodeChange, handleEditorDidMount]
  );

  const previewComponent = useMemo(
    () => (
      <div className='w-full'>
        <LiveProvider code={debouncedCode} scope={scope}>
          <LivePreview className='h-full' />
          <LiveError className='text-red-500 mt-2' />
        </LiveProvider>
      </div>
    ),
    [debouncedCode, scope]
  );

  return (
    <Tabs defaultValue='preview' className='w-full'>
      <TabsList className='grid w-full grid-cols-5 h-auto'>
        <TabsTrigger value='preview' className='col-span-2'>
          Preview
        </TabsTrigger>
        <TabsTrigger value='code' className='col-span-2'>
          Code
        </TabsTrigger>
        <Button className='ml-2 col-span-1'>
          <Edit />
        </Button>
      </TabsList>
      <TabsContent value='preview'>{previewComponent}</TabsContent>

      <TabsContent value='code'>
        <div className='flex gap-2 h-full'>{editorComponent}</div>
      </TabsContent>
    </Tabs>
  );
};

export default Editor;
