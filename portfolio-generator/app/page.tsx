'use client';

import { useState } from "react";
import { remark } from "remark";
import html from "remark-html";

export default function Home() {
  const [markdown, setMarkdown] = useState("");
  const [output, setOutput] = useState("");

  const convertMarkdown = async () => {
    const result = await remark().use(html).process(markdown);
    setOutput(result.toString());
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Portfolio Generator</h1>

      <textarea
        className="border w-full p-2 mt-4"
        rows={10}
        placeholder="Paste your Markdown here..."
        onChange={(e) => setMarkdown(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 mt-3"
        onClick={convertMarkdown}
      >
        Generate
      </button>

      <div
        className="mt-5 border p-3 prose prose-invert"
        dangerouslySetInnerHTML={{ __html: output }}
      />
    </div>
  );
}