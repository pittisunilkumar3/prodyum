import { useEffect, useRef } from 'react';

/**
 * CKEditor 4 component — loaded from CDN, exactly like the cinicathon /
 * StackFood EmailTemplateEditor. Renders a full WYSIWYG editor bound to
 * `value`, calling `onChange(html)` as the user types.
 */
export default function CKEditor4({ value, onChange, height = 420 }) {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);
  const isReady = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!window.CKEDITOR) {
      const script = document.createElement('script');
      script.src = 'https://cdn.ckeditor.com/4.20.0/standard-all/ckeditor.js';
      script.onload = () => initEditor();
      document.head.appendChild(script);
    } else {
      initEditor();
    }
    return () => {
      if (editorRef.current) {
        try { window.CKEDITOR.instances[editorRef.current.name]?.destroy(); } catch (e) {}
        editorRef.current = null;
        isReady.current = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initEditor = () => {
    if (textareaRef.current && window.CKEDITOR && !editorRef.current) {
      const editor = window.CKEDITOR.replace(textareaRef.current, {
        toolbar: [
          { name: 'document', items: ['Source', '-', 'Undo', 'Redo'] },
          { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat'] },
          { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
          { name: 'links', items: ['Link', 'Unlink'] },
          { name: 'insert', items: ['Table', 'Image', 'HorizontalRule'] },
          { name: 'styles', items: ['Styles', 'Format'] },
          { name: 'tools', items: ['Maximize'] },
        ],
        removeButtons: '',
        height,
        removeDialogTabs: 'image:advanced;link:advanced',
        startupFocus: false,
        uiColor: '#0b0f17',
        allowedContent: true,
        extraAllowedContent: '*(*);*{*}',
        pasteFilter: null,
        removeFormatTags: '',
        removeFormatAttributes: '',
        autoParagraph: false,
        enterMode: window.CKEDITOR.ENTER_P,
        shiftEnterMode: window.CKEDITOR.ENTER_BR,
        customConfig: '',
        disableNativeSpellChecker: false,
        contentsCss: 'body{color:#e2e8f0;background:#0b0f17;font-family:Inter,sans-serif;padding:12px;}h2{color:#00F0FF;}a{color:#00F0FF;}',
      });
      editorRef.current = editor;
      if (value) editor.setData(value);
      editor.on('change', () => {
        onChangeRef.current && onChangeRef.current(editor.getData());
      });
      isReady.current = true;
    }
  };

  useEffect(() => {
    if (isReady.current && editorRef.current && value !== undefined) {
      const current = editorRef.current.getData();
      if (current !== value) {
        editorRef.current.setData(value || '', { noSnapshot: true });
      }
    }
  }, [value]);

  return <textarea ref={textareaRef} defaultValue="" style={{ visibility: 'hidden', display: 'none' }} />;
}
