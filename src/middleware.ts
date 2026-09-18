import { NextRequest, NextResponse } from "next/server";
import { getDefaultSettings } from "./helpers/settings";

const middleware = async (request: NextRequest) => {
    const response = NextResponse.next();

    if (!request.cookies.has("settings")) {
        response.cookies.set("settings", JSON.stringify(await getDefaultSettings()), {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
        });
    }

    return response;
}

export default middleware;
