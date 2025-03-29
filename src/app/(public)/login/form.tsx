"use client";

import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	FormDescription,
	FormField,
	FormLabel,
	Form,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { login } from "./actions";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		const formData = new FormData();
		formData.append("email", values.email);
		formData.append("password", values.password);
		login(formData);
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col items-center gap-2">
					<a
						href="https://www.example.com"
						className="flex flex-col items-center gap-2 font-medium"
					>
						<div className="flex h-8 w-8 items-center justify-center rounded-md">
							<GalleryVerticalEnd className="size-6" />
						</div>
						<span className="sr-only">Acme Inc.</span>
					</a>
					<h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
					<div className="text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link
							href="mailto:support@example.com"
							className="underline underline-offset-4"
						>
							Contact us
						</Link>
					</div>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="m@example.com" {...field} />
									</FormControl>
									<FormDescription>
										This is your already registered email.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="********" {...field} />
									</FormControl>
									<FormDescription>Enter your password.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Login</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
