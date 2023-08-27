import { ApiProperty } from '@nestjs/swagger';
export class JoinRequestDto {
  @ApiProperty({
    example: 'whdgnszz11@naver.com',
    description: '이메일',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: '종훈',
    description: '닉네임',
    required: true,
  })
  public nickname: string;

  @ApiProperty({
    example: '1234',
    description: '비밀번호',
    required: true,
  })
  public password: string;
}
