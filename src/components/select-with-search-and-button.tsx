"use client";

import { forwardRef, useId, useState, useEffect } from "react";
import { CheckIcon, ChevronDownIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl } from "./ui/form";
import ReactCountryFlag from "react-country-flag";

interface SelectWithSearchAndButtonProps {
	label: string;
	options: { value: string; label: string; flagCountryCode?: string }[];
	subjectName: string;
	onFieldChange?: (value: string) => void;
	value?: string;
	name?: string;
	onChange?: (e: { target: { value: string; name?: string } }) => void;
}

export const SelectWithSearchAndButton = forwardRef<
	HTMLButtonElement,
	SelectWithSearchAndButtonProps
>(
	(
		{
			label = "Select an item",
			options = [],
			subjectName = "Item",
			onFieldChange,
			value = "",
			name,
			onChange,
			...props
		},
		ref,
	) => {
		const id = useId();
		const [open, setOpen] = useState<boolean>(false);
		const [selectedValue, setSelectedValue] = useState<string>(value);

		useEffect(() => {
			setSelectedValue(value);
		}, [value]);

		const handleValueChange = (newValue: string) => {
			setSelectedValue(newValue);

			if (onFieldChange) {
				onFieldChange(newValue);
			}

			if (onChange) {
				onChange({
					target: {
						value: newValue,
						name,
					},
				});
			}
		};

		return (
			<div className="*:not-first:mt-2">
				<Label htmlFor={id}>{label}</Label>
				<Popover open={open} onOpenChange={setOpen}>
					<FormControl>
						<PopoverTrigger asChild>
							<Button
								id={id}
								ref={ref}
								variant="outline"
								// biome-ignore lint/a11y/useSemanticElements: <explanation>
								role="combobox"
								aria-expanded={open}
								className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
								{...props}
							>
								<span
									className={cn(
										"truncate",
										!selectedValue && "text-muted-foreground",
									)}
								>
									{options.find((option) => option.value === selectedValue)
										?.flagCountryCode && (
										<ReactCountryFlag
											className="mr-2"
											countryCode={
												options.find((option) => option.value === selectedValue)
													?.flagCountryCode || "US"
											}
										/>
									)}
									<span>
										{selectedValue
											? options.find((option) => option.value === selectedValue)
													?.label
											: `Select ${subjectName || ""}`}
									</span>
								</span>
								<ChevronDownIcon
									size={16}
									className="text-muted-foreground/80 shrink-0"
									aria-hidden="true"
								/>
							</Button>
						</PopoverTrigger>
					</FormControl>
					<PopoverContent
						className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
						align="start"
					>
						<Command>
							<CommandInput placeholder={`Find ${subjectName}`} />
							<CommandList>
								<CommandEmpty>No {subjectName} found.</CommandEmpty>
								<CommandGroup>
									{options.map((option) => (
										<CommandItem
											key={option.value}
											value={option.label}
											onSelect={() => {
												if (option.value === selectedValue) {
													handleValueChange("");
												} else {
													handleValueChange(option.value);
												}
												setOpen(false);
											}}
										>
											{option.flagCountryCode && (
												<ReactCountryFlag
													countryCode={option.flagCountryCode}
												/>
											)}
											{option.label}
											{selectedValue === option.value && (
												<CheckIcon size={16} className="ml-auto" />
											)}
										</CommandItem>
									))}
								</CommandGroup>
								<CommandSeparator />
								<CommandGroup>
									<Button
										variant="ghost"
										className="w-full justify-start font-normal"
									>
										<PlusIcon
											size={16}
											className="-ms-2 opacity-60"
											aria-hidden="true"
										/>
										New {subjectName}
									</Button>
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
		);
	},
);

SelectWithSearchAndButton.displayName = "SelectWithSearchAndButton";
