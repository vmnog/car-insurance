"use client";

import type React from "react";
import { forwardRef } from "react";
import CurrencyInput, {
	type CurrencyInputProps,
} from "react-currency-input-field";
import { cn } from "@/lib/utils";

interface CurrencyTextInputProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"value" | "onChange"
	> {
	prefix?: string;
	className?: string;
	placeholder?: string;
	defaultValue?: string | number;
	decimalsLimit?: number;
	step?: number;
	value?: string | number;
	onValueChange?: CurrencyInputProps["onValueChange"];
	isInvalid?: boolean;
}

export const CurrencyTextInput = forwardRef<
	HTMLInputElement,
	CurrencyTextInputProps
>(
	(
		{
			prefix = "$",
			className,
			placeholder,
			defaultValue,
			decimalsLimit = 2,
			step,
			id,
			name,
			value,
			disabled,
			onValueChange,
			isInvalid = false,
			...props
		},
		ref,
	) => {
		// Extract onChange from props to avoid conflicts with onValueChange
		// @ts-ignore - onChange might come from React Hook Form's field spreading
		const { onChange, ...restProps } = props;

		return (
			<CurrencyInput
				prefix={prefix}
				data-slot="input"
				aria-invalid={isInvalid}
				className={cn(
					"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
					className,
				)}
				placeholder={placeholder}
				defaultValue={defaultValue?.toString()}
				decimalsLimit={decimalsLimit}
				step={step}
				id={id}
				name={name}
				value={value?.toString()}
				disabled={disabled}
				onValueChange={onValueChange}
				decimalScale={2}
				allowNegativeValue={false}
				ref={ref}
				{...restProps}
			/>
		);
	},
);

CurrencyTextInput.displayName = "CurrencyTextInput";
