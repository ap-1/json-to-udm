# JSON to UDM

[Google Chronicle](https://cloud.google.com/chronicle/docs) is a SecOps service enabling teams to collect, analyze, and respond to threats from one unified platform. The [Chronicle Ingestion API](https://cloud.google.com/chronicle/docs/data-ingestion-flow) works with a special format called UDM. Because security responses and associated data are typically represented in JSON, they must first be [converted into UDM](https://cloud.google.com/chronicle/docs/unified-data-model/format-events-as-udm#formatting_a_udm_event) before being submitted to Chronicle.

This tool is a web application that leverages LLM technology to convert JSON into UDM. It is a website built with [Next.js](http://nextjs.org) and powered by [Bun](http://bun.sh).

Example security responses are sourced from the [Darktrace](https://darktrace.com/) Threat Visualizer v5.2 API Guide. The initial context provided to the LLM is sourced from the [Important UDM fields](https://cloud.google.com/chronicle/docs/reference/important-udm-fields) and [UDM field list](https://cloud.google.com/chronicle/docs/reference/udm-field-list) documentation pages. This tool is a proof-of-concept and does not include the entire UDM scheme in the initial context.

## Stack

Additional technologies include:

- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) as a component library
- [Geist Sans](https://vercel.com/font/sans) as the font
- [Jotai](https://jotai.org/) for global state management
- [Monaco](https://github.com/microsoft/monaco-editor) for the JSON editor
- [LangChain](https://js.langchain.com/) for interfacing with the LLM

## Development

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
