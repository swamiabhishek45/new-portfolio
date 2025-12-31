
import { GoogleGenAI, Modality, Type, FunctionDeclaration } from "@google/genai";
import { PersonaMode, ChatMessage } from "../types/types";

const ai = new GoogleGenAI({ apiKey: "AIzaSyA26zuPRIkH_E0PXdmcLakl2nlQvM2UoGE"});
// console.log("API KEY EXISTS:", !!process.env.API_KEY);

const sendEmailFunctionDeclaration: FunctionDeclaration = {
    name: 'sendEmail',
    parameters: {
        type: Type.OBJECT,
        description: 'Simulates sending an email message to Abhishek at abhishekswami1435@gmail.com.',
        properties: {
            to: {
                type: Type.STRING,
                description: 'The recipient email address (defaults to abhishekswami1435@gmail.com).',
            },
            subject: {
                type: Type.STRING,
                description: 'A professional subject line for the email.',
            },
            body: {
                type: Type.STRING,
                description: 'The full message content for the email.',
            },
            senderName: {
                type: Type.STRING,
                description: 'The name of the user sending the message.',
            },
        },
        required: ['subject', 'body', 'senderName'],
    },
};

const SYSTEM_INSTRUCTIONS: Record<PersonaMode, string> = {
    [PersonaMode.DEVELOPER]: `
    You are Abhishek's Developer Persona. You are technical, focused on efficiency, and expert in software architecture.
    Primary objective: Help users understand Abhishek's technical stack (React, Node, Gemini).
    Communication: Use technical terminology correctly. Be professional but slightly casual.
    Contact: If a user wants to hire Abhishek, offer to send an email to abhishekswami1435@gmail.com.
  `,
    [PersonaMode.DESIGNER]: `
    You are Abhishek's Designer Persona. You value aesthetics, typography, and user experience above all.
    Primary objective: Discuss Abhishek's design philosophy and visual work.
    Communication: Use descriptive, creative language. Focus on "feel" and "usability".
  `,
    [PersonaMode.MENTOR]: `
    You are Abhishek's Mentor Persona. You are encouraging, patient, and focus on growth.
    Primary objective: Help students or junior devs learn from Abhishek's journey.
    Communication: Clear, jargon-free explanations. Encouraging tone.
  `,
    [PersonaMode.CAREER_ADVISOR]: `
    You are Abhishek's Career Advisor Persona. You are a strategic career coach specializing in the tech industry.
    Primary objective: Provide job search advice, resume tips, and explain how Abhishek's skills translate to real-world value.
    Communication: Professional, insightful, and result-oriented. Focus on ROI and impact.
  `
};

export const chatWithPersona = async (
    mode: PersonaMode,
    message: string,
    history: ChatMessage[]
) => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
            role: 'user',
            parts: [{ text: message }]
        },
        config: {
            systemInstruction: SYSTEM_INSTRUCTIONS[mode],
            tools: [{ functionDeclarations: [sendEmailFunctionDeclaration] }],
        }
    });

    return {
        text: response.text,
        functionCalls: response.functionCalls
    };
};

export const analyzeResume = async (fileBase64: string, mimeType: string) => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: fileBase64,
                        mimeType: mimeType,
                    },
                },
                {
                    text: `
            Act as an expert technical recruiter. Analyze this resume.
            Return ONLY a JSON object with this exact structure:
            {
              "score": number (0-100),
              "summary": "one sentence overview",
              "strengths": ["string", "string", "string"],
              "weaknesses": ["string", "string", "string"],
              "actionableSteps": ["string", "string", "string"]
            }
            Do not include any other text or markdown formatting.
          `
                }
            ]
        },
        config: {
            responseMimeType: "application/json"
        }
    });

    if (!response.text) {
        console.error("Empty response from Gemini");
        return null;
    }

    try {
        return JSON.parse(response.text);
    } catch (e) {
        console.error("JSON Parse Error", e);
        return null;
    }
};

export const generateSpeech = async (text: string) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Say warmly: ${text}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) return null;

        const audioBytes = decode(base64Audio);
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);

        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start();
        return true;
    } catch (err) {
        console.error("Speech error:", err);
        return false;
    }
};

function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}
