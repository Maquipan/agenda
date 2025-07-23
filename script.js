// --- Configuración de Firebase ---
const firebaseConfig = {
    apiKey: "AIzaSyDuUI-G3Y0sEM3Mf4_1uNFe-19mM1TPyxM",
    authDomain: "agenda-49c73.firebaseapp.com",
    projectId: "agenda-49c73",
    storageBucket: "agenda-49c73.appspot.com",
    messagingSenderId: "946710304963",
    appId: "1:946710304963:web:7e5cea38f60e4586116a76",
    measurementId: "G-PPEMD1SLNF"
};

// --- Inicialización de Firebase ---
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- Referencias al DOM (Auth) ---
const authContainer = document.getElementById('auth-container');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authError = document.getElementById('auth-error');

// --- Referencias al DOM (Agenda) ---
const agendaContainer = document.getElementById('agenda-container');
const taskInput = document.getElementById('task-input');
const urgencyLevel = document.getElementById('urgency-level');
const dueDateInput = document.getElementById('due-date');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const userEmailSpan = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');

// --- Referencias al DOM del Modal ---
const notificationModal = document.getElementById('notification-modal');
const modalMessage = document.getElementById('modal-message');
const closeBtn = document.querySelector('.close-btn');

// --- Lógica de Autenticación ---
auth.onAuthStateChanged(user => {
    if (user) {
        authContainer.style.display = 'none';
        agendaContainer.style.display = 'block';
        userEmailSpan.textContent = user.email;
        loadTasks(user.uid);
    } else {
        authContainer.style.display = 'block';
        agendaContainer.style.display = 'none';
        taskList.innerHTML = '';
        if (unsubscribeTasks) {
            unsubscribeTasks();
        }
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    authError.textContent = '';
    auth.createUserWithEmailAndPassword(email, password)
        .catch(error => {
            authError.textContent = `Error: ${error.message}`;
        });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    authError.textContent = '';
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            authError.textContent = 'Correo o contraseña incorrectos.';
        });
});

logoutBtn.addEventListener('click', () => {
    auth.signOut();
});

// --- Funciones para controlar el Modal ---
function showNotificationModal(message) {
    modalMessage.textContent = message;
    notificationModal.style.display = 'flex';
}

function hideNotificationModal() {
    notificationModal.style.display = 'none';
}

// Event listeners para cerrar el modal
closeBtn.addEventListener('click', hideNotificationModal);
window.addEventListener('click', (event) => {
    if (event.target == notificationModal) {
        hideNotificationModal();
    }
});

// --- Lógica de la Agenda ---
let unsubscribeTasks;
const countdownIntervals = {};
const notifiedTasks = {};

function loadTasks(userId) {
    if (unsubscribeTasks) unsubscribeTasks();

    unsubscribeTasks = db.collection('tasks')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
            taskList.innerHTML = '';
            Object.values(countdownIntervals).forEach(clearInterval);
            snapshot.forEach(doc => renderTask(doc));
        }, error => {
            console.error("Error al cargar tareas:", error);
        });
}

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === "" || !auth.currentUser) return;

    const taskData = {
        text: taskText,
        urgency: urgencyLevel.value,
        dueDate: dueDateInput.value || null,
        completed: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userId: auth.currentUser.uid
    };

    db.collection('tasks').add(taskData).then(() => {
        taskInput.value = "";
        dueDateInput.value = "";
        urgencyLevel.value = "media";
    }).catch(error => console.error("Error al agregar tarea:", error));
});

function renderTask(doc) {
    const task = doc.data();
    const taskId = doc.id;

    if (!notifiedTasks[taskId]) {
        notifiedTasks[taskId] = {
            notified1Hour: false,
            notified15Min: false,
            notifiedTimeUp: false
        };
    }

    const listItem = document.createElement('li');
    listItem.id = taskId;
    listItem.className = `task-item urgency-${task.urgency}`;
    if (task.completed) {
        listItem.classList.add('completed')
    }

    const mainContent = document.createElement('div');
    mainContent.className = 'task-item__main';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        db.collection('tasks').doc(taskId).update({
            completed: checkbox.checked
        })
    });

    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-item__text';
    taskSpan.textContent = task.text;

    const urgencyTag = document.createElement('span');
    urgencyTag.className = `urgency-tag tag-${task.urgency}`;
    urgencyTag.textContent = task.urgency.charAt(0).toUpperCase() + task.urgency.slice(1);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener('click', () => {
        if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
            delete notifiedTasks[taskId];
            clearInterval(countdownIntervals[taskId]);
            db.collection('tasks').doc(taskId).delete()
        }
    });

    mainContent.append(checkbox, taskSpan, urgencyTag, deleteButton);
    listItem.appendChild(mainContent);

    if (task.dueDate) {
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'task-item__details';

        const creationDateSpan = document.createElement('span');
        if (task.createdAt) {
            creationDateSpan.textContent = `Creado: ${task.createdAt.toDate().toLocaleDateString()}`
        }

        const countdownElement = document.createElement('div');
        countdownElement.className = 'countdown-timer';

        detailsContainer.append(creationDateSpan, countdownElement);
        listItem.appendChild(detailsContainer);

        if (!task.completed) {
            startCountdown(taskId, new Date(task.dueDate).getTime(), countdownElement, task.text)
        } else {
            countdownElement.textContent = "Completada";
        }
    }

    taskList.appendChild(listItem);
}

function startCountdown(taskId, dueDate, element, taskText) {
    if (countdownIntervals[taskId]) clearInterval(countdownIntervals[taskId]);

    const ONE_HOUR = 60 * 60 * 1000;
    const FIFTEEN_MINUTES = 15 * 60 * 1000;

    const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = dueDate - now;

        if (distance < ONE_HOUR && !notifiedTasks[taskId].notified1Hour) {
            showNotificationModal(`¡Queda menos de 1 hora para la tarea: "${taskText}"!`);
            notifiedTasks[taskId].notified1Hour = true;
        }

        if (distance < FIFTEEN_MINUTES && !notifiedTasks[taskId].notified15Min) {
            showNotificationModal(`¡URGENTE! Quedan menos de 15 minutos para la tarea: "${taskText}"`);
            notifiedTasks[taskId].notified15Min = true;
        }

        if (distance < 0) {
            if (!notifiedTasks[taskId].notifiedTimeUp) {
                showNotificationModal(`Se ha cumplido el tiempo para la tarea: "${taskText}"`);
                notifiedTasks[taskId].notifiedTimeUp = true;
            }
            element.textContent = "¡Tiempo finalizado!";
            clearInterval(intervalId);
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        element.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);

    countdownIntervals[taskId] = intervalId;
}

// --- Helpers para cambiar entre forms de auth ---
document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});
document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});
