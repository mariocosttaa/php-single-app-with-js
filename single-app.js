document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        const target = event.target.closest('a');
        if (!target) return;

        const href = target.getAttribute('href');
        if (
            href &&
            !href.startsWith('javascript:') &&
            href !== '#' &&
            !href.startsWith('#')
        ) {
            event.preventDefault();

            showLoading();

            // Realiza o GET para a URL
            fetch(target.href, { method: 'GET' })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erro ao carregar a página.');
                    }
                    return response.text();
                })
                .then((html) => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const newContent = doc.querySelector('#single-page-content');

                    if (newContent) {
                        const currentContent = document.querySelector('#single-page-content');
                        if (currentContent) {
                            currentContent.replaceWith(newContent);

                            refreshDOM(newContent);

                            window.history.pushState({}, '', target.href);
                        }
                    } else {
                        console.error('Erro: Div #single-page-content não encontrada na resposta.');
                    }
                })
                .catch((error) => {
                    console.error(error.message);
                })
                .finally(() => {
                    hideLoading();
                });
        }
    });

    window.addEventListener('popstate', () => {
        location.reload();
    });

    function showLoading() {
        const loader = document.getElementById('body-loading');
        if (loader) loader.style.display = 'flex';
    }

    function hideLoading() {
        const loader = document.getElementById('body-loading');
        if (loader) loader.style.display = 'none';
    }

    function refreshDOM(container) {
        const scripts = container.querySelectorAll('script');

        // Função que retorna uma Promessa para garantir a execução dos scripts
        const scriptPromises = Array.from(scripts).map((script) => {
            return new Promise((resolve) => {
                const newScript = document.createElement('script');
                newScript.src = script.src || '';
                newScript.textContent = script.textContent || '';
                newScript.async = script.async || false;
                newScript.defer = script.defer || false;

                newScript.onload = resolve;
                newScript.onerror = () => resolve(); // Garantir que o erro não bloqueie a execução

                document.body.appendChild(newScript);
            });
        });

        // Espera que todos os scripts sejam carregados
        Promise.all(scriptPromises).then(() => {
            // Após carregar todos os scripts, reexecuta componentes como tooltips do Bootstrap
            if (window.$ && typeof $.fn.tooltip === 'function') {
                $('[data-bs-toggle="tooltip"]').tooltip();
            }

            // Aqui você pode garantir outras reinicializações de bibliotecas ou eventos, se necessário
        });
    }
});
