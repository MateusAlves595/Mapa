'use strict'

const pesquisarEstado = async (estado) => {
    const url = `http://localhost:8080/estado/${estado}`
    const response = await fetch(url)
    const data = await response.json()

    return {
        uf: data.uf,
        capital: data.capital,
        regiao: data.regiao,
        nome: data.descricao
    }
}

const mapa = document.querySelector('svg')

const getEstados = (event) => {
    const estado = event.target.id.replace('BR-','')
    preencherDados(estado)
}

const preencherDados = async (sigla) => {
    document.getElementById('estado').value
    const estado = await pesquisarEstado(sigla)

    document.getElementById('sigla').innerHTML = estado.uf
    document.getElementById('nome').innerHTML = estado.descricao
}

mapa.addEventListener('click', getEstados)