const API_URL = "http://localhost:3000/partidas";

async function carregarPartidas() {
    const res = await fetch(API_URL);
    const partidas = await res.json();
    const container = document.getElementById("partidas");
    container.innerHTML = "";

    partidas.forEach(p => {
        const div = document.createElement("div");
        div.className = "col-md-4";
        div.innerHTML = `
            <div class="partida-card p-3">
                <h5 class="fw-bold">${p.titulo}</h5>
                <p class="mb-1"><strong>📍 Local:</strong> ${p.local}</p>
                <p class="mb-1"><strong>📅 Data:</strong> ${p.data}</p>
                <p class="mb-1"><strong>⏰ Horário:</strong> ${p.horario}</p>
                <button onclick="excluirPartida(${p.id})" class="btn btn-delete w-100 mt-2">Excluir</button>
            </div>
        `;
        container.appendChild(div);
    });
}

async function criarPartida(event) {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const local = document.getElementById("local").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, local, data, horario })
    });
    carregarPartidas();
}

async function excluirPartida(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarPartidas();
}

document.getElementById("form-partida").addEventListener("submit", criarPartida);
carregarPartidas();
