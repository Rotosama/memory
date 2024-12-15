document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form");
	const playerNameInput = document.getElementById("player-name");
	const difficultySelect = document.getElementById("difficulty");

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const playerName = playerNameInput.value;
		const difficulty = difficultySelect.value.toLowerCase(); // Convertir a minúsculas
		startGame(playerName, difficulty);
	});
});
let selectedCards = [];
let matchedPairs = 0;
let totalCards = 0;

function startGame(playerName, difficulty) {
	if (!playerName) {
		playerName = "Invitado";
	}
	const menu = document.getElementById("start-menu");
	menu.classList.add("hidden"); // Ocultar el menú de inicio

	const gameContainer = document.createElement("div");
	gameContainer.classList.add("game-container", "grid", "gap-4", "p-4");
	gameContainer.id = "game-container";
	document.body.appendChild(gameContainer);

	const gridSize = getGridSize(difficulty);
	createGameBoard(gameContainer, gridSize);
	createScoreBoard(playerName, difficulty);

	// Crear y mostrar el contador de cuenta regresiva
	const countdownContainer = document.createElement("div");
	countdownContainer.id = "countdown";
	countdownContainer.classList.add(
		"fixed",
		"inset-0",
		"flex",
		"justify-center",
		"items-center",
		"bg-gray-600",
		"bg-opacity-60",
		"text-white",
		"text-6xl",
		"font-bold"
	);
	document.body.appendChild(countdownContainer);

	let countdown = 5;
	const countdownInterval = setInterval(() => {
		if (countdown > 1) {
			countdownContainer.textContent = countdown;
			countdown--;
		} else {
			countdownContainer.textContent = "Let's Go!";
			clearInterval(countdownInterval);
			setTimeout(() => {
				countdownContainer.remove();
				flipCards();
				startTimer();
			}, 1000);
		}
	}, 1000);
}

function getGridSize(difficulty) {
	switch (difficulty) {
		case "easy":
			totalCards = 16;
			return { rows: 4, cols: 4 }; // 4x4 grid (16 cards)
		case "medium":
			totalCards = 20;
			return { rows: 5, cols: 4 }; // 5x4 grid (20 cards)
		case "hard":
			totalCards = 36;
			return { rows: 6, cols: 6 }; // 6x6 grid (36 cards)
		default:
			return { rows: 4, cols: 4 };
	}
}

