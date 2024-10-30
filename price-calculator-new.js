let answers = {};

// Modal control functions
function openModal() {
	document.getElementById("priceCalculatorModal").style.display = "block";
	document.body.style.overflow = "hidden";
	answers = {};
	displayAllQuestions();
	updateVisibleSections();
}

function closeModal() {
	document.getElementById("priceCalculatorModal").style.display = "none";
	document.body.style.overflow = "auto";
}

function displayAllQuestions() {
	const container = document.getElementById("question-container");

	// Group questions that should be side by side
	const initialQuestions = questions.filter((q) => ["solutionType", "mediaType"].includes(q.id));

	const otherQuestions = questions.filter((q) => !["solutionType", "mediaType"].includes(q.id));

	// Create the layout
	container.innerHTML = `
        <div class="form-row">
            ${initialQuestions
				.map(
					(question, index) => `
                <div class="form-column">
                    <div id="section-${question.id}" class="question-section ${question.condition ? "hidden" : ""}">
                        <div class="section-title">${question.text}</div>
                        ${generateQuestionHTML(question)}
                    </div>
                </div>
            `,
				)
				.join("")}
        </div>
        ${otherQuestions
			.map(
				(question, index) => `
            <div id="section-${question.id}" class="question-section ${question.condition ? "hidden" : ""}">
                <div class="section-title">${question.text}</div>
                ${generateQuestionHTML(question)}
            </div>
        `,
			)
			.join("")}
    `;

	// Add event listeners
	document.querySelectorAll("input, select").forEach((input) => {
		input.addEventListener("change", () => {
			handleInputChange(input);
		});
	});
}

function generateQuestionHTML(question) {
	// Define which questions should be dropdowns
	const dropdownQuestions = [
		"solutionType",
		"mediaType",
		"addPictures",
		"turnaroundTime",
		"revisions",
		"supportLevel",
		"editingComplexity",
		"concurrentProjects",
		"commitmentLevel",
	];

	// Define which questions should be cards
	const cardQuestions = ["videoCount", "pictureCount", "additionalServices", "editingType"];

	if (dropdownQuestions.includes(question.id)) {
		return `
            <div class="select-container">
                <select name="${question.id}">
                    <option value="">Please select...</option>
                    ${question.options
						.map(
							(option) => `
                        <option value="${option.value}"
                                ${answers[question.id] === option.value ? "selected" : ""}>
                            ${option.label}
                            ${option.price ? ` ($${option.price})` : ""}
                            ${
								option.multiplier
									? ` (${option.multiplier > 1 ? "+" : "-"}${Math.abs((option.multiplier - 1) * 100).toFixed(0)}%)`
									: ""
							}
                        </option>
                    `,
						)
						.join("")}
                </select>
            </div>
        `;
	} else if (cardQuestions.includes(question.id)) {
		return `
            <div class="options-grid">
                ${question.options
					.map(
						(option) => `
                    <div class="option-card ${answers[question.id] === option.value ? "selected" : ""}"
                         onclick="handleCardClick(this, '${question.id}', '${option.value}')">
                        <input type="${question.type}"
                               name="${question.id}"
                               value="${option.value}"
                               ${question.type === "radio" && answers[question.id] === option.value ? "checked" : ""}
                               ${question.type === "checkbox" && answers[question.id]?.includes(option.value) ? "checked" : ""}>
                        <div class="option-title">${option.label}</div>
                        ${
							option.price
								? `
                            <div class="option-description">$${option.price}</div>
                        `
								: ""
						}
                        ${
							option.multiplier
								? `
                            <div class="option-description">
                                ${option.multiplier > 1 ? "+" : "-"}${Math.abs((option.multiplier - 1) * 100).toFixed(0)}%
                            </div>
                        `
								: ""
						}
                        ${
							option.priceIncrease
								? `
                            <div class="option-description">+$${option.priceIncrease}</div>
                        `
								: ""
						}
                    </div>
                `,
					)
					.join("")}
            </div>
        `;
	} else if (question.type === "number") {
		return `
            <input type="number"
                   name="${question.id}"
                   class="number-input"
                   min="${question.min}"
                   max="${question.max}"
                   value="${answers[question.id] || ""}"
                   placeholder="Enter a number between ${question.min} and ${question.max}">
        `;
	}
	return "";
}

