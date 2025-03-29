import { CreateQuoteForm } from "./create-quote-form";
import { QuoteTable } from "./quote-table";

export default function Page() {
	return (
		<div className="flex flex-col gap-8">
			<CreateQuoteForm />
			<QuoteTable />
		</div>
	);
}
