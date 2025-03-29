import { CreateQuoteForm } from "./components/form";
import { QuoteTable } from "./quote-table";
import { createClient } from "@/supabase/server";

export default async function Page() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	console.log({ user });

	return (
		<div className="grid grid-cols-2 gap-4">
			<CreateQuoteForm />
			<QuoteTable />
		</div>
	);
}
