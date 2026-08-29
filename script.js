// ========================================
// ECO TRACK - DAILY ECO HABIT TRACKER
// ========================================


// ===============================
// HABITS DATA
// ===============================

const habits = [
    {
        id: 1,
        icon: "💧",
        title: "Save Water",
        description: "Use water carefully and avoid wasting it."
    },

    {
        id: 2,
        icon: "♻️",
        title: "Recycle Waste",
        description: "Separate recyclable materials from regular waste."
    },

    {
        id: 3,
        icon: "🔌",
        title: "Save Electricity",
        description: "Turn off unused lights and electronic devices."
    },

    {
        id: 4,
        icon: "🚶",
        title: "Walk or Cycle",
        description: "Choose walking or cycling for short distances."
    },

    {
        id: 5,
        icon: "🛍️",
        title: "Avoid Plastic Bags",
        description: "Use reusable bags when shopping."
    },

    {
        id: 6,
        icon: "🌳",
        title: "Plant & Protect",
        description: "Take care of plants and support a greener environment."
    }
];


// ===============================
// CHALLENGES DATA
// ===============================

const challenges = [
    {
        id: 1,
        icon: "🚿",
        title: "5 Minute Shower",
        description: "Try to complete your shower in 5 minutes."
    },

    {
        id: 2,
        icon: "🚗",
        title: "Car-Free Day",
        description: "Avoid using a car for one full day."
    },

    {
        id: 3,
        icon: "🥤",
        title: "No Plastic Day",
        description: "Avoid using single-use plastic today."
    }
];


// ===============================
// ECO TIPS
// ===============================

const ecoTips = [

    "Turn off lights when leaving a room to save electricity. 💡",

    "Carry a reusable water bottle instead of buying plastic bottles. 💧",

    "Use reusable shopping bags whenever you go shopping. 🛍️",

    "Walk or cycle for short distances to reduce pollution. 🚶",

    "Unplug chargers when they are not being used. 🔌",

    "Recycle paper, plastic and glass whenever possible. ♻️",

    "Take shorter showers to save water every day. 🚿"

];


// ===============================
// LOCAL STORAGE
// ===============================

let completedHabits =
    JSON.parse(localStorage.getItem("completedHabits")) || [];


let completedChallenges =
    JSON.parse(localStorage.getItem("completedChallenges")) || [];


let streak =
    Number(localStorage.getItem("ecoStreak")) || 0;


// ===============================
// DOM ELEMENTS
// ===============================

const habitsGrid =
    document.getElementById("habitsGrid");

const challengesGrid =
    document.getElementById("challengesGrid");


// ===============================
// DISPLAY HABITS
// ===============================

function displayHabits() {

    habitsGrid.innerHTML = "";


    habits.forEach(function (habit) {

        const isCompleted =
            completedHabits.includes(habit.id);


        const card =
            document.createElement("div");


        card.className =
            `habit-card ${isCompleted ? "completed" : ""}`;


        card.innerHTML = `

            <div class="habit-top">

                <div class="habit-icon">
                    ${habit.icon}
                </div>

                <button
                    class="habit-check ${isCompleted ? "completed" : ""}"
                    onclick="toggleHabit(${habit.id})"
                >
                    <i class="fa-solid fa-check"></i>
                </button>

            </div>

            <h3>${habit.title}</h3>

            <p>${habit.description}</p>

        `;


        habitsGrid.appendChild(card);

    });

}


// ===============================
// TOGGLE HABIT
// ===============================

function toggleHabit(id) {

    if (completedHabits.includes(id)) {

        completedHabits =
            completedHabits.filter(
                habitId => habitId !== id
            );

    } else {

        completedHabits.push(id);

    }


    localStorage.setItem(
        "completedHabits",
        JSON.stringify(completedHabits)
    );


    updateStreak();

    displayHabits();

    updateProgress();

}


// ===============================
// STREAK SYSTEM
// ===============================

function updateStreak() {

    const today =
        new Date().toDateString();


    const lastActiveDate =
        localStorage.getItem("lastActiveDate");


    if (completedHabits.length > 0) {

        if (lastActiveDate !== today) {

            streak++;

            localStorage.setItem(
                "ecoStreak",
                streak
            );


            localStorage.setItem(
                "lastActiveDate",
                today
            );

        }

    }

}


// ===============================
// DISPLAY CHALLENGES
// ===============================

function displayChallenges() {

    challengesGrid.innerHTML = "";


    challenges.forEach(function (challenge) {

        const isCompleted =
            completedChallenges.includes(challenge.id);


        const card =
            document.createElement("div");


        card.className =
            "challenge-card";


        card.innerHTML = `

            <div class="challenge-icon">
                ${challenge.icon}
            </div>

            <h3>${challenge.title}</h3>

            <p>${challenge.description}</p>

            <button
                class="challenge-btn ${isCompleted ? "completed" : ""}"
                onclick="toggleChallenge(${challenge.id})"
            >
                ${isCompleted ? "Completed ✓" : "Accept Challenge"}
            </button>

        `;


        challengesGrid.appendChild(card);

    });

}


