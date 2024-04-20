"use server";

import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import TurndownService from "turndown";
import { decode } from "html-entities";
import table_to_markdown from "./convert-table";
import content_filter from "./content-filter";
import { cache } from "react";

const stackoverflow_prefix = "https://stackoverflow.com/questions";

export const readFromURL = async (url: string) => {
  try {
    if (url.startsWith(stackoverflow_prefix)) {
      let markdown_q = await getMarkdownFromURL(url, "question");
      let markdown_a = await getMarkdownFromURL(url, "answers", false);

      if (markdown_a.startsWith("Your Answser")) {
        return markdown_q;
      }

      return markdown_q + "\n\n## Answer\n" + markdown_a;
    }

    return await getMarkdownFromURL(url);
  } catch (err) {
    return "# No content found";
  }
};

const getMarkdownFromURL = cache(
  async (url: string, id = "", inline_title = true) => {
    try {
      let doc = await JSDOM.fromURL(url);

      const title = doc.window.document.title;
      const author = doc.window.document
        .querySelector("meta[name='author']")
        ?.getAttribute("content");

      if (id) {
        doc = new JSDOM(
          "<!DOCTYPE html>" +
            doc.window.document.querySelector("#" + id)?.innerHTML,
        );
      }

      const reader = new Readability(doc.window.document);
      const article = reader.parse();
      let readable = article?.content;

      if (!readable) {
        return "# No content found.";
      }

      const replacements: Array<any> = [];

      readable = format_codeblocks(readable!, replacements);
      readable = format_tables(readable!, replacements);

      const turndownService = new TurndownService({
        headingStyle: "atx",
        linkReferenceStyle: "shortcut",
        linkStyle: "referenced",
      });

      let markdown = turndownService.turndown(readable!);

      for (let i = 0; i < replacements.length; i++) {
        markdown = markdown.replace(
          replacements[i].placeholder,
          replacements[i].replacement || "",
        );
      }

      markdown = url ? content_filter.filter(url, markdown) : markdown;

      if (title && inline_title) {
        markdown = `# ${title}\n${author ? `by ${author}\n\n` : "\n"}${markdown}`;
      }

      return markdown;
    } catch (err) {
      return "# No content found";
    }
  },
);

export const getTitlesFromURL = async (url: string) => {
  try {
    const doc = await JSDOM.fromURL(url);

    const title = doc.window.document.title;

    return title;
  } catch (err) {
    return null;
  }
};

function format_tables(html: string, replacements: Array<any>) {
  const start = replacements.length;
  const tables = html.match(/(<table[^>]*>(?:.|\n)*?<\/table>)/gi);
  if (tables) {
    for (let t = 0; t < tables.length; t++) {
      const table = tables[t];
      let markdown = table_to_markdown.convert(table);
      let placeholder = "urltomarkdowntableplaceholder" + t + Math.random();
      replacements[start + t] = {
        placeholder: placeholder,
        replacement: markdown,
      };
      html = html.replace(table, "<p>" + placeholder + "</p>");
    }
  }
  return html;
}
function format_codeblocks(html: string, replacements: Array<any>) {
  const start = replacements.length;
  const codeblocks = html.match(/(<pre[^>]*>(?:.|\n)*?<\/pre>)/gi);
  if (codeblocks) {
    for (let c = 0; c < codeblocks.length; c++) {
      const codeblock = codeblocks[c];
      let filtered = codeblock;
      filtered = filtered.replace(/<br[^>]*>/g, "\n");
      filtered = filtered.replace(/<p>/g, "\n");
      filtered = filtered.replace(/<\/?[^>]+(>|$)/g, "");
      filtered = decode(filtered);
      let markdown = "```\n" + filtered + "\n```\n";
      let placeholder = "urltomarkdowncodeblockplaceholder" + c + Math.random();
      replacements[start + c] = {
        placeholder: placeholder,
        replacement: markdown,
      };

      html = html.replace(codeblock, "<p>" + placeholder + "</p>");
    }
  }
  return html;
}
