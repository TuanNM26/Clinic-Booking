import { Injectable } from '@nestjs/common';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config'; 

@Injectable()
export class AuthService  {
    constructor (private configService: ConfigService){}
    
    public async hashPassword(plainPassword: string) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(plainPassword, salt);
      }

      public async comparePassword(plainPassword: string, hashedPassword: string) {
        return bcrypt.compare(plainPassword, hashedPassword);
      }

      public async sign(payload: string | object | Buffer, options?: SignOptions) {
        return new Promise((resolve, reject) => {
          jwt.sign(payload, this.configService.get('JWT_SECRET'), options, (err, token) => {
            if (err) reject(err);
            else resolve(token);
          });
        });
      }

      public async verify(token: string) {
        return new Promise((resolve, reject) => {
          jwt.verify(token, this.configService.get('JWT_SECRET'), (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
          });
        });
      }
      
    
    
    
}
