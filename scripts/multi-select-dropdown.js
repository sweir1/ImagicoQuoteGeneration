window.multiSelectDropdownHandler = {
	initializeMultiSelectDropdowns: function () {
		// Helper function to update trigger text and styling
		const updateTriggerText = (container, trigger, options) => {
			const selectedCount = container.selectedValues.length;
			const placeholder = trigger.dataset.placeholder;

			// Add or remove has-value class based on selection
			if (selectedCount === 0) {
				trigger.innerHTML = placeholder;
				trigger.classList.remove("has-value");
			} else {
				trigger.classList.add("has-value");
				// Convert NodeList to Array before using find
				const optionsArray = Array.from(options);

				const selectedLabels = container.selectedValues.map((value) => {
					const option = optionsArray.find((opt) => opt.dataset.value === value);
					if (option) {
						const label = option.querySelector(".option-label");
						return label ? label.textContent : option.textContent;
					}
					return value; // fallback if option not found
				});

				if (selectedCount === 1) {
					trigger.innerHTML = `
                        <span>${selectedLabels[0]}</span>
                        <span class="selected-count">1</span>
                    `;
				} else {
					trigger.innerHTML = `
                        <span>Multiple Selected</span>
                        <span class="selected-count">${selectedCount}</span>
                    `;
				}
			}
		};

		// First, clean up any existing event listeners
		document.querySelectorAll(".custom-multi-select-container").forEach((container) => {
			const trigger = container.querySelector(".custom-select-trigger");
			const options = container.querySelectorAll(".custom-option");
			const originalSelect = container.parentElement.querySelector("select");

			// Remove old event listeners by cloning and replacing elements
			const newTrigger = trigger.cloneNode(true);
			trigger.parentNode.replaceChild(newTrigger, trigger);
			options.forEach((option) => {
				const newOption = option.cloneNode(true);
				option.parentNode.replaceChild(newOption, option);
			});

			// Check if there are initial selections and add has-value class
			if (originalSelect && Array.from(originalSelect.selectedOptions).length > 0) {
				newTrigger.classList.add("has-value");
			}
		});

		// Add new event listeners
		document.querySelectorAll(".custom-multi-select-container").forEach((container) => {
			const trigger = container.querySelector(".custom-select-trigger");
			const options = container.querySelectorAll(".custom-option");
			const originalSelect = container.parentElement.querySelector("select");

			container.selectedValues = [];

			// Initialize selected values and trigger styling
			options.forEach((option) => {
				if (option.classList.contains("selected")) {
					container.selectedValues.push(option.dataset.value);
				}
			});

			// Update initial trigger text
			updateTriggerText(container, trigger, options);

			// Add click event for trigger
			trigger.addEventListener("click", (e) => {
				e.stopPropagation();
				// Close all other dropdowns (both regular and multi-select)
				document
					.querySelectorAll(".custom-select-container, .custom-multi-select-container")
					.forEach((cont) => {
						if (cont !== container) {
							cont.classList.remove("open");
						}
					});
				container.classList.toggle("open");
			});

			// Add click events for options
			options.forEach((option) => {
				option.addEventListener("click", (e) => {
					e.stopPropagation(); // Prevent dropdown from closing
					const selectedValue = option.dataset.value;

					// Toggle selection
					if (option.classList.contains("selected")) {
						// Remove selection
						option.classList.remove("selected");
						container.selectedValues = container.selectedValues.filter((v) => v !== selectedValue);
					} else {
						// Add selection
						option.classList.add("selected");
						container.selectedValues.push(selectedValue);
					}

					// Update trigger text using the helper function
					updateTriggerText(container, trigger, options);

					// Update original select (if it exists)
					if (originalSelect) {
						// Update the select element
						Array.from(originalSelect.options).forEach((opt) => {
							opt.selected = container.selectedValues.includes(opt.value);
						});

						// Ensure answers object is updated with an array
						const selectName = originalSelect.getAttribute("name");
						if (window.answers && selectName) {
							window.answers[selectName] =
								container.selectedValues.length > 0 ? [...container.selectedValues] : [];
						}

						// Trigger change event on original select
						const event = new Event("change");
						originalSelect.dispatchEvent(event);
					}

					// Call handleSelectChange if it exists
					if (typeof handleSelectChange === "function") {
						handleSelectChange(originalSelect);
					}
				});
			});
		});

		// Close dropdowns when clicking outside
		document.addEventListener("click", (e) => {
			if (!e.target.closest(".custom-multi-select-container")) {
				document.querySelectorAll(".custom-multi-select-container").forEach((container) => {
					container.classList.remove("open");
				});
			}
		});
	},
};
