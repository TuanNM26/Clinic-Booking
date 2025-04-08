import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import  { SignOptions} from 'jsonwebtoken'; 
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'; // ✅ Đúng cú pháp CommonJS (NodeJS)
import { UserService } from "src/modules/user/user.service";
import { LoginDto } from "./dto/LoginDTO";

@Injectable()
export default class AuthService {
    constructor( private _configService : ConfigService, private _userService : UserService){}

    public async hashPass(plainpassword : string){
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(plainpassword, salt);
    }    

    public comparePass(plainPassword : string, hashedPassword : string){
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    public sign(payload: string | object | Buffer,secretKey : string, option?: SignOptions) {
        return jwt.sign(payload, secretKey, option);
    }

    public verify(token : string, secretKey : string){
        return jwt.verify(token, secretKey);
    }

    async validateUser(loginDto: LoginDto) {
      const user = await this._userService.findByEmail(loginDto.email);
      if (!user || !(await this.comparePass(loginDto.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
    
      const payload = { username: user.name, sub: user.id, role: user.role };
    
      const accessToken = this.sign(
        payload,
        this._configService.get<string>("ACCESS_KEY")!,
        { expiresIn: '15m' } 
      );
    
      const refreshToken = this.sign(
        payload,
        this._configService.get<string>("REFRESH_KEY")!,
        { expiresIn: '7d' } 
      );
    
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    }
    
    public refreshAccessToken(refreshToken: string) {
      try {
        const payload = this.verify(
          refreshToken,
          this._configService.get<string>('REFRESH_KEY')!
        ) as any;
    
        const newAccessToken = this.sign(
          { username: payload.username, sub: payload.sub, role: payload.role },
          this._configService.get<string>('ACCESS_KEY')!,
          { expiresIn: '15m' }
        );
    
        return { access_token: newAccessToken };
      } catch (error) {
        throw new UnauthorizedException('Invalid refresh token');
      }
    }
    
    
}