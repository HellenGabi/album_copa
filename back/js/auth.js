function setupAuthListeners() {
    if (!auth) return;

    auth.onAuthStateChanged(user => {
        currentUser = user;

        if (user) {
            authBtn.classList.add('hidden');
            userProfile.classList.remove('hidden');
            userEmailSpan.innerText = user.email;
            loadDataFromCloud();
        } else {
            authBtn.classList.remove('hidden');
            userProfile.classList.add('hidden');
            loadDataLocal();
        }
    });

    authBtn.onclick = () => authModal.classList.remove('hidden');

    closeModal.onclick = () => authModal.classList.add('hidden');

    logoutBtn.onclick = () => auth.signOut();

    tabLogin.onclick = () => {
        authMode = 'login';
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    };

    tabRegister.onclick = () => {
        authMode = 'register';
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
    };

    authForm.onsubmit = async (e) => {
        e.preventDefault();

        const email = document.getElementById('auth-email').value;
        const pass = document.getElementById('auth-password').value;

        authError.innerText = '';

        try {
            if (authMode === 'login') {
                await auth.signInWithEmailAndPassword(email, pass);
            } else {
                await auth.createUserWithEmailAndPassword(email, pass);
            }

            authModal.classList.add('hidden');
        } catch (err) {
            authError.innerText = err.message;
        }
    };
}