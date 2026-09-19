"use client";

import {MouseEvent, useEffect, useRef, useState} from "react";
import styles from "./YoutubeLogin.module.scss";
import {ClipboardCheckIcon, ClipboardCopy} from "lucide-react";
import {clipboardCopy} from "@/helpers/clipboard";

interface IYouTubeLoginProps {
    token: string | undefined;
    onTokenReceive: (token: string) => void;
    onLogout: () => void;
}

interface IVerificationDetails {
    id: string;
    url: string;
    userCode: string;
}

interface ILoginStatusResponse {
    status?: "pending" | "complete";
    accessToken?: string;
    error?: string;
}

const POLL_INTERVAL = 2000;
const AUTH_WINDOW_HEIGHT = 700;
const AUTH_WINDOW_WIDTH = 800;

const openAuthenticationWindow = (url: string) => {
    const left = window.screenX + (window.outerWidth - AUTH_WINDOW_WIDTH) / 2;
    const top = window.screenY + (window.outerHeight - AUTH_WINDOW_HEIGHT) / 2;

    return window.open(
        url,
        "youtube-login",
        [
            "popup=yes",
            `width=${AUTH_WINDOW_WIDTH}`,
            `height=${AUTH_WINDOW_HEIGHT}`,
            `left=${Math.max(0, Math.round(left))}`,
            `top=${Math.max(0, Math.round(top))}`,
            "resizable=yes",
            "scrollbars=yes",
        ].join(","),
    );
};

const wait = (milliseconds: number) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

const requestVerification = async (signal: AbortSignal) => {
    const response = await fetch("/api/youtube-login/start", {
        method: "POST",
        signal,
    });
    const result = (await response.json()) as
        | IVerificationDetails
        | { error: string };

    if (!response.ok || "error" in result) {
        throw new Error("error" in result ? result.error : "Login failed.");
    }

    return result;
};

const waitForToken = async (flowId: string, signal: AbortSignal) => {
    while (!signal.aborted) {
        await wait(POLL_INTERVAL);

        const response = await fetch(
            `/api/youtube-login/status?id=${encodeURIComponent(flowId)}`,
            {signal},
        );
        const result = (await response.json()) as ILoginStatusResponse;

        if (!response.ok) {
            throw new Error(result.error ?? "Login failed.");
        }

        if (result.status === "complete" && result.accessToken) {
            return result.accessToken;
        }
    }

    throw new DOMException("Login cancelled.", "AbortError");
};

const YouTubeLogin = ({
                          token,
                          onTokenReceive,
                          onLogout,
                      }: IYouTubeLoginProps) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [status, setStatus] = useState<string>();
    const [authenticationCode, setAuthenticationCode] = useState<string>();
    const [verification, setVerification] =
        useState<IVerificationDetails>();
    const requestControllerRef = useRef<AbortController>(null);

    const [copiedIcon, setCopiedIcon] = useState<boolean>(false);

    useEffect(
        () => () => {
            requestControllerRef.current?.abort();
        },
        [],
    );

    const copy = (text: string) => {
        clipboardCopy(
            text,
            () => setCopiedIcon(true),
            () => setCopiedIcon(false),
        )
    }

    const startLogin = async () => {
        requestControllerRef.current?.abort();

        const controller = new AbortController();
        requestControllerRef.current = controller;
        setIsAuthenticating(true);
        setAuthenticationCode(undefined);
        setVerification(undefined);
        setStatus("Starting YouTube login...");

        const authWindow = openAuthenticationWindow("about:blank");

        try {
            const details = await requestVerification(controller.signal);
            setVerification(details);
            setAuthenticationCode(details.userCode);
            setStatus("Enter the following code on the Google page:");
            authWindow?.location.assign(details.url);

            const accessToken = await waitForToken(details.id, controller.signal);
            onTokenReceive(accessToken);
            setAuthenticationCode(undefined);
            setStatus(undefined);
            authWindow?.close();
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return;
            }

            setVerification(undefined);
            setAuthenticationCode(undefined);
            setStatus(
                error instanceof Error
                    ? error.message
                    : "Could not complete YouTube login.",
            );
            authWindow?.close();
        } finally {
            if (!controller.signal.aborted) {
                setIsAuthenticating(false);
            }
        }
    };

    const handleLoginClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        if (verification) {
            openAuthenticationWindow(verification.url);
            return;
        }

        if (!isAuthenticating) {
            void startLogin();
        }
    };

    const handleLogout = () => {
        requestControllerRef.current?.abort();
        setVerification(undefined);
        setAuthenticationCode(undefined);
        setStatus(undefined);
        setIsAuthenticating(false);
        onLogout();
    };

    return (
        <div className={styles["youtube-login"]}>
            {!token && !status && <a
                className={styles["youtube-login__log-btn"]}
                href={verification?.url ?? "#"}
                rel="noreferrer"
                onClick={handleLoginClick}
            >
                Login via YouTube
            </a>}
            {
                token && <button className={styles["youtube-login__log-btn"]} type="button" onClick={handleLogout}>
                    Logout
                </button>
            }
            <div className={styles["youtube-login__status"]}>
                {status && <p>{status}</p>}
                {authenticationCode && (
                    <div className={styles["youtube-login__status__code"]}>
                        <code>{authenticationCode}</code>
                        <span onClick={() => copy(authenticationCode)}>
                            {!copiedIcon && <ClipboardCopy size={18}/>}
                            {copiedIcon && <ClipboardCheckIcon size={18}/>}
                        </span>
                    </div>
                )}
                {status && <button className={styles["youtube-login__log-btn"]} onClick={handleLogout}>Cancel</button>}
            </div>
            {status && <div className={styles["youtube-login__loader"]}></div>}
        </div>
    );
};

export {YouTubeLogin, type IYouTubeLoginProps};
