import { z } from "zod";
import { NextResponse, type NextRequest } from "next/server";

import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import {
	ChatPromptTemplate,
	SystemMessagePromptTemplate,
	HumanMessagePromptTemplate,
} from "@langchain/core/prompts";

import { env } from "@/env.mjs";
import { schema } from "@/lib/format";

const searchParamSchema = z.object({
	content: z.string(),
	instructions: z.string(),
});

export async function POST(req: NextRequest, res: NextResponse) {
	const data = await req.json();

	try {
		const { content, instructions } = searchParamSchema.parse(data);
		const prompt = new ChatPromptTemplate({
			promptMessages: [
				SystemMessagePromptTemplate.fromTemplate(
					`Parse the following JSON content and format the output in UDM. ${instructions}`
				),
				HumanMessagePromptTemplate.fromTemplate("{input}"),
			],
			inputVariables: ["input"],
		});

		const llm = new ChatOpenAI({
			openAIApiKey: env.OPENAI_API_KEY,
			modelName: "gpt-3.5-turbo-1106",
			temperature: 0,
		});

		const model = llm.bind({
			functions: [
				{
					name: "output_formatter",
					description:
						"Should always be used to properly format output",
					parameters: schema,
				},
			],
			function_call: {
				name: "output_formatter",
			},
		});

		const outputParser = new JsonOutputFunctionsParser();
		const chain = prompt.pipe(model).pipe(outputParser);
		const response = await chain.invoke({ input: content });

		return NextResponse.json(
			{
				message: "success",
				content: JSON.stringify(response, null, 4),
			},
			{ status: 200 }
		);
	} catch (e) {
		return NextResponse.json(
			{
				message: "error",
				content: JSON.stringify(e, null, 4),
			},
			{ status: 400 }
		);
	}
}
