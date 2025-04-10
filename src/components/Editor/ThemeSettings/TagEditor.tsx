'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTags } from '@/hooks/use-tags';
import { ThemeWithCounts, ThemeWithUserActions } from '@/types/apiReturnTypes';
import axios from 'axios';
import { Save } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Link } from 'next-view-transitions';
import { toast } from 'sonner';

interface TagEditorProps {
  theme: ThemeWithCounts | ThemeWithUserActions | undefined;
}

const TagEditor = ({ theme }: TagEditorProps) => {
  const { data: session } = useSession();
  const { data: initialTags } = useTags(theme?.id ? theme.id : '');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const MAX_TAG_LENGTH = 20;
  const MAX_TAGS_COUNT = 10;

  useEffect(() => {
    if (!theme?.id) {
      console.warn('No theme ID provided for tag fetching');
      return;
    }
  }, [theme?.id]);

  const initialTagNames = useMemo(() => {
    if (!initialTags) return [];
    return initialTags.map((themeTag) => themeTag.tag.name);
  }, [initialTags]);

  // Set tags once when initialTagNames changes
  useEffect(() => {
    if (initialTagNames.length > 0) {
      setTags(initialTagNames);
    }
  }, [initialTagNames]);

  const handleAddTag = () => {
    const trimmedTag = newTag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      if (trimmedTag.length > MAX_TAG_LENGTH) {
        toast.error(`Tag must be ${MAX_TAG_LENGTH} characters or less`);
        return;
      }

      if (tags.length >= MAX_TAGS_COUNT) {
        toast.error(`Maximum ${MAX_TAGS_COUNT} tags allowed`);
        return;
      }

      setTags([...tags, trimmedTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveTags = useCallback(
    debounce(async () => {
      try {
        await axios.post('/api/theme/tags', { themeId: theme?.id, tags });
        toast.success('Tags updated successfully');
      } catch (error) {
        console.error(error);
        toast.error('Failed to update tags');
      }
    }, 300),
    [theme?.id, tags]
  );

  return (
    <div className='mt-4'>
      <Label className='text-lg font-semibold'>Tags</Label>
      <div className='flex flex-wrap gap-2 mt-2'>
        {tags.map((tag) => (
          <Badge
            key={tag}
            className='px-2 py-1 text-sm rounded-md flex items-center gap-1'
          >
            <Link href={`/search?tags=${tag}`} className='hover:scale-110'>
              {tag}
            </Link>
            {session?.user?.id === theme?.userId && (
              <button
                onClick={() => handleRemoveTag(tag)}
                className='text-red-500 hover:scale-150 transition-transform'
              >
                ×
              </button>
            )}
          </Badge>
        ))}
      </div>
      {session?.user?.id === theme?.userId && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTag();
            }}
            className='flex items-center gap-2 mt-2'
          >
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder='Add a tag'
            />
            <Button type='submit'>Add</Button>
          </form>
          <div className='mt-4 flex justify-end'>
            <Button
              onClick={handleSaveTags}
              className='flex items-center gap-2'
            >
              <Save size={16} />
              Save Tags
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TagEditor;
