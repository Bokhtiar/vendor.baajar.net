
import { useEditor, EditorContent, mergeAttributes, Mark } from "@tiptap/react";
import React, {  useEffect, useRef, useState } from "react"; 
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import {
  FaBold,
  FaCloudUploadAlt,
  FaImage,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaUnderline,
} from "react-icons/fa";
import Heading from "@tiptap/extension-heading";


export const EditorSection = ({ initialContent, seteditValue }) => {
    const [value, setValue] = useState("");
    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        TextStyle,
        Color,
        Image,
        Table.configure({
          resizable: true,
        }),
        Link.configure({
          openOnClick: false,
        }),
        TextAlign.configure({
          types: ["paragraph", "heading"], // Optional: Define which types you want to apply alignment to
        }),
        TableRow,
        TableHeader,
        TableCell,
        FontSize,
        CustomHeading
      ],
      // content: "<p>এখানে লিখুন...</p>",
      
  
      editorProps: {
        handlePaste(view, event) {
          const clipboardData = event.clipboardData || window.clipboardData;
          const pastedContent = clipboardData.getData("text/html");
  
          // Log the pasted HTML content
          // console.log('Pasted content:', pastedContent)
          seteditValue(pastedContent);
          setValue(pastedContent);
          // If you want to handle the paste in a custom way, you can modify this content
          // For now, let's allow the default behavior (return false to not prevent paste)
          return false;
        },
      },
      onUpdate({ editor }) {
        const editorContent = editor.getHTML();
  
        console.log("Editor content updated:", editorContent);
  
        // Update state to reflect real-time changes while typing
        seteditValue(editorContent);
        setValue(editorContent);
      },
    });
    useEffect(() => {
      if (editor && initialContent) {
        editor.commands.setContent(initialContent);
      }
    }, [editor, initialContent]);
    const fileInputRef = useRef(null);
  
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
    const handleImageUpload = (event) => {
      const file = event.target.files?.[0];
      if (file && editor) {
        const reader = new FileReader();
        reader.onload = () => {
          editor.chain().focus().setImage({ src: reader.result }).run();
        };
        reader.readAsDataURL(file); // For local preview; use server upload if needed
      }
    };
    const insertImageFromUrl = () => {
      const url = prompt("Enter image URL");
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    };
   //  const [selectedOption, setSelectedOption] = useState(null);
   //  const options = [
   //    { value: "left", label: "left" },
   //    { value: "center", label: "center" },
   //    { value: "right", label: "right" },
   //  ];
   //  const handleChange = (selected) => {
   //    editor.chain().focus().setTextAlign(selected?.value).run();
   //    setSelectedOption(selected);
   //  };
    return (
      <div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            H3
          </button>
          <button
            onClick={insertImageFromUrl}
            className="text-blue-500   px-3 py-1 rounded"
            title="Insert Image from URL"
          >
            <FaImage />
          </button>
          <div className=" ">
            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
  
            {/* Upload Button */}
            <button
              type="button"
              onClick={handleButtonClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold  rounded-lg shadow transition-all duration-200"
            >
              <FaCloudUploadAlt />
            </button>
          </div>
  
          {/* <Select
            options={options}
            value={selectedOption}
            onChange={handleChange}
            placeholder="left"
          /> */}
  
          <button
            onClick={() => {
              const url = window.prompt("Enter URL");
              if (url) {
                editor
                  ?.chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: url })
                  .run();
              }
            }}
          >
            <FaLink />
          </button>
  
          {/* {value} */}
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <FaListUl />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <FaListOl />
          </button>
          <input
            type="color"
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
          />
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            <FaBold />
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            <FaItalic />
          </button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <FaUnderline />
          </button>
        </div>
  
        <EditorContent editor={editor} className=" " />
        {/* <div dangerouslySetInnerHTML={{ __html: value }}></div> */}
      </div>
    );
  };
  
 export const CustomHeading = Heading.extend({
    renderHTML({ node, HTMLAttributes }) {
      const level = node.attrs.level;
      let style = '';
      let className = '';
  
      // Set styles based on heading level
      switch (level) {
        case 1:
          className = 'text-3xl font-bold';
          style = 'font-size: 32px; font-weight: bold;';
          break;
        case 2:
          className = 'text-2xl font-semibold';
          style = 'font-size: 24px; font-weight: 600;';
          break;
        case 3:
          className = 'text-xl font-medium';
          style = 'font-size: 20px; font-weight: 500;';
          break;
        default:
          break;
      }
  
      return [
        `h${level}`,
        mergeAttributes(HTMLAttributes, {
          class: className,
          style,
        }),
        0,
      ];
    },
  });
  
  // extensions/FontSize.js
   
  // extensions/FontSize.js
   
 export const FontSize = Mark.create({
    name: 'fontSize',
  
    addAttributes() {
      return {
        size: {
          default: null,
          parseHTML: element => {
            const style = element.style.fontSize;
            if (!style) return null;
  
            const match = style.match(/^(\d+(?:\.\d+)?)px$/);
            return match ? match[1] : null;
          },
          renderHTML: attributes => {
            if (!attributes.size) return {};
            return {
              style: `font-size: ${attributes.size}px`,
            };
          },
        },
      };
    },
  
    parseHTML() {
      return [
        {
          style: 'font-size',
        },
      ];
    },
  
    renderHTML({ HTMLAttributes }) {
      return ['span', mergeAttributes(HTMLAttributes), 0];
    },
  });