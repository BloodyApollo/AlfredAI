document.addEventListener('DOMContentLoaded', () => {
    const userData = { name: "", age: null };

    const stages = {
        name: document.getElementById('name-stage'),
        commentName: document.getElementById('comment-name'),
        age: document.getElementById('age-stage'),
        commentAge: document.getElementById('comment-age'),
        welcome: document.getElementById('welcome-stage')
    };

    const nameInput = document.getElementById('username');
    const ageInput = document.getElementById('userage');
    const displayName = document.getElementById('display-name');
    const finalLink = document.getElementById('final-link');

    // Transitions from one div to another
    const transitionTo = (currentStage, nextStage) => {
        currentStage.querySelectorAll('*').forEach(el => el.classList.add('exit-now'));

        setTimeout(() => {
            currentStage.classList.add('hidden');
            nextStage.classList.remove('hidden');
        }, 1500);
    };

    // Name Step
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            userData.name = nameInput.value.trim() || "Mister 2Good4This";
            transitionTo(stages.name, stages.commentName);

            // Show comment for 2.5s then move to Age
            setTimeout(() => {
                stages.commentName.querySelector('.username-prompt').classList.add('enter-now');
            }, 1600);

            setTimeout(() => {
                transitionTo(stages.commentName, stages.age);
                setTimeout(() => {
                    stages.age.querySelector('.username-prompt').classList.add('enter-now');
                    setTimeout(() => {
                        ageInput.classList.add('enter-now');
                        ageInput.focus();
                    }, 1000);
                }, 1600);
            }, 4500);
        }
    });

    // Age Step
    ageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            userData.age = ageInput.value || "Timeless";
            displayName.textContent = userData.name;
            transitionTo(stages.age, stages.commentAge);

            finalLink.href = `http://localhost:5173/?name=${userData.name}&age=${userData.age}`;

            // THE ONE-BY-ONE STAGGER LOGIC
            // Delay 1: "Damn!"
            setTimeout(() => {
                stages.commentAge.querySelector('.stagger-1').classList.add('enter-now');
            }, 1800);

            // Delay 2: "Apologies..."
            setTimeout(() => {
                stages.commentAge.querySelector('.stagger-2').classList.add('enter-now');
            }, 3000);

            // Delay 3: "Anyway..."
            setTimeout(() => {
                stages.commentAge.querySelector('.stagger-3').classList.add('enter-now');
            }, 4500);

            // Final transition to Welcome
            setTimeout(() => {
                transitionTo(stages.commentAge, stages.welcome);
                setTimeout(() => {
                    stages.welcome.querySelector('.username-prompt').classList.add('enter-now');
                    setTimeout(() => finalLink.classList.add('enter-now'), 1000);
                }, 1600);
            }, 7500);
        }
    });
});