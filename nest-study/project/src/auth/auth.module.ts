import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1y' },
    }),
    // CatsModule에 있는 exports들을 사용할 수 있게 됨.
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
