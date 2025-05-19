"use client";

import * as React from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Heading } from '@tiptap/extension-heading';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
} from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  const menuItems = [
    {
      icon: <BoldIcon className="w-4 h-4" />,
      title: 'Negrita',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: <ItalicIcon className="w-4 h-4" />,
      title: 'Cursiva',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: <Heading1 className="w-4 h-4" />,
      title: 'Encabezado 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <Heading2 className="w-4 h-4" />,
      title: 'Encabezado 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <List className="w-4 h-4" />,
      title: 'Lista de viñetas',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      title: 'Lista numerada',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-border bg-muted/50 rounded-t-md">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          title={item.title}
          type="button"
          className={cn(
            "p-2 rounded-md hover:bg-muted transition-colors",
            item.isActive() ? "bg-muted text-primary" : "text-muted-foreground"
          )}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export const TipTapEditor = ({ content, onChange }: TipTapEditorProps) => {
  // Log para depuración
  React.useEffect(() => {
    console.log('TipTap: Componente montado con contenido:', { content });
  }, []);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2],
      }),
      Bold,
      Italic,
      BulletList,
      OrderedList,
    ],
    content: content || '',  // Nos aseguramos de que siempre haya un valor inicial válido
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log('TipTap: Contenido actualizado:', { html });
      onChange(html);
    },
    // Configuramos immediatelyRender como false para evitar errores de hidratación en SSR
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none max-w-none',
      },
    },
  });

  // Este efecto se asegura de que el contenido del editor se actualice
  // cuando cambia la prop de contenido proporcionada externamente
  React.useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      console.log('TipTap: Actualizando contenido del editor', { content, editorContent: editor.getHTML() });
      // Aseguramos que el contenido se establezca correctamente
      setTimeout(() => {
        editor.commands.setContent(content);
      }, 0);
    }
  }, [content, editor]);

  return (
    <div className="border border-input rounded-md overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  );
};
