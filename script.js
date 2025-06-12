// Espera o conteúdo da página carregar
window.onload = () => {
    // Pegando os elementos que vamos usar
    const video = document.getElementById('nosso-video');
    const modal = document.getElementById('presente-modal');
    const modalContent = document.querySelector('.modal-content');
    const simBtn = document.getElementById('sim-btn');
    const naoBtn = document.getElementById('nao-btn');

    // Ideia extra: Tocar o vídeo assim que a página carrega
    // O 'catch' é para o navegador não reclamar se não conseguir dar play sozinho
    video.play().catch(error => {
        console.log("O navegador bloqueou o autoplay. O usuário precisa interagir primeiro.");
        // Poderíamos mostrar um botão de "Clique para começar" aqui, mas vamos manter simples.
    });

    // Quando o vídeo ACABAR, mostramos o modal
    video.addEventListener('ended', () => {
        modal.classList.add('show');
    });

    // --- A LÓGICA DO BOTÃO "NÃO" ---
    naoBtn.addEventListener('click', () => {
        // Pega o tamanho da janela do navegador
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Pega o tamanho do modal
        const modalWidth = modalContent.offsetWidth;
        const modalHeight = modalContent.offsetHeight;

        // Calcula uma posição aleatória, garantindo que o modal não saia da tela
        const randomTop = Math.floor(Math.random() * (viewportHeight - modalHeight));
        const randomLeft = Math.floor(Math.random() * (viewportWidth - modalWidth));

        // Aplica a nova posição ao modal
        modalContent.style.top = `${randomTop}px`;
        modalContent.style.left = `${randomLeft}px`;
    });

    // --- A LÓGICA DO BOTÃO "SIM" ---
    simBtn.addEventListener('click', () => {
        // Esconde os botões e a pergunta
        modalContent.innerHTML = `<h1>Oba! Te amo! ❤️</h1>`;
        // Chama a função da "queima de fogos"
        criarFogosDeArtificio();
    });

    function criarFogosDeArtificio() {
        // Cria vários confetes em posições aleatórias
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Cores variadas para os corações/confetes
            const colors = ['#dc3545', '#ff4d6d', '#ff758f', '#e01e37'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Posição inicial (centro do botão "Sim")
            confetti.style.left = '50%';
            confetti.style.top = '60%';

            // Gera direções aleatórias para a "explosão"
            const x = (Math.random() - 0.5) * 400; // Espalha horizontalmente
            const y = (Math.random() - 0.5) * 400; // Espalha verticalmente
            
            confetti.style.setProperty('--x', `${x}px`);
            confetti.style.setProperty('--y', `${y}px`);

            // Faz os confetes parecerem corações (opcional, mas um toque legal)
            confetti.style.width = '15px';
            confetti.style.height = '15px';
            confetti.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'; // Forma de losango
            confetti.style.transform = 'rotate(-45deg)';
            
            document.body.appendChild(confetti);

            // Remove o confete da tela depois que a animação acabar
            setTimeout(() => {
                confetti.remove();
            }, 800);
        }
    }
};