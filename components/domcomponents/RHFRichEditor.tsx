'use dom'

import './styles.css';
import { useEditor, EditorContent, Editor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toggle } from './toggle';
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import { colors } from '../ui/colors';


const RHFRichEditor = ({
  dom,
}: {
  dom: import('expo/dom').DOMProps;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  })

  return (

    <div style={{
      borderRadius: 10
    }} className=' bg-white border border-stone-200'>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
      />

      <div className='border-b p-2 border-stone-200 bg-stone-50'>
        {editor && <ToolBar editor={editor} />}
      </div>

      <div className='p-5'>
        <EditorContent editor={editor} />
      </div>


      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
        <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}

    </div>

  )
}

export default RHFRichEditor

const ToolBar = ({ editor }: { editor: Editor }) => {

  const editorState = useEditorState({
    editor, selector: ctx => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        isUnderline: ctx.editor.isActive('underline') ?? false
      }
    }
  })

  return <div className='flex gap-2'>


    {/* Bold */}


    <Toggle aria-label="Toggle bold"
      style={{
        borderRadius: 6,
        backgroundColor: editorState.isBold ? colors.tailwind.stone[100] : 'white'
      }}
      onPressedChange={() => editor.chain().focus().toggleBold().run()}
      className='border border-stone-300 '>
      <BoldIcon strokeWidth={"4"} />
    </Toggle>

    {/* Italic */}

    <Toggle aria-label="Toggle italic"
      style={{
        borderRadius: 6,
        backgroundColor: editorState.isItalic ? colors.tailwind.stone[100] : 'white'
      }}
      onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      className='border border-stone-300 '>
      <ItalicIcon strokeWidth={"4"} />
    </Toggle>
    <Toggle variant="default" aria-label="Toggle underline"
      style={{
        borderRadius: 6,
        backgroundColor: editorState.isUnderline ? colors.tailwind.stone[100] : 'white'
      }}
      onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      className='border border-stone-300'>
      <UnderlineIcon strokeWidth={"4"} />
    </Toggle>
  </div>
}
