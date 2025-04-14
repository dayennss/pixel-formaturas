// Funções de animação e utilidades
const animateCounter = (counter, target) => {
    let current = 0;
    let increment = target / 100;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.ceil(current);
            setTimeout(updateCounter, 10);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
};

// Inicialização principal quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes Bootstrap
    initBootstrapComponents();
    
    // Configurar elementos da UI
    setupNavbar();
    setupFadeAnimations();
    setupFormValidation();
    setupProductFilters();
    setupScrollEffects();
    setupHoverEffects();
    setupHeroParticles();
    setupTextHighlighting();
    
    // Inicializa contadores e animações
    initCounters();
    initScrollAnimations();
    initNavbarScroll();
    initPartnerCarousel();
    initProductFilter();

    // Controle do menu durante a rolagem
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50;

    function updateNavbar() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Atualiza o estado inicial
    updateNavbar();

    // Adiciona o listener para scroll
    window.addEventListener('scroll', updateNavbar);

    // Fecha o menu mobile ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('preloader-hidden');
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Inicializar componentes do Bootstrap
function initBootstrapComponents() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (tooltipTriggerList.length > 0) {
        Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }
    
    // Configurar modais
    const modalLinks = document.querySelectorAll('[data-bs-toggle="modal"]');
    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetModal = document.querySelector(link.getAttribute('data-bs-target'));
            if (targetModal) {
                const modal = new bootstrap.Modal(targetModal);
                modal.show();
            }
        });
    });
}

// Configurar barra de navegação
function setupNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Efeito de scroll na navbar
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Ativar link atual no menu
        const currentLocation = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath && currentLocation.includes(linkPath) && linkPath !== '#' && linkPath !== '') {
                link.classList.add('active');
            }
        });
    }
}

// Configurar animações fade-in ao rolar
function setupFadeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const animateElements = function() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;

                if (elementTop < windowHeight - 100 && elementBottom > 0) {
                    element.classList.add('active');
                }
            });
        };

        // Chama a função de animação no load e scroll
        window.addEventListener('scroll', animateElements);
        animateElements(); // Inicialização
    }
    
    // Efeito de revelação nas seções
    const revealSections = function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('section-revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealSections);
    revealSections(); // Inicialização
}

// Configurar validação de formulários
function setupFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    if (forms.length > 0) {
        Array.from(forms).forEach(form => {
            let timeoutId = null; // Variável para armazenar o ID do timeout

            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    // Se válido, mostra mensagem de sucesso
                    event.preventDefault();
                    const submitBtn = form.querySelector('button[type="submit"]');
                    
                    if (submitBtn) {
                        const originalText = submitBtn.innerHTML;
                        
                        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                        submitBtn.disabled = true;
                        
                        // Remove mensagens existentes
                        const existingMessages = form.querySelectorAll('.alert');
                        existingMessages.forEach(msg => msg.remove());
                        
                        // Cancela timeout anterior se existir
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                        
                        // Simulando o envio
                        timeoutId = setTimeout(() => {
                            // form.reset();
                            // form.classList.remove('was-validated');
                            
                            // Restaura botão
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            
                        }, 1500);
                    }
                }
                
                form.classList.add('was-validated');
            }, false);
        });
    }
    
    // Efeito de digitação para títulos
    const typingEffect = document.querySelector('.typing-effect');
    if (typingEffect) {
        const text = typingEffect.getAttribute('data-text');
        if (text) {
            const speed = 70; // velocidade da digitação
            typingEffect.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    typingEffect.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            }
            
            typeWriter();
        }
    }
}

// Configurar filtros para produtos
function setupProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    if (filterButtons.length > 0 && productItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Adiciona active ao botão clicado
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Filtra os produtos
                productItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('show');
                        }, 50);
                    } else if (item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('show');
                        }, 50);
                    } else {
                        item.style.display = 'none';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Configurar efeitos de scroll
function setupScrollEffects() {
    // Contador de números para estatísticas
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const countAnimation = () => {
            counters.forEach(counter => {
                const elementTop = counter.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100 && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    const target = parseInt(counter.getAttribute('data-target') || "0");
                    const duration = 2000; // duração em milissegundos
                    const step = Math.ceil(target / (duration / 16)); // 60fps
                    
                    let count = 0;
                    const updateCount = () => {
                        count += step;
                        if (count < target) {
                            counter.textContent = count.toString();
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.textContent = target.toString();
                        }
                    };
                    
                    updateCount();
                }
            });
        };
        
        window.addEventListener('scroll', countAnimation);
        countAnimation(); // Inicialização
    }
    
    // Botão de voltar ao topo
    const scrollTopBtn = document.createElement('a');
    scrollTopBtn.href = '#';
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    let scrolling = false;
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Mostrar/ocultar botão com base na posição do scroll e direção
        if (currentScroll > 500) {
            if (currentScroll > lastScrollTop) {
                // Rolando para baixo
                scrollTopBtn.classList.remove('active');
            } else {
                // Rolando para cima
                scrollTopBtn.classList.add('active');
            }
        } else {
            scrollTopBtn.classList.remove('active');
        }
        
        lastScrollTop = currentScroll;
    });
    
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!scrolling) {
            scrolling = true;
            
            // Animação suave de scroll
            const scrollStep = -window.scrollY / (500 / 15); // 500ms duration
            
            function scrollAnimation() {
                if (window.scrollY !== 0) {
                    window.scrollBy(0, scrollStep);
                    requestAnimationFrame(scrollAnimation);
                } else {
                    scrolling = false;
                }
            }
            
            requestAnimationFrame(scrollAnimation);
        }
    });
    
    // Efeito parallax para elementos hero
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || '0.5';
                element.style.transform = `translateY(${scrollY * parseFloat(speed)}px)`;
            });
        });
    }
}

