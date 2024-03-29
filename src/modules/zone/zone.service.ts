import { BaseService } from '@modules/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Zone, ZoneDocument } from '@schemas/zone.schema';
import { Model, PaginateModel } from 'mongoose';

interface IpaginateZone {
  limit: number;
  page?: number;
}

interface IinsertZone {
  subDistrictName: string;
  img: string;
  province: string;
  district: string;
  zipcode: number;
  districtName: string;
  provinceName: string;
  subDistrict: string;
}

@Injectable()
export class ZoneService extends BaseService<ZoneDocument> {
  constructor(
    @InjectModel(Zone.name) private zoneModel: Model<ZoneDocument>,
    @InjectModel(Zone.name) private zonePaginationModel: PaginateModel<ZoneDocument>,
  ) {
    super(zoneModel);
  }

  async insertZone(arg: IinsertZone): Promise<ZoneDocument> {
    return await this.zoneModel.create(arg)
  }


  async paginateZone(arg : IpaginateZone): Promise<ZoneDocument[]> {
    const options = {
      limit: arg.limit!,
      page: arg.page!
    };
    const { docs } = await this.zonePaginationModel.paginate({}, options);
    return docs;
  }
}