function createGameBoard(container, gridSize) {
	const totalCards = gridSize.rows * gridSize.cols;
	const images = [
		"images/icons8-ballena-60.png",
		"images/icons8-caballo-60.png",
		"images/icons8-camaleón-60.png",
		"images/icons8-cangrejo-60.png",
		"images/icons8-caracol-60.png",
		"images/icons8-cerdo-60.png",
		"images/icons8-conejo-60.png",
		"images/icons8-delfín-60.png",
		"images/icons8-elefante-60.png",
		"images/icons8-estrella-de-mar-60.png",
		"images/icons8-gato-60.png",
		"images/icons8-gorila-60.png",
		"images/icons8-león-60.png",
		"images/icons8-lobo-60.png",
		"images/icons8-locust-60.png",
		"images/icons8-mariquita-60.png",
		"images/icons8-oruga-60.png",
		"images/icons8-oso-60.png",
		"images/icons8-panda-60.png",
		"images/icons8-pato-60.png",
		"images/icons8-perro-60.png",
		"images/icons8-pez-payaso-60.png",
		"images/icons8-pollo-60.png",
		"images/icons8-pulpo-60.png",
		"images/icons8-rana-60.png",
		"images/icons8-toro-60.png",
		"images/icons8-tortuga-60.png",
	];

	// Asegurarse de que hay suficientes imágenes para el total de cartas
	if (totalCards / 2 > images.length) {
		console.error("No hay suficientes imágenes para el número de cartas.");
		return;
	}

	const selectedImages = images.slice(0, totalCards / 2);
	const shuffledImages = shuffleArray([...selectedImages, ...selectedImages]); // Duplicar y mezclar imágenes

	container.innerHTML = "";
	let cardId = 0;
	for (let i = 0; i < gridSize.rows; i++) {
		const row = document.createElement("div");
		row.classList.add("row", "flex", "justify-center");
		for (let j = 0; j < gridSize.cols; j++) {
			const card = document.createElement("div");
			card.classList.add(
				"card",
				"w-20",
				"h-20",
				"bg-gray-200",
				"p-2",
				"m-2",
				"border",
				"border-gray-400",
				"flex",
				"justify-center",
				"items-center"
			);
			card.id = `card-${cardId++}`; // Asignar un id único a cada carta

			// Crear el contenedor interno para la animación de rotación
			const cardInner = document.createElement("div");
			cardInner.classList.add("card-inner");

			// Crear el frente de la carta
			const cardFront = document.createElement("div");
			cardFront.classList.add("card-front");

			// Añadir imagen al frente de la carta
			const img = document.createElement("img");
			img.src = shuffledImages.pop(); // Asignar una imagen aleatoria
			img.classList.add("w-full", "h-full", "object-cover");
			cardFront.appendChild(img);

			// Crear el dorso de la carta
			const cardBack = document.createElement("div");
			cardBack.classList.add("card-back");

			// Añadir el frente y el dorso al contenedor interno
			cardInner.appendChild(cardFront);
			cardInner.appendChild(cardBack);

			// Añadir el contenedor interno a la carta
			card.appendChild(cardInner);

			// Añadir evento de clic para seleccionar la carta
			card.addEventListener("click", () => selectCard(card.id));

			row.appendChild(card);
		}
		container.appendChild(row);
	}
}