// Add this helper function for card clicks
function handleCardClick(card, questionId, value) {
	const input = card.querySelector("input");
	if (input.type === "radio") {
		// Unselect all other cards in the group
		document
			.querySelectorAll(`[name="${questionId}"]`)
			.forEach((inp) => inp.closest(".option-card").classList.remove("selected"));
		input.checked = true;
	} else {
		// Toggle checkbox
		input.checked = !input.checked;
	}

	// Update visual selection
	card.classList.toggle("selected", input.checked);

	// Trigger input change
	handleInputChange(input);
}

function handleInputChange(input) {
	const questionId = input.name;

	if (input.type === "radio") {
		answers[questionId] = input.value;
	} else if (input.type === "checkbox") {
		answers[questionId] = Array.from(document.querySelectorAll(`input[name="${questionId}"]:checked`)).map(
			(el) => el.value,
		);
	} else if (input.type === "number") {
		answers[questionId] = parseInt(input.value) || 0;
	}

	updateVisibleSections();
	updatePrice();
	updateRadioStyling();
}

function updateVisibleSections() {
	questions.forEach((question) => {
		const section = document.getElementById(`section-${question.id}`);
		if (!section) return;

		if (question.condition) {
			section.classList.toggle("hidden", !question.condition(answers));
		}
	});
}

function updatePrice() {
	const price = calculatePrice();
	document.getElementById("price-display").innerHTML = `
        Total Price: $${price.toFixed(2)}
        ${answers.solutionType === "Monthly subscription" ? "per month" : ""}
    `;
}

function updateRadioStyling() {
	document.querySelectorAll(".option-label").forEach((label) => {
		const input = label.querySelector('input[type="radio"]');
		if (input) {
			label.classList.toggle("selected", input.checked);
		}
	});
}

function calculatePrice() {
	let totalPrice = 0;

	if (answers.solutionType === "One-time") {
		if (answers.mediaType === "Pictures") {
			const selectedOption = questions
				.find((q) => q.id === "pictureCount")
				.options.find((opt) => opt.value === answers.pictureCount);
			totalPrice = selectedOption ? selectedOption.price : 0;
		} else if (answers.mediaType === "Videos") {
			const selectedOption = questions
				.find((q) => q.id === "videoCount")
				.options.find((opt) => opt.value === answers.videoCount);
			totalPrice = selectedOption ? selectedOption.price : 0;
		}
	} else if (answers.solutionType === "Monthly subscription") {
		// Handle videos
		if (answers.mediaType === "Videos") {
			const videoCount = answers.monthlyVideoCount || 0;
			let baseVideoPrice = 50; // Base price per video

			if (answers.additionalServices) {
				answers.additionalServices.forEach((service) => {
					const option = questions
						.find((q) => q.id === "additionalServices")
						.options.find((opt) => opt.value === service);
					if (option) baseVideoPrice += option.priceIncrease;
				});
			}

			let videoPrice = videoCount * baseVideoPrice;

			// Apply multipliers
			[
				"averageVideoLength",
				"turnaroundTime",
				"revisions",
				"supportLevel",
				"editingComplexity",
				"concurrentProjects",
				"commitmentLevel",
			].forEach((id) => {
				if (answers[id]) {
					const question = questions.find((q) => q.id === id);
					const option = question?.options.find((opt) => opt.value === answers[id]);
					if (option?.multiplier) {
						videoPrice *= option.multiplier;
					}
				}
			});

			totalPrice += videoPrice;
		}

		// Handle pictures
		if (answers.mediaType === "Pictures" || (answers.mediaType === "Videos" && answers.addPictures === "Yes")) {
			const imageCount = answers.monthlyImageCount || 0;
			let pricePerImage = 1; // Base price per image

			if (answers.editingType) {
				answers.editingType.forEach((type) => {
					const option = questions
						.find((q) => q.id === "editingType")
						.options.find((opt) => opt.value === type);
					if (option) pricePerImage += option.priceIncrease;
				});
			}

			totalPrice += imageCount * pricePerImage;
		}
	}

	return totalPrice;
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
	// Click outside modal to close
	window.onclick = function (event) {
		const modal = document.getElementById("priceCalculatorModal");
		if (event.target === modal) {
			closeModal();
		}
	};
});

