import React from "react";
import { Composition, Still } from "remotion";
import { Ep01 } from "./ep01/Ep01";
import { DURACAO } from "./ep01/dados";
import { FichaPersonagem, Quadro1, Quadro2, Quadro3 } from "./quadros/Quadros";

// Etapa 3 do PADRÃO DE VÍDEO: fichas de personagem e quadros de estilo, para aprovação antes de animar.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Ep01Root" component={Ep01} width={1080} height={1920} fps={30} durationInFrames={Math.ceil(DURACAO * 30)} />
      <Still id="FichaRonaldo" component={FichaPersonagem} width={1080} height={1920} defaultProps={{ quem: "ronaldo" as const }} />
      <Still id="FichaWan" component={FichaPersonagem} width={1080} height={1920} defaultProps={{ quem: "wan" as const }} />
      <Still id="Quadro1Gancho" component={Quadro1} width={1080} height={1920} />
      <Still id="Quadro2Resgate" component={Quadro2} width={1080} height={1920} />
      <Still id="Quadro3Cartela" component={Quadro3} width={1080} height={1920} />
    </>
  );
};
