import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const items = [
	{
		id: "1",
		name: "Alex Thompson",
		username: "@alexthompson",
		image:
			"https://res.cloudinary.com/dlzlfasou/image/upload/v1736358071/avatar-40-02_upqrxi.jpg",
		email: "alex.t@company.com",
		location: "San Francisco, US",
		status: "Active",
		balance: "$1,250.00",
	},
	{
		id: "2",
		name: "Sarah Chen",
		username: "@sarahchen",
		image:
			"https://res.cloudinary.com/dlzlfasou/image/upload/v1736358073/avatar-40-01_ij9v7j.jpg",
		email: "sarah.c@company.com",
		location: "Singapore",
		status: "Active",
		balance: "$600.00",
	},
	{
		id: "4",
		name: "Maria Garcia",
		username: "@mariagarcia",
		image:
			"https://res.cloudinary.com/dlzlfasou/image/upload/v1736358072/avatar-40-03_dkeufx.jpg",
		email: "m.garcia@company.com",
		location: "Madrid, Spain",
		status: "Active",
		balance: "$0.00",
	},
	{
		id: "5",
		name: "David Kim",
		username: "@davidkim",
		image:
			"https://res.cloudinary.com/dlzlfasou/image/upload/v1736358070/avatar-40-05_cmz0mg.jpg",
		email: "d.kim@company.com",
		location: "Seoul, KR",
		status: "Active",
		balance: "-$1,000.00",
	},
];

export function QuoteTable() {
	return (
		<div className="overflow-x-auto">
			<Table className="w-full table-fixed">
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						<TableHead className="w-1/3">Name</TableHead>
						<TableHead className="w-1/5">Email</TableHead>
						<TableHead className="w-1/6">Location</TableHead>
						<TableHead className="w-1/12">Status</TableHead>
						<TableHead className="w-1/8 text-right">Balance</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{items.map((item) => (
						<TableRow key={item.id}>
							<TableCell className="truncate">
								<div className="flex items-center gap-3">
									<img
										className="rounded-full shrink-0"
										src={item.image}
										width={40}
										height={40}
										alt={item.name}
									/>
									<div className="min-w-0">
										<div className="font-medium truncate">{item.name}</div>
										<span className="text-muted-foreground mt-0.5 text-xs block truncate">
											{item.username}
										</span>
									</div>
								</div>
							</TableCell>
							<TableCell className="truncate">{item.email}</TableCell>
							<TableCell className="truncate">{item.location}</TableCell>
							<TableCell className="truncate">{item.status}</TableCell>
							<TableCell className="text-right truncate">
								{item.balance}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<p className="text-muted-foreground mt-4 text-center text-sm">
				Table with images
			</p>
		</div>
	);
}
