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
  PilcrowSquare,
  RemoveFormatting,
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
    {
      icon: <PilcrowSquare className="w-4 h-4" />,
      title: 'Insertar párrafo',
      action: () => editor.chain().focus().setHardBreak().run(),
      isActive: () => false,
    },
    {
      icon: <RemoveFormatting className="w-4 h-4" />,
      title: 'Limpiar formato',
      action: () => editor.chain().focus().unsetAllMarks().run(),
      isActive: () => false,
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
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'leading-relaxed mb-5',
          },
        },
        horizontalRule: {
          HTMLAttributes: {
            class: 'my-6 border-t border-gray-300',
          },
        },
      }),
      Heading.configure({
        levels: [1, 2],
        HTMLAttributes: {
          1: {
            class: 'text-2xl font-semibold leading-tight mt-8 mb-4',
          },
          2: {
            class: 'text-xl font-medium leading-tight mt-6 mb-3',
          },
        },
      }),
      Bold,
      Italic,
      BulletList.configure({
        HTMLAttributes: {
          class: 'space-y-3 my-5 pl-5',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'space-y-3 my-5 pl-5',
        },
      }),
    ],
    content: content || '',  // Nos aseguramos de que siempre haya un valor inicial válido
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    // Configuramos immediatelyRender como false para evitar errores de hidratación en SSR
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none max-w-none',
      },
    },
    // Configuración de espaciado entre párrafos
    editable: true,
  });

  // Este efecto se asegura de que el contenido del editor se actualice
  // cuando cambia la prop de contenido proporcionada externamente
  React.useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
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
        className="prose prose-lg max-w-none p-4 min-h-[200px] focus:outline-none 
          [&>div]:leading-8
          [&_p]:my-5 [&_p]:leading-8
          [&_li]:my-3 [&_li]:leading-7
          [&_li>p]:my-1 [&_li>p]:leading-7
          [&_h1]:mt-8 [&_h1]:mb-5 [&_h1]:leading-tight
          [&_h2]:mt-7 [&_h2]:mb-4 [&_h2]:leading-tight
          [&_ul]:space-y-3 [&_ul]:my-5 [&_ul]:pl-5
          [&_ol]:space-y-3 [&_ol]:my-5 [&_ol]:pl-5"
      />
      <div className="px-4 py-3 bg-muted/30 text-xs text-muted-foreground border-t border-input">
        <p className="flex items-center flex-wrap gap-1">
          <span>Para mejorar el interlineado:</span>
          <span className="bg-muted/70 px-1.5 py-0.5 rounded inline-flex items-center">
            <PilcrowSquare className="inline w-3 h-3 mr-1" /> Insertar salto de línea
          </span>
          <span>o</span>
          <span className="bg-muted/70 px-1.5 py-0.5 rounded inline-flex items-center">
            <Heading1 className="inline w-3 h-3 mr-1" /> Usar encabezados
          </span>
          <span>para secciones. Usa</span>
          <span className="bg-muted/70 px-1.5 py-0.5 rounded inline-flex items-center">
            <RemoveFormatting className="inline w-3 h-3 mr-1" /> Limpiar formato
          </span>
          <span>para eliminar estilos.</span>
        </p>
      </div>
    </div>
  );
};
