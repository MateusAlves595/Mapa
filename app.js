'use strict'

const mapa = document.querySelector('svg')


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

const pesquisarCidades = async (estado) => {
    const url = `http://localhost:8080/cidadesEstado/${estado}`
    const response = await fetch(url)
    const data = await response.json()

    return {
        cidades: data.cidades
    }
}

const preencherDados = async (sigla) => {
    document.getElementById('estado').value
    const estado = await pesquisarEstado(sigla)
    const cidades = await pesquisarCidades(sigla)

    document.getElementById('sigla').innerHTML = estado.uf
    document.getElementById('nome').innerHTML = estado.nome
    document.getElementById('capital').innerHTML = estado.capital
    document.getElementById('regiao').innerHTML = estado.regiao

    const ul = document.getElementById('lista')
    ul.textContent = ""

    cidades.cidades.forEach(function(city){
        const citiesList = document.createElement('li')
        citiesList.textContent = city

        ul.append(citiesList)
    })
}

const getEstados = (event) => {
    const estado = event.target.id.replace('BR-','')
    preencherDados(estado)
}

mapa.addEventListener('click', getEstados)