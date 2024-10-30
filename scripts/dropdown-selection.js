window.dropdownHandler = {
	initializeCustomDropdowns: function () {
		// First, clean up any existing event listeners
		document.querySelectorAll(".custom-select-container").forEach((container) => {
			const trigger = container.querySelector(".custom-select-trigger");
			const options = container.querySelectorAll(".custom-option");
			const originalSelect = container.parentElement.querySelector("select");

			// Remove old event listeners (if any) by cloning and replacing elements
			const newTrigger = trigger.cloneNode(true);
			trigger.parentNode.replaceChild(newTrigger, trigger);
			options.forEach((option) => {
				const newOption = option.cloneNode(true);
				option.parentNode.replaceChild(newOption, option);
			});

			// Check if there's an initial value and add has-value class
			if (originalSelect && originalSelect.value) {
				newTrigger.classList.add("has-value");
			}
		});

		// Add new event listeners
		document.querySelectorAll(".custom-select-container").forEach((container) => {
			const trigger = container.querySelector(".custom-select-trigger");
			const options = container.querySelectorAll(".custom-option");
			const originalSelect = container.parentElement.querySelector("select");

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
				option.addEventListener("click", () => {
					const selectedValue = option.dataset.value;
					const selectedText = option.textContent;

					// Update trigger text
					trigger.textContent = selectedText;

					// Add or remove has-value class based on selection
					if (selectedValue && selectedValue !== "") {
						trigger.classList.add("has-value");
					} else {
						trigger.classList.remove("has-value");
					}

					// Update original select
					if (originalSelect) {
						originalSelect.value = selectedValue;
						// Trigger change event on original select
						const event = new Event("change");
						originalSelect.dispatchEvent(event);
					}

					// Update selected state
					options.forEach((opt) => opt.classList.remove("selected"));
					option.classList.add("selected");

					// Close dropdown
					container.classList.remove("open");

					// Call your handleSelectChange
					handleSelectChange(originalSelect);
				});
			});
		});

		// Close dropdowns when clicking outside
		document.addEventListener("click", (e) => {
			if (!e.target.closest(".custom-select-container")) {
				document.querySelectorAll(".custom-select-container").forEach((container) => {
					container.classList.remove("open");
				});
			}
		});
	},
};
