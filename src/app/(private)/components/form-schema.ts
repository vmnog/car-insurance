import { z } from "zod";

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

export const FormSchema = z.object({
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