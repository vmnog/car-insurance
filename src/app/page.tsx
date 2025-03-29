import { CreateQuoteForm } from "./components/form";
import { QuoteTable } from "./quote-table";

export default function Page() {
	return (
		<div className="grid grid-cols-2 gap-4">
			<CreateQuoteForm />
			<QuoteTable />
		</div>
	);
}
