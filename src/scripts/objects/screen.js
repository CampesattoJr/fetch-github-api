const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto de perfil do usuário">
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                                <p>${user.bio ?? 'Não possui bio cadastrado 😢'}</p>
                                            </div>
                                            <div class="stats">
                                                    <div class="followers">Segidores: ${user.followers}👥</div>
                                                    <div class="following">Seguindo: ${user.following}👥</div>
                                                </div>
                                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">${repo.name}                                                                    
                                                                    <div class="repo-info">
                                                                        <span class="repo-info-itens">🍴${repo.forks_count}</span>
                                                                        <span class="repo-info-itens">⭐${repo.stargazers_count}</span>
                                                                        <span class="repo-info-itens">👀${repo.watchers_count}</span>
                                                                        <span class="repo-info-itens">💻${repo.language}</span>
                                                                    </div></a>
                                                                    
                                                                    
                                                                </li>`
        )  

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        if (user.events.length > 0) {
            let eventItens = ''
            user.events.forEach(event => {

                if (event.type === "PushEvent") {
                    eventItens += `<li><strong>${event.repo.name}</strong> - ${event.payload.commits[0].message}</li>`
                } else if (event.type === "CreateEvent") {
                    eventItens += `<li><strong>${event.repo.name}</strong> - Sem mensagem de
                    commit</li>`
                }

            })
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventItens}</ul>
                                           </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = `<h3>Usuário não encontrado 😢</h3>`
    }
}


export { screen }