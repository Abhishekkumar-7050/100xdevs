

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response('Hello World! ya ay it done');
	},
} satisfies ExportedHandler<Env>;
