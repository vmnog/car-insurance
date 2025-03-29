"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectWithSearchAndButton } from "@/components/select-with-search-and-button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { CurrencyTextInput } from "@/components/currency-text-input";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const completeRequiredFormSchema = z.object({
	is_active: z.literal(true),
	full_amount: z.string(),
	down_payment: z.string(),
	installments: z.string(),
});
const completeOptionalFormSchema = z.object({
	is_active: z.literal(false).optional(),
	full_amount: z.string().optional(),
	down_payment: z.string().optional(),
	installments: z.string().optional(),
});

const thirdPartyRequiredFormSchema = z.object({
	is_active: z.literal(true),
	full_amount: z.string(),
	down_payment: z.string(),
	installments: z.string(),
});
const thirdPartyOptionalFormSchema = z.object({
	is_active: z.literal(false).optional(),
	full_amount: z.string().optional(),
	down_payment: z.string().optional(),
	installments: z.string().optional(),
});

const FormSchema = z.object({
	fullname: z.string().min(2, {
		message: "Fullname must be at least 2 characters.",
	}),
	quote: z.string().min(2, {
		message: "Quote must be at least 2 characters.",
	}),
	company: z.string().min(2, {
		message: "Company must be at least 2 characters.",
	}),
	installments: z.string().min(1, {
		message: "Installments must be at least 1 character.",
	}),
	language: z.string().min(2, {
		message: "Language must be at least 2 characters.",
	}),
	complete: z.discriminatedUnion("is_active", [
		completeRequiredFormSchema,
		completeOptionalFormSchema,
	]),
	third_party_coverage: z.discriminatedUnion("is_active", [
		thirdPartyRequiredFormSchema,
		thirdPartyOptionalFormSchema,
	]),
	fee_amount: z.string(),
	has_renters: z.boolean().default(false),
	is_car_financed: z.boolean().default(false),
	franchise_amount: z.string(),
	medical_insurance_amount: z.string(),
	property_damage_insurance_amount: z.string(),
	is_rental_car: z.boolean().default(false),
	term_duration_in_months: z.string(),
});

