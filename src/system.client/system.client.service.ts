import { Injectable } from '@nestjs/common';
import { CreateSystemClientDto } from './dto/create-system.client.dto';
import { UpdateSystemClientDto } from './dto/update-system.client.dto';
import { DatabaseService } from 'src/database/database.service';
import { ResultModel } from 'src/core/utls/result.model';
import { SelectClientDto } from './dto/select.client.dto';
import { findManySql } from './sqls/system.client.sql';

@Injectable()
export class SystemClientService {
  constructor(private readonly dbService: DatabaseService) {}

  create(createSystemClientDto: CreateSystemClientDto) {
    return 'This action adds a new systemClient';
  }

  async findMany(selectClientDto: SelectClientDto) {
    let connectionPool = null;

    try {
      connectionPool = await this.dbService.getConnection();

      //[rows]

      const queryString = findManySql(selectClientDto);

      const [resultData] = await connectionPool.execute(queryString);
      const quantidadeRegistros = Array.isArray(resultData)
        ? resultData.length
        : 0;

      if (!resultData || quantidadeRegistros === 0) {
        return new ResultModel(
          100404,
          'Info: Não foi possível carregar os registros',
          0,
          '',
        );
      } else {
        return new ResultModel(
          100200,
          `Registros carregados com sucesso`,
          0,
          resultData,
          quantidadeRegistros,
        );
      }
    } catch (err) {
      return new ResultModel(100404, err.message, 0, []);
    } finally {
      if (connectionPool) {
        connectionPool.release(); // Libera a conexão de volta ao pool
        console.log('FECHOU A CONEXÃO 1');
      }
    }

    // console.log(userLogin);
  }

  findOne(id: number) {
    return `This action returns a #${id} systemClient`;
  }

  update(id: number, updateSystemClientDto: UpdateSystemClientDto) {
    return `This action updates a #${id} systemClient`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemClient`;
  }
}
