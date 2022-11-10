import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  console.log(
    configService.get<string>(process.env.DB_USERNAME),
    configService.get<string>(process.env.DB_PASSWORD),
  );
  return {
    type: 'mysql',
    host: configService.get<string>(process.env.DB_HOST),
    port: configService.get<number>(process.env.DB_PORT),
    username: configService.get<string>(process.env.DB_USERNAME),
    password: configService.get<string>(process.env.DB_PASSWORD),
    database: configService.get<string>(process.env.DB_SCHEMA),
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  };
};
