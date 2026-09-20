"use client"

import { FC } from "react";
import styles from "./TTS.module.scss";
import { useEffect } from "react";
import { createModel } from "vosk-browser";

interface ITTSProps {

}

const TTS: FC<ITTSProps> = () => {

  useEffect(() => {
    let stream: MediaStream;

    (async () => {
      const model = await createModel("/model.zip");
      const ctx = new AudioContext();

      const recognizer = new model.KaldiRecognizer(ctx.sampleRate);
      recognizer.on("result", e => {
        console.log(e.result.text);
      });

      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        },
      });

      const source = ctx.createMediaStreamSource(stream);
      const processor = ctx.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = e => {
        recognizer.acceptWaveform(e.inputBuffer);
      };

      source.connect(processor);

      return () => {
        recognizer.remove();
        stream.getTracks().forEach(t => t.stop());
        ctx.close();
      };
    })();
  }, []);

  return null
};

export { TTS, type ITTSProps };