function flipCards() {
	const cards = document.querySelectorAll(".card");
	cards.forEach((card) => {
		card.classList.add("flipped"); // Añadir la clase para voltear la carta
	});
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function createScoreBoard(playerName, difficulty) {
	const scoreBoard = document.createElement("div");
	scoreBoard.classList.add(
		"score-board",
		"p-6",
		"bg-white",
		"rounded-lg",
		"shadow-md",
		"w-full",
		"max-w-sm",
		"mx-auto",
		"mt-4",
		"text-center"
	);
	scoreBoard.innerHTML = `
		<p class="text-xl uppercase bg-gradient-to-r from-blue-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Player: <span class="text-gray-600">${playerName}</span></p>
		<p class="text-xl uppercase bg-gradient-to-r from-blue-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Difficulty: <span class="text-gray-600 capitalize">${difficulty}</span></p>
		<p class="text-xl uppercase bg-gradient-to-r from-blue-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Time: <span id="time" class="text-gray-600">0</span> seconds</p>
		<p class="text-xl uppercase bg-gradient-to-r from-blue-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Moves: <span id="moves" class="text-gray-600">0</span></p>
		<p class="text-xl uppercase bg-gradient-to-r from-blue-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Score: <span id="score" class="text-gray-600">0</span></p>
	`;
	const containerResetButton = document.createElement("div");
	containerResetButton.classList.add(
		"flex",
		"flex-row",
		"justify-center",
		"items-center",
		"text-center"
	);
	const resetButton = document.createElement("button");
	resetButton.classList.add(
		"btn",
		"m-4",
		"bg-blue-500",
		"hover:bg-blue-700",
		"text-white",
		"font-bold",
		"py-2",
		"px-4",
		"rounded"
	);
	const menuButton = document.createElement("button");
	menuButton.classList.add(
		"btn",
		"m-4",
		"bg-blue-500",
		"hover:bg-blue-700",
		"text-white",
		"font-bold",
		"py-2",
		"px-4",
		"rounded"
	);
	menuButton.innerText = "Go to Menu";
	menuButton.id = "menu-button";
	menuButton.addEventListener("click", goToMenu);
	containerResetButton.appendChild(menuButton);
	resetButton.innerText = "Reset Game";
	resetButton.id = "reset-button";
	resetButton.addEventListener("click", resetGame);
	containerResetButton.appendChild(resetButton);

	document.body.appendChild(scoreBoard);
	document.body.appendChild(containerResetButton);
}

function selectCard(id) {
	const card = document.getElementById(id);
	card.classList.remove("flipped");
	if (selectedCards.length < 2 && !card.classList.contains("flipped")) {
		card.classList.remove("flipped"); // Quitar la clase para mostrar la imagen original
		selectedCards.push(card);

		if (selectedCards.length === 2) {
			checkForMatch();
		}
	}
}

function checkForMatch() {
	const [firstCard, secondCard] = selectedCards;
	const firstImage = firstCard.querySelector("img").src;
	const secondImage = secondCard.querySelector("img").src;

	updateMoves();

	if (firstImage === secondImage) {
		matchedPairs++;
		updateScore();
		if (matchedPairs === totalCards / 2) {
			endGame();
		}
	} else {
		setTimeout(() => {
			firstCard.classList.add("flipped");
			secondCard.classList.add("flipped");
		}, 800);
	}

	selectedCards = [];
}
function updateScore() {
	const scoreElement = document.getElementById("score");
	let currentScore = parseInt(scoreElement.innerText);
	scoreElement.innerText = currentScore + 1;
}

function updateMoves() {
	const movesElement = document.getElementById("moves");
	let currentMoves = parseInt(movesElement.innerText);
	movesElement.innerText = currentMoves + 1;
}

function startTimer() {
	const timeElement = document.getElementById("time");
	let seconds = 0;
	timerInterval = setInterval(() => {
		seconds++;
		timeElement.innerText = seconds;
	}, 1000);
}

function stopTimer() {
	if (timerInterval) {
		clearInterval(timerInterval);
		timerInterval = null; // Asegurarse de que el temporizador se reinicie correctamente
	}
}

function endGame() {
	stopTimer();
	const time = document.getElementById("time").innerText;
	const moves = document.getElementById("moves").innerText;
	const playerName = document.getElementById("player-name").value;

	alert(
		`¡Felicidades ${playerName}! Has completado el juego en ${time} segundos con ${moves} movimientos!`
	);
}

function resetGame() {
	// Detener el temporizador
	stopTimer();

	// Reiniciar variables
	selectedCards = [];
	matchedPairs = 0;

	// Reiniciar el marcador y movimientos
	document.getElementById("score").innerText = "0";
	document.getElementById("moves").innerText = "0";

	// Reiniciar el tiempo
	document.getElementById("time").innerText = "0";

	// Eliminar el contenedor del juego actual
	const gameContainer = document.getElementById("game-container");
	if (gameContainer) {
		gameContainer.remove();
	}

	const scoreBoard = document.querySelector(".score-board");
	if (scoreBoard) {
		scoreBoard.remove();
	}
	const resetButton = document.getElementById("reset-button");
	if (resetButton) {
		resetButton.remove();
	}
	const menuButton = document.getElementById("menu-button");
	if (menuButton) {
		menuButton.remove();
	}
	const playerName = document.getElementById("player-name").value;
	const difficulty = document
		.getElementById("difficulty")
		.value.toLowerCase();

	startGame(playerName, difficulty);
}

function goToMenu() {
	// Detener el temporizador

	stopTimer();

	const gameContainer = document.getElementById("game-container");
	if (gameContainer) {
		gameContainer.remove();
	}

	const scoreBoard = document.querySelector(".score-board");
	if (scoreBoard) {
		scoreBoard.remove();
	}
	const resetButton = document.getElementById("reset-button");
	if (resetButton) {
		resetButton.remove();
	}

	const menuButton = document.getElementById("menu-button");
	if (menuButton) {
		menuButton.remove();
	}

	const menu = document.getElementById("start-menu");
	menu.classList.remove("hidden");
}
