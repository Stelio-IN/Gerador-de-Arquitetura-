
import React, { useState, useCallback } from 'react';
import { generateArchitectureImage } from './services/geminiService';
import { Spinner } from './components/Spinner';

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const promptText = `Crie um diagrama de arquitetura de sistema detalhado e profissional para uma plataforma chamada 'SICE'. O diagrama deve ser limpo, moderno e fácil de entender, utilizando ícones de arquitetura padrão. Ele deve ilustrar claramente uma arquitetura de três camadas com os seguintes componentes:

1. **Frontend (Camada Cliente):** Rotulado como 'Frontend (PWA)'. Mostre ícones representando vários dispositivos (desktop, tablet, celular) conectando-se a ele. A tecnologia é React.

2. **Backend (Camada de Aplicação):** Rotulado como 'Backend API'. A tecnologia é Node.js. Deve ser representado como um servidor central que lida com a lógica de negócios. Mostre uma ligação de comunicação 'API RESTful' clara entre o Frontend e o Backend. Mencione 'Autenticação e Autorização' como um recurso-chave do backend.

3. **Base de Dados (Camada de Dados):** Rotulado como 'Base de Dados'. A tecnologia é MySQL. Deve estar conectado apenas à camada de Backend.

O diagrama deve mostrar o fluxo de dados/solicitações dos dispositivos do usuário, através do frontend, para o backend e, finalmente, para a base de dados, e de volta. Use setas para indicar o fluxo de comunicação. O estilo geral deve ser profissional e adequado para uma apresentação técnica.`;

  const handleGenerateImage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const url = await generateArchitectureImage(promptText);
      setImageUrl(url);
    } catch (err) {
      setError('Falha ao gerar a imagem. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [promptText]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl text-center">
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            Gerador de Diagrama de Arquitetura AI
          </h1>
          <p className="text-lg text-gray-400">
            Gere uma visualização da arquitetura do seu sistema SICE com um único clique.
          </p>
        </header>

        <main className="flex flex-col items-center">
          <div className="w-full bg-gray-800 rounded-lg p-6 shadow-2xl mb-8 border border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-left text-gray-200">Descrição do Sistema SICE</h2>
            <p className="text-gray-300 text-left whitespace-pre-wrap font-mono text-sm bg-gray-900 p-4 rounded-md">
              O SICE foi concebido como uma Plataforma Web Progressiva (PWA) com uma arquitectura de três camadas:
              <br/><br/>
              - <span className="font-semibold text-blue-300">Frontend:</span> Interface responsiva em React, compatível com qualquer dispositivo.
              <br/>
              - <span className="font-semibold text-green-300">Backend:</span> API RESTful em Node.js, com autenticação e autorização avançadas.
              <br/>
              - <span className="font-semibold text-orange-300">Base de Dados:</span> MySQL, para garantir a integridade e consistência dos dados académicos.
            </p>
          </div>
          
          <button
            onClick={handleGenerateImage}
            disabled={isLoading}
            className="px-8 py-4 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? 'Gerando...' : 'Gerar Diagrama de Arquitetura'}
          </button>

          <div className="w-full max-w-4xl h-auto min-h-[500px] bg-gray-800 rounded-lg shadow-2xl border border-gray-700 flex items-center justify-center p-4">
            {isLoading && <Spinner />}
            {error && <p className="text-red-400">{error}</p>}
            {!isLoading && !error && imageUrl && (
              <img 
                src={imageUrl} 
                alt="Diagrama de arquitetura do sistema gerado" 
                className="rounded-lg max-w-full h-auto object-contain"
              />
            )}
            {!isLoading && !error && !imageUrl && (
              <div className="text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>O diagrama gerado aparecerá aqui.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
