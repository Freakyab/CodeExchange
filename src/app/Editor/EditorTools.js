import Code from "@editorjs/code";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";
export const EDITOR_TOOLS = {
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a header...",
      levels: [2, 3, 4], // Example levels for headers
      
      sanitize: {
        tags: {
          h2: true,
          h3: true,
          h4: true,
          h5: true,
          h6: true,
        },
      },
    },
  },
  code: {
    class: Code,
    config: {
      placeholder: "Enter a code...",
    },
  },
  inlineCode: {
    class: InlineCode,
  },
};