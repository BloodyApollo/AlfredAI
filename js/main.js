window.onload = () => {
    const userData = { name: "", age: null };
    let introSkipped = false;

    const stages = {
        name: document.getElementById('name-stage'),
        commentName: document.getElementById('comment-name'),
        age: document.getElementById('age-stage'),
        commentAge: document.getElementById('comment-age'),
        accountConfirm: document.getElementById('account-confirmation'),
        accountCreate: document.getElementById('account-creation-confirmation'),
        signUp: document.getElementById('sign-up-page'),
        signIn: document.getElementById('sign-in-page'),
        welcome: document.getElementById('welcome-stage')
    };

    const transitionTo = (currentStage, nextStage) => {
        currentStage.querySelectorAll('p, input, button, .btn-stack, a').forEach(el => {
            el.classList.add('exit-now');
        });

        setTimeout(() => {
            currentStage.classList.add('hidden');
            nextStage.classList.remove('hidden');
            nextStage.querySelectorAll('p, input, button, .btn-stack, a').forEach(el => {
                el.classList.remove('exit-now');
                el.classList.add('enter-now');
            });
        }, 1500);
    };

    const startApp = () => {
        if (introSkipped) return;
        introSkipped = true;
        document.getElementById('skip-intro').style.display = 'none';
        document.querySelectorAll('.intro-auto').forEach(p => p.style.display = 'none');
        stages.name.classList.remove('hidden');
        stages.name.querySelectorAll('*').forEach(el => el.classList.add('enter-now'));
        document.getElementById('username').focus();
    };

    document.getElementById('skip-intro').addEventListener('click', startApp);
    setTimeout(startApp, 9000);

    // Handle Name Input
    document.getElementById('username').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== "") {
            userData.name = e.target.value.trim();
            // Update all name displays immediately
            document.getElementById('display-name').textContent = userData.name;
            document.querySelector('.signin-name').textContent = userData.name;

            transitionTo(stages.name, stages.commentName);
            setTimeout(() => {
                transitionTo(stages.commentName, stages.age);
                setTimeout(() => document.getElementById('userage').focus(), 1600);
            }, 3000);
        }
    });

    // Handle Age Input
    document.getElementById('userage').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            userData.age = e.target.value || "Timeless";
            transitionTo(stages.age, stages.commentAge);
            setTimeout(() => transitionTo(stages.commentAge, stages.accountConfirm), 6500);
        }
    });

    // Handle Button Clicks
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('choice-btn')) {
            const dest = e.target.getAttribute('data-destination');
            const currentStage = e.target.closest('.stage-center');
            if (dest === 'guest') {
                transitionTo(currentStage, stages.welcome);
                updateFinalLink();
            } else {
                transitionTo(currentStage, stages[dest]);
            }
        }
    });

    // Handle Password Submit
    document.querySelectorAll('.auth-password').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                transitionTo(e.target.closest('.stage-center'), stages.welcome);
                updateFinalLink();
            }
        });
    });

    function updateFinalLink() {
        document.getElementById('final-link').href = `/chat/?name=${encodeURIComponent(userData.name)}&age=${userData.age}`;
    }
};