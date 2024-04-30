import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
              private readonly jwtService:JwtService
              ) {
  }
  async create(createUserDto: CreateUserDto) {
    try{
      const existUser = await this.userRepository.findOne({
        where:{
          email:createUserDto.email ,
        },
      })
      if(existUser) throw new BadRequestException('Этот майл уже используется')

      let user : User = new User();
      user.email = createUserDto.email;
      user.password = await argon2.hash(createUserDto.password);
      this.userRepository.save(user);

      const token = this.jwtService.sign({email:createUserDto.email})

      return {user, token}
    }catch (error)  {
      console.log(error)
    }



  }
  findUserById(id:number){
    return this.userRepository.findOne({where:{id:id}});
  }
    findUserByEmail(email:string){
      return this.userRepository.findOne({where:{email:email}});
    }
  findAll() {
    return this.userRepository.find();
  }
  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
