import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SucessPage(props) {
  return (
    <TelaToda>
      <BarraTopo>
        <h1>CINEFLEX</h1>
      </BarraTopo>

      <ContainerTexto>
        <h2>Pedido feito </h2>
        <h2>com sucesso!</h2>
      </ContainerTexto>

      <ContainerDados>
        <h3>Filme e sessão</h3>
        <p data-identifier="movie-session-infos-reserve-finished">
          {props.sucessData.title}
        </p>
        <p data-identifier="movie-session-infos-reserve-finished">
          {props.sucessData.date} {props.sucessData.time}
        </p>

        <h3>Ingressos</h3>
        {props.sucessData.seats.map((s, i) => (
          <p data-identifier="seat-infos-reserve-finished" key={i}>
            Assento {s}
          </p>
        ))}

        <h3>Comprador</h3>
        <p data-identifier="buyer-infos-reserve-finished">
          Nome: {props.sucessData.name}
        </p>
        <p data-identifier="buyer-infos-reserve-finished">
          CPF: {props.sucessData.cpf}
        </p>
      </ContainerDados>

      <Link to={"/"}>
        <BotãoVoltar data-identifier="back-to-home-btn">
          Voltar pra Home
        </BotãoVoltar>
      </Link>
    </TelaToda>
  );
}

const TelaToda = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #ffffff;

  a {
    text-decoration: none;
  }
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 110px;
  font-size: 24px;
  font-weight: 700;
  color: #247a6b;
`;

const ContainerDados = styled.div`
  height: 110px;
  font-size: 24px;
  font-weight: 400;
  margin-left: 24px;
  color: #293845;

  h3 {
    margin-top: 50px;
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 700;
  }

  p {
    margin-top: 5px;
    font-size: 22px;
  }
`;

const BotãoVoltar = styled.button`
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
  margin: 300px auto;
`;
