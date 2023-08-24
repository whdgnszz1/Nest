import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // 다른 서비스에서 DB에 접근 가능. AuthModule에서 CatsRepository를 등록해줘야 한다.
  constructor(
    private readonly catsRepository: CatsRepository,
    // auth.module에 jwtModule가 import 되어있기 때문에 사용 가능.
    private jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto): Promise<any> {
    const { email, password } = data;

    // 해당하는 email이 있는지
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    // password가 일치하는지 확인
    const isPasswordValidated: any = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { email: email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
