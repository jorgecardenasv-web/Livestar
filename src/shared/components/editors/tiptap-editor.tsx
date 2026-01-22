'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { useCallback, useEffect } from 'react'
import type { MouseEvent } from 'react'

interface TiptapEditorProps {
  content?: string
  onChange?: (content: string) => void
  editable?: boolean
  placeholder?: string
}

export function TiptapEditor({
  content = '',
  onChange,
  editable = true,
  placeholder = 'Escribe algo increíble...'
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: 'text-heading',
          },
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    editable,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] px-4 py-3 [&_li_p]:m-0',
      },
    },
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      // Evento cuando el editor se crea
      console.log('Editor creado')
    },
    onUpdate: ({ editor }) => {
      // Evento cuando el contenido cambia
      const html = editor.getHTML()
      onChange?.(html)
    },
    onSelectionUpdate: ({ editor }) => {
      // Evento cuando la selección cambia
      console.log('Selección actualizada')
    },
    onFocus: ({ editor, event }) => {
      // Evento cuando el editor obtiene foco
      console.log('Editor enfocado')
    },
    onBlur: ({ editor, event }) => {
      // Evento cuando el editor pierde foco
      console.log('Editor desenfocado')
    },
  })

  useEffect(() => {
    if (!editor) return

    const normalizedIncoming = content || ''
    const currentHtml = editor.getHTML()
    const normalizedCurrent = currentHtml === '<p></p>' ? '' : currentHtml

    if (normalizedIncoming !== normalizedCurrent) {
      editor.commands.setContent(normalizedIncoming, { emitUpdate: false })
    }
  }, [content, editor])

  useEffect(() => {
    if (!editor) return
    editor.setEditable(editable)
  }, [editable, editor])

  const setTextAlign = useCallback((align: 'left' | 'center' | 'right' | 'justify', e?: MouseEvent) => {
    e?.preventDefault()
    editor?.chain().focus().setTextAlign(align).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="editor-container border rounded-lg shadow-sm">
      {/* Barra de herramientas */}
      <div className="toolbar border-b p-2 flex flex-wrap gap-2">
        {/* Formato de texto */}
        <button
          onMouseDown={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleBold().run()
          }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          type='button'
        >
          <strong>B</strong>
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleItalic().run()
          }}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          type='button'
        >
          <em>I</em>
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleUnderline().run()
          }}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`px-3 py-1 rounded ${editor.isActive('underline') ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          type='button'
        >
          <u>U</u>
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleStrike().run()
          }}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded ${editor.isActive('strike') ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          type='button'
        >
          <s>S</s>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Encabezados */}
        <button
          onMouseDown={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }}
          className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          type='button'
        >
          H1
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }}
          className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          type='button'
        >
          H2
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }}
          className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          type='button'
        >
          H3
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Listas */}
        <button
          onMouseDown={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleBulletList().run()
          }}
          className={`px-3 py-1 rounded ${editor.isActive('bulletList') ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          type='button'
        >
          • Lista
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleOrderedList().run()
          }}
          className={`px-3 py-1 rounded ${editor.isActive('orderedList') ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          type='button'
        >
          1. Lista
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Alineación */}
        <button
          onMouseDown={(e) => setTextAlign('left', e)}
          className={`px-3 py-1 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          type='button'
        >
          ←
        </button>

        <button
          onMouseDown={(e) => setTextAlign('center', e)}
          className={`px-3 py-1 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          type='button'
        >
          ↔
        </button>

        <button
          onMouseDown={(e) => setTextAlign('right', e)}
          className={`px-3 py-1 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          type='button'
        >
          →
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Acciones */}
        <button
          onMouseDown={(e) => {
            e.preventDefault()
            editor.chain().focus().undo().run()
          }}
          type='button'
          disabled={!editor.can().chain().focus().undo().run()}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-300 disabled:opacity-50"
        >
          ↶ Deshacer
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault()
            editor.chain().focus().redo().run()
          }}
          type='button'
          disabled={!editor.can().chain().focus().redo().run()}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-300 disabled:opacity-50"
        >
          ↷ Rehacer
        </button>
      </div>

      {/* Menú flotante para selección */}
      <BubbleMenu editor={editor as any} className="bg-black text-white rounded p-2 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'text-blue-400' : ''}
          type='button'
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'text-blue-400' : ''}
          type='button'
        >
          Italic
        </button>
      </BubbleMenu>

      {/* Menú flotante para líneas vacías */}
      <FloatingMenu editor={editor as any} className="bg-white border rounded shadow-lg p-2 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className="px-2 py-1 hover:bg-gray-100 rounded"
          type='button'
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="px-2 py-1 hover:bg-gray-100 rounded"
          type='button'
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2 py-1 hover:bg-gray-100 rounded"
          type='button'
        >
          Lista
        </button>
      </FloatingMenu>

      {/* Área del editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
