import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    return await this.catModel.find();
  }

  async existsByEmail(email: string): Promise<any> {
    try {
      const result = await this.catModel.exists({ email });
      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    try {
      const cat = await this.catModel.findOne({ email });
      return cat;
    } catch (error) {
      throw new HttpException('Cant find', 404);
    }
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    try {
      // select: field 여러개 중 원하는것만 골라 가져오기
      const cat = await this.catModel.findById(catId).select('-password');
      return cat;
    } catch (error) {
      throw new HttpException('Cant find', 404);
    }
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgurl = `http://localhost:8000/media/${fileName}`;
    const newCat = await cat.save();
    console.log(newCat);
    return newCat.readOnlyData;
  }
}
