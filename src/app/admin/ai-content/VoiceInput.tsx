"use client";

import { useState, useRef } from "react";
import { Mic, MicOff, Loader } from "lucide-react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export default function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    if (!isSupported) return;

    // Inicializar SpeechRecognition si no existe
    if (!recognitionRef.current) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setIsSupported(false);
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "es-ES";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          onTranscript(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  if (!isSupported) {
    return null; // Ocultar el botón si no está soportado
  }

  return (
    <button
      type="button"
      onClick={startListening}
      disabled={disabled}
      className={`px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${
        isListening
          ? "bg-red-500 text-white animate-pulse"
          : "bg-[#00FF88]/10 text-[#00FF88] hover:bg-[#00FF88]/20"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title={isListening ? "Grabando... click para parar" : "Click para grabar por voz"}
    >
      {isListening ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Escuchando...
        </>
      ) : (
        <>
          <Mic className="w-4 h-4" />
          Hablar
        </>
      )}
    </button>
  );
}
