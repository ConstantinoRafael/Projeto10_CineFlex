import styled from "styled-components";

export default function SucessPage(props) {
  console.log(props.sucessData);

  return (
    <TelaToda>
      <BarraTopo>
        <h1>CINEFLEX</h1>
      </BarraTopo>

      <ContainerTexto>
        <h2>Pedido feito com sucesso!</h2>
      </ContainerTexto>

      <ContainerDados>
        <h3>Filme e sessão</h3>
        <p>{props.sucessData.title}</p>
        <p>
           {props.sucessData.date} {props.sucessData.time}
        </p>

        <h3>Ingressos</h3>
        {props.sucessData.seats.map((s, i) => (<p key={i}>Assento {s}</p>))}

        <h3>Comprador</h3>
      </ContainerDados>
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

const ContainerDados = styled.div`
  height: 110px;
  font-size: 24px;
  font-weight: 400;

  p {
    color:red;
    font-size: 25px;
  }
`;
