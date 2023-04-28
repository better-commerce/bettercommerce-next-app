// Base Imports
import { NextRequest, NextResponse } from "next/server";

// Other Imports
import { APP_ROUTES } from "@utils/constants";

export function middleware(request) {

    // If route url is already in lowercase.
    if (request.nextUrl.pathname === request.nextUrl.pathname.toLocaleLowerCase()) {

        // Continue
        return NextResponse.next();
    }

    // Redirect to route enforced with lowercases.
    return NextResponse.redirect(
        `${request.nextUrl.origin}${request.nextUrl.pathname.toLocaleLowerCase()}`
    );
}