"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
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
import { QuoteImageGenerator } from "@/components/quote-image-generator";
import { FormSchema } from "@/app/components/form-schema";
import { RefreshCwIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
export function CreateQuoteForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		// TODO: get default values from the API
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			// @ts-ignore - Static property exists but TypeScript doesn't see it
			QuoteImageGenerator.generateQuoteImage(data);
		} catch (error) {
			console.error("Error creating quote image:", error);
			toast.error("Failed to create quote image");
		}
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function onError(error: any) {
		console.error(error);
		toast.error("Please fill in all required fields.");
	}

	useEffect(() => {
		if (Object.keys(form.formState.errors).length > 0) {
			if (form.formState.errors.installments) {
				installmentsFieldRef.current?.focus();
				return;
			}
			if (form.formState.errors.term_duration_in_months) {
				termDurationInMonthsFieldRef.current?.focus();
				return;
			}
			if (form.formState.errors.fee_amount) {
				feeAmountFieldRef.current?.focus();
				return;
			}

			if (form.formState.errors.company) {
				companyFieldRef.current?.focus();
				return;
			}
			if (form.formState.errors.language) {
				languageFieldRef.current?.focus();
				return;
			}

			if (form.formState.errors.complete?.full_amount) {
				completeFullAmountFieldRef.current?.focus();
				return;
			}
			if (form.formState.errors.complete?.down_payment) {
				completeDownPaymentFieldRef.current?.focus();
				return;
			}
			if (form.formState.errors.complete?.installments) {
				completeInstallmentsFieldRef.current?.focus();
				return;
			}

			if (form.formState.errors.third_party_coverage?.full_amount) {
				thirdPartyFullAmountFieldRef.current?.focus();
				return;
			}
			if (form.formState.errors.third_party_coverage?.down_payment) {
				thirdPartyDownPaymentFieldRef.current?.focus();
				return;
			}
			if (form.formState.errors.third_party_coverage?.installments) {
				thirdPartyInstallmentsFieldRef.current?.focus();
				return;
			}

			if (form.formState.errors.franchise_amount) {
				franchiseAmountFieldRef.current?.focus();
				return;
			}
			if (form.formState.errors.medical_insurance_amount) {
				medicalInsuranceAmountFieldRef.current?.focus();
				return;
			}
			if (form.formState.errors.property_damage_insurance_amount) {
				propertyDamageInsuranceAmountFieldRef.current?.focus();
				return;
			}
		}
	}, [form.formState.errors]);

	// Custom Fields Refs for focusing on errors
	const companyFieldRef = useRef<HTMLButtonElement>(null);
	const installmentsFieldRef = useRef<HTMLButtonElement>(null);
	const termDurationInMonthsFieldRef = useRef<HTMLButtonElement>(null);
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

	// Callback function when the image generation is successful
	const handleSuccessfulQuoteGeneration = (
		data: z.infer<typeof FormSchema>,
	) => {
		toast.success("Quote submitted successfully!", {
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	};

	return (
		<>
			{/* Include the QuoteImageGenerator component */}
			<QuoteImageGenerator generateImage={handleSuccessfulQuoteGeneration} />

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
											<FormLabel>Person name</FormLabel>
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
											<FormLabel>Quote title</FormLabel>
											<FormControl>
												<Input placeholder="Auto Insurance" {...field} />
											</FormControl>
											<FormDescription>Enter the quote title.</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Separator />

							<div className="grid grid-cols-3 gap-4 items-start">
								<FormField
									control={form.control}
									name="installments"
									render={({ field }) => (
										<FormItem>
											<SelectWithSearchAndButton
												value={field.value}
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
												value={field.value}
												ref={termDurationInMonthsFieldRef}
												label="Term duration in months"
												subjectName="duration"
												options={[
													{ value: "6", label: "6" },
													{ value: "12", label: "12" },
												]}
												onFieldChange={field.onChange}
											/>
											<FormDescription>
												Inform the term duration in months.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="fee_amount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Fee</FormLabel>
											<FormControl>
												<CurrencyTextInput
													isInvalid={!!form.formState.errors.fee_amount}
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

							<div className="grid grid-cols-2 gap-4 items-start">
								<FormField
									control={form.control}
									name="company"
									render={({ field }) => (
										<FormItem>
											<SelectWithSearchAndButton
												value={field.value}
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
												value={field.value}
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
												onCheckedChange={(checked) => {
													field.onChange(checked);
													form.clearErrors("complete");
													form.resetField("complete.full_amount");
													form.resetField("complete.down_payment");
													form.resetField("complete.installments");
												}}
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
											<FormLabel>Full amount</FormLabel>
											<FormControl>
												<CurrencyTextInput
													isInvalid={
														!!form.formState.errors.complete?.full_amount
													}
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
											<FormLabel>Down payment</FormLabel>
											<FormControl>
												<CurrencyTextInput
													isInvalid={
														!!form.formState.errors.complete?.down_payment
													}
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
											<FormLabel>Installments</FormLabel>
											<FormControl>
												<CurrencyTextInput
													isInvalid={
														!!form.formState.errors.complete?.installments
													}
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
												Select if you want to include third party coverage in
												the quote.
											</FormDescription>
											<FormMessage />
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={(checked) => {
													field.onChange(checked);
													form.clearErrors("third_party_coverage");
													form.resetField("third_party_coverage.full_amount");
													form.resetField("third_party_coverage.down_payment");
													form.resetField("third_party_coverage.installments");
												}}
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
											<FormLabel>Full amount</FormLabel>
											<FormControl>
												<CurrencyTextInput
													isInvalid={
														!!form.formState.errors.third_party_coverage
															?.full_amount
													}
													disabled={
														!form.watch("third_party_coverage.is_active")
													}
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
											<FormLabel>Down payment</FormLabel>
											<FormControl>
												<CurrencyTextInput
													isInvalid={
														!!form.formState.errors.third_party_coverage
															?.down_payment
													}
													disabled={
														!form.watch("third_party_coverage.is_active")
													}
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
											<FormLabel>Installments</FormLabel>
											<FormControl>
												<CurrencyTextInput
													isInvalid={
														!!form.formState.errors.third_party_coverage
															?.installments
													}
													disabled={
														!form.watch("third_party_coverage.is_active")
													}
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
												<FormDescription>
													Select if has renters.
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

							<div className="grid grid-cols-3 gap-4 items-start">
								<FormField
									control={form.control}
									name="franchise_amount"
									render={({ field }) => (
										<FormItem>
											<SelectWithSearchAndButton
												value={field.value}
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
												value={field.value}
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
												value={field.value}
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
					<div className="flex gap-4 justify-end">
						<Button type="submit">
							<SendIcon className="w-4 h-4 mr-2" />
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
