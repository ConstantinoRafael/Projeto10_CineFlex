import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Seat({ id, number, isAvailable, index, clicked, setClicked, numberClicked, setNumberClicked }) {
  if (isAvailable === true && !clicked.includes(id)) {
    return <AssentoDisponivel onClick={clickSeat}>{number}</AssentoDisponivel>;
  } else if (isAvailable === true && clicked.includes(id)) {
    return <AssentoSelecionado onClick={clickSeat}>{number}</AssentoSelecionado>;
  } else {
    return <AssentoIndisponivel>{number}</AssentoIndisponivel>;
  }

  function clickSeat() {
    if (!clicked.includes(id)) {
      setClicked([...clicked, id]);
      setNumberClicked([...numberClicked, number]);
    } else {
      setClicked(clicked.filter((c) => c !== id));
      setNumberClicked(numberClicked.filter((n) => n !== number));
    }
  }
}


export default function SeatsPage({sucessData, setSucessData}) {
  const [clicked, setClicked] = useState([]);
  const [numberClicked, setNumberClicked] = useState([])
  const [seats, setSeats] = useState([]);
  const [movie, setMovie] = useState([]);
  const [day, setDay] = useState([]);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [cpf, setCpf] = useState("");
  const { idSessao } = useParams();
  const navigate = useNavigate();
  

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    );

    promise.then((res) => {
      setMovie(res.data.movie);
      setDay(res.data.day);
      setSeats(res.data.seats);
      setTime(res.data.name);
         
      
    });

    promise.catch((err) => console.log(err.responde.data));
  }, [idSessao]);

  
  function sendData(e) {
    e.preventDefault();

    const body = { ids: clicked, name: name, cpf: cpf };
    
    const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", body);

    promise.then(() => navigate("/sucesso", {sucessData}));

    promise.catch((err) => console.log(err.response.data));

    setSucessData({
        tilte: movie.title,
        date: day.date,
        time: time,
        name: name,
        seats: numberClicked,
        cpf: cpf
      })
    

  }

  

  

  return (
    <TelaToda>
      <BarraTopo>
        <h1>CINEFLEX</h1>
      </BarraTopo>

      <ContainerTexto>
        <h2>Selecione o(s) assento(s)</h2>
      </ContainerTexto>

      <ContainerSeats>
        {seats.map((s, i) => (
          <Seat
            key={s.id}
            number={s.name}
            id={s.id}
            isAvailable={s.isAvailable}
            index={i}
            clicked={clicked}
            setClicked={setClicked}
            numberClicked={numberClicked}
            setNumberClicked={setNumberClicked}
          />
        ))}
      </ContainerSeats>

      <LegendaAssentos>
        <CadaLegenda>
          <AssentoSelecionado />
          <p>Selecionado</p>
        </CadaLegenda>
        <CadaLegenda>
          <AssentoDisponivel />
          <p>Disponível</p>
        </CadaLegenda>
        <CadaLegenda>
          <AssentoIndisponivel />
          <p>Indisponível</p>
        </CadaLegenda>
      </LegendaAssentos>

      <form onSubmit={sendData}>
        <DadosComprador>
          <label htmlFor="name">Nome do comprador:</label>
          <input
            id="name"
            placeholder="Digite seu nome..."
            value={name}
            onChange={(e) => setName(e.target.value)
            }
          ></input>
          <label htmlFor="cpf">CPF do comprador:</label>
          <input
            id="cpf"
            placeholder="Digite seu CPF..."
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          ></input>
        </DadosComprador>
        <BotãoReservar type="submit">Reservar Assento(s)</BotãoReservar>
      </form>

      <BarraFundo>
        <MolduraImagem>
          <img src={movie.posterURL} alt="poster do filme" />
        </MolduraImagem>
        <div>
          <p>{movie.title}</p>
          <p>
            {day.weekday} - {day.date}
          </p>
        </div>
      </BarraFundo>
    </TelaToda>
  );
}

const TelaToda = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #ffffff;
`;

const BarraTopo = styled.div`
  background-color: #c3cfd9;
  width: auto;
  height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;
  color: #e8833a;
  font-size: 34px;
  font-weight: 400;
`;
const ContainerTexto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 110px;
  font-size: 24px;
  font-weight: 400;
`;

const ContainerSeats = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 21px;
`;

const LegendaAssentos = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const CadaLegenda = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-top: 7px;
  }
`;

const AssentoSelecionado = styled.button`
  width: 26px;
  height: 26px;
  background-color: #1aae9e;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  border-width: 1px;
  border-radius: 14px;
  border-color: #0e7d71;
  margin: 7px 4px 7px 3px;
  font-size: 11px;
`;

const AssentoDisponivel = styled.button`
  width: 26px;
  height: 26px;
  background-color: #c3cfd9;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  border-width: 1px;
  border-radius: 14px;
  border-color: #808f9d;
  margin: 7px 4px 7px 3px;
  font-size: 11px;
`;

const AssentoIndisponivel = styled.button`
  width: 26px;
  height: 26px;
  background-color: #fbe192;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  border-width: 1px;
  border-radius: 14px;
  border-color: #f7c52b;
  margin: 7px 4px 7px 3px;
  font-size: 11px;
`;

const DadosComprador = styled.div`
  margin-left: 24px;
  margin-top: 35px;

  label {
    margin: 7px 0px 7px 0px;
  }
`;

const BotãoReservar = styled.button`
  width: 225px;
  height: 42px;
  background-color: #e8833a;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 3px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 400;
`;

const BarraFundo = styled.div`
  width: auto;
  height: 117px;
  background-color: #dfe6ed;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  p {
    font-size: 26px;
    font-weight: 400;
    margin-left: 4px;
  }
`;

const MolduraImagem = styled.div`
  width: 64px;
  height: 89px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;

  img {
    width: 48px;
    height: 72px;
  }
`;

