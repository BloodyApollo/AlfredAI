document.addEventListener('DOMContentLoaded', () => {
    const userData = { name: "", age: null, email: "" };

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

    const nameInput = document.getElementById('username');
    const ageInput = document.getElementById('userage');
    const displayName = document.getElementById('display-name');
    const finalLink = document.getElementById('final-link');

    const transitionTo = (currentStage, nextStage) => {
        currentStage.querySelectorAll('*').forEach(el => el.classList.add('exit-now'));
        setTimeout(() => {
            currentStage.classList.add('hidden');
            nextStage.classList.remove('hidden');
            // Trigger entry animation for children of the next stage
            nextStage.querySelectorAll(':not(.hidden)').forEach(el => el.classList.add('enter-now'));
        }, 1500);
    };

    // Name Step
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            userData.name = nameInput.value.trim() || "Mister 2Good4This";
            transitionTo(stages.name, stages.commentName);
            
            setTimeout(() => {
                transitionTo(stages.commentName, stages.age);
                setTimeout(() => ageInput.focus(), 1600);
            }, 4000);
        }
    });

    // Age Step
    ageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            userData.age = ageInput.value || "Timeless";
            displayName.textContent = userData.name;
            transitionTo(stages.age, stages.commentAge);

            // Staggered comments
            setTimeout(() => stages.commentAge.querySelector('.stagger-1').classList.add('enter-now'), 1000);
            setTimeout(() => stages.commentAge.querySelector('.stagger-2').classList.add('enter-now'), 2500);
            setTimeout(() => stages.commentAge.querySelector('.stagger-3').classList.add('enter-now'), 4000);

            // Transition to Account Check
            setTimeout(() => {
                transitionTo(stages.commentAge, stages.accountConfirm);
            }, 6000);
        }
    });

    // Account Confirmation Logic (Yes/No)
    document.getElementsByName('agreement').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const stageId = e.target.closest('div').id;
            
            if (stageId === 'account-confirmation') {
                if (e.target.value === 'yes') {
                    transitionTo(stages.accountConfirm, stages.signIn);
                } else {
                    transitionTo(stages.accountConfirm, stages.accountCreate);
                }
            } else if (stageId === 'account-creation-confirmation') {
                if (e.target.value === 'yes') {
                    transitionTo(stages.accountCreate, stages.signUp);
                } else {
                    // Guest path
                    transitionTo(stages.accountCreate, stages.welcome);
                    updateFinalLink();
                }
            }
        });
    });

    // Handle Form Inputs (Sign In / Sign Up)
    const handleAuthEntry = (e) => {
        if (e.key === 'Enter') {
            const parent = e.target.closest('div');
            transitionTo(parent, stages.welcome);
            updateFinalLink();
        }
    };

    document.querySelectorAll('#sign-up-page input, #sign-in-page input').forEach(input => {
        input.addEventListener('keypress', handleAuthEntry);
    });

    function updateFinalLink() {
        finalLink.href = `/chat/?name=${encodeURIComponent(userData.name)}&age=${userData.age}`;
    }
});