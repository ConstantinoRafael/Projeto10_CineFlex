import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ShowTime({ name, id }) {

    return (
        <Link to={`/assentos/${id}`}>
            <CadaHorario>{name}</CadaHorario>
        </Link>
        
    )
}

function DayMovie({ weekday, date, showtimes }) {

    return (
        <>
            <CadaDia>
                <span>{weekday} - {date}</span>
                <Horarios>
                    {showtimes.map((s) => (<ShowTime key={s.id} name={s.name} id={s.id} />))}
                </Horarios>

            </CadaDia>

        </ >
    )
}

export default function ShowTimePage() {
    const [movie, setMovie] = useState([]);
    const [days, setDays] = useState([]);
    const {idFilme} = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`)

        promise.then((res) => {
            //console.log(res.data.days)
            //console.log(res.data)
            setMovie(res.data)
            setDays(res.data.days)
        })

        promise.catch((err) => (console.log(err.responde.data)));
    }, [idFilme])

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
                    <img src={movie.posterURL} alt="poster do filme" />
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
    margin: 20px;

    a{
        text-decoration: none
    }
`

const CadaHorario = styled.button`
    width: 83px;
    height: 43px;
    background-color: #E8833A;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 400;
    margin: 3px;
    text-decoration: none;
`

const BarraFundo = styled.div`
    width: auto;
    height: 117px;
    background-color: #DFE6ED;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;

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