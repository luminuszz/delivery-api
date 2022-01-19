import jwtConfig from '@app/config/jwt.config';
import { PayloadToken } from '@core/services/auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.secret,
        });
    }

    async validate(payload: PayloadToken): Promise<PayloadToken> {
        return {
            id: payload.id,
            name: payload.name,
            userType: payload.userType,
        };
    }
}
