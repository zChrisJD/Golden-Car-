import { GoogleGenAI, Type } from "@google/genai";
import type { Car, TradeInCar } from '../types';

// FIX: This check is not compatible with frontend environments and will throw an unnecessary error.
// The API key is assumed to be available via environment variables provided by the build tool.
// if (!process.env.API_KEY) {
//   throw new Error("API_KEY environment variable not set");
// }

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSalesPitch = async (car: Car, customerProfile: string): Promise<{ title: string; pitch: string; }> => {
  const carDetails = `
- Veículo: ${car.year} ${car.make} ${car.model}
- Preço: R$ ${car.price.toLocaleString('pt-BR')}
- Quilometragem: ${car.mileage.toLocaleString('pt-BR')} km
- Motor: ${car.engine}
- Transmissão: ${car.transmission}
- Cor: ${car.exteriorColor}
- Destaques: ${car.features.join(', ')}
`;

  const prompt = `
Com base nos detalhes do carro e no perfil do cliente abaixo, crie uma proposta de vendas.

Detalhes do Carro:
${carDetails}

Perfil do Cliente:
${customerProfile}

Instruções:
- Destaque os 3 a 5 recursos mais relevantes para este cliente específico.
- Mantenha o tom profissional, amigável e persuasivo.
- O resultado deve ser um objeto JSON.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Um título cativante para a proposta de vendas."
            },
            pitch: {
              type: Type.STRING,
              description: "O texto completo da proposta de vendas, com parágrafos bem estruturados."
            }
          },
          required: ["title", "pitch"]
        },
      },
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    
    // Simple validation
    if (typeof parsed.title === 'string' && typeof parsed.pitch === 'string') {
        return parsed;
    } else {
        throw new Error("Formato de resposta da IA inválido.");
    }

  } catch (error) {
    console.error("Erro ao gerar proposta de vendas:", error);
    throw new Error("Não foi possível gerar a proposta de vendas. Tente novamente.");
  }
};

export const estimateTradeInValue = async (tradeInCar: TradeInCar, targetCarPrice: number): Promise<{ estimatedValueMin: number; estimatedValueMax: number; disclaimer: string; }> => {
    const prompt = `
    Você é um especialista em avaliação de veículos usados para uma concessionária.
    Sua tarefa é fornecer uma estimativa de valor de troca para o veículo do cliente descrito abaixo.
    O cliente está interessado em comprar um carro novo no valor de R$ ${targetCarPrice.toLocaleString('pt-BR')}.

    Detalhes do Veículo do Cliente para Troca:
    - Marca: ${tradeInCar.make}
    - Modelo: ${tradeInCar.model}
    - Ano: ${tradeInCar.year}
    - Quilometragem: ${tradeInCar.mileage.toLocaleString('pt-BR')} km
    - Estado de Conservação: ${tradeInCar.condition}

    Instruções:
    1. Com base nos dados, forneça uma faixa de valor realista (mínimo e máximo) para a troca. Considere que o valor de troca em uma concessionária é geralmente um pouco abaixo do valor de mercado para revenda.
    2. Crie um breve aviso informando que esta é uma estimativa preliminar e que o valor final dependerá de uma inspeção física completa do veículo.
    3. Retorne a resposta como um objeto JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        estimatedValueMin: { type: Type.NUMBER, description: "O valor mínimo estimado para a troca." },
                        estimatedValueMax: { type: Type.NUMBER, description: "O valor máximo estimado para a troca." },
                        disclaimer: { type: Type.STRING, description: "Aviso sobre a estimativa ser preliminar." }
                    },
                    required: ["estimatedValueMin", "estimatedValueMax", "disclaimer"]
                },
            },
        });

        const jsonText = response.text.trim();
        const parsed = JSON.parse(jsonText);

        if (typeof parsed.estimatedValueMin === 'number' && typeof parsed.estimatedValueMax === 'number' && typeof parsed.disclaimer === 'string') {
            return parsed;
        } else {
            throw new Error("Formato de resposta da IA inválido para avaliação de troca.");
        }

    } catch (error) {
        console.error("Erro ao estimar valor de troca:", error);
        throw new Error("Não foi possível estimar o valor de troca. Tente novamente.");
    }
};