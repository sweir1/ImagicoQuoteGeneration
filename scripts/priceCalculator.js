(() => {
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
				{ label: "Extended (3 revisions)", value: "Extended (3 revisions)", multiplier: 1.1 },
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

	let answers = {};

	// Make functions globally accessible
	window.openModal = () => {
		document.getElementById("priceCalculatorModal").style.display = "block";
		document.body.style.overflow = "hidden";
		answers = {};
		displayAllQuestions();
		window.dropdownHandler.initializeCustomDropdowns();
		window.multiSelectDropdownHandler.initializeMultiSelectDropdowns();
		updateVisibleSections();
	};

	window.closeModal = () => {
		document.getElementById("priceCalculatorModal").style.display = "none";
		document.body.style.overflow = "auto";
	};

	window.handleCardClick = (card, questionId, value) => {
		const input = card.querySelector("input");
		input.checked = true;
		if (input.type === "radio") {
			document
				.querySelectorAll(`[name="${questionId}"]`)
				.forEach((inp) => inp.closest(".option-card").classList.remove("selected"));
		}
		card.classList.add("selected");
		handleInputChange(input);
	};

	window.handleCheckboxCardClick = (card, questionId, value) => {
		const input = card.querySelector("input");
		input.checked = !input.checked;
		card.classList.toggle("selected", input.checked);
		handleInputChange(input);
	};

	window.handleSelectChange = (select) => {
		// Check if it's a multiple select
		if (select.multiple) {
			// Get all selected options and map to array of values
			answers[select.name] = Array.from(select.selectedOptions).map((option) => option.value);
		} else {
			// Regular single-select handling
			answers[select.name] = select.value;
		}
		updateVisibleSections();
		updatePrice();
	};

	window.handleInputChange = function (input) {
		if (input.type === "radio") {
			answers[input.name] = input.value;
		} else if (input.type === "checkbox") {
			answers[input.name] = Array.from(document.querySelectorAll(`input[name="${input.name}"]:checked`)).map(
				(el) => el.value,
			);
		} else if (input.type === "number") {
			answers[input.name] = parseInt(input.value) || 0;
		}
		updateVisibleSections();
		updatePrice();
	};

	// Keep other functions private
	function displayAllQuestions() {
		const container = document.getElementById("question-container");
		const initialQuestions = questions.filter((q) => ["solutionType", "mediaType"].includes(q.id));
		const otherQuestions = questions.filter((q) => !["solutionType", "mediaType"].includes(q.id));

		let html = `
			        <div class="form-row" style="display: flex">
			            ${initialQuestions
							.map(
								(question) => `
			                <div class="form-column">
			                    <div id="section-${question.id}" class="question-section">
			                        ${generateQuestionHTML(question)}
			                    </div>
			                </div>
			            `,
							)
							.join("")}
			        </div>
			    `;

		for (let i = 0; i < otherQuestions.length; i += 2) {
			html += `
			            <div class="form-row">
			                <div class="form-column">
			                    <div id="section-${otherQuestions[i].id}" class="question-section ${otherQuestions[i].condition ? "hidden" : ""}">
			                        ${generateQuestionHTML(otherQuestions[i])}
			                    </div>
			                </div>
			                ${
								otherQuestions[i + 1]
									? `
			                    <div class="form-column">
			                        <div id="section-${otherQuestions[i + 1].id}" class="question-section ${otherQuestions[i + 1].condition ? "hidden" : ""}">
			                            ${generateQuestionHTML(otherQuestions[i + 1])}
			                        </div>
			                    </div>
			                `
									: ""
							}
			            </div>
			        `;
		}

		container.innerHTML = html;
		document.querySelectorAll("input, select").forEach((input) => {
			input.addEventListener("change", () => handleInputChange(input));
		});
	}

	function generateQuestionHTML(question) {
		if (
			question.type === "radio" &&
			[
				"solutionType",
				"mediaType",
				"addPictures",
				"averageVideoLength",
				"turnaroundTime",
				"revisions",
				"supportLevel",
				"editingComplexity",
				"concurrentProjects",
				"commitmentLevel",
			].includes(question.id)
		) {
			return `
				    <div class="select-container">
				        <select name="${question.id}" class="hidden-select" style="display: none;">
				            <option value="">${question.text}</option>
				            ${question.options
								.map(
									(option) => `
				                    <option value="${option.value}" ${answers[question.id] === option.value ? "selected" : ""}>
				                        ${option.label}
				                    </option>
				                `,
								)
								.join("")}
				        </select>
				        <div class="custom-select-container">
				            <div class="custom-select-trigger" tabindex="0">${question.text}</div>
				            <div class="custom-options">
				                ${question.options
									.map(
										(option) => `
				                        <div class="custom-option" data-value="${option.value}">${option.label}</div>
				                    `,
									)
									.join("")}
				            </div>
				        </div>
				    </div>
				    `;
		}

		if (question.type === "radio" && question.options.some((opt) => opt.price || opt.multiplier)) {
			return `
                    <div class="options-grid">
                        ${question.options
							.map(
								(option) => `
                            <div class="option-card ${answers[question.id] === option.value ? "selected" : ""}"
                                 onclick="handleCardClick(this, '${question.id}', '${option.value}')">
                                <input type="radio"
                                       name="${question.id}"
                                       value="${option.value}"
                                       ${answers[question.id] === option.value ? "checked" : ""}>
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
                            </div>
                        `,
							)
							.join("")}
                    </div>
                `;
		}

		if (question.type === "checkbox") {
			return `
		        <div class="select-container">
		            <select name="${question.id}" class="hidden-select" multiple style="display: none;">
		                <option value="">${question.text}</option>
		                ${question.options
							.map(
								(option) => `
		                        <option value="${option.value}" ${answers[question.id]?.includes(option.value) ? "selected" : ""}>
		                            ${option.label}
		                        </option>
		                    `,
							)
							.join("")}
		            </select>
		            <div class="custom-multi-select-container">
		                <div class="custom-select-trigger" tabindex="0" data-placeholder="${question.text}">
		                    ${question.text}
		                </div>
		                <div class="custom-options">
		                    ${question.options
								.map(
									(option) => `
		                            <div class="custom-option ${answers[question.id]?.includes(option.value) ? "selected" : ""}"
		                                 data-value="${option.value}">
		                                <div class="option-content">
		                                    <div class="checkbox"></div>
		                                    <span class="option-label">${option.label}</span>
		                                </div>
		                                ${option.priceIncrease ? `<span class="price-increase">+$${option.priceIncrease}</span>` : ""}
		                            </div>
		                        `,
								)
								.join("")}
		                </div>
		            </div>
		        </div>
		    `;
		}

		if (question.type === "number") {
			return `
                    <input type="number"
                           name="${question.id}"
                           class="number-input"
                           min="${question.min}"
                           max="${question.max}"
                           value="${answers[question.id] || ""}"
                           onchange="handleInputChange(this)"
                           placeholder="Enter a number between ${question.min} and ${question.max}">
                `;
		}

		return "";
	}

	function updateVisibleSections() {
		questions.forEach((question) => {
			const section = document.getElementById(`section-${question.id}`);
			if (!section) return;
			if (question.condition) {
				const shouldShow = question.condition(answers);
				section.classList.toggle("hidden", !shouldShow);
				const grandparentDiv = section.parentElement?.parentElement;
				if (grandparentDiv) {
					// Special handling for video and picture sections
					if (question.id === "videoCount" || question.id === "pictureCount") {
						grandparentDiv.style.display = "flex";
					} else {
						grandparentDiv.style.display = shouldShow ? "flex" : "none";
					}
				}
			}
		});
		window.dropdownHandler.initializeCustomDropdowns();
		window.multiSelectDropdownHandler.initializeMultiSelectDropdowns();
	}

	function updatePrice() {
		const price = calculatePrice();
		document.getElementById("price-display").innerHTML = `
                Total Price: $${price.toFixed(2)}
                ${answers.solutionType === "Monthly subscription" ? " per month" : ""}
            `;
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

	// Initialize event listeners
	document.addEventListener("DOMContentLoaded", () => {
		window.onclick = (event) => {
			const modal = document.getElementById("priceCalculatorModal");
			if (event.target === modal) {
				window.closeModal();
			}
		};
	});
})();
