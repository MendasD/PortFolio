// Variables globales
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeSkillBars();
    initializeProjectFilters();
    initializeContactForm();
    initializeScrollEffects();
});

// Gestion du thème
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Navigation
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const themeToggle = document.getElementById('theme-toggle');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fermer le menu mobile lors du clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    themeToggle.addEventListener('click', toggleTheme);
    
    // Navigation active
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Navbar background
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = currentTheme === 'light' 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(17, 24, 39, 0.98)';
    } else {
        navbar.style.background = currentTheme === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(17, 24, 39, 0.95)';
    }
}

// Animations au scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.project-card, .skill-category, .timeline-item, .certification-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Barres de compétences
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Filtres de projets
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filtrer les projets
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Modales de projets
function openModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    
    // Contenu des modales (vous pouvez personnaliser selon vos projets)
    const projectDetails = {
        project1: {
            title: 'Analyse Prédictive des Ventes',
            description: 'Modèle de machine learning pour prédire le prix de vente d\'un ordinateur basé sur des caractéristiques telles que la RAM, le processeur, et le stockage.',
            technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'seaborn'],
            features: [
                'Analyse exploratoire des données (EDA)',
                'Feature engineering avec variables catégorielles et numériques',
                'Modèles de régression (linéaire, SVR, Lasso)',
                'Validation croisée et optimisation des hyperparamètres',
                'Visualisation des prédictions et métriques de performance'
            ],
            images: [],
            github: 'https://github.com/MendasD/CertificatIA_ForceN/blob/main/Projet_de_mentorat_FORCEN.ipynb',
            demo: null
        },
        project2: {
            title: 'Dashboard Interactif PTBA-PUDC',
            description: 'Tableau de bord interactif pour visualiser et analyser les données du Programme d\'Urgence de Développement Communautaire (PUDC) au Sénégal.',
            technologies: ['R-Shiny', 'Plotly', 'APIs'],
            features: [ 
                'Visualisations interactives (cartes, graphiques temporels)',
                'Analyses statistiques (taux de croissance, corrélations)',
                'Filtres par types de réalisations et régions',
                'Déploiement sur Shinyapps.io',
                'Insertion d\'un chatbot pour assistance utilisateur via API',
            ],
            images: [
                'assets/pudc.png'
            ],
            github: 'https://github.com/MendasD/Dashboard-R-Shiny/blob/main/Groupe2_PTBA_PUDC_David_Christ_Noba_POKO.rar',
            demo: 'https://davidchristnzonde.shinyapps.io/Dashboard_PTBA_PUDC_2025/'
        },
        project3: {
            title: 'Plateforme de Gestion des Notes scolaires',
            description: 'Application web pour la gestion des notes scolaires des étudiants.',
            technologies: ['Django', 'JavaScript', 'HTML', 'CSS'],
            features: [ 
                'Gestion des utilisateurs (étudiants, enseignants)',
                'Saisie et modification des notes',
                'Visualisation des performances académiques',
                'Exportation des rapports en PDF',
                'Messagerie et Notifications'
            ],
            images: [
                'assets/gestion_notes.png'
            ],
            github: 'https://github.com/MendasD/GestionNotes/tree/main/gestion_notes',
            demo: null
        }
        // Autres projets ici
    };
    
    const project = projectDetails[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <h2 style="color: var(--text-primary); margin-bottom: 1rem;">${project.title}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">${project.description}</p>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Technologies utilisées</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Fonctionnalités principales</h3>
            <ul style="color: var(--text-secondary); line-height: 1.8;">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        ${project.images.length > 0 ? `
        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Aperçu</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
                ${project.images.map(img => `<img src="${img}" alt="Aperçu du projet" style="width: 100%; border-radius: 0.5rem; box-shadow: var(--shadow);">`).join('')}
            </div>
        </div>
        ` : ''}
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-primary"><i class="fab fa-github"></i> Code source</a>` : ''}
            ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-secondary"><i class="fas fa-external-link-alt"></i> Démo live</a>` : ''}
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fermer la modale en cliquant à l'extérieur
window.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Formulaire de contact
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simulation d'envoi (remplacez par votre logique d'envoi réelle)
        showNotification('Message envoyé avec succès! Je vous répondrai bientôt.', 'success');
        form.reset();
        
        // Ici vous pouvez ajouter l'intégration avec un service d'email
        // comme EmailJS, Formspree, ou votre propre backend

        // Integration avec EmailJS (exemple)
    });
}

// Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Effets de scroll
function initializeScrollEffects() {
    // Parallax léger pour le hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Animation des statistiques
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Animation des nombres
function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
    }, 16);
}

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Ajout des styles d'animation CSS dynamiquement
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);