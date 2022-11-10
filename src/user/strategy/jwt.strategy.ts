import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from "../user.service";
import { ConfigService } from '@nestjs/config';
import { UserPayload } from "../interface/user.payload.interface";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly userService:UserService ,
        private configService: ConfigService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:configService.get<string>(process.env.SECRET_KEY)
        })
    }

    async validate(payload:UserPayload){
        return await this.userService.findById(payload.id);
    }
}