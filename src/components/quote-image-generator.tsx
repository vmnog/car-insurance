"use client";

import { useRef } from "react";
import { toast } from "sonner";
import type { z } from "zod";

// Import the FormSchema type from the types file
import type { FormSchema } from "@/app/(private)/components/form-schema";

// Define a type for our form data using the zod schema
type QuoteFormData = z.infer<typeof FormSchema>;

interface QuoteImageGeneratorProps {
	generateImage: (data: QuoteFormData) => void;
}

export function QuoteImageGenerator({
	generateImage,
}: QuoteImageGeneratorProps) {
	// Container ref for the canvas
	const quoteRef = useRef<HTMLDivElement>(null);

	// Helper functions to get display names from IDs
	function getCompanyName(id: string): string {
		const companies: Record<string, string> = {
			"id-1": "Bristol West",
			"id-2": "National General",
			"id-3": "Progressive",
			"id-4": "State Farm",
			"id-5": "Travelers",
			"id-6": "USAA",
		};
		return companies[id] || id;
	}

	function getFranchiseAmount(id: string): string {
		const amounts: Record<string, string> = {
			"id-1": "$500",
			"id-2": "$1,000",
			"id-3": "$1,500",
		};
		return amounts[id] || id;
	}

	function getMedicalInsuranceAmount(id: string): string {
		const amounts: Record<string, string> = {
			"id-1": "$5,000",
			"id-2": "$10,000",
			"id-3": "$25,000",
		};
		return amounts[id] || id;
	}

	function getPropertyDamageAmount(id: string): string {
		const amounts: Record<string, string> = {
			"id-1": "$10,000",
			"id-2": "$25,000",
			"id-3": "$50,000",
		};
		return amounts[id] || id;
	}

	function drawFormValuesOnCanvas(formValues: QuoteFormData) {
		// Draw the form values on the canvas
		const canvas = document.createElement("canvas");
		canvas.width = 1080;
		canvas.height = 1080;
		const ctx = canvas.getContext("2d");
		if (!ctx) {
			throw new Error("Failed to get canvas context");
		}

		// Ensure the canvas is properly displayed in the DOM for html-to-image
		canvas.style.display = "block";
		canvas.style.width = "1080px";
		canvas.style.height = "1080px";

		// Draw the form values on the canvas
		// Set background
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Set text styles
		ctx.fillStyle = "#000000";
		ctx.font = "bold 36px Arial";
		ctx.textAlign = "center";

		// Draw title
		ctx.fillText("Car Insurance Quote", canvas.width / 2, 80);

		// Set font for content
		ctx.font = "24px Arial";
		ctx.textAlign = "left";

		// Start position for content
		let y = 150;
		const leftMargin = 100;
		const lineHeight = 40;

		// Helper function to add a line of text
		const addLine = (label: string, value: string | boolean) => {
			ctx.fillStyle = "#555555";
			ctx.fillText(`${label}:`, leftMargin, y);
			ctx.fillStyle = "#000000";
			ctx.fillText(String(value), leftMargin + 350, y);
			y += lineHeight;
		};

		// Draw form values
		addLine("Customer", formValues.fullname);
		addLine("Quote", formValues.quote);
		addLine("Company", getCompanyName(formValues.company));
		addLine("Installments", formValues.installments);
		addLine("Term Duration", `${formValues.term_duration_in_months} months`);
		addLine("Fee Amount", formValues.fee_amount);

		if (formValues.complete.is_active) {
			y += 20; // Add some spacing
			ctx.font = "bold 28px Arial";
			ctx.fillStyle = "#000000";
			ctx.fillText("Complete Coverage", leftMargin, y);
			y += lineHeight;
			ctx.font = "24px Arial";

			addLine("Full Amount", formValues.complete.full_amount || "");
			addLine("Down Payment", formValues.complete.down_payment || "");
			addLine("Monthly Payment", formValues.complete.installments || "");
		}

		if (formValues.third_party_coverage.is_active) {
			y += 20; // Add some spacing
			ctx.font = "bold 28px Arial";
			ctx.fillStyle = "#000000";
			ctx.fillText("Third Party Coverage", leftMargin, y);
			y += lineHeight;
			ctx.font = "24px Arial";

			addLine("Full Amount", formValues.third_party_coverage.full_amount || "");
			addLine(
				"Down Payment",
				formValues.third_party_coverage.down_payment || "",
			);
			addLine(
				"Monthly Payment",
				formValues.third_party_coverage.installments || "",
			);
		}

		// Additional options
		y += 20;
		ctx.font = "bold 28px Arial";
		ctx.fillStyle = "#000000";
		ctx.fillText("Additional Options", leftMargin, y);
		y += lineHeight;
		ctx.font = "24px Arial";

		addLine("Has Renters Insurance", formValues.has_renters ? "Yes" : "No");
		addLine("Car Financed", formValues.is_car_financed ? "Yes" : "No");
		addLine("Rental Car", formValues.is_rental_car ? "Yes" : "No");
		addLine(
			"Franchise Amount",
			getFranchiseAmount(formValues.franchise_amount),
		);
		addLine(
			"Medical Insurance",
			getMedicalInsuranceAmount(formValues.medical_insurance_amount),
		);
		addLine(
			"Property Damage",
			getPropertyDamageAmount(formValues.property_damage_insurance_amount),
		);

		// Add date at the bottom
		ctx.font = "italic 20px Arial";
		ctx.fillStyle = "#555555";
		ctx.textAlign = "right";
		ctx.fillText(
			`Generated on: ${new Date().toLocaleDateString()}`,
			canvas.width - 100,
			canvas.height - 50,
		);

		// Save canvas to the quoteRef
		if (quoteRef.current) {
			quoteRef.current.innerHTML = "";
			quoteRef.current.appendChild(canvas);
		} else {
			throw new Error("Quote container ref is not available");
		}
	}

	const handleDownloadImage = async () => {
		if (quoteRef.current?.firstChild) {
			try {
				// Get the canvas element directly
				const canvas = quoteRef.current.firstChild as HTMLCanvasElement;

				if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
					throw new Error("Invalid canvas element");
				}

				// Get the data URL directly from the canvas
				const dataUrl = canvas.toDataURL("image/png");

				if (!dataUrl || dataUrl.length < 100) {
					throw new Error("Generated image is empty");
				}

				const link = document.createElement("a");
				link.download = `car-insurance-quote-${new Date().getTime()}.png`;
				link.href = dataUrl;
				link.click();

				return true;
			} catch (error) {
				console.error("Error generating image:", error);
				toast.error("Failed to generate quote image. Please try again.");
				throw error;
			}
		} else {
			const error = new Error("No quote canvas found");
			toast.error(error.message);
			throw error;
		}
	};

	// Expose the public API to the parent component
	const handleGenerateQuoteImage = (data: QuoteFormData) => {
		try {
			console.log("Drawing canvas");
			drawFormValuesOnCanvas(data);
			console.log("Canvas drawn");

			// Small delay to ensure canvas is fully rendered before capture
			setTimeout(() => {
				handleDownloadImage()
					.then(() => {
						console.log("Image downloaded");
						// Let the parent component know the operation was successful
						generateImage(data);
					})
					.catch((error) => {
						console.error("Error in handleDownloadImage:", error);
					});
			}, 300);
		} catch (error) {
			console.error("Error creating quote image:", error);
			toast.error("Failed to create quote image");
		}
	};

	// Expose the function to the parent component
	Object.assign(QuoteImageGenerator, {
		generateQuoteImage: handleGenerateQuoteImage,
	});

	return (
		<div
			ref={quoteRef}
			className="hidden"
			style={{
				width: "1080px",
				height: "1080px",
				position: "fixed",
				left: "-9999px",
				top: "-9999px",
				overflow: "hidden",
				backgroundColor: "#ffffff",
			}}
		/>
	);
}
