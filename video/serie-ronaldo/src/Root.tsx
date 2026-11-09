import React from "react";
import { Still } from "remotion";
import { FichaPersonagem, Quadro1, Quadro2, Quadro3 } from "./quadros/Quadros";

// Etapa 3 do PADRÃO DE VÍDEO: fichas de personagem e quadros de estilo, para aprovação antes de animar.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still id="FichaRonaldo" component={FichaPersonagem} width={1080} height={1920} defaultProps={{ quem: "ronaldo" as const }} />
      <Still id="FichaWan" component={FichaPersonagem} width={1080} height={1920} defaultProps={{ quem: "wan" as const }} />
      <Still id="Quadro1Gancho" component={Quadro1} width={1080} height={1920} />
      <Still id="Quadro2Resgate" component={Quadro2} width={1080} height={1920} />
      <Still id="Quadro3Cartela" component={Quadro3} width={1080} height={1920} />
    </>
  );
};
