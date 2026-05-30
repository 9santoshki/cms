'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

// ─── Toolbar button ───────────────────────────────────────────────────────────

const ToolbarBtn = ({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    style={{
      padding: '4px 8px',
      minWidth: 28,
      height: 28,
      border: active ? '1px solid #c19a6b' : '1px solid #e8d5c4',
      borderRadius: 4,
      background: active ? 'rgba(193,154,107,0.12)' : 'white',
      color: active ? '#a67c52' : '#555',
      fontSize: 12,
      fontWeight: active ? 700 : 400,
      cursor: 'pointer',
      lineHeight: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'inherit',
      transition: 'all 0.15s',
    }}
  >
    {children}
  </button>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write here…',
  minHeight = 140,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable the hardBreak extension so shift+enter works via browser default
        heading: { levels: [2, 3] },
      }),
      Underline,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Treat empty document as empty string
      onChange(html === '<p></p>' ? '' : html);
    },
    editorProps: {
      attributes: {
        style: `min-height:${minHeight}px; padding:10px 14px; outline:none; font-size:14px; line-height:1.6; font-family:inherit;`,
        'data-placeholder': placeholder,
      },
    },
  });

  // Sync value when parent resets or loads data (without creating infinite loops)
  useEffect(() => {
    if (!editor) return;
    const currentHtml = editor.getHTML();
    const incoming = value || '';
    if (currentHtml !== incoming && !(currentHtml === '<p></p>' && incoming === '')) {
      editor.commands.setContent(incoming);
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn = (
    label: React.ReactNode,
    title: string,
    action: () => void,
    isActive: boolean
  ) => (
    <ToolbarBtn key={title} onClick={action} active={isActive} title={title}>
      {label}
    </ToolbarBtn>
  );

  return (
    <div
      style={{
        border: '1px solid #e8d5c4',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'white',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          padding: '6px 10px',
          borderBottom: '1px solid #e8d5c4',
          background: '#faf8f5',
        }}
      >
        {btn('H2', 'Heading 2', () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 }))}
        {btn('H3', 'Heading 3', () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive('heading', { level: 3 }))}
        <span style={{ width: 1, background: '#e8d5c4', margin: '2px 4px' }} />
        {btn(<b>B</b>, 'Bold', () => editor.chain().focus().toggleBold().run(), editor.isActive('bold'))}
        {btn(<i>I</i>, 'Italic', () => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'))}
        {btn(<u>U</u>, 'Underline', () => editor.chain().focus().toggleUnderline().run(), editor.isActive('underline'))}
        {btn(<s>S</s>, 'Strikethrough', () => editor.chain().focus().toggleStrike().run(), editor.isActive('strike'))}
        <span style={{ width: 1, background: '#e8d5c4', margin: '2px 4px' }} />
        {btn('• List', 'Bullet list', () => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList'))}
        {btn('1. List', 'Numbered list', () => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList'))}
        <span style={{ width: 1, background: '#e8d5c4', margin: '2px 4px' }} />
        {btn('" "', 'Blockquote', () => editor.chain().focus().toggleBlockquote().run(), editor.isActive('blockquote'))}
        {btn('⟵', 'Undo', () => editor.chain().focus().undo().run(), false)}
        {btn('⟶', 'Redo', () => editor.chain().focus().redo().run(), false)}
      </div>

      {/* Editor area */}
      <style>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #bbb;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h2 { font-size: 1.2rem; font-weight: 600; margin: 0.5rem 0 0.25rem; }
        .ProseMirror h3 { font-size: 1rem; font-weight: 600; margin: 0.5rem 0 0.25rem; }
        .ProseMirror ul, .ProseMirror ol { padding-left: 1.5rem; margin: 0.25rem 0; }
        .ProseMirror li { margin: 0.1rem 0; }
        .ProseMirror blockquote { border-left: 3px solid #c19a6b; padding-left: 0.75rem; color: #666; margin: 0.5rem 0; }
        .ProseMirror p { margin: 0.25rem 0; }
        .ProseMirror:focus { outline: none; }
      `}</style>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
