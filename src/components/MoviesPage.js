import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

function Movie({poster}) {
    
    return (
        <>
            <CadaFilme>
                <img src={poster} alt="capa do filme" />
            </CadaFilme>
           
        </ >
    )
}

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")

        promise.then((res) => {
            console.log(res.data)
            setMovies(res.data)
        })

        promise.catch((err) => (console.log(err.responde.data)));
    }, [])

    return (
        <TelaToda>
            <BarraTopo>
                <h1>CINEFLEX</h1>
            </BarraTopo>

            <ContainerTexto>
                <h2>Selecione o filme</h2>
            </ContainerTexto>

            <ContainerFilmes>
                {movies.map((mv) => <Movie key={mv.id} poster={mv.posterURL} />)}
            </ContainerFilmes>

        </TelaToda>

    )
}

const TelaToda = styled.div`
    font-family: 'Roboto', sans-serif;
    background-color: #FFFFFF;
`

const BarraTopo = styled.div`
    background-color: #C3CFD9;
    width: auto;
    height: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    color: #E8833A;
    font-size: 34px;
    font-weight: 400;

`
const ContainerTexto = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 110px;
    font-size: 24px;
    font-weight: 400;
`

const ContainerFilmes = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    

`

const CadaFilme = styled.div`
    background-color: #FFFFFF;
    width: 145px;
    height: 209px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    margin: 11px;
    
    img{
        width: 129px;
        height: 193px;
    }

`