export function CreateQuoteForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			installments: "3",
			term_duration_in_months: "6",
			company: "id-1",
			language: "id-1",
			franchise_amount: "id-1",
			medical_insurance_amount: "id-1",
			property_damage_insurance_amount: "id-1",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast.success("You submitted the following values:", {
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function onError(error: any) {
		console.error(error);
		toast.error("Please fill in all required fields.");
	}

	const companyFieldRef = useRef<HTMLButtonElement>(null);
	const installmentsFieldRef = useRef<HTMLButtonElement>(null);
	const languageFieldRef = useRef<HTMLButtonElement>(null);
	const completeFullAmountFieldRef = useRef<HTMLInputElement>(null);
	const completeDownPaymentFieldRef = useRef<HTMLInputElement>(null);
	const completeInstallmentsFieldRef = useRef<HTMLInputElement>(null);
	const thirdPartyFullAmountFieldRef = useRef<HTMLInputElement>(null);
	const thirdPartyDownPaymentFieldRef = useRef<HTMLInputElement>(null);
	const thirdPartyInstallmentsFieldRef = useRef<HTMLInputElement>(null);
	const feeAmountFieldRef = useRef<HTMLInputElement>(null);
	const franchiseAmountFieldRef = useRef<HTMLButtonElement>(null);
	const medicalInsuranceAmountFieldRef = useRef<HTMLButtonElement>(null);
	const propertyDamageInsuranceAmountFieldRef = useRef<HTMLButtonElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const errors = form.formState.errors;
		if (Object.keys(errors).length > 0) {
			if (errors.company) {
				companyFieldRef.current?.focus();
			} else if (errors.installments) {
				installmentsFieldRef.current?.focus();
			} else if (errors.language) {
				languageFieldRef.current?.focus();
			} else if (errors?.complete?.full_amount) {
				completeFullAmountFieldRef.current?.focus();
			} else if (errors?.complete?.down_payment) {
				completeDownPaymentFieldRef.current?.focus();
			} else if (errors?.complete?.installments) {
				completeInstallmentsFieldRef.current?.focus();
			} else if (errors?.third_party_coverage?.full_amount) {
				thirdPartyFullAmountFieldRef.current?.focus();
			} else if (errors?.third_party_coverage?.down_payment) {
				thirdPartyDownPaymentFieldRef.current?.focus();
			} else if (errors?.third_party_coverage?.installments) {
				thirdPartyInstallmentsFieldRef.current?.focus();
			} else if (errors?.fee_amount) {
				feeAmountFieldRef.current?.focus();
			} else if (errors?.franchise_amount) {
				franchiseAmountFieldRef.current?.focus();
			} else if (errors?.medical_insurance_amount) {
				medicalInsuranceAmountFieldRef.current?.focus();
			} else if (errors?.property_damage_insurance_amount) {
				propertyDamageInsuranceAmountFieldRef.current?.focus();
			}
		}
	}, [form.formState.errors, form.formState.submitCount]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		form.clearErrors("complete");
		form.resetField("complete.full_amount");
		form.resetField("complete.down_payment");
		form.resetField("complete.installments");
	}, [form.watch("complete.is_active")]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		form.clearErrors("third_party_coverage");
		form.resetField("third_party_coverage.full_amount");
		form.resetField("third_party_coverage.down_payment");
		form.resetField("third_party_coverage.installments");
	}, [form.watch("third_party_coverage.is_active")]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, onError)}
				className="space-y-6"
			>
				<Card>
					<CardHeader>
						<CardTitle>Quote Details</CardTitle>
						<CardDescription>
							Please fill in the following fields to create a new quote.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-8">
						<div className="grid grid-cols-2 gap-4 items-start">
							<FormField
								control={form.control}
								name="fullname"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Fullname</FormLabel>
										<FormControl>
											<Input placeholder="John Doe" {...field} />
										</FormControl>
										<FormDescription>
											Enter the full name of the person who is requesting the
											quote.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="quote"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Quote</FormLabel>
										<FormControl>
											<Input placeholder="e.g. Auto Insurance" {...field} />
										</FormControl>
										<FormDescription>Enter the quote number.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Separator />

						<div className="grid grid-cols-2 gap-4 items-start">
							<FormField
								control={form.control}
								name="installments"
								render={({ field }) => (
									<FormItem>
										<SelectWithSearchAndButton
											defaultValue={field.value}
											ref={installmentsFieldRef}
											label="Installments"
											subjectName="installments"
											options={[
												{ value: "3", label: "3" },
												{ value: "6", label: "6" },
												{ value: "9", label: "9" },
												{ value: "12", label: "12" },
											]}
											onFieldChange={field.onChange}
										/>
										<FormDescription>
											Select the number of installments.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="term_duration_in_months"
								render={({ field }) => (
									<FormItem>
										<SelectWithSearchAndButton
											defaultValue={field.value}
											ref={installmentsFieldRef}
											label="Term duration in months"
											subjectName="term_duration_in_months"
											options={[
												{ value: "6", label: "6" },
												{ value: "12", label: "12" },
											]}
											onFieldChange={field.onChange}
										/>
										<FormDescription>
											Select the number of installments.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Separator />

						<div className="grid grid-cols-2 gap-4 items-start">
							<FormField
								control={form.control}
								name="company"
								render={({ field }) => (
									<FormItem>
										<SelectWithSearchAndButton
											defaultValue={field.value}
											ref={companyFieldRef}
											label="Company"
											subjectName="company"
											options={[
												{ value: "id-1", label: "Bristol West" },
												{ value: "id-2", label: "National General" },
												{ value: "id-3", label: "Progressive" },
												{ value: "id-4", label: "State Farm" },
												{ value: "id-5", label: "Travelers" },
												{ value: "id-6", label: "USAA" },
											]}
											onFieldChange={field.onChange}
										/>
										<FormDescription>
											Select the insurance company.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="language"
								render={({ field }) => (
									<FormItem>
										<SelectWithSearchAndButton
											defaultValue={field.value}
											ref={languageFieldRef}
											label="Language"
											subjectName="language"
											options={[
												{
													value: "id-1",
													label: "English",
													flagCountryCode: "US",
												},
												{
													value: "id-2",
													label: "Spanish",
													flagCountryCode: "ES",
												},
												{
													value: "id-3",
													label: "Portuguese",
													flagCountryCode: "BR",
												},
											]}
											onFieldChange={field.onChange}
										/>
										<FormDescription>
											Select the language for the quote.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Separator />

						<FormField
							control={form.control}
							name="complete.is_active"
							render={({ field }) => (
								<FormItem className="flex items-center justify-between rounded-lg">
									<div className="space-y-0.5">
										<FormLabel>Complete Coverage</FormLabel>
										<FormDescription>
											Select if you want to include complete coverage in the
											quote.
										</FormDescription>
										<FormMessage />
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<div
							className={cn(
								"grid grid-cols-3 gap-4 items-start",
								!form.watch("complete.is_active") && "hidden",
							)}
						>
							<FormField
								control={form.control}
								name="complete.full_amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Complete full amount</FormLabel>
										<FormControl>
											<CurrencyTextInput
												disabled={!form.watch("complete.is_active")}
												prefix="$"
												id="complete_full_amount"
												name="complete.full_amount"
												placeholder="$1,234"
												value={field.value}
												onValueChange={(value) => field.onChange(value)}
												ref={completeFullAmountFieldRef}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="complete.down_payment"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Complete down payment</FormLabel>
										<FormControl>
											<CurrencyTextInput
												disabled={!form.watch("complete.is_active")}
												prefix="$"
												id="complete_down_payment"
												name="complete.down_payment"
												placeholder="$1,234"
												value={field.value}
												onValueChange={(value) => field.onChange(value)}
												ref={completeDownPaymentFieldRef}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="complete.installments"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Complete installments</FormLabel>
										<FormControl>
											<CurrencyTextInput
												disabled={!form.watch("complete.is_active")}
												prefix="$"
												id="complete_installments"
												name="complete.installments"
												placeholder="$1,234"
												value={field.value}
												onValueChange={(value) => field.onChange(value)}
												ref={completeInstallmentsFieldRef}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Separator />

						<FormField
							control={form.control}
							name="third_party_coverage.is_active"
							render={({ field }) => (
								<FormItem className="flex items-center justify-between rounded-lg">
									<div className="space-y-0.5">
										<FormLabel>Third Party Coverage</FormLabel>
										<FormDescription>
											Select if you want to include third party coverage in the
											quote.
										</FormDescription>
										<FormMessage />
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<div
							className={cn(
								"grid grid-cols-3 gap-4 items-start",
								!form.watch("third_party_coverage.is_active") && "hidden",
							)}
						>
							<FormField
								control={form.control}
								name="third_party_coverage.full_amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Third party full amount</FormLabel>
										<FormControl>
											<CurrencyTextInput
												disabled={!form.watch("third_party_coverage.is_active")}
												prefix="$"
												id="third_party_full_amount"
												name="third_party_coverage.full_amount"
												placeholder="$1,234"
												value={field.value}
												onValueChange={(value) => field.onChange(value)}
												ref={thirdPartyFullAmountFieldRef}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="third_party_coverage.down_payment"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Third party down payment</FormLabel>
										<FormControl>
											<CurrencyTextInput
												disabled={!form.watch("third_party_coverage.is_active")}
												prefix="$"
												id="third_party_down_payment"
												name="third_party_coverage.down_payment"
												placeholder="$1,234"
												value={field.value}
												onValueChange={(value) => field.onChange(value)}
												ref={thirdPartyDownPaymentFieldRef}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="third_party_coverage.installments"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Third party installments</FormLabel>
										<FormControl>
											<CurrencyTextInput
												disabled={!form.watch("third_party_coverage.is_active")}
												prefix="$"
												id="third_party_installments"
												name="third_party_coverage.installments"
												placeholder="$1,234"
												value={field.value}
												onValueChange={(value) => field.onChange(value)}
												ref={thirdPartyInstallmentsFieldRef}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Separator />

						<div className="grid grid-cols-3 gap-4 items-start">
							<FormField
								control={form.control}
								name="has_renters"
								render={({ field }) => (
									<FormItem className="flex items-center justify-between rounded-lg">
										<div className="space-y-0.5">
											<FormLabel>Has renters?</FormLabel>
											<FormDescription>Select if has renters.</FormDescription>
											<FormMessage />
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="is_car_financed"
								render={({ field }) => (
									<FormItem className="flex items-center justify-between rounded-lg">
										<div className="space-y-0.5">
											<FormLabel>Is car financed?</FormLabel>
											<FormDescription>
												Select if the car is financed.
											</FormDescription>
											<FormMessage />
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="is_rental_car"
								render={({ field }) => (
									<FormItem className="flex items-center justify-between rounded-lg">
										<div className="space-y-0.5">
											<FormLabel>Is rental car?</FormLabel>
											<FormDescription>
												Select if the car is a rental car.
											</FormDescription>
											<FormMessage />
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<Separator />

						<div className="grid grid-cols-2 gap-4 items-start">
							<FormField
								control={form.control}
								name="fee_amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Fee</FormLabel>
										<FormControl>
											<CurrencyTextInput
												prefix="$"
												id="fee_amount"
												name="fee_amount"
												placeholder="$1,234"
												value={field.value}
												onValueChange={(value) => field.onChange(value)}
												ref={feeAmountFieldRef}
											/>
										</FormControl>
										<FormDescription>Enter the fee amount.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Separator />

						<div className="grid grid-cols-3 gap-4 items-start">
							<FormField
								control={form.control}
								name="franchise_amount"
								render={({ field }) => (
									<FormItem>
										<SelectWithSearchAndButton
											defaultValue={field.value}
											ref={franchiseAmountFieldRef}
											label="Franchise"
											subjectName="franchise"
											options={[
												{ value: "id-1", label: "$ 2.500" },
												{ value: "id-2", label: "$ 5.000" },
												{ value: "id-3", label: "$ 10.000" },
											]}
											onFieldChange={field.onChange}
										/>
										<FormDescription>
											Select the franchise amount.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="medical_insurance_amount"
								render={({ field }) => (
									<FormItem>
										<SelectWithSearchAndButton
											defaultValue={field.value}
											ref={medicalInsuranceAmountFieldRef}
											label="Medical insurance"
											subjectName="medical insurance"
											options={[
												{ value: "id-1", label: "$ 2.500" },
												{ value: "id-2", label: "$ 5.000" },
												{ value: "id-3", label: "$ 10.000" },
											]}
											onFieldChange={field.onChange}
										/>
										<FormDescription>
											Select the medical insurance amount.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="property_damage_insurance_amount"
								render={({ field }) => (
									<FormItem>
										<SelectWithSearchAndButton
											defaultValue={field.value}
											ref={propertyDamageInsuranceAmountFieldRef}
											label="Property damage"
											subjectName="property damage"
											options={[
												{ value: "id-1", label: "$ 2.500" },
												{ value: "id-2", label: "$ 5.000" },
												{ value: "id-3", label: "$ 10.000" },
											]}
											onFieldChange={field.onChange}
										/>
										<FormDescription>
											Select the property damage amount.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
