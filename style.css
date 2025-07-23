/* Estilos generales */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2em;
    margin: 0;
}

/* Contenedor de Autenticación */
.auth-container {
    background: white;
    padding: 2.5em;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
}

.auth-container h2 {
    margin-bottom: 1em;
    color: #333;
}

.auth-container input {
    width: 100%;
    padding: 0.8em;
    margin-bottom: 1em;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
}

.auth-container button {
    width: 100%;
    padding: 0.9em;
    border: none;
    background-color: #5d9cec;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: bold;
}

.auth-container p {
    margin-top: 1.5em;
    font-size: 0.9em;
}

.auth-container a {
    color: #5d9cec;
    text-decoration: none;
    font-weight: bold;
}

.error-message {
    color: #e74c3c;
    margin-top: 1em;
    font-size: 0.9em;
    min-height: 1.2em;
}

/* Contenedor de la Agenda */
.container {
    background: white;
    padding: 2.5em;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 600px;
}

.user-info {
    text-align: right;
    margin-bottom: 1.5em; /* Aumenta el margen para separar del formulario */
    font-size: 0.9em;
    color: #555;
}

#user-email {
    margin-right: 1em;
}

#logout-btn {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 5px;
    cursor: pointer;
}

/* --- MODIFICACIÓN AQUÍ --- */
.header {
    text-align: center;
    margin-bottom: 1.5em;
    color: #4a69bd;
}

.logo-centered {
    display: block;
    max-height: 150px; /* Ajusta este valor según tu logo */
    margin: 0 auto 10px; /* Centra el logo y le da espacio abajo */
}
/* --- FIN DE LA MODIFICACIÓN --- */

h1 {
    margin: 0;
    font-size: 2.2em;
}

.task-form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-bottom: 2em;
}

.form-row {
    display: flex;
    gap: 1em;
    align-items: center;
}

.form-group {
    display: flex;
    align-items: center;
    flex: 1;
    gap: .5em;
}

.icon {
    color: #95a5a6;
}

#task-input,
#urgency-level,
#due-date {
    width: 100%;
    padding: .8em;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1em;
}

#add-task-btn {
    padding: .9em;
    border: none;
    background-color: #5d9cec;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 700;
    transition: background-color .3s ease;
}

#add-task-btn:hover {
    background-color: #4a89dc;
}

#task-list {
    list-style: none;
    padding: 0;
}

.task-item {
    display: flex;
    flex-direction: column;
    padding: 1em;
    margin-bottom: 1em;
    border-radius: 10px;
    border-left: 5px solid;
    background-color: #fdfdfd;
    box-shadow: 0 2px 5px #0000000d;
    transition: all .3s ease;
    animation: fadeIn .4s ease-out forwards;
}

.task-item__main {
    display: flex;
    align-items: center;
}

.task-item input[type=checkbox] {
    margin-right: 1.2em;
    min-width: 1.3em;
    min-height: 1.3em;
    cursor: pointer;
}

.task-item.completed {
    background-color: #f1f2f6;
    border-left-color: #bdc3c7 !important;
}

.task-item.completed .task-item__text,
.task-item.completed .urgency-tag {
    text-decoration: line-through;
    color: #95a5a6;
}

.task-item__text {
    flex-grow: 1;
    font-size: 1.1em;
}

.urgency-tag {
    padding: .3em .7em;
    border-radius: 12px;
    font-size: .8em;
    font-weight: 700;
    color: white;
    margin-right: 1em;
}

.task-item.urgency-baja {
    border-left-color: #2ecc71;
}

.tag-baja {
    background-color: #2ecc71;
}

.task-item.urgency-media {
    border-left-color: #f39c12;
}

.tag-media {
    background-color: #f39c12;
}

.task-item.urgency-alta {
    border-left-color: #e74c3c;
}

.tag-alta {
    background-color: #e74c3c;
}

.delete-btn {
    background: 0 0;
    border: none;
    color: #e74c3c;
    cursor: pointer;
    font-size: 1.3em;
    margin-left: 1em;
    opacity: .7;
    transition: opacity .3s ease;
}

.delete-btn:hover {
    opacity: 1;
}

.task-item__details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .8em;
    padding-left: 2.5em;
    font-size: .9em;
    color: #7f8c8d;
}

.countdown-timer {
    font-weight: 700;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(-15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Estilos del Modal de Notificación */
.modal-overlay {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 2em;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    text-align: center;
    width: 90%;
    max-width: 450px;
    position: relative;
    animation: slide-in 0.4s ease-out;
}

.modal-content h2 {
    color: #e74c3c;
    margin-top: 0;
}

.modal-content p {
    font-size: 1.1em;
    color: #333;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 20px;
    color: #aaa;
    font-s
