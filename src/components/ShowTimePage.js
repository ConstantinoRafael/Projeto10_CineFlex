import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

function ShowTime({ name }) {

    return (

        <CadaHorario>{name}</CadaHorario>
    )
}

function DayMovie({ weekday, date, showtimes }) {

    return (
        <>
            <CadaDia>
                <span>{weekday} - {date}</span>
                <Horarios>
                    {showtimes.map((s) => (<ShowTime key={s.id} name={s.name} />))}
                </Horarios>

            </CadaDia>

        </ >
    )
}

export default function ShowTimePage() {
    const [movie, setMovie] = useState([]);
    const [days, setDays] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies/1/showtimes")

        promise.then((res) => {
            console.log(res.data.days)
            setMovie(res.data)
            setDays(res.data.days)
        })

        promise.catch((err) => (console.log(err.responde.data)));
    }, [])

    return (
        <TelaToda>
            <BarraTopo>
                <h1>CINEFLEX</h1>
            </BarraTopo>

            <ContainerTexto>
                <h2>Selecione o horário</h2>
            </ContainerTexto>

            <ContainerDays>
                {days.map((d) => <DayMovie key={d.id} weekday={d.weekday} date={d.date} showtimes={d.showtimes} />)}
            </ContainerDays>

            <BarraFundo>
                <MolduraImagem>
                    <img src={movie.posterURL} all="poster do filme" />
                </MolduraImagem>
                <p>{movie.title}</p>
            </BarraFundo>

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

const ContainerDays = styled.div`
    align-items: center;
    justify-content: center;
    

`

const CadaDia = styled.div`
    span{
        font-size: 24px;
        font-weight: 400;
        margin-left: 23px;
        color: #293845;
    }
   
`

const Horarios = styled.div`
    display: flex;
    margin: 20px
`

const CadaHorario = styled.div`
    width: 83px;
    height: 43px;
    background-color: #E8833A;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    margin: 3px;
`

const BarraFundo = styled.div`
    width: 375px;
    height: 117px;
    background-color: #DFE6ED;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;

    p{
        font-size: 26px;
        font-weight: 400;
        margin-left: 4px;
    }
`

const MolduraImagem = styled.div`
    width: 64px;
    height: 89px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;

    img {
        width: 48px;
        height: 72px;
    }
`