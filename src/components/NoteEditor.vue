<script setup>
import { IconArrowBackUp, IconArrowForwardUp, IconBlockquote, IconBold, IconCode, IconCodeblock, IconItalic, IconLetterH, IconLink, IconList, IconListDetails, IconListFilled, IconListNumbers, IconStrikethrough, IconUnderline } from "@tabler/icons-vue";

import { all, createLowlight } from 'lowlight'

import { Editor, EditorContent } from '@tiptap/vue-3'
import { Placeholder } from "@tiptap/extensions";
import { Mathematics } from "@tiptap/extension-mathematics";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { TextStyleKit  } from '@tiptap/extension-text-style'
// import FileHandler from '@tiptap/extension-file-handler'
import StarterKit from '@tiptap/starter-kit'
</script>

<template>
  <div class="editor-wrapper">
    <div class="editor-menu">
      <button
          class="editor-menu-btn"
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
          >
          <IconArrowBackUp/>
      </button>
      <button
          class="editor-menu-btn"
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
          >
          <IconArrowForwardUp/>
      </button>

      <div class="vr"></div>

      <div class="dropdown editor-menu-btn">
        <span v-if="editor.isActive('heading')">H{{editor.getAttributes('heading').level  }}</span>
        <span v-else>H</span>
        <div class="dropdown-content">
          <button
          class="editor-menu-btn"
          v-for="value in 4"
          :key="value"
          @click="editor.chain().focus().toggleHeading({ level: value }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: value }) }"
        >
          H{{ value }}
        </button>
        </div>
      </div>

      <button
          class="editor-menu-btn"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <IconList />
      </button>

      <button
          class="editor-menu-btn"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <IconListNumbers/>
      </button>

      <button
          class="editor-menu-btn"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <IconBlockquote/>
      </button>

      <button
          class="editor-menu-btn"
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          <IconCodeblock/>
      </button>

      <div class="vr"></div>

      <button
          class="editor-menu-btn"
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <IconBold/>
      </button>

      <button
          class="editor-menu-btn"
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <IconItalic/>
      </button>

      <button
          class="editor-menu-btn"
          @click="editor.chain().focus().toggleUnderline().run()"
          :disabled="!editor.can().chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
        >
          <IconUnderline />
      </button>

      <button
          class="editor-menu-btn"
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <IconStrikethrough/>
      </button>

      <button
          class="editor-menu-btn"
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
        >
          <IconCode strike="{1}" />
      </button>

      <div class="vr"></div>

      <button
          class="editor-menu-btn"
          @click="toggleLink"
          :disabled="!editor.can().chain().focus().toggleLink().run()"
          :class="{ 'is-active': editor.isActive('link') }"
        >
          <IconLink/>
      </button>

      <input
          class="editor-menu-btn color-select"
          type="color"
          @input="editor.chain().focus().setColor($event.target.value).run()"
          :value="editor.getAttributes('textStyle').color || '#000000'"
        />

    </div>
    <EditorContent class="editor" :editor="editor"></EditorContent> 
  </div>
</template>

<script>
import 'katex/dist/katex.min.css'

const lowlight = createLowlight(all);

export default {
  props: {
    id: String
  },
  data() {
    return {
      editor: null,
      unsavedChanges: false,
    }
  },
  beforeMount() {
    this.editor = new Editor({
      onUpdate: (({ editor }) => {
        this.unsavedChanges = true
      }),
      extensions: [
          Placeholder.configure({
              placeholder: "Type some notes..."
          }),
          StarterKit.configure({
            codeBlock: false,
          }),
          TextStyleKit,
          CodeBlockLowlight.configure({
            lowlight,
            // enableTabIndentation: true,
          }),
          Mathematics.configure({
          blockOptions: {
            onClick: (node, pos) => {
              const newCalculation = prompt('Enter new calculation:', node.attrs.latex)
              if (newCalculation) {
                this.editor
                  .chain()
                  .setNodeSelection(pos)
                  .updateBlockMath({ latex: newCalculation })
                  .focus()
                  .run()
              }
            },
          },
          inlineOptions: {
            onClick: (node, pos) => {
              const newCalculation = prompt('Enter new calculation:', node.attrs.latex)
              if (newCalculation) {
                this.editor
                  .chain()
                  .setNodeSelection(pos)
                  .updateInlineMath({ latex: newCalculation })
                  .focus()
                  .run()
              }
            },
          },
          // Options for the KaTeX renderer. See here: https://katex.org/docs/options.html
          katexOptions: {
            throwOnError: false, // don't throw an error if the LaTeX code is invalid
            macros: {
              '\\R': '\\mathbb{R}', // add a macro for the real numbers
              '\\N': '\\mathbb{N}', // add a macro for the natural numbers
            },
          },
        }),
      ],
    })
  },
  async mounted() {
    this.$store.dispatch("getNotes", this.$props.id).then((notes) => {
      console.log(notes);
      if (notes.notes !== "") { this.editor.commands.setContent(notes.notes) }
    }).catch((e) => {
      console.log(e)
    });
  },
  async beforeUnmount() {
    if (this.unsavedChanges) {
      this.$store.commit("saveNotes", {
        "projectID": Number(this.$props.id),
        "notes": this.editor.getJSON()
      })
    }
    this.editor.destroy()
  },
  methods: {
    toggleLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor.chain().focus().extendMarkRange('link').unsetLink().run()

        return
      }

      // update link
      this.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    },
  },
}
</script>

