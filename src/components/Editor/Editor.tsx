import React from 'react';
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  EditorState
} from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { mergeRegister } from '@lexical/utils';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'

import { BiBold, BiItalic, BiUnderline, BiStrikethrough } from 'react-icons/bi'

function onChange(state: EditorState) {
  state.read(() => {
    const root = $getRoot();
    const selection = $getSelection();
  });
}

const Editor = () => {
  const initialConfig = {
    theme: {
      // ltr: 'ltr',
      // rtl: 'rtl',
      paragraph: 'mb-1',
      rtl: 'text-right',
      ltr: 'text-left',
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
      },
    },
    namespace: 'LexicalEditor',
    onError(error: Error) {
      throw error;
    },
  };

  return (
    <div className="bg-dark2 relative rounded-[5px] shadow-sm border-2 border-solid border-dark1">
      <LexicalComposer
        initialConfig={initialConfig}
      >
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none p-4 resize-none overflow-hidden text-ellipsis" />
          }
          placeholder={
            <div className="absolute top-[64px] left-[16px] pointer-events-none select-none text-gray-400">
              Enter some text...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  );
};

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, [editor]);

  React.useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [updateToolbar, editor]);

  return (
    <div className="p-2 bg-dark1 space-x-2 flex items-stretch rounded-t-[5px]">
       <button
        className={'style-none flex items-center justify-center w-8 h-8 transition-colors cursor-pointer hover:bg-dark3 ' + (isBold ? 'bg-dark3' : 'bg-transparent')}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
      >
        <BiBold
          size={24}
          fill={isBold ? '#EEEEEE' : '#AAAACC'}
          className='transition-colors'
        />
      </button>
      <button
        className={'style-none flex items-center justify-center w-8 h-8 transition-colors cursor-pointer hover:bg-dark3 ' + (isItalic ? 'bg-dark3' : 'bg-transparent')}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
      >
        <BiItalic
          size={24}
          fill={isItalic ? '#EEEEEE' : '#AAAACC'}
          className='transition-colors'
        />
      </button>
      <button
        className={'style-none flex items-center justify-center w-8 h-8 transition-colors cursor-pointer hover:bg-dark3 ' + (isUnderline ? 'bg-dark3' : 'bg-transparent')}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
      >
        <BiUnderline
          size={24}
          fill={isUnderline ? '#EEEEEE' : '#AAAACC'}
          className='transition-colors'
        />
      </button>

      {/*<button
        className={'px-1 bg-transparent hover:bg-gray-700 transition-colors duration-100 ease-in'}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND);
        }}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-rotate-left"
          className="text-white w-3.5 h-3.5"
        />
      </button>
      <button
        className={'px-1 bg-transparent hover:bg-gray-700 transition-colors duration-100 ease-in'}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND);
        }}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-rotate-right"
          className="text-white w-3.5 h-3.5"
        />
      </button>*/}
    </div>
  );
};

export default Editor;