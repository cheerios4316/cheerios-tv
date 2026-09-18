import { Innertube } from "youtubei.js";

interface IYouTubeLoginFlow {
  accessToken?: string;
  error?: string;
  session: unknown;
}

const globalFlows = globalThis as typeof globalThis & {
  youtubeLoginPocFlows?: Map<string, IYouTubeLoginFlow>;
};

const youtubeLoginFlows =
  globalFlows.youtubeLoginPocFlows ?? new Map<string, IYouTubeLoginFlow>();

globalFlows.youtubeLoginPocFlows = youtubeLoginFlows;

const startYouTubeLogin = async () => {
  const id = crypto.randomUUID();
  const youtube = await Innertube.create();
  const flow: IYouTubeLoginFlow = { session: youtube };
  youtubeLoginFlows.set(id, flow);

  const verification = new Promise<{ url: string; userCode: string }>(
    (resolve, reject) => {
      youtube.session.once(
        "auth-pending",
        ({ verification_url, user_code }) => {
          resolve({ url: verification_url, userCode: user_code });
        },
      );

      youtube.session.once("auth-error", (error) => {
        flow.error = error.message;
        reject(error);
      });
    },
  );

  youtube.session.once("auth", ({ credentials }) => {
    flow.accessToken = credentials.access_token;
  });

  void youtube.session.signIn().catch((error: unknown) => {
    flow.error = error instanceof Error ? error.message : "Login failed.";
  });
  const details = await verification;

  setTimeout(() => youtubeLoginFlows.delete(id), 10 * 60 * 1000);

  return { id, ...details };
};

const getYouTubeLoginFlow = (id: string) => youtubeLoginFlows.get(id);
const deleteYouTubeLoginFlow = (id: string) => youtubeLoginFlows.delete(id);

export {
  deleteYouTubeLoginFlow,
  getYouTubeLoginFlow,
  startYouTubeLogin,
};
