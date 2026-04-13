// At the top of main.js, before window.onload
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3vLlV3xb66GuNS9Uh95DYlhzH7_46t-M", // same as firebase.js
  authDomain: "alfredai-31818.firebaseapp.com",
  projectId: "alfredai-31818",
  storageBucket: "alfredai-31818.firebasestorage.app",
  messagingSenderId: "527412585974",
  appId: "1:527412585974:web:9ece6143efd9c41a0893d7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


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
    // Replace the existing querySelectorAll('.auth-password') block with this:
document.querySelectorAll('.auth-password').forEach(input => {
    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const stage = e.target.closest('.stage-center');
            const email = stage.querySelector('input[type="email"]').value.trim();
            const password = e.target.value;
            const isSignUp = stage.id === 'sign-up-page';

            try {
                let userCredential;
                if (isSignUp) {
                    userCredential = await createUserWithEmailAndPassword(auth, email, password);
                } else {
                    userCredential = await signInWithEmailAndPassword(auth, email, password);
                }
                const uid = userCredential.user.uid;
                updateFinalLink(uid);
                transitionTo(stage, stages.welcome);
            } catch (err) {
                alert("Auth error: " + err.message); // you can make this prettier later
            }
        }
    });
});

    function updateFinalLink(uid = 'guest') {
    document.getElementById('final-link').href = 
        `/chat/?name=${encodeURIComponent(userData.name)}&age=${userData.age}&uid=${uid}`;
}

};