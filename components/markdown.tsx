"use client";

import { useState, useEffect } from "react";

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className = "" }: MarkdownProps) {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Simple markdown parser for demo purposes
    // In production, you'd use a library like marked, remark, or react-markdown
    const parseMarkdown = (md: string) => {
      let html = md
        // Headers
        .replace(
          /^### (.*$)/gim,
          '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>'
        )
        .replace(
          /^## (.*$)/gim,
          '<h2 class="text-xl font-semibold mt-6 mb-4">$1</h2>'
        )
        .replace(
          /^# (.*$)/gim,
          '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>'
        )

        // Bold and Italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

        // Links
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>'
        )

        // Code blocks
        .replace(
          /```([\s\S]*?)```/g,
          '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$1</code></pre>'
        )

        // Inline code
        .replace(
          /`([^`]+)`/g,
          '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>'
        )

        // Lists
        .replace(/^\* (.*$)/gim, '<li class="ml-4">• $1</li>')
        .replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>')
        .replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>')

        // Blockquotes
        .replace(
          /^> (.*$)/gim,
          '<blockquote class="border-l-4 border-gray-300 pl-4 py-2 my-4 bg-gray-50 italic">$1</blockquote>'
        )

        // Line breaks
        .replace(/\n\n/g, '</p><p class="mb-4">')
        .replace(/\n/g, "<br>");

      // Wrap in paragraphs
      html = `<p class="mb-4">${html}</p>`;

      return html;
    };

    setHtmlContent(parseMarkdown(content));
  }, [content]);

  if (!content) {
    return (
      <div className={`text-gray-500 italic ${className}`}>
        No content available.
      </div>
    );
  }

  return (
    <div
      className={`prose prose-gray max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

// Enhanced Markdown component with syntax highlighting
export function MarkdownWithSyntaxHighlighting({
  content,
  className = "",
}: MarkdownProps) {
  // This would integrate with a library like Prism.js or highlight.js for syntax highlighting
  // For now, we'll use the basic Markdown component

  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Enhanced markdown parser with better code block handling
    const parseMarkdown = (md: string) => {
      let html = md
        // Code blocks with language specification
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
          const language = lang || "text";
          return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
            <code class="text-sm language-${language}">${code.trim()}</code>
          </pre>`;
        })

        // Headers with anchor links
        .replace(/^### (.*$)/gim, (match, text) => {
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return `<h3 id="${id}" class="text-lg font-semibold mt-6 mb-3 scroll-mt-16">
            <a href="#${id}" class="hover:text-blue-600">${text}</a>
          </h3>`;
        })
        .replace(/^## (.*$)/gim, (match, text) => {
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return `<h2 id="${id}" class="text-xl font-semibold mt-6 mb-4 scroll-mt-16">
            <a href="#${id}" class="hover:text-blue-600">${text}</a>
          </h2>`;
        })
        .replace(/^# (.*$)/gim, (match, text) => {
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return `<h1 id="${id}" class="text-2xl font-bold mt-6 mb-4 scroll-mt-16">
            <a href="#${id}" class="hover:text-blue-600">${text}</a>
          </h1>`;
        })

        // Tables
        .replace(
          /\|(.+)\|\n\|[-\s|]+\|\n((?:\|.+\|\n?)*)/g,
          (_match, header, rows) => {
            const headerCells = header
              .split("|")
              .map((cell: string) => cell.trim())
              .filter(Boolean);
            const rowData = rows
              .trim()
              .split("\n")
              .map((row: string) =>
                row
                  .split("|")
                  .map((cell: string) => cell.trim())
                  .filter(Boolean)
              );

            const headerHtml = headerCells
              .map(
                (cell: string) =>
                  `<th class="px-4 py-2 border font-semibold">${cell}</th>`
              )
              .join("");
            const rowsHtml = rowData
              .map(
                (row: string[]) =>
                  `<tr>${row
                    .map(
                      (cell: string) =>
                        `<td class="px-4 py-2 border">${cell}</td>`
                    )
                    .join("")}</tr>`
              )
              .join("");

            return `<table class="w-full border-collapse border my-4">
            <thead><tr>${headerHtml}</tr></thead>
            <tbody>${rowsHtml}</tbody>
          </table>`;
          }
        )

        // Images
        .replace(
          /!\[([^\]]*)\]\(([^)]+)\)/g,
          '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" loading="lazy">'
        )

        // Horizontal rules
        .replace(/^---$/gm, '<hr class="my-6 border-gray-300">')

        // Rest of the parsing...
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>'
        )
        .replace(
          /`([^`]+)`/g,
          '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>'
        )

        // Lists with nesting support
        .replace(
          /^(\s*)[\*\-] (.*$)/gim,
          '<li class="ml-4" style="margin-left: $1">• $2</li>'
        )
        .replace(
          /^(\s*)\d+\. (.*$)/gim,
          '<li class="ml-4" style="margin-left: $1">$2</li>'
        )

        .replace(
          /^> (.*$)/gim,
          '<blockquote class="border-l-4 border-blue-300 pl-4 py-2 my-4 bg-blue-50 italic">$1</blockquote>'
        )
        .replace(/\n\n/g, '</p><p class="mb-4">')
        .replace(/\n/g, "<br>");

      html = `<p class="mb-4">${html}</p>`;
      return html;
    };

    setHtmlContent(parseMarkdown(content));
  }, [content]);

  return (
    <div
      className={`prose prose-gray max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

// Table of Contents generator
export function generateTableOfContents(
  content: string
): Array<{ id: string; title: string; level: number }> {
  const headers = content.match(/^#{1,6} .+$/gm) || [];

  return headers.map((header) => {
    const level = header.match(/^#+/)?.[0].length || 1;
    const title = header.replace(/^#+\s+/, "");
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    return { id, title, level };
  });
}

// Table of Contents component
interface TableOfContentsProps {
  content: string;
  className?: string;
}

export function TableOfContents({
  content,
  className = "",
}: TableOfContentsProps) {
  const toc = generateTableOfContents(content);

  if (toc.length === 0) {
    return null;
  }

  return (
    <nav className={`bg-gray-50 p-4 rounded-lg ${className}`}>
      <h3 className="font-semibold mb-3">Table of Contents</h3>
      <ul className="space-y-1">
        {toc.map(({ id, title, level }) => (
          <li key={id} style={{ marginLeft: `${(level - 1) * 1}rem` }}>
            <a
              href={`#${id}`}
              className="text-sm text-gray-600 hover:text-blue-600 block py-1"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