// Configurar efeitos de hover
function setupHoverEffects() {
    // Efeito de zoom em imagens
    const zoomImages = document.querySelectorAll('.zoom-image');
    zoomImages.forEach(img => {
        img.addEventListener('mousemove', e => {
            const { left, top, width, height } = img.getBoundingClientRect();
            const x = (e.clientX - left) / width * 100;
            const y = (e.clientY - top) / height * 100;
            
            img.style.transformOrigin = `${x}% ${y}%`;
        });
    });

    // Adiciona efeitos de hover nos cards
    const cards = document.querySelectorAll('.card, .feature-box');
    cards.forEach(card => {
        card.style.transform = 'none';
        card.style.transition = 'none';
        card.style.transformStyle = 'flat';
        card.style.perspective = 'none';
        card.style.backfaceVisibility = 'visible';
    });
}

// Configurar partículas na seção hero
function setupHeroParticles() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        heroSection.appendChild(particlesContainer);
        
        const particlesCount = 30;
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posições e tamanhos aleatórios
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const animDuration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${animDuration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
}

// Configurar destaque em textos
function setupTextHighlighting() {
    // Adiciona efeito de destaque para textos importantes
    const highlightedTexts = document.querySelectorAll('.highlight-text');
    highlightedTexts.forEach(text => {
        const words = text.textContent.split(' ');
        let newText = '';
        
        words.forEach(word => {
            if (word.includes('#')) {
                const cleanWord = word.replace('#', '');
                newText += `<span class="text-primary fw-bold">${cleanWord}</span> `;
            } else {
                newText += word + ' ';
            }
        });
        
        text.innerHTML = newText;
    });
}

// Função para inicializar contadores
function initCounters() {
    const counters = document.querySelectorAll('.counter-value');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100; // Ajuste este valor para controlar a velocidade
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };

    // Função para verificar se o elemento está visível na viewport
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Inicia a animação quando o contador estiver visível
    const handleScroll = () => {
        counters.forEach(counter => {
            if (isElementInViewport(counter) && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                animateCounter(counter);
            }
        });
    };

    // Adiciona o listener de scroll
    window.addEventListener('scroll', handleScroll);
    // Verifica na carga inicial
    handleScroll();
}

// Função para animar elementos quando entram na tela
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Verificar elementos visíveis na carga inicial
}

// Função para alterar a navegação ao rolar
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
}

// Carrossel de parceiros
function initPartnerCarousel() {
    const carousel = document.getElementById('partnersCarousel');
    if (carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 3000
        });
    }
}

// Filtro de produtos
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover classe ativa de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Adicionar classe ativa ao botão clicado
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                productItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Atalho para preencher formulário de cadastro
document.addEventListener('keydown', function(e) {
    // Verifica se Ctrl + Tab foi pressionado
    if (e.ctrlKey && e.key === '=') {
        // Previne o comportamento padrão do Tab
        e.preventDefault();
        
        // Dados para preenchimento
        const dados = {
            // Dados da Empresa
            'nomeCadastro': 'DAYENE SOUZA',
            'cnpj': '20.617.867/0001-06',
            'razaoSocial': 'DAYEN TESTE',
            'nomeEmpresa': 'DAYENTESTE',
            
            // Dados do Sócio
            'nomeSocio': 'dayene souza',
            'cpfSocio': '180.101.427-27',
            
            // Contato
            'telContato': '(21) 99823-1796',
            'email': 'dayene.souza@nicephotos.com.br',
            'senha': 'teste',
            
            // Endereço
            'cep': '06405-065',
            'endereco': 'Rua Mar de Java',
            'numEndereco': '376',
            'bairro': 'Parque Ribeiro de Lima',
            'cidade': 'Barueri',
            'estado': 'SP'
        };
        
        // Preenche todos os campos
        Object.keys(dados).forEach(id => {
            const campo = document.getElementById(id);
            if (campo) {
                campo.value = dados[id];
                
                // Dispara evento de input para atualizar validação
                const event = new Event('input', {
                    bubbles: true,
                    cancelable: true,
                });
                campo.dispatchEvent(event);
            }
        });
        
        // Mostra mensagem de sucesso
        const form = document.querySelector('form');
        if (form) {
            const successMsg = document.createElement('div');
            successMsg.className = 'alert alert-info mt-3 animate-fade-in-up';
            successMsg.innerHTML = '<i class="fas fa-info-circle me-2"></i>Formulário preenchido automaticamente!';
            form.appendChild(successMsg);
            
            // Remove a mensagem após 3 segundos
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        }
        // nextStep(4)
    }
}); 