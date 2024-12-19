import { NextRequest } from "next/server";

import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
export async function GET( NextRequest, {params}){
    const endpoint = params.KindeAuth
    return handleAuth(NextRequest, endpoint);
}