//Импорт стилей для webpack
import '../styles/main.css';
import '../styles/tasks.css';
import '../styles/projects.css';
import '../styles/about.css';
//Навигация и бурге-меню
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navList = document.querySelector('.nav-list');
    
    if (burgerMenu && navList) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Инициализация страницы задач
    if (document.querySelector('.task-board')) {
        import('./tasks.js').then(module => {  // Исправленный путь
            module.initTasksPage();
        }).catch(error => {
            console.error('Ошибка загрузки модуля tasks.js:', error);
        });
    }
});