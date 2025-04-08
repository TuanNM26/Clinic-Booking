import { Module } from "@nestjs/common";
import {  AuthGuardService } from "./authGuards.service";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports : [AuthModule],
    providers : [AuthGuardService],
    exports : [AuthGuardService]
})

export class AuthGuardModule{}