<style>
.editor-wrapper {
    flex: 1 1 0;
    width: 100%;
    height: 100%;
    padding: 1em 0 1em 1em;
    box-sizing: border-box;
    text-align: left;
    color: var(--text-h);
    display: flex;
    flex-flow: column;

    .editor-menu {
      background-color: var(--code-bg);
      border-radius: 8px 8px 0px 0px;
      border: 1px solid var(--border);
      border-bottom: none;
      padding: 0.5em;
      display: flex;
      flex-flow: row wrap;
      gap: 0.2em;
      align-items: center;

      .vr {
        height: 100%;
        border-left: 2px solid var(--border);
      }

      .editor-menu-btn {
        background-color: transparent;
        border: none;
        border-radius: 5px;
        padding: 0.25em 0;
        box-sizing: border-box;
        display: grid;
        place-items: center;
        width: 2em;
        
        &.color-select{
          background-color: buttonface;
          border-radius: 50em;

          -webkit-appearance: none; /* Removes default Chrome/Safari style */
          -moz-appearance: none;    /* Removes default Firefox style */
          appearance: none;
          /* width: 50px; */
          /* height: 50px; */
          /* cursor: pointer; */
          background: transparent;  /* Removes default gray background wrapper */
          border: 2px solid #333;
          border-radius: 50%;       /* Makes the picker a perfect circle */
          overflow: hidden;        /* Keeps the inner color shape clipped to the radius */
          margin: 0 0.2em;
          padding: 0;  

          /* 2. Chrome, Safari, and Edge Inner Styling */
          &::-webkit-color-swatch-wrapper {
            padding: 0;               /* Eliminates the white spacing around the color swatch */
          }

          &::-webkit-color-swatch {
            border: none;             /* Removes the inner black border */
            border-radius: 50%;       /* Matches the parent border radius */
          }

          /* 3. Firefox Inner Styling */
          &::-moz-color-swatch {
            border: none;             /* Removes the inner border */
            border-radius: 50%;       /* Matches the parent border radius */
          }
        }

        &:hover, &.is-active {
          cursor: pointer;
          background-color: var(--social-bg);
        }

        svg {
          width: 1.2em;
        }
      }
    }

    .editor {
      flex: 1 1 auto;
      height: 0;
      box-sizing: border-box;
    }
    
    .tiptap { 
      border: 1px solid var(--border);
      padding: 1em;
      border-radius: 0px 0px 8px 8px;
      background-color: var(--code-bg);
      height: 100%; 
      outline: none;
      box-sizing: border-box;
      overflow-y: auto;
    }

    .tiptap p.is-editor-empty:first-child::before {
        color: #adb5bd;
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
    }

    .dropdown {
      position: relative;

      &:hover {
        .dropdown-content {
          display: block;
        }
      }

      .dropdown-content {
        top: 100%;
        display: none;
        position: absolute;
        min-width: fit-content;
        padding: 0.2em;
        border: 1px solid var(--border);
        z-index: 1;
        background-color: var(--bg);

        .editor-menu-btn { display: block;}
      }
    }

    code { background-color: var(--bg); }

    .tiptap-mathematics-render[data-type='block-math'] {
      padding: 0.5em 0;

      .block-math-inner {
        width: fit-content;
        margin: auto;
      }
    }

}
</style>