const questions = [
	{
		id: "solutionType",
		text: "Do you need a one-time solution or a monthly subscription?",
		type: "radio",
		options: [
			{ label: "One-time", value: "One-time", price: 0 },
			{ label: "Monthly subscription", value: "Monthly subscription", price: 0 },
		],
		required: true,
	},
	{
		id: "mediaType",
		text: "Do you need pictures or videos?",
		type: "radio",
		options: [
			{ label: "Pictures", value: "Pictures", price: 0 },
			{ label: "Videos", value: "Videos", price: 0 },
		],
		required: true,
	},
	{
		id: "videoCount",
		text: "How many videos do you need?",
		type: "radio",
		options: [
			{ label: "1 video", value: "1 video", price: 99.95 },
			{ label: "3 videos", value: "3 videos", price: 118.95 },
			{ label: "5 videos", value: "5 videos", price: 399.95 },
		],
		condition: (answers) => answers.solutionType === "One-time" && answers.mediaType === "Videos",
		required: true,
	},
	{
		id: "pictureCount",
		text: "How many pictures do you need?",
		type: "radio",
		options: [
			{ label: "25 pictures", value: "25 pictures", price: 64.95 },
			{ label: "50 pictures", value: "50 pictures", price: 124.95 },
			{ label: "100 pictures", value: "100 pictures", price: 224.95 },
		],
		condition: (answers) => answers.solutionType === "One-time" && answers.mediaType === "Pictures",
		required: true,
	},
	{
		id: "monthlyVideoCount",
		text: "How many videos do you need per month?",
		type: "number",
		min: 1,
		max: 100,
		pricePerUnit: 50, // $50 per video
		condition: (answers) => answers.solutionType === "Monthly subscription" && answers.mediaType === "Videos",
		required: true,
	},
	{
		id: "averageVideoLength",
		text: "What is the average video length?",
		type: "radio",
		options: [
			{ label: "Up to 1 min", value: "Up to 1 min", multiplier: 0.8 },
			{ label: "Up to 3 mins", value: "Up to 3 mins", multiplier: 1.0 },
			{ label: "Up to 5 mins", value: "Up to 5 mins", multiplier: 1.2 },
			{ label: "Up to 10 mins", value: "Up to 10 mins", multiplier: 1.5 },
		],
		condition: (answers) => answers.solutionType === "Monthly subscription" && answers.mediaType === "Videos",
		required: true,
	},
	{
		id: "turnaroundTime",
		text: "What turnaround time do you need?",
		type: "radio",
		options: [
			{ label: "Standard", value: "Standard", multiplier: 1.0 },
			{ label: "Fast", value: "Fast", multiplier: 1.2 },
			{ label: "Express", value: "Express", multiplier: 1.5 },
		],
		condition: (answers) => answers.solutionType === "Monthly subscription" && answers.mediaType === "Videos",
		required: true,
	},
	{
		id: "revisions",
		text: "How many revisions do you need?",
		type: "radio",
		options: [
			{ label: "Standard (2 revisions)", value: "Standard (2 revisions)", multiplier: 1.0 },
			{ label: "Extended (3 revisions)", value: "Extended (3 revisions)", multiplier: 1.0 },
			{ label: "Unlimited", value: "Unlimited", multiplier: 1.3 },
		],
		condition: (answers) => answers.solutionType === "Monthly subscription" && answers.mediaType === "Videos",
		required: true,
	},
	{
		id: "supportLevel",
		text: "What level of support do you need?",
		type: "radio",
		options: [
			{ label: "Standard Support via Slack", value: "Standard Support via Slack", multiplier: 1.0 },
			{ label: "Dedicated Account Manager", value: "Dedicated Account Manager", multiplier: 1.5 },
		],
		condition: (answers) => answers.solutionType === "Monthly subscription" && answers.mediaType === "Videos",
		required: true,
	},
	{
		id: "editingComplexity",
		text: "What level of editing complexity do you require?",
		type: "radio",
		options: [
			{ label: "Basic Editing", value: "Basic Editing", multiplier: 1.0 },
			{ label: "Advanced Editing", value: "Advanced Editing", multiplier: 1.3 },
			{ label: "Premium Editing", value: "Premium Editing", multiplier: 1.6 },
		],
		condition: (answers) => answers.solutionType === "Monthly subscription" && answers.mediaType === "Videos",
		required: true,
	},
	{
		id: "additionalServices",
		text: "Do you need any additional services per video?",
		type: "checkbox",
		options: [
			{ label: "Subtitles/Captions", value: "Subtitles/Captions", priceIncrease: 5 },
			{ label: "Custom Thumbnails", value: "Custom Thumbnails", priceIncrease: 2 },
			{ label: "Multiple Formats", value: "Multiple Formats", priceIncrease: 5 },
			{ label: "Sound Design", value: "Sound Design", priceIncrease: 15 },
		],
		condition: (answers) => answers.solutionType === "Monthly subscription" && answers.mediaType === "Videos",
		required: false,
	},
	{
		id: "concurrentProjects",
		text: "How many concurrent projects do you need?",
		type: "radio",
		options: [
			{ label: "Single Project", value: "Single Project", multiplier: 1.0 },
			{ label: "Dual Projects", value: "Dual Projects", multiplier: 1.1 },
			{ label: "Multiple Projects", value: "Multiple Projects", multiplier: 1.4 },
		],
		condition: (answers) => answers.solutionType === "Monthly subscription" && answers.mediaType === "Videos",
		required: true,
	},
	{
		id: "commitmentLevel",
		text: "What is your preferred commitment level?",
		type: "radio",
		options: [
			{ label: "Month-to-Month", value: "Month-to-Month", multiplier: 1.0 },
			{ label: "3 Months", value: "3 Months", multiplier: 0.95 },
			{ label: "6 Months", value: "6 Months", multiplier: 0.9 },
			{ label: "12 Months", value: "12 Months", multiplier: 0.85 },
		],
		condition: (answers) => answers.solutionType === "Monthly subscription" && answers.mediaType === "Videos",
		required: true,
	},
	{
		id: "addPictures",
		text: "Would you like to add pictures to your monthly subscription?",
		type: "radio",
		options: [
			{ label: "Yes", value: "Yes" },
			{ label: "No", value: "No" },
		],
		condition: (answers) => answers.solutionType === "Monthly subscription" && answers.mediaType === "Videos",
		required: true,
	},
	{
		id: "monthlyImageCount",
		text: "How many images do you need edited per month?",
		type: "number",
		min: 1,
		max: 1000,
		pricePerUnit: 1, // $1 per image
		condition: (answers) =>
			(answers.solutionType === "Monthly subscription" && answers.mediaType === "Pictures") ||
			(answers.solutionType === "Monthly subscription" &&
				answers.mediaType === "Videos" &&
				answers.addPictures === "Yes"),
		required: true,
	},
	{
		id: "editingType",
		text: "What type of editing do you need for pictures?",
		type: "checkbox",
		options: [
			{ label: "Basic editing", value: "Basic editing", priceIncrease: 0 },
			{ label: "Advanced editing", value: "Advanced editing", priceIncrease: 0.5 },
			{
				label: "Promotional material services",
				value: "Promotional material services",
				priceIncrease: 1,
			},
		],
		condition: (answers) =>
			(answers.solutionType === "Monthly subscription" && answers.mediaType === "Pictures") ||
			(answers.solutionType === "Monthly subscription" &&
				answers.mediaType === "Videos" &&
				answers.addPictures === "Yes"),
		required: true,
	},
];
