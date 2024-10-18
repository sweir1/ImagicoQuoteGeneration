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

let currentQuestionIndex = 0;
const answers = {};

function displayQuestion(index) {
	const question = questions[index];
	let html = `<h2 class="text-2xl font-bold mb-4">${question.text}</h2>`;

	if (question.type === "radio") {
		html += question.options
			.map(
				(option) => `
                <label class="block mb-2">
                    <input type="radio" name="${question.id}" value="${option.value}" class="mr-2" ${question.required ? "required" : ""}>
                    ${option.label}
                </label>
            `,
			)
			.join("");
	} else if (question.type === "checkbox") {
		html += question.options
			.map(
				(option) => `
                <label class="block mb-2">
                    <input type="checkbox" name="${question.id}" value="${option.value}" class="mr-2">
                    ${option.label}
                </label>
            `,
			)
			.join("");
	} else if (question.type === "number") {
		html += `
            <input type="number" name="${question.id}" min="${question.min}" max="${question.max}"
            class="w-full p-2 border border-gray-300 rounded" ${question.required ? "required" : ""}>
        `;
	}

	document.getElementById("question-container").innerHTML = html;
}

function updateNavigation() {
	const prevBtn = document.getElementById("prev-btn");
	const nextBtn = document.getElementById("next-btn");
	prevBtn.style.display = currentQuestionIndex > 0 ? "block" : "none";
	nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
}

function saveAnswer() {
	const question = questions[currentQuestionIndex];
	if (question.type === "radio") {
		const selected = document.querySelector(`input[name="${question.id}"]:checked`);
		if (selected) answers[question.id] = selected.value;
	} else if (question.type === "checkbox") {
		const selected = Array.from(document.querySelectorAll(`input[name="${question.id}"]:checked`)).map(
			(el) => el.value,
		);
		if (selected.length > 0) answers[question.id] = selected;
	} else if (question.type === "number") {
		const input = document.querySelector(`input[name="${question.id}"]`);
		if (input && input.value) answers[question.id] = parseInt(input.value);
	}
}

function isCurrentQuestionAnswered() {
	const question = questions[currentQuestionIndex];
	if (!question.required) return true;
	if (question.type === "radio") {
		const selected = document.querySelector(`input[name="${question.id}"]:checked`);
		return selected !== null;
	} else if (question.type === "checkbox") {
		const selected = document.querySelectorAll(`input[name="${question.id}"]:checked`);
		return selected.length > 0;
	} else if (question.type === "number") {
		const input = document.querySelector(`input[name="${question.id}"]`);
		return input && input.value && input.value >= question.min && input.value <= question.max;
	}
	return false;
}

function getNextQuestionIndex() {
	for (let i = currentQuestionIndex + 1; i < questions.length; i++) {
		const question = questions[i];
		if (!question.condition || question.condition(answers)) {
			return i;
		}
	}
	return questions.length;
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
		if (answers.mediaType === "Videos" || (answers.mediaType === "Videos" && answers.addPictures === "Yes")) {
			const videoQuestion = questions.find((q) => q.id === "monthlyVideoCount");
			let baseVideoPrice = videoQuestion.pricePerUnit; // This is $50 per video
			const videoCount = answers.monthlyVideoCount || 0;

			// Add additional services to the base price
			if (answers.additionalServices) {
				const additionalServicesQuestion = questions.find((q) => q.id === "additionalServices");
				answers.additionalServices.forEach((service) => {
					const option = additionalServicesQuestion.options.find((opt) => opt.value === service);
					if (option) {
						baseVideoPrice += option.priceIncrease;
					}
				});
			}

			let videoPrice = videoCount * baseVideoPrice;

			// Apply multipliers for videos
			questions.forEach((question) => {
				if (question.options && question.options[0].multiplier) {
					const selectedOption = question.options.find((option) => option.value === answers[question.id]);
					if (selectedOption) {
						videoPrice *= selectedOption.multiplier;
					}
				}
			});

			totalPrice += videoPrice;
		}

		if (answers.mediaType === "Pictures" || (answers.mediaType === "Videos" && answers.addPictures === "Yes")) {
			const imageCount = answers.monthlyImageCount || 0;
			const imageQuestion = questions.find((q) => q.id === "monthlyImageCount");
			let pricePerImage = imageQuestion.pricePerUnit;

			// Calculate additional cost based on editing options for pictures
			const editingOptions = answers.editingType || [];
			const editingQuestion = questions.find((q) => q.id === "editingType");
			editingOptions.forEach((option) => {
				const selectedOption = editingQuestion.options.find((o) => o.value === option);
				if (selectedOption) {
					pricePerImage += selectedOption.priceIncrease;
				}
			});

			totalPrice += imageCount * pricePerImage;
		}
	}

	return totalPrice;
}

function initializeForm() {
	const startScreen = document.getElementById("start-screen");
	const startBtn = document.getElementById("start-btn");
	const questionContainer = document.getElementById("question-container");
	const navigation = document.getElementById("navigation");

	startBtn.addEventListener("click", () => {
		startScreen.classList.add("hidden");
		questionContainer.classList.remove("hidden");
		navigation.classList.remove("hidden");
		displayQuestion(currentQuestionIndex);
		updateNavigation();
	});

	displayQuestion(currentQuestionIndex);
	updateNavigation();

	const nextBtn = document.getElementById("next-btn");
	const prevBtn = document.getElementById("prev-btn");

	nextBtn.addEventListener("click", () => {
		if (!isCurrentQuestionAnswered()) {
			alert("Please answer the current question before proceeding.");
			return;
		}

		saveAnswer();
		currentQuestionIndex = getNextQuestionIndex();

		if (currentQuestionIndex < questions.length) {
			displayQuestion(currentQuestionIndex);
			updateNavigation();
		} else {
			const finalPrice = calculatePrice();
			document.getElementById("question-container").innerHTML = `
                <h2 class="text-2xl font-bold">Thank you for your answers!</h2>
                <p class="mt-4">Based on your selections, the estimated price is: $${finalPrice.toFixed(2)} per month</p>
            `;
			nextBtn.style.display = "none";
			prevBtn.style.display = "none";
		}
	});

	prevBtn.addEventListener("click", () => {
		if (currentQuestionIndex > 0) {
			do {
				currentQuestionIndex--;
			} while (
				currentQuestionIndex > 0 &&
				questions[currentQuestionIndex].condition &&
				!questions[currentQuestionIndex].condition(answers)
			);

			displayQuestion(currentQuestionIndex);
			updateNavigation();
		}
	});
}

// Initialize the form when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeForm);