// ===============================
// TOGGLE CHALLENGE
// ===============================

function toggleChallenge(id) {

    if (completedChallenges.includes(id)) {

        completedChallenges =
            completedChallenges.filter(
                challengeId => challengeId !== id
            );

    } else {

        completedChallenges.push(id);

    }


    localStorage.setItem(
        "completedChallenges",
        JSON.stringify(completedChallenges)
    );


    displayChallenges();

    updateProgress();

}


// ===============================
// UPDATE PROGRESS
// ===============================

function updateProgress() {

    const completed =
        completedHabits.length;


    const total =
        habits.length;


    const percentage =
        Math.round(
            (completed / total) * 100
        );


    // Progress Bar

    document.getElementById("progressBar").style.width =
        percentage + "%";


    document.getElementById("miniProgressBar").style.width =
        percentage + "%";


    // Percentage Text

    document.getElementById("progressText").textContent =
        percentage + "%";


    document.getElementById("circlePercentage").textContent =
        percentage + "%";


    document.getElementById("heroPercentage").textContent =
        percentage + "%";


    document.getElementById("percentageCount").textContent =
        percentage + "%";


    // Completed Count

    document.getElementById("completedCount").textContent =
        completed;


    document.getElementById("heroCompleted").textContent =
        completed;


    // Circle

    const degrees =
        percentage * 3.6;


    document.getElementById("progressCircle").style.background =
        `conic-gradient(
            var(--primary) ${degrees}deg,
            var(--card) ${degrees}deg
        )`;


    // Challenges

    document.getElementById("challengeCount").textContent =
        completedChallenges.length;


    // Streak

    document.getElementById("streakCount").textContent =
        streak;


    document.getElementById("heroStreak").textContent =
        streak;


    document.getElementById("bigStreak").textContent =
        streak;


    // Progress Message

    const progressMessage =
        document.getElementById("progressMessage");


    if (percentage === 0) {

        progressMessage.textContent =
            "Start your eco journey today! 🌱";

    } else if (percentage < 50) {

        progressMessage.textContent =
            "Great start! Keep going! 💚";

    } else if (percentage < 100) {

        progressMessage.textContent =
            "Amazing! You're making a difference! 🌍";

    } else {

        progressMessage.textContent =
            "🎉 Perfect! You completed all eco habits today!";
    }

}


// ===============================
// ECO TIP
// ===============================

function showRandomTip() {

    const randomIndex =
        Math.floor(
            Math.random() * ecoTips.length
        );


    document.getElementById("ecoTip").textContent =
        ecoTips[randomIndex];


    document.getElementById("ecoTip")
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

}


document.getElementById("randomTipBtn")
.addEventListener("click", showRandomTip);


document.getElementById("newTipBtn")
.addEventListener("click", showRandomTip);


// ===============================
// DARK / LIGHT MODE
// ===============================

const themeBtn =
    document.getElementById("themeBtn");


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");


    if (
        document.body.classList.contains("dark")
    ) {

        localStorage.setItem(
            "theme",
            "dark"
        );


        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem(
            "theme",
            "light"
        );


        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});


// ===============================
// MOBILE MENU
// ===============================

const menuBtn =
    document.getElementById("menuBtn");


const navLinks =
    document.getElementById("navLinks");


menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");


    if (
        navLinks.classList.contains("active")
    ) {

        menuBtn.innerHTML =
            '<i class="fa-solid fa-xmark"></i>';

    } else {

        menuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    }

});


// CLOSE MENU

document.querySelectorAll(".nav-links a")
.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");


        menuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});


// ===============================
// CONTACT FORM VALIDATION
// ===============================

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name")
        .value.trim();


    const email =
        document.getElementById("email")
        .value.trim();


    const message =
        document.getElementById("message")
        .value.trim();


    const nameError =
        document.getElementById("nameError");


    const emailError =
        document.getElementById("emailError");


    const messageError =
        document.getElementById("messageError");


    const successMessage =
        document.getElementById("successMessage");


    // CLEAR

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.textContent = "";


    let isValid = true;


    // NAME

    if (name === "") {

        nameError.textContent =
            "Please enter your name.";

        isValid = false;

    } else if (name.length < 3) {

        nameError.textContent =
            "Name must contain at least 3 characters.";

        isValid = false;

    }


    // EMAIL

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        emailError.textContent =
            "Please enter your email.";

        isValid = false;

    } else if (
        !emailPattern.test(email)
    ) {

        emailError.textContent =
            "Please enter a valid email.";

        isValid = false;

    }


    // MESSAGE

    if (message === "") {

        messageError.textContent =
            "Please enter your feedback.";

        isValid = false;

    } else if (message.length < 10) {

        messageError.textContent =
            "Message must contain at least 10 characters.";

        isValid = false;

    }


    // SUCCESS

    if (isValid) {

        successMessage.textContent =
            "🎉 Thank you! Your feedback has been sent successfully.";

        contactForm.reset();

    }

});


// ===============================
// BACK TO TOP
// ===============================

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ===============================
// INITIAL LOAD
// ===============================

displayHabits();

displayChallenges();

updateProgress();