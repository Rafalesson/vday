// EM: js/script.js

// Espera a página inteira carregar primeiro
window.onload = () => {
    // Pegando os NOVOS elementos da tela de entrada
    const cortina = document.getElementById('cortina-entrada');
    const btnEntrar = document.getElementById('btn-entrar');

    // Pegando os elementos que já tínhamos
    const video = document.getElementById('nosso-video');
    const audio = document.getElementById('trilha-sonora');
    const modal = document.getElementById('presente-modal');
    const modalContent = document.querySelector('.modal-content');
    const simBtn = document.getElementById('sim-btn');
    const naoBtn = document.getElementById('nao-btn');

    // --- LÓGICA PRINCIPAL: TUDO COMEÇA NO CLIQUE PARA ENTRAR ---
    btnEntrar.addEventListener('click', () => {
        // Começa a música
        audio.play();
        // Começa o vídeo
        video.play();

        // Faz a cortina de entrada desaparecer suavemente
        cortina.style.opacity = '0';
        // Remove a cortina da frente dos outros elementos depois da animação
        setTimeout(() => {
            cortina.style.display = 'none';
        }, 500); // 500ms = mesmo tempo da transição no CSS
    });


    // --- O RESTO DO CÓDIGO PERMANECE O MESMO ---

    // Quando o vídeo ACABAR, mostramos o modal
    video.addEventListener('ended', () => {
        modal.classList.add('show');
    });

    // Lógica do botão "NÃO"
    naoBtn.addEventListener('click', () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const modalWidth = modalContent.offsetWidth;
        const modalHeight = modalContent.offsetHeight;
        const randomTop = Math.floor(Math.random() * (viewportHeight - modalHeight));
        const randomLeft = Math.floor(Math.random() * (viewportWidth - modalWidth));
        modalContent.style.top = `${randomTop}px`;
        modalContent.style.left = `${randomLeft}px`;
    });

    // Lógica do botão "SIM" com o show de fogos
    simBtn.addEventListener('click', () => {
        modalContent.innerHTML = `<h1>Oba! Te amo! ❤️</h1>`;

        let estouros = 0;
        const limiteDeEstouros = 20;

        const loopDeFogos = setInterval(() => {
            if (estouros >= limiteDeEstouros) {
                clearInterval(loopDeFogos);
                return;
            }
            const randomX = Math.random() * 90 + 5 + '%';
            const randomY = Math.random() * 90 + 5 + '%';
            criarFogosDeArtificio(randomX, randomY);
            estouros++;
        }, 400);
    });

    // Função dos fogos de artifício
    function criarFogosDeArtificio(xPos, yPos) {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            const colors = ['#dc3545', '#ff4d6d', '#ff758f', '#e01e37'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = xPos;
            confetti.style.top = yPos;
            const x = (Math.random() - 0.5) * 400;
            const y = (Math.random() - 0.5) * 400;
            confetti.style.setProperty('--x', `${x}px`);
            confetti.style.setProperty('--y', `${y}px`);
            confetti.style.width = '15px';
            confetti.style.height = '15px';
            confetti.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
            confetti.style.transform = 'rotate(-45deg)';
            document.body.appendChild(confetti);
            setTimeout(() => {
                confetti.remove();
            }, 800);
        }
    }
};