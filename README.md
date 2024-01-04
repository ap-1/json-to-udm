# JSON to UDM

[Google Chronicle](https://cloud.google.com/chronicle/docs) is a SecOps service enabling teams to collect, analyze, and respond to threats from one unified platform. A more detailed description of how Chronicle functions can be found [here](https://cloud.google.com/chronicle/docs/data-ingestion-flow).

The Chronicle Ingestion API works with a special format called UDM. Because security responses and associated data are typically represented in JSON, they must first be [converted into UDM](https://cloud.google.com/chronicle/docs/unified-data-model/format-events-as-udm#formatting_a_udm_event) before being submitted to Chronicle.

This tool is a web application that leverages LLM technology to convert JSON into UDM. It is a website built with [Next.js](http://nextjs.org) and powered by [Bun](http://bun.sh).

## Stack

Additional technologies include:

- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) as a component library
- [Jotai](https://jotai.org/) for global state management
- [Monaco](https://github.com/microsoft/monaco-editor) for the text editor
- [LangChain](https://js.langchain.com/) for interfacing with the LLM

## Development

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
