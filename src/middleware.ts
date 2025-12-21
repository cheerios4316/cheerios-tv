import { NextRequest, NextResponse } from "next/server";
import { getDefaultSettings } from "./helpers/settings";

const middleware = async (request: NextRequest) => {
    const settings = request.cookies.get("settings");

    if(settings) {
        return NextResponse.next();
    }

    const response = NextResponse.next();

    response.cookies.set("settings", JSON.stringify(await getDefaultSettings()), {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
    })

    return response;
}

export default